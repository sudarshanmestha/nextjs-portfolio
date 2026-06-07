'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="px-4 sm:px-8 lg:px-12 min-h-screen">
      <div className="mx-auto max-w-5xl">

        {/* HERO */}
        <section className="flex flex-col items-center text-center py-20">
          <div className="custom-box rounded-full px-4 py-1 text-sm font-bold mb-6 tracking-widest uppercase">
            Recently Revamped!
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[var(--foreground)]">
            Your destination to become a <br />
            <span className="gradient-text">Software Developer</span>
          </h1>

          <p className="text-[var(--foreground)]/50 text-lg mb-10 max-w-xl">
            Learn Django, React, SQL and more — through real projects and clear explanations.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/auth/login"
              className="gradient-bg accent-glow text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg shadow-[#58a6ff]/25"
            >
              Get Started
            </Link>
            <Link
              href="/projects"
              className="custom-box px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View Projects
            </Link>
          </div>
        </section>

        {/* FEATURE GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 py-12">
          {[
            { name: 'Django',  desc: "Build powerful backends with Python's leading web framework." },
            { name: 'React',   desc: "Create fast, interactive UIs with the world's most popular library." },
            { name: 'SQL',     desc: 'Master databases — from queries to schema design and optimization.' },
          ].map((item, i) => (
            <div
              key={item.name}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="custom-box rounded-xl p-6 transition-all hover:-translate-y-1 group"
            >
              <h3 className="font-bold text-lg mb-2 gradient-text">{item.name}</h3>
              <p className="text-sm opacity-60">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-4 pb-20">
          <details className="custom-box rounded-lg p-4">
            <summary className="cursor-pointer font-bold list-none flex justify-between items-center">
              How long do I have access?
              <span className="gradient-text font-black">↓</span>
            </summary>
            <p className="mt-3 text-sm opacity-60">Lifetime access to all content.</p>
          </details>
        </div>

      </div>
    </div>
  );
}
