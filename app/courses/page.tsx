// /nextjs-portfolio/app/courses/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Loader2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// NOTE: adjust this import path to wherever api.ts actually lives in your project
import { api, Category, Course } from '@/lib/api';

const CATEGORY_IMAGES: Record<string, string> = {
  dsa: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
  'data-science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  'agentic-ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
  django: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80',
};
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
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
                    Master Software Development from basics to advanced. Hare Krishna
                  </p>
                </div>

                {/* Category Cards Section */}
                <div className="flex gap-5 mb-12 overflow-x-auto pb-4 no-scrollbar">
                  {/* "All Courses" Tile */}
                  <div
                    onClick={() => setSelectedCategory('all')}
                    className={`cursor-pointer custom-box min-w-[250px] h-[180px] rounded-xl flex items-center justify-center transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'ring-2 ring-black dark:ring-white scale-95'
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-bold text-lg">All Courses</p>
                      <p className="text-sm opacity-60">
                        {selectedCategory === 'all' ? courses.length : ''} courses
                      </p>
                    </div>
                  </div>

                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`cursor-pointer custom-box min-w-[250px] rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedCategory === cat.slug
                          ? 'ring-2 ring-black dark:ring-white scale-95'
                          : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={CATEGORY_IMAGES[cat.slug] || FALLBACK_IMAGE}
                        alt={cat.name}
                        className="w-full h-32 object-cover opacity-80"
                      />
                      <div className="p-4">
                        <p className="font-bold text-sm truncate">{cat.name}</p>
                      </div>
                    </div>
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