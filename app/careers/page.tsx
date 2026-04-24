'use client'

import { useState } from 'react'

function RoleBlock({
  title,
  team,
  location,
  type,
  children,
  open,
  onToggle
}: any) {
  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950 mb-4">
      <button
        onClick={onToggle}
        className="w-full p-6 lg:p-8 flex items-center justify-between text-left hover:bg-zinc-900 transition"
      >
        <div>
          <div className="text-[11px] uppercase tracking-widest text-[#39FF14] font-bold mb-3">
            {team}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {title}
          </h3>

          <div className="text-sm text-zinc-400">
            {location} • {type}
          </div>
        </div>

        <div
          className={`w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center transition ${
            open ? 'rotate-180 bg-zinc-800' : ''
          }`}
        >
          ↓
        </div>
      </button>

      {open && (
        <div className="border-t border-zinc-800 p-6 lg:p-8">
          {children}
        </div>
      )}
    </div>
  )
}

export default function CareersPage() {
  const [openRole, setOpenRole] = useState('frontend')

  const toggleRole = (id: string) => {
    setOpenRole(openRole === id ? '' : id)
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-bold tracking-widest mb-8">
          WE ARE HIRING
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Build products. <br />
          Grow faster. <br />
          <span className="text-[#39FF14]">
            Join JustPython.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-8 text-lg text-zinc-400">
          Work on real software, contribute to meaningful products,
          and grow with mentorship, AI tools, and modern engineering.
        </p>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="#roles"
            className="bg-[#39FF14] text-black px-7 py-3 rounded-full font-bold"
          >
            View Open Roles
          </a>

          <a
            href="#talent"
            className="border border-zinc-700 px-7 py-3 rounded-full hover:border-[#39FF14] transition"
          >
            Join Talent Pool
          </a>
        </div>
      </section>


      {/* WHY JOIN */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: 'Project-Driven',
              desc: 'Work on real systems, not toy tasks.'
            },
            {
              title: 'Learn While Building',
              desc: 'Mentorship plus modern tools and AI.'
            },
            {
              title: 'Growth First',
              desc: 'Move from intern to contributor to lead.'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="border border-zinc-800 rounded-2xl p-8 bg-zinc-950 hover:border-[#39FF14] transition"
            >
              <h3 className="text-2xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>


      {/* OPEN ROLES */}
      <section
        id="roles"
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Open Roles
        </h2>

        <RoleBlock
          title="Frontend Developer"
          team="Engineering"
          location="Remote / Bangalore"
          type="Full-Time"
          open={openRole === 'frontend'}
          onToggle={() => toggleRole('frontend')}
        >
          <div className="space-y-6">

            <div>
              <h4 className="font-bold mb-2">
                Responsibilities
              </h4>

              <ul className="text-zinc-400 space-y-2">
                <li>• Build React / Next.js interfaces</li>
                <li>• Create reusable UI systems</li>
                <li>• Integrate APIs and dashboards</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                Requirements
              </h4>

              <ul className="text-zinc-400 space-y-2">
                <li>• React / Next.js</li>
                <li>• Tailwind CSS</li>
                <li>• Git + deployment basics</li>
              </ul>
            </div>

            <a
              href="mailto:careers@justpython.in"
              className="inline-block bg-[#39FF14] text-black px-6 py-3 rounded-full font-bold"
            >
              Apply Now
            </a>

          </div>
        </RoleBlock>


        <RoleBlock
          title="Backend Developer"
          team="Engineering"
          location="Remote"
          type="Full-Time"
          open={openRole === 'backend'}
          onToggle={() => toggleRole('backend')}
        >
          <div className="space-y-6">
            <p className="text-zinc-400">
              Django, APIs, databases, scalable backend systems.
            </p>

            <a
              href="mailto:careers@justpython.in"
              className="inline-block bg-[#39FF14] text-black px-6 py-3 rounded-full font-bold"
            >
              Apply Now
            </a>
          </div>
        </RoleBlock>


        <RoleBlock
          title="AI/ML Intern"
          team="Research"
          location="Remote"
          type="Internship"
          open={openRole === 'ai'}
          onToggle={() => toggleRole('ai')}
        >
          <div className="space-y-6">
            <p className="text-zinc-400">
              Work on LLM tools, automation workflows and AI integrations.
            </p>

            <a
              href="mailto:careers@justpython.in"
              className="inline-block bg-[#39FF14] text-black px-6 py-3 rounded-full font-bold"
            >
              Apply Now
            </a>
          </div>
        </RoleBlock>

      </section>


      {/* HIRING PROCESS */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Hiring Process
        </h2>

        <div className="grid md:grid-cols-5 gap-5">
          {[
            'Apply',
            'Intro Call',
            'Technical Task',
            'Discussion',
            'Offer'
          ].map((step, i) => (
            <div
              key={step}
              className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6 text-center"
            >
              <div className="text-[#39FF14] text-sm mb-3">
                0{i + 1}
              </div>

              <div className="font-semibold">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Benefits
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            'Remote Friendly',
            'Flexible Hours',
            'Mentorship',
            'Learning Budget',
            'Open Source',
            'Real Ownership'
          ].map((item) => (
            <div
              key={item}
              className="border border-zinc-800 rounded-2xl p-8 bg-zinc-950"
            >
              {item}
            </div>
          ))}
        </div>
      </section>


      {/* TALENT POOL CTA */}
      <section
        id="talent"
        className="max-w-4xl mx-auto px-6 pb-28"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-12 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Don’t See a Role?
          </h2>

          <p className="text-zinc-400 mb-8">
            Join our talent pool and we’ll reach out when a role opens.
          </p>

          <a
            href="mailto:careers@justpython.in"
            className="bg-[#39FF14] text-black px-8 py-4 rounded-full font-bold"
          >
            Send Resume
          </a>

        </div>
      </section>

    </div>
  )
}