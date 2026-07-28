// /nextjs-portfolio/app/courses/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// NOTE: adjust this import path to wherever api.ts actually lives in your project
import { api, Category, Course } from '@/lib/api';

// Local extension so we don't need to modify the shared Course type in lib/api.ts.
// If you'd rather add lesson_count directly to Course in lib/api.ts, you can
// remove this type and just use Course everywhere below.
type CourseWithLessons = Course & { lesson_count?: number };

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<CourseWithLessons[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    api
      .getCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = selectedCategory === 'all' ? undefined : { category: selectedCategory };

    api
      .getCourses(params)
      .then((data) => {
        if (!cancelled) setCourses(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load courses');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedCategory]);

  return (
    <main className="flex-auto">
      <div className="sm:px-8">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="pt-32 pb-20">
                <div className="flex flex-col space-y-4 mb-12" data-aos="fade-up">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Courses</h1>
                  <p className="text-xl opacity-70">
                    Master Your Skill Development from basics to advanced. Hare Krishna
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-3 mb-12" data-aos="fade-up">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      selectedCategory === 'all'
                        ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                        : 'bg-transparent text-current border-gray-300 dark:border-zinc-700 opacity-70 hover:opacity-100 hover:border-gray-400 dark:hover:border-zinc-500'
                    }`}
                  >
                    All Courses
                    {selectedCategory === 'all' && (
                      <span className="ml-2 opacity-70">({courses.length})</span>
                    )}
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                        selectedCategory === cat.slug
                          ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                          : 'bg-transparent text-current border-gray-300 dark:border-zinc-700 opacity-70 hover:opacity-100 hover:border-gray-400 dark:hover:border-zinc-500'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <hr className="border-gray-200 dark:border-zinc-800 mb-12" />

                {/* Loading state */}
                {loading && (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin opacity-60" />
                  </div>
                )}

                {/* Error state */}
                {!loading && error && (
                  <div className="text-center py-20">
                    <p className="text-lg text-red-500 mb-2">Couldn't load courses</p>
                    <p className="text-sm opacity-60">{error}</p>
                  </div>
                )}

                {/* Empty state */}
                {!loading && !error && courses.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-lg opacity-60">No courses found in this category yet.</p>
                  </div>
                )}

                {/* Courses List */}
                {!loading && !error && courses.length > 0 && (
                  <div className="space-y-16">
                    {courses.map((course) => (
                      <article
                        key={course.id}
                        className="grid gap-8 md:grid-cols-2 items-center"
                        data-aos="fade-up"
                      >
                        <div className="order-2 md:order-1">
                          <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                          <p className="text-lg opacity-70 leading-relaxed mb-6">
                            {course.description}
                          </p>

                          <div className="flex items-center space-x-4 mb-8">
                            {typeof course.lesson_count === 'number' && (
                              <span className="flex items-center text-sm font-medium px-3 py-1 rounded-full custom-box">
                                <BarChart3 className="h-4 w-4 mr-2" />
                                {course.lesson_count} lesson{course.lesson_count === 1 ? '' : 's'}
                              </span>
                            )}
                            {course.is_enrolled && (
                              <span className="text-sm font-medium px-3 py-1 rounded-full custom-box">
                                Enrolled
                              </span>
                            )}
                          </div>

                          <a
                            href={`/courses/${course.slug}`}
                            className="inline-block px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-all"
                          >
                            {course.is_enrolled ? 'Continue Learning' : 'Start Learning'}
                          </a>
                        </div>

                        <div className="order-1 md:order-2">
                          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-xl group">
                            <img
                              src={course.thumbnail || FALLBACK_IMAGE}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;