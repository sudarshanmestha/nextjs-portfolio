'use client';

import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'dsa',
      title: "Algorithms & Data Structures for Beginners",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
      slug: "dsa-for-beginners"
    },
    {
      id: 'data-science',
      title: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      slug: "data-science"
    },
    {
      id: 'agentic-ai',
      title: "Agentic AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      slug: "agentic-ai"
    },
    {
      id: 'django',
      title: "Python Django",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80",
      slug: "python-django"
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

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#fbbf24';
      case 'Advanced': return '#ef4444';
      default: return '#888888';
    }
  };

  return (
    /* Background color set to match your non-transparent navbar across all slugs */
    <div style={{ backgroundColor: '#021b1b', minHeight: '100vh', color: '#e1e1e1' }}>
      
      {/* 
        Padding top set to 8rem (pt-32) to clear the fixed banner + navbar[cite: 2].
      */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 2rem 2rem' }}>
        
        <div className="flex flex-col space-y-4 pt-6 pb-8">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Courses</h1>
          <p className="text-xl" style={{ color: '#c3c3c3' }}>
            Master Data Structures & Algorithms from basics to advanced.
          </p>
        </div>

        {/* Category Cards Section */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          <div
            onClick={() => setSelectedCategory('all')}
            className="cursor-pointer"
            style={{
              backgroundColor: selectedCategory === 'all' ? '#112b2b' : '#0a2424',
              borderRadius: '8px',
              minWidth: '280px',
              border: selectedCategory === 'all' ? '2px solid #39FF14' : '1px solid #1a3a3a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '208px',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 600, fontSize: '18px' }}>All Courses</p>
              <p style={{ fontSize: '14px', color: '#888888' }}>{courses.length} courses</p>
            </div>
          </div>

          {categories.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCategory(card.id)}
              className="cursor-pointer"
              style={{
                backgroundColor: selectedCategory === card.id ? '#112b2b' : '#0a2424',
                borderRadius: '8px',
                minWidth: '280px',
                border: selectedCategory === card.id ? '2px solid #39FF14' : '1px solid #1a3a3a',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              <img src={card.image} alt={card.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <p style={{ fontWeight: 600, fontSize: '14px' }}>{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        <hr style={{ borderColor: '#1a3a3a', margin: '2rem 0' }} />

        {/* Courses Grid */}
        <div className="grid gap-10">
          {filteredCourses.map((course) => (
            <article key={course.id} className="grid gap-6 sm:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-extrabold mb-2">{course.title}</h2>
                <p style={{ color: '#c3c3c3', lineHeight: '1.6' }}>{course.description}</p>
                
                <div className="mt-4 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" style={{ color: getDifficultyColor(course.difficulty) }} />
                  <span className="text-sm" style={{ color: '#c3c3c3' }}>{course.difficulty}</span>
                </div>

                <div className="mt-6">
                  <a 
                    href={`/courses/${course.slug}`}
                    className="px-6 py-2 rounded-full border border-[#39FF14] text-[#39FF14] text-xs font-bold uppercase tracking-widest hover:bg-[#39FF14] hover:text-black transition-all"
                  >
                    Start Learning
                  </a>
                </div>
              </div>

              <div className="relative group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-xl border border-[#1a3a3a] transition-all group-hover:border-[#39FF14]/50"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;