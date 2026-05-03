'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const HERO_VIDEO = "/videos/homepage-hero.mp4"
  const PREVIEW_VIDEO_SRC = "https://cdn.cosmicjs.com/00e107d0-9155-11ef-b5a0-93db72e2be98-ai-development.mp4"
  const THUMB_URL = "https://imgix.cosmicjs.com/f0509380-9231-11ef-b5a0-93db72e2be98-ai-development.png?auto=compress,format&w=1000"

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
  }, [])


    return (
      <div className="bg-black text-white px-4 sm:px-8 lg:px-12 min-h-screen">
        <div className="mx-auto max-w-5xl">
  
          {/* HERO SECTION */}
          <section className="flex flex-col items-center text-center py-16 lg:py-24 space-y-6">
  
            <a
              href="#"
              className="bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1 text-sm font-medium"
            >
              Recently Revamped!
            </a>
  
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Your final destination to become a{" "}
              <span className="text-orange-500">Software Developer</span>
            </h1>
  
            <p className="max-w-2xl text-lg text-gray-400">
              Build projects and learn software development with simple and
              comprehensive courses.
            </p>
  
            <div className="flex gap-4">
              <a
                href="/login"
                className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Get Started
              </a>
  
              <a
                href="/courses"
                className="border border-zinc-700 px-6 py-2 rounded-md hover:bg-zinc-800 transition"
              >
                View Courses
              </a>
            </div>
          </section>
  
          {/* FEATURES */}
          <section className="py-16">
  
            <div className="text-center space-y-4 mb-10">
              <h2 className="text-3xl md:text-5xl font-bold">
                What will you learn?
              </h2>
  
              <p className="max-w-2xl mx-auto text-gray-400">
                We cover only the most important topics you need to build real
                applications and get a job as a developer.
              </p>
            </div>
  
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
  
              {[
                "Django",
                "React & Next.js",
                "SQL",
                "Docker",
                "APIs",
                "Deployment",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800 transition"
                >
                  <h3 className="font-bold text-lg mb-2">{item}</h3>
                  <p className="text-sm text-gray-400">
                    Learn essential concepts and build real-world projects.
                  </p>
                </div>
              ))}
  
            </div>
          </section>
  
          {/* FAQ */}
          <section className="py-16">
  
            <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
              Frequently Asked Questions
            </h2>
  
            <div className="max-w-2xl mx-auto space-y-4">
  
              <details className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                <summary className="cursor-pointer font-medium">
                  How long do I have access?
                </summary>
                <p className="mt-2 text-sm text-gray-400">
                  You get lifetime access to all courses.
                </p>
              </details>
  
              <details className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
                <summary className="cursor-pointer font-medium">
                  Do I need coding knowledge?
                </summary>
                <p className="mt-2 text-sm text-gray-400">
                  No, everything is taught from basics.
                </p>
              </details>
  
            </div>
          </section>
  
        </div>
      </div>
    );

  

}