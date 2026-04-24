'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CareersPage() {
  const [openRole, setOpenRole] = useState<string | null>('frontend')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    })
  }, [])

  const roles = [
    {
      id:'frontend',
      title:'Frontend Developer',
      type:'Full Time',
      location:'Remote / Bangalore',
      desc:'Build modern interfaces using React, Next.js and Tailwind.'
    },
    {
      id:'backend',
      title:'Backend Developer',
      type:'Full Time',
      location:'Remote',
      desc:'Work with Python, Django, APIs and scalable systems.'
    },
    {
      id:'ai',
      title:'AI/ML Intern',
      type:'Internship',
      location:'Remote',
      desc:'Contribute to LLM tools, automation and AI workflows.'
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center py-20 lg:py-28 space-y-6">

          <span className="bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-sm">
            We Are Hiring
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Build Products.
            <br />
            Grow Faster.
            <span className="text-green-500"> Join JustPython.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-zinc-400">
            Work on real products, collaborate with modern tools,
            and grow through mentorship and meaningful engineering.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#roles"
              className="bg-white text-black px-6 py-3 rounded-md font-medium"
            >
              View Open Roles
            </a>

            <a
              href="#talent"
              className="border border-zinc-700 px-6 py-3 rounded-md hover:bg-zinc-800"
            >
              Join Talent Pool
            </a>
          </div>

        </section>


        {/* WHY JOIN */}
        <section className="py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold">
              Why Work With Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

            {[
              {
                title:'Project-Driven',
                desc:'Work on real systems, not toy assignments.'
              },
              {
                title:'Learn While Building',
                desc:'Mentorship plus modern engineering stack.'
              },
              {
                title:'Growth First',
                desc:'Move from intern to contributor to lead.'
              }

            ].map((item)=>(
              <div
                key={item.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-green-500 transition"
              >
                <h3 className="font-bold text-xl mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>


        {/* OPEN ROLES */}
        <section id="roles" className="py-20">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Open Roles
            </h2>
          </div>

          <div className="space-y-5">

            {roles.map((role)=>(
              <div
                key={role.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
              >

                <button
                  onClick={() =>
                    setOpenRole(
                      openRole === role.id ? null : role.id
                    )
                  }
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-zinc-800 transition"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {role.title}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      {role.location} • {role.type}
                    </p>
                  </div>

                  <div className="text-2xl">
                    {openRole === role.id ? '−' : '+'}
                  </div>

                </button>

                {openRole === role.id && (
                  <div className="border-t border-zinc-800 p-6 space-y-6">
                    <p className="text-zinc-400">
                      {role.desc}
                    </p>

                    <a
                      href="mailto:careers@justpython.in"
                      className="inline-block bg-green-500 text-black px-6 py-3 rounded-md font-medium"
                    >
                      Apply Now
                    </a>

                  </div>
                )}

              </div>
            ))}

          </div>

        </section>


        {/* HIRING PROCESS */}
        <section className="py-20">

          <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
            Hiring Process
          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            {[
              'Apply',
              'Intro Call',
              'Technical Task',
              'Discussion',
              'Offer'
            ].map((step,i)=>(
              <div
                key={step}
                className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center"
              >
                <div className="text-green-400 mb-3 font-bold">
                  0{i+1}
                </div>

                <h3 className="font-semibold">
                  {step}
                </h3>
              </div>
            ))}

          </div>

        </section>


        {/* BENEFITS */}
        <section className="py-20">
          <div className="grid md:grid-cols-3 gap-8">

            {[
              'Remote Friendly',
              'Flexible Hours',
              'Mentorship',
              'Learning Budget',
              'Open Source',
              'Real Ownership'
            ].map((item)=>(
              <div
                key={item}
                className="bg-zinc-900 p-8 rounded-xl border border-zinc-800"
              >
                <h3 className="font-bold text-xl">
                  {item}
                </h3>
              </div>
            ))}

          </div>
        </section>


        {/* TALENT POOL */}
        <section
          id="talent"
          className="py-20"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

            <h2 className="text-4xl font-bold mb-6">
              Don’t See a Role?
            </h2>

            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join our talent pool and we’ll reach out when something opens.
            </p>

            <a
              href="mailto:careers@justpython.in"
              className="inline-block bg-green-500 text-black px-8 py-4 rounded-md font-medium"
            >
              Send Resume
            </a>

          </div>
        </section>


        {/* FAQ */}
        <section className="py-20">
          <h2 className="text-center text-3xl md:text-5xl font-bold mb-10">
            FAQ
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">

            <details className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
              <summary className="cursor-pointer font-medium">
                Do you hire interns?
              </summary>

              <p className="mt-3 text-sm text-zinc-400">
                Yes, we offer internship opportunities.
              </p>
            </details>


            <details className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
              <summary className="cursor-pointer font-medium">
                Are roles remote?
              </summary>

              <p className="mt-3 text-sm text-zinc-400">
                Most roles are remote-friendly.
              </p>
            </details>

          </div>
        </section>

      </div>
    </div>
  )
}