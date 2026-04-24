'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ProjectsPage() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center py-20 lg:py-28 space-y-6">
          <span className="bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-sm">
            Student Innovation Lab
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Transforming Ideas Into
            <span className="text-green-500"> Real Projects</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-zinc-400">
            Explore engineering, software and hardware projects across drones,
            robotics, IoT, AI annotation, PCB and full-stack web development.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#projects"
              className="bg-white text-black px-6 py-3 rounded-md font-medium"
            >
              Explore Projects
            </a>

            <a
              href="/contact"
              className="border border-zinc-700 px-6 py-3 rounded-md hover:bg-zinc-800"
            >
              Discuss Project
            </a>
          </div>
        </section>

        {/* DOMAINS */}
        <section className="py-16">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Project Domains
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-400">
              Work on industry-relevant projects across emerging technologies.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">

            {[
              'Drone Projects',
              'IoT Systems',
              'Robotics',
              'Web Development',
              'AI Annotation',
              '3D Printing',
              'PCB Designing',
              'Hardware Systems'
            ].map((item)=>(
              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-green-500 transition"
              >
                <h3 className="font-bold text-lg mb-3">
                  {item}
                </h3>

                <p className="text-sm text-zinc-400">
                  Practical project implementation with documentation and support.
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* PROJECT BLOG SECTION */}
        <section id="projects" className="py-20">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Featured Project Blogs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                title:'Autonomous Delivery Drone',
                cat:'Drones',
                desc:'Flight controller tuning, payload integration and navigation.'
              },
              {
                title:'Smart Weather Monitoring',
                cat:'IoT',
                desc:'Sensor stack with dashboard visualization and cloud logging.'
              },
              {
                title:'Fire Fighting Robot',
                cat:'Robotics',
                desc:'Obstacle detection and autonomous response mechanisms.'
              }
            ].map((post,i)=>(
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500 transition"
              >
                <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-500">
                    Project Image
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-xs uppercase tracking-widest text-green-400">
                    {post.cat}
                  </span>

                  <h3 className="text-xl font-bold">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {post.desc}
                  </p>

                  <a
                    href="#"
                    className="inline-block text-green-400 text-sm font-medium"
                  >
                    Read Project →
                  </a>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* WHY STUDENTS CHOOSE */}
        <section className="py-20">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
              <h3 className="font-bold text-xl mb-3">
                Custom Projects
              </h3>
              <p className="text-zinc-400 text-sm">
                Projects tailored to academic or industry requirements.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
              <h3 className="font-bold text-xl mb-3">
                Ready-Made Solutions
              </h3>
              <p className="text-zinc-400 text-sm">
                Accelerate delivery with proven project blueprints.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
              <h3 className="font-bold text-xl mb-3">
                Full Documentation
              </h3>
              <p className="text-zinc-400 text-sm">
                Reports, source code, diagrams and presentation support.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">

            <details className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
              <summary className="cursor-pointer font-medium">
                Can projects be customized?
              </summary>
              <p className="mt-3 text-sm text-zinc-400">
                Yes. Projects can be adapted to your requirements.
              </p>
            </details>

            <details className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
              <summary className="cursor-pointer font-medium">
                Do you provide documentation?
              </summary>
              <p className="mt-3 text-sm text-zinc-400">
                Complete documentation and guidance are included.
              </p>
            </details>

          </div>
        </section>

      </div>
    </div>
  )
}