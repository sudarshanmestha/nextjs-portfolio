'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ProjectPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
  }, [])

  // Data derived from Sudarshan_Mestha.pdf[cite: 1]
  const projects = [
    {
      title: "Bank Statement OCR Engine",
      client: "Reintenspark Technology",
      category: "Computer Vision / Deep Learning",
      description: "A production-grade pipeline that converts unstructured financial PDF data into structured Excel workbooks using deep learning for table structure identification.",
      tech: ["PaddleOCR v3.2", "Tesseract", "OpenCV", "Python", "Flask"],
      highlights: ["High-precision table detection", "Financial data structuring", "Deep learning integration"]
    },
    {
      title: "Autonomous Research Agent",
      client: "GenAI Multi-Agent Framework",
      category: "Generative AI",
      description: "A multi-agent system featuring Research, Writing, and Design agents that collaborate to generate structured reports and design mockups.",
      tech: ["LangChain", "LLaMA3-70b", "Tavily API", "Docker", "Python"],
      highlights: ["Multi-agent orchestration", "Automated report generation", "Agentic workflows"]
    },
    {
      title: "Scalable AWS Infrastructure",
      client: "Cloud Deployment Project",
      category: "DevOps / Cloud Architecture",
      description: "Architected a highly available web environment using a full AWS stack, significantly boosting application uptime and performance.",
      tech: ["AWS (EC2, RDS, ALB, ASG)", "CloudFront", "NGINX", "GitHub Actions"],
      highlights: ["35% Reliability Improvement", "CI/CD Automation", "Global Content Delivery"]
    },
    {
      title: "Fraud Detection System",
      client: "LLM + GCN Framework",
      category: "AI / Graph Networks",
      description: "Advanced fraud detection using LLMs for semantic feature extraction and Graph Convolutional Networks (GCN) to model transaction relationships.",
      tech: ["PyTorch Geometric", "Hugging Face", "NetworkX", "Scikit-learn"],
      highlights: ["Relational transaction modeling", "Semantic feature analysis", "Hybrid AI architecture"]
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-8 lg:px-12 font-sans pb-20">
      <div className="mx-auto max-w-6xl">

        {/* HEADER SECTION */}
        <section className="text-center py-24 lg:py-32 space-y-6">
          <div data-aos="fade-down" className="inline-block bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2 text-sm font-medium text-orange-500">
            Selected Technical Works
          </div>

          <h1 data-aos="zoom-out" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">&</span> <br />
            <span className="text-orange-500 underline decoration-zinc-800 underline-offset-8">Artificial Intelligence.</span>
          </h1>

          <p data-aos="fade-up" className="max-w-2xl mx-auto text-lg text-zinc-400 leading-relaxed">
            A showcase of production-level OCR engines, agentic AI frameworks, and scalable cloud architectures built with Python and modern ML stacks.
          </p>
        </section>

        {/* PROJECTS GRID */}
        <section className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <div 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 lg:p-10 hover:bg-zinc-900 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono text-orange-500 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-3xl font-bold mt-2 group-hover:text-orange-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{project.client}</p>
                </div>
              </div>

              <p className="text-zinc-400 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 uppercase mb-3 tracking-tighter">Key Technical Impacts</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center text-sm text-zinc-400">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="bg-black border border-zinc-700 px-3 py-1 rounded-lg text-[11px] font-semibold text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* TECH STACK BENTO */}
        <section className="mt-32 py-20 border-t border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div data-aos="fade-right" className="md:col-span-1 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4">Core Tech</h3>
              <p className="text-zinc-400 text-sm">Primary languages and frameworks utilized across projects.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "Django", "Flask", "FastAPI", "React.js"].map(s => (
                  <span key={s} className="bg-zinc-800 px-3 py-1 rounded-md text-xs">{s}</span>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" className="md:col-span-1 bg-orange-600 p-8 rounded-3xl text-white">
              <h3 className="text-2xl font-bold mb-4">AI & ML</h3>
              <p className="text-orange-100 text-sm">Specialized in NLP, Computer Vision, and Generative AI pipelines.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["PyTorch", "LangChain", "Hugging Face", "OpenCV"].map(s => (
                  <span key={s} className="bg-orange-700/50 px-3 py-1 rounded-md text-xs">{s}</span>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" className="md:col-span-1 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <h3 className="text-2xl font-bold mb-4">Cloud</h3>
              <p className="text-zinc-400 text-sm">Experience in deploying and scaling production environments.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["AWS", "Docker", "GitHub Actions", "NGINX"].map(s => (
                  <span key={s} className="bg-zinc-800 px-3 py-1 rounded-md text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <footer className="mt-20 py-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm">© 2026 Sudarshan Mestha — AI & Full Stack Engineer</p>
          <div className="flex gap-6">
            <a href="mailto:sudarshanmestha0@gmail.com" className="text-sm font-bold hover:text-orange-500 transition-colors">Contact</a>
            <a href="https://www.linkedin.com/in/sudarshan-mestha/?skipRedirect=true" className="text-sm font-bold hover:text-orange-500 transition-colors">LinkedIn</a>
            <a href="https://justpython.in" className="text-sm font-bold hover:text-orange-500 transition-colors">Project Hub</a>
          </div>
        </footer>

      </div>
    </div>
  )
}