// /app/courses/[slug]/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  BarChart3,
  CheckCircle2,
  Circle,
  Loader2,
  PlayCircle,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { api, Course, CourseProgress, Lesson } from '@/lib/api';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80';

const CourseDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({});

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .getCourse(slug)
      .then((data) => {
        if (cancelled) return;
        setCourse(data);
        if (data.is_enrolled) {
          api
            .getCourseProgress(slug)
            .then((p) => !cancelled && setProgress(p))
            .catch((err) => console.error('Failed to load progress:', err));
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load this course');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleEnroll = async () => {
    if (!slug) return;
    setEnrolling(true);
    setEnrollError(null);
    try {
      await api.enrollCourse(slug);
      const updated = await api.getCourse(slug);
      setCourse(updated);
      const p = await api.getCourseProgress(slug);
      setProgress(p);
    } catch (err: any) {
      const message = err.message || 'Failed to enroll';
      if (message.toLowerCase().includes('credentials') || message.toLowerCase().includes('authentic')) {
        setEnrollError('Please log in to enroll in this course.');
      } else {
        setEnrollError(message);
      }
    } finally {
      setEnrolling(false);
    }
  };

  const toggleChapter = (id: number) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin opacity-60" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-lg text-red-500 mb-2">Couldn&apos;t load this course</p>
        <p className="text-sm opacity-60 mb-6">{error || 'Course not found'}</p>
        <Link
          href="/courses"
          className="inline-flex items-center text-sm font-medium hover:opacity-70"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to courses
        </Link>
      </div>
    );
  }

  const chapters = course.chapters ?? [];
  const sortedChapters = chapters.slice().sort((a, b) => a.order - b.order);
  const allLessons: Lesson[] = sortedChapters.flatMap((ch) => ch.lessons ?? []);
  const firstLesson = sortedChapters[0]?.lessons?.slice().sort((a, b) => a.order - b.order)[0];

  return (
    <main className="flex-auto">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">

              <div className="grid gap-10 pt-6 pb-8 sm:grid-cols-5" data-aos="fade-up">

                {/* Left column: title, description, chapters */}
                <div className="sm:col-span-3">
                  <div>
                    {course.category?.name && (
                      <span className="text-muted-foreground block text-sm">
                        {course.category.name}
                      </span>
                    )}
                    <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
                      {course.title}
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                      {course.description}
                    </p>

                    {typeof course.total_lessons === 'number' && (
                      <div className="mt-2 flex items-center space-x-2">
                        <BarChart3 className="text-primary h-4 w-4" aria-hidden="true" />
                        <span className="text-muted-foreground text-sm">
                          {course.total_lessons} lesson{course.total_lessons === 1 ? '' : 's'}
                        </span>
                      </div>
                    )}

                    <div className="py-4">
                      <h2 className="font-heading text-xl">Chapters</h2>
                      <div className="mt-4">
                        {sortedChapters.length > 0 ? (
                          sortedChapters.map((chapter) => {
                            const isOpen = !!openChapters[chapter.id];
                            const lessons = (chapter.lessons ?? [])
                              .slice()
                              .sort((a, b) => a.order - b.order);
                            return (
                              <div
                                key={chapter.id}
                                className="border-b last:border-b-0"
                              >
                                <h3 className="flex">
                                  <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => toggleChapter(chapter.id)}
                                    className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline"
                                  >
                                    {chapter.title}
                                    <ChevronDown
                                      className={`text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 ${
                                        isOpen ? 'rotate-180' : ''
                                      }`}
                                      aria-hidden="true"
                                    />
                                  </button>
                                </h3>
                                {isOpen && (
                                  <div className="overflow-hidden text-sm pb-4">
                                    <div className="space-y-2">
                                      {lessons.map((lesson) => (
                                        <Link
                                          key={lesson.id}
                                          href={`/courses/${course.slug}/${lesson.slug}`}
                                          className="flex items-center justify-between p-3 rounded-lg custom-box hover:opacity-80 transition-all"
                                        >
                                          <div className="flex items-center">
                                            {lesson.is_completed ? (
                                              <CheckCircle2 className="h-4 w-4 mr-3 text-green-500 flex-shrink-0" />
                                            ) : (
                                              <Circle className="h-4 w-4 mr-3 opacity-40 flex-shrink-0" />
                                            )}
                                            <span className="font-medium">{lesson.title}</span>
                                          </div>
                                          {lesson.video && (
                                            <PlayCircle className="h-4 w-4 opacity-40 flex-shrink-0" />
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-sm opacity-60">
                            This course doesn&apos;t have any lessons yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: image + enroll/start */}
                <div className="sm:col-span-2 sticky top-24 self-start">
                  <img
                    alt={course.title}
                    width={720}
                    height={405}
                    className="bg-muted my-8 rounded-md border transition-colors w-full h-full object-cover"
                    src={course.thumbnail || FALLBACK_IMAGE}
                  />
                  <div>
                    <div className="mt-6 flex flex-col space-y-4">
                      {!course.is_enrolled ? (
                        <>
                          <button
                            onClick={handleEnroll}
                            disabled={enrolling}
                            className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-6 mt-2 w-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-all disabled:opacity-50"
                          >
                            {enrolling ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Enrolling…
                              </>
                            ) : (
                              'Enroll Now'
                            )}
                          </button>
                          {enrollError && (
                            <p className="text-sm text-red-500">{enrollError}</p>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium">Your progress</span>
                            <span className="opacity-60">
                              {progress
                                ? `${progress.completed_lessons}/${progress.total_lessons} completed`
                                : '—'}
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full custom-box overflow-hidden">
                            <div
                              className="h-full bg-black dark:bg-white rounded-full transition-all"
                              style={{ width: `${progress?.percent ?? 0}%` }}
                            />
                          </div>
                          {firstLesson && (
                            <Link
                              href={`/courses/${course.slug}/${firstLesson.slug}`}
                              className="inline-flex items-center justify-center gap-2 h-10 rounded-md px-6 mt-2 w-full border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-all"
                            >
                              Continue
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-12" />

              <div className="flex justify-center py-6 lg:py-10">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  All courses
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailPage;