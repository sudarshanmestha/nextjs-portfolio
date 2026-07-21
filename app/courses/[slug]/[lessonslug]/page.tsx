// /app/courses/[slug]/[lessonSlug]/page.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ChevronRight,
  Clock,
  Loader2,
  Menu,
  X,
} from 'lucide-react';

import { api, Course, Lesson, CourseProgress } from '@/lib/api';

// ── Helpers ──────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (!seconds) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 1) return `${secs}s`;
  return `${mins} min${secs ? ` ${secs}s` : ''}`;
}

type FlatLesson = {
  lesson: Lesson;
  chapterId: number;
  chapterTitle: string;
  chapterOrder: number;
  indexInChapter: number;
  chapterLessonCount: number;
};

function flattenChapters(course: Course | null): FlatLesson[] {
  if (!course?.chapters) return [];
  const chapters = [...course.chapters].sort((a, b) => a.order - b.order);
  const flat: FlatLesson[] = [];
  chapters.forEach((chapter) => {
    const lessons = [...chapter.lessons].sort((a, b) => a.order - b.order);
    lessons.forEach((lesson, i) => {
      flat.push({
        lesson,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterOrder: chapter.order,
        indexInChapter: i + 1,
        chapterLessonCount: lessons.length,
      });
    });
  });
  return flat;
}

// ── Component ────────────────────────────────────────────────────────────

const LessonDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseSlug = params?.slug as string;
  const lessonSlug = (params?.lessonSlug ?? (params as Record<string, string>)?.lessonslug ?? '') as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [openChapters, setOpenChapters] = useState<Set<number>>(new Set());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!courseSlug || !lessonSlug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([api.getCourse(courseSlug), api.getLesson(courseSlug, lessonSlug)])
      .then(([courseData, lessonData]) => {
        if (cancelled) return;
        setCourse(courseData);
        setLesson(lessonData);
        setCompleted(!!lessonData.is_completed);

        const containingChapter = courseData.chapters?.find((ch) =>
          ch.lessons.some((l) => l.slug === lessonSlug)
        );
        if (containingChapter) {
          setOpenChapters(new Set([containingChapter.id]));
        }

        if (courseData.is_enrolled) {
          api
            .getCourseProgress(courseSlug)
            .then((p) => !cancelled && setProgress(p))
            .catch(() => {});
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load this lesson');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [courseSlug, lessonSlug]);

  // Close the mobile drawer whenever the lesson changes (i.e. after navigating).
  useEffect(() => {
    setMobileNavOpen(false);
  }, [lessonSlug]);

  const flatLessons = useMemo(() => flattenChapters(course), [course]);
  const currentIndex = flatLessons.findIndex((f) => f.lesson.slug === lessonSlug);
  const currentFlat = currentIndex >= 0 ? flatLessons[currentIndex] : null;
  const nextFlat = currentIndex >= 0 ? flatLessons[currentIndex + 1] : null;

  const toggleChapter = (chapterId: number) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
      return next;
    });
  };

  const handleComplete = async () => {
    if (!courseSlug || !lessonSlug || completing) return;
    setCompleting(true);
    try {
      const res = await api.completeLesson(courseSlug, lessonSlug);
      setCompleted(res.completed);
    } catch (err) {
      console.error('Failed to mark lesson complete:', err);
    } finally {
      setCompleting(false);
    }
  };

  const goToNext = () => {
    if (!nextFlat) return;
    router.push(`/courses/${courseSlug}/${nextFlat.lesson.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400 dark:text-[#9a9a9a]" />
      </div>
    );
  }

  if (error || !course || !lesson) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-lg text-red-500 dark:text-red-400 mb-2">Couldn&apos;t load this lesson</p>
        <p className="text-sm text-gray-500 dark:text-[#9a9a9a] mb-6">{error || 'Lesson not found'}</p>
        <Link
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-[#f2f2f2] hover:text-[#14b8a6] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to course
        </Link>
      </div>
    );
  }

  const video = lesson.video;
  const chapters = [...(course.chapters ?? [])].sort((a, b) => a.order - b.order);
  const progressPercent = progress?.percent ?? 0;

  // Shared sidebar content — rendered once, used by both the desktop static
  // sidebar and the mobile drawer so the two never drift out of sync.
  const sidebarContent = (
    <>
      <div className="px-6 pb-5">
        <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-1.5">
          Course
        </p>
        <h2 className="text-lg font-semibold">{course.title}</h2>
      </div>

      {progress && (
        <>
          <div className="mx-6 mb-1 h-1.5 bg-gray-200 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#14b8a6] rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="px-6 text-xs text-gray-400 dark:text-[#6b6b6b] mb-5">
            {progress.completed_lessons} of {progress.total_lessons} lessons completed
          </p>
        </>
      )}

      {chapters.map((chapter) => {
        const isOpen = openChapters.has(chapter.id);
        const sortedLessons = [...chapter.lessons].sort((a, b) => a.order - b.order);
        return (
          <div key={chapter.id} className="border-t border-gray-200 dark:border-[#2a2a2a]">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex items-center justify-between gap-3 px-6 py-4 text-sm font-semibold text-left"
            >
              <span>{chapter.title}</span>
              <ChevronRight
                className={`h-4 w-4 flex-shrink-0 text-gray-400 dark:text-[#9a9a9a] transition-transform ${
                  isOpen ? 'rotate-90 text-[#14b8a6]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-2">
                {sortedLessons.map((l) => {
                  const isCurrent = l.slug === lessonSlug;
                  const isDone = !!l.is_completed;
                  return (
                    <Link
                      key={l.id}
                      href={`/courses/${courseSlug}/${l.slug}`}
                      className={`flex items-center gap-3 pl-5 pr-6 py-2.5 text-[13.5px] border-l-[3px] transition-colors ${
                        isCurrent
                          ? 'border-[#14b8a6] bg-[#14b8a6]/10 text-gray-900 dark:text-[#f2f2f2] font-semibold'
                          : 'border-transparent text-gray-500 dark:text-[#9a9a9a] hover:bg-gray-100 dark:hover:bg-[#202020] hover:text-gray-900 dark:hover:text-[#f2f2f2]'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#14b8a6]" />
                      ) : (
                        <Circle
                          className={`h-4 w-4 flex-shrink-0 ${
                            isCurrent ? 'text-[#14b8a6]' : 'text-gray-400 dark:text-[#6b6b6b]'
                          }`}
                        />
                      )}
                      <span className="flex-1">{l.title}</span>
                      <span className="text-[12px] text-gray-400 dark:text-[#6b6b6b] flex-shrink-0">
                        {formatDuration(l.duration_seconds)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-[#f2f2f2]">
      {/* Breadcrumb + mobile "Lessons" button */}
      <div className="px-6 md:px-10 py-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center justify-between gap-4">
        <Link
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-[#9a9a9a] hover:text-gray-900 dark:hover:text-[#f2f2f2] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to {course.title}
        </Link>

        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-[#2a2a2a] px-4 py-2 text-sm font-medium text-gray-900 dark:text-[#f2f2f2] hover:border-[#14b8a6] hover:text-[#14b8a6] transition-colors"
          aria-haspopup="dialog"
          aria-expanded={mobileNavOpen}
        >
          <Menu className="h-4 w-4" />
          Lessons
        </button>
      </div>

      <div className="grid md:grid-cols-[320px_1fr] max-w-[1280px] mx-auto items-start">
        {/* ── Sidebar: static on desktop ── */}
        <aside className="hidden md:flex md:sticky md:top-0 md:h-screen md:flex-col overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#2a2a2a] py-7">
          {sidebarContent}
        </aside>

        {/* ── Mobile drawer: only rendered/visible when opened via the "Lessons" button ── */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close lesson list"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/50"
            />

            {/* Panel */}
            <div className="relative z-10 w-[85%] max-w-sm h-full bg-white dark:bg-[#121212] overflow-y-auto py-7 shadow-xl">
              <div className="flex items-center justify-between px-6 pb-4">
                <span className="text-sm font-semibold text-gray-900 dark:text-[#f2f2f2]">
                  Lessons
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full text-gray-500 dark:text-[#9a9a9a] hover:bg-gray-100 dark:hover:bg-[#202020] hover:text-gray-900 dark:hover:text-[#f2f2f2] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* ── Main lesson area ── */}
        <main className="px-6 md:px-12 py-10 pb-24">
          <div className="flex items-start justify-between gap-6 mb-7 flex-col md:flex-row">
            <div>
              {currentFlat && (
                <p className="text-[#14b8a6] text-[13px] font-bold tracking-wide mb-2">
                  Chapter {chapters.findIndex((c) => c.id === currentFlat.chapterId) + 1} · Lesson{' '}
                  {currentFlat.indexInChapter} of {currentFlat.chapterLessonCount}
                </p>
              )}
              <h1 className="text-3xl font-bold leading-tight mb-3">{lesson.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#9a9a9a]">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>{formatDuration(lesson.duration_seconds)}</span>
              </div>
            </div>

            <button
              onClick={goToNext}
              disabled={!nextFlat}
              className="flex-shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#14b8a6] text-[#0b1614] px-5 py-3 rounded-full text-sm font-bold hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {nextFlat ? 'Next lesson' : "You're all caught up"}
              {nextFlat && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>

          {video ? (
            <div className="relative w-full aspect-video bg-black rounded-2xl border border-gray-200 dark:border-[#2a2a2a] overflow-hidden mb-8">
              {video.source_type === 'youtube' && video.embed_url ? (
                <iframe
                  src={video.embed_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : video.file ? (
                <video
                  src={video.file}
                  controls
                  className="w-full h-full"
                  poster={video.thumbnail || undefined}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-[#6b6b6b] text-sm">
                  Video source unavailable
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 dark:border-[#2a2a2a] p-10 text-center mb-8">
              <p className="text-sm text-gray-500 dark:text-[#9a9a9a]">No video has been added to this lesson yet.</p>
            </div>
          )}

          <div className="flex items-center justify-between gap-5 pb-8 border-b border-gray-200 dark:border-[#2a2a2a] mb-8">
            <button
              onClick={handleComplete}
              disabled={completing || completed}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold border transition-colors disabled:cursor-default ${
                completed
                  ? 'bg-gray-100 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-[#14b8a6]'
                  : 'bg-gray-100 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] text-gray-900 dark:text-[#f2f2f2] hover:border-[#14b8a6] hover:text-[#14b8a6]'
              }`}
            >
              {completing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : completed ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  Mark as complete
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonDetailPage;