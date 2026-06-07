'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ProjectPage() {
  // Define projects INSIDE the function so the return statement can see it
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
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
  }, [])

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 pb-20">
      <div className="mx-auto max-w-6xl">

        {/* HEADER SECTION */}
        <section className="text-center py-24 lg:py-32 space-y-6">
          <div data-aos="fade-down" className="inline-block custom-box rounded-full px-5 py-2 text-sm font-bold uppercase tracking-widest">
            Selected Technical Works
          </div>

          <h1 data-aos="zoom-out" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            Engineering <span className="opacity-30">&</span> <br />
            <span className="gradient-text">Artificial Intelligence.</span>
          </h1>

          <p data-aos="fade-up" className="max-w-2xl mx-auto text-lg opacity-70 leading-relaxed">
            A showcase of production-level OCR engines, agentic AI frameworks, and scalable cloud architectures.
          </p>
        </section>

        {/* PROJECTS GRID */}
        <section className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <div 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="custom-box rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono opacity-50 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-3xl font-bold mt-2">{project.title}</h3>
                  <p className="opacity-60 text-sm mt-1">{project.client}</p>
                </div>
              </div>

              <p className="opacity-70 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase mb-3 tracking-widest opacity-90">Key Technical Impacts</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center text-sm opacity-70">
                        <span className="w-1.5 h-1.5 rounded-full mr-3 bg-gradient-to-r from-[#58a6ff] to-[#388bfd]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="bg-[#58a6ff]/10 border border-[#30363d] text-[var(--accent)] px-3 py-1 rounded-lg text-[11px] font-bold">
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
        <section className="mt-32 py-20 border-t border-black/5 dark:border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="custom-box p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Core Tech</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "Django", "Flask", "FastAPI", "React.js"].map(s => (
                  <span key={s} className="bg-[#58a6ff]/10 border border-[#30363d] text-[var(--accent)] px-3 py-1 rounded-md text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="inverted-card p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">AI & ML</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {["PyTorch", "LangChain", "Hugging Face", "OpenCV"].map(s => (
                  <span key={s} className="bg-white/20 dark:bg-black/20 px-3 py-1 rounded-md text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="custom-box p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Cloud</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {["AWS", "Docker", "GitHub Actions", "NGINX"].map(s => (
                  <span key={s} className="bg-[#58a6ff]/10 border border-[#30363d] text-[var(--accent)] px-3 py-1 rounded-md text-xs font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-20 py-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm">
          <p>© 2026 Sudarshan Mestha — AI & Full Stack Engineer</p>
          <div className="flex gap-6">
            <a href="mailto:sudarshanmestha0@gmail.com" className="hover:underline">Contact</a>
            <a href="https://linkedin.com/in/sudarshan-mestha/" className="hover:underline">LinkedIn</a>
          </div>
        </footer>

      </div>
    </div>
  )
}