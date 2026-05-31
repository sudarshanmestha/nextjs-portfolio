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

        {/* HERO BADGE */}
        <section className="flex flex-col items-center text-center py-16">
          <div className="custom-box rounded-full px-4 py-1 text-sm font-bold mb-6">
            Recently Revamped!
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your destination to become a <br/>
            <span className="underline decoration-gray-400">Software Developer</span>
          </h1>

          <div className="flex gap-4">
            <Link href="/auth/login" className="bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded-md font-bold">
              Get Started
            </Link>
          </div>
        </section>

        {/* FEATURE GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 py-12">
          {["Django", "React", "SQL"].map((item) => (
            <div key={item} className="custom-box rounded-xl p-6 transition-transform hover:-translate-y-1">
              <h3 className="font-bold text-lg mb-2">{item}</h3>
              <p className="text-sm opacity-80">Learn essential concepts and build projects.</p>
            </div>
          ))}
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-2xl mx-auto space-y-4 pb-20">
          <details className="custom-box rounded-lg p-4 group">
            <summary className="cursor-pointer font-bold list-none flex justify-between">
              How long do I have access?
              <span>↓</span>
            </summary>
            <p className="mt-3 text-sm">Lifetime access to all content.</p>
          </details>
        </div>

      </div>
    </div>
  );
}