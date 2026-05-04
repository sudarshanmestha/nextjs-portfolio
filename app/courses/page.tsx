'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const categories = [
    {
      id: 'dsa',
      title: "Algorithms & Data Structures",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    },
    {
      id: 'data-science',
      title: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    },
    {
      id: 'agentic-ai',
      title: "Agentic AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
    },
    {
      id: 'django',
      title: "Python Django",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80",
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Arrays & Hashing Fundamentals",
      slug: "arrays-hashing",
      description: "Master the fundamentals of arrays and hashing. Learn essential data structures including arrays, hash tables, and hash maps.",
      difficulty: "Beginner",
      category: "dsa",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
      id: 5,
      title: "Python for Data Science",
      slug: "python-data-science",
      description: "Learn Python programming specifically for data science. Master NumPy, Pandas, and essential libraries.",
      difficulty: "Beginner",
      category: "data-science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      id: 8,
      title: "Introduction to Agentic AI",
      slug: "intro-agentic-ai",
      description: "Learn the fundamentals of agentic AI systems. Understand autonomous agents and AI-driven automation.",
      difficulty: "Intermediate",
      category: "agentic-ai",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    /* 
       min-h-screen allows the background from global.css to fill the page.
       Removed hardcoded #021b1b.
    */
    <div className="min-h-screen">
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        <div className="flex flex-col space-y-4 mb-12" data-aos="fade-up">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Courses</h1>
          <p className="text-xl opacity-70">
            Master Software Development from basics to advanced.
          </p>
        </div>

        {/* Category Cards Section */}
        <div className="flex gap-5 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {/* "All Courses" Tile */}
          <div
            onClick={() => setSelectedCategory('all')}
            className={`cursor-pointer custom-box min-w-[250px] h-[180px] rounded-xl flex items-center justify-center transition-all duration-300 ${
              selectedCategory === 'all' ? 'ring-2 ring-black dark:ring-white scale-95' : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div className="text-center">
              <p className="font-bold text-lg">All Courses</p>
              <p className="text-sm opacity-60">{courses.length} courses</p>
            </div>
          </div>

          {categories.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCategory(card.id)}
              className={`cursor-pointer custom-box min-w-[250px] rounded-xl overflow-hidden transition-all duration-300 ${
                selectedCategory === card.id ? 'ring-2 ring-black dark:ring-white scale-95' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <img src={card.image} alt={card.title} className="w-full h-32 object-cover opacity-80" />
              <div className="p-4">
                <p className="font-bold text-sm truncate">{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-gray-200 dark:border-zinc-800 mb-12" />

        {/* Courses List */}
        <div className="space-y-16">
          {filteredCourses.map((course) => (
            <article 
              key={course.id} 
              className="grid gap-8 md:grid-cols-2 items-center"
              data-aos="fade-up"
            >
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                <p className="text-lg opacity-70 leading-relaxed mb-6">{course.description}</p>
                
                <div className="flex items-center space-x-4 mb-8">
                  <span className="flex items-center text-sm font-medium px-3 py-1 rounded-full custom-box">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {course.difficulty}
                  </span>
                </div>

                <a 
                  href={`/courses/${course.slug}`}
                  className="inline-block px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-all"
                >
                  Start Learning
                </a>
              </div>

              <div className="order-1 md:order-2">
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-xl group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;