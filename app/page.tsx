'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Linkedin, MoveRight, ExternalLink, Code2, Cpu, Globe } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const PROJECTS = [
  {
    title: "Bank Statement OCR",
    client: "Financial Sector",
    year: "2024",
    desc: "A high-precision deep learning pipeline to identify and extract tabular data from complex bank PDFs with 98% accuracy.",
    tech: ["Python", "PaddleOCR", "Flask"],
    icon: <Cpu className="w-6 h-6" />
  },
  {
    title: "Autonomous Research Agent",
    client: "Open Source",
    year: "2025",
    desc: "A multi-agent system powered by LLaMA3 that automates the process of gathering, synthesizing, and designing research papers.",
    tech: ["LangChain", "Groq", "Docker"],
    icon: <Code2 className="w-6 h-6" />
  },
  {
    title: "Fraud Detection GCN",
    client: "FinTech",
    year: "2025",
    desc: "Combining LLMs for semantic features and Graph Convolutional Networks (GCNs) to detect suspicious transaction patterns.",
    tech: ["PyTorch", "GCN", "Hugging Face"],
    icon: <Globe className="w-6 h-6" />
  }
]

export default function Portfolio() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- INTERACTIVE BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>



      <main className="max-w-6xl mx-auto pt-56 pb-20 px-6">
        
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col items-center text-center mb-52 relative">
          <div data-aos="fade-up" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 data-aos="fade-up" data-aos-delay="100" className="text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text font-black tracking-tighter text-6xl md:text-8xl lg:text-[100px] leading-[0.9] mb-8">
            Building the <br /> Future of AI.
          </h1>
          
          <p data-aos="fade-up" data-aos-delay="200" className="flex items-center text-zinc-500 gap-2 font-semibold mb-10">
            <MapPin className="w-5 h-5 text-cyan-500" />
            <span>Bengaluru, India</span>
          </p>

          <div data-aos="fade-up" data-aos-delay="300" className="max-w-[600px] text-xl text-zinc-400 leading-relaxed font-medium">
            I&apos;m <span className="text-white">Sudarshan</span>, an AI/ML Engineer crafting robust backend architectures and intelligent systems. Currently Software Engineer at <span className="text-white underline decoration-zinc-700 underline-offset-4">Reintenspark</span>.
          </div>
        </section>

        {/* --- PROJECTS SECTION (BENTO STYLE) --- */}
        <section className="grid grid-cols-1 gap-12">
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              data-aos="fade-up"
              className="group relative rounded-[40px] border border-zinc-800 bg-zinc-900/30 p-1 md:p-2 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
            >
              <div className="flex flex-col lg:flex-row gap-8 p-8 md:p-12">
                <div className="flex-1 space-y-6">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-cyan-400 border border-zinc-700 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">
                      <span>{project.client}</span>
                      <span className="text-zinc-800">•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-3 bg-white text-zinc-950 rounded-full px-8 py-4 font-bold hover:bg-cyan-400 transition-all hover:translate-x-2">
                    See Case Study
                    <MoveRight className="w-5 h-5" />
                  </button>
                </div>

                {/* PROJECT VISUAL */}
                <div className="flex-1 min-h-[300px] rounded-[32px] bg-zinc-950 border border-zinc-800 overflow-hidden relative group-hover:border-zinc-600 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <ExternalLink className="w-20 h-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --- FOOTER --- */}
        <footer className="mt-52 pt-16 border-t border-zinc-900 flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-8">Let&apos;s Connect</h3>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/sudarshan-mestha/?skipRedirect=true" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-500 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="/" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyan-500 transition-all">
              <Globe className="w-6 h-6" />
            </a>
          </div>
          <p className="mt-12 text-zinc-600 text-sm">
            © 2026 Sudarshan. Built with Next.js and Tailwind.
          </p>
        </footer>

      </main>
    </div>
  )
}