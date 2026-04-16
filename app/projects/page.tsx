'use client'

import React, { useState } from 'react'

// Reusable Accordion Component
const ProjectBlock = ({ id, num, tag, title, children, isOpen, onToggle }: any) => {
  return (
    <div id={id} className="border border-zinc-200 bg-zinc-50 overflow-hidden transition-colors duration-300 hover:border-green-400 first:rounded-t-2xl last:rounded-b-2xl mb-[2px] scroll-mt-24">
      <div 
        className="flex items-center justify-between p-6 lg:px-9 lg:py-7 cursor-pointer gap-5 hover:bg-green-50/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 lg:gap-5 min-w-0">
          <span className="text-[11px] font-bold tracking-widest text-zinc-400 shrink-0">{num}</span>
          <span className="shrink-0 text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700">
            {tag}
          </span>
          <span className="text-lg md:text-2xl font-bold text-zinc-900 tracking-tight truncate">{title}</span>
        </div>
        <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-green-300 bg-green-100 text-green-600 rotate-180' : 'border-zinc-200 text-zinc-400'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      
      {/* Accordion Body */}
      <div className={`border-t border-zinc-200 overflow-hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [openBlock, setOpenBlock] = useState<string | null>('01')
  
  const filters = [
    'All', 'Drones', 'IoT', 'Hardware', 'AI Annotation', 
    '3D Printing', 'PCB', 'Robotics', 'Web'
  ]

  const filterToBlockMap: { [key: string]: string } = {
    'Drones': '01',
    'IoT': '02',
    'Hardware': '03',
    'AI Annotation': '04',
    'Robotics': '05',
    '3D Printing': '06',
    'PCB': '07',
    'Web': '08'
  }

  const handleToggle = (num: string) => {
    setOpenBlock(prev => prev === num ? null : num)
  }

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName)
    const targetBlockNum = filterToBlockMap[filterName]
    
    if (targetBlockNum) {
      setOpenBlock(targetBlockNum)
      setTimeout(() => {
        const element = document.getElementById(`block-${targetBlockNum}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
    }
  }

  return (
    <div className="min-h-screen bg-white text-zinc-800 font-sans overflow-x-hidden relative">
      
      {/* AMBIENT GLOWS (Kept neon but lowered opacity slightly for light mode) */}
      <div className="fixed rounded-full pointer-events-none blur-[120px] opacity-10 z-0 w-[600px] h-[600px] bg-[#39FF14] -top-[200px] -left-[200px]" />
      <div className="fixed rounded-full pointer-events-none blur-[120px] opacity-10 z-0 w-[400px] h-[400px] bg-teal-400 bottom-[10%] -right-[100px]" />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 px-6 lg:px-10 pb-16 max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-green-200 rounded-full bg-green-50 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-green-700">Student Project Lab</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-[80px] font-extrabold leading-[1.1] tracking-tight text-zinc-900 mb-6">
          Transforming Knowledge<br className="hidden md:block" /> into <span className="text-green-600 drop-shadow-sm">Real-World</span> Innovation.
        </h1>
        <p className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed mb-10">
          Explore our full catalogue of engineering projects — from autonomous drones and robotics to IoT systems, AI pipelines, PCB designs and full-stack web builds.
        </p>
        <div className="flex gap-8 md:gap-10 flex-wrap">
          <div className="flex flex-col gap-1"><span className="text-3xl font-extrabold text-zinc-900 tracking-tight">8<span className="text-green-600">+</span></span><span className="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">Domains</span></div>
          <div className="flex flex-col gap-1"><span className="text-3xl font-extrabold text-zinc-900 tracking-tight">50<span className="text-green-600">+</span></span><span className="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">Projects</span></div>
          <div className="flex flex-col gap-1"><span className="text-3xl font-extrabold text-zinc-900 tracking-tight">500<span className="text-green-600">+</span></span><span className="text-[11px] text-zinc-400 uppercase tracking-widest font-medium">Students</span></div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex gap-1 overflow-x-auto pt-8 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {filters.map((f) => (
            <button 
              key={f}
              className={`shrink-0 text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-200 whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-200'
              }`}
              onClick={() => handleFilterClick(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 relative z-10">

        {/* 01. DRONES */}
        <ProjectBlock 
          id="block-01"
          num="01" 
          tag="Drones" 
          title="Drone Projects" 
          isOpen={openBlock === '01'} 
          onToggle={() => handleToggle('01')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Unmanned aerial systems for delivery, surveillance, mapping and precision agriculture. Students blend robotics, avionics and automation to build reliable autonomous vehicles.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom Drone Projects</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Mission-specific builds shaped around campus or industry briefs.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Payload integration, flight-controller tuning and safety validation.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Pre-engineered airframes that can be rapidly customized.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Flight-ready platform in weeks, not months.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Documentation & Support</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Schematics, CAD, simulation reports and assembly guides included.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Live support from design sign-off to maiden flights.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'DIY Drone', img: '/images/projects/drones/diy-drone.jpg' },
                { name: 'FPV Drone', img: '/images/projects/drones/fpv-drone.jpg' },
                { name: 'Landmine Detector', img: '/images/projects/drones/landmine-detector.jpg' },
                { name: 'Mini Drone', img: '/images/projects/drones/mini-drones.jpg' },
              ].map((prod, i) => (
                <div key={i} className="group border border-zinc-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 relative hover:border-green-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-800">{prod.name}</span>
                    <span className="text-[10px] font-bold text-green-600 tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 02. IOT */}
        <ProjectBlock 
          id="block-02"
          num="02" 
          tag="IoT" 
          title="IoT Projects"
          isOpen={openBlock === '02'} 
          onToggle={() => handleToggle('02')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Connected sensing stacks that collect, analyze and act on real-world data. Covers hardware interfaces, secure connectivity and dashboard-ready analytics.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom IoT Projects</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Requirements-first design aligned with academic rubrics.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Edge hardware, firmware and cloud integrations scoped together.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Pre-built blueprints for weather, health and smart-campus monitors.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Easily tailored to match college viva or demo criteria.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Complete Documentation</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Source code, Bill of Materials and walkthrough presentations.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Explanations optimized for project reviews and juries.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Biometric Authentication', img: '/images/projects/iot/biometric-auth.jpg' },
                { name: 'Smart Glucometer', img: '/images/projects/iot/smart-glucometer.jpg' },
                { name: 'Weather Monitoring', img: '/images/projects/iot/weather-monitoring.jpg' },
                { name: 'Plant Monitoring', img: '/images/projects/iot/plant-monitoring.jpg' },
              ].map((prod, i) => (
                <div key={i} className="group border border-zinc-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 relative hover:border-green-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-800">{prod.name}</span>
                    <span className="text-[10px] font-bold text-green-600 tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 03. HARDWARE */}
        <ProjectBlock 
          id="block-03"
          num="03" 
          tag="Hardware" 
          title="Hardware Projects"
          isOpen={openBlock === '03'} 
          onToggle={() => handleToggle('03')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Practical electronics that take concepts from schematics to rugged enclosures. Labs emphasize circuit optimization, compliance and manufacturability.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom Hardware Builds</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Circuit, PCB and enclosure design tailored to your requirement sheet.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">End-to-end validation across power, thermal and EMI metrics.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made Kits</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Field-tested reference designs ready for quick customization.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Ideal for rapid demos, hackathons and juried showcases.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Documentation & Support</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Gerbers, wiring diagrams, firmware notes and user manuals provided.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Guidance through fabrication, assembly and troubleshooting.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Thermoelectric Generator', img: '/images/projects/hardware/thermoelectric-generator.jpg' },
                { name: 'Fire Fighting Robot', img: '/images/projects/hardware/fire-fighting-robot.jpg' },
                { name: 'On Road EV Charging', img: '/images/projects/hardware/ev-charging.jpg' },
                { name: 'Smart Helmet', img: '/images/projects/hardware/smart-helmet.jpg' },
              ].map((prod, i) => (
                <div key={i} className="group border border-zinc-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 relative hover:border-green-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-800">{prod.name}</span>
                    <span className="text-[10px] font-bold text-green-600 tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 04. AI ANNOTATION */}
        <ProjectBlock 
          id="block-04"
          num="04" 
          tag="AI Annotation" 
          title="AI Annotation Projects"
          isOpen={openBlock === '04'} 
          onToggle={() => handleToggle('04')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Data labeling workflows that accelerate machine learning experiments. Teams explore image, audio and video modalities with production-ready toolchains.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom Annotation Briefs</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Datasets curated for niche academic or enterprise scenarios.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Guidance on taxonomies, quality gates and export formats.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made AI Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Pre-built projects spanning CV, NLP and sensor fusion.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Quickly adapt models for viva demonstrations or publications.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Documentation & Mentoring</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Reports with dataset stats, training logs and evaluation charts.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Support from data preprocessing through inference deployment.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Heart Annotation', img: '/images/projects/ai-annotations/heart-annotation.jpg' },
                { name: 'Image Annotation', img: '/images/projects/ai-annotations/image-annotation.jpeg' },
                { name: 'Object Annotation', img: '/images/projects/ai-annotations/object-annotation.jpg' },
                { name: 'Video Annotation', img: '/images/projects/ai-annotations/video-annotation.png' },
              ].map((prod, i) => (
                <div key={i} className="group border border-zinc-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 relative hover:border-green-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-800">{prod.name}</span>
                    <span className="text-[10px] font-bold text-green-600 tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 05. ROBOTICS */}
        <ProjectBlock 
          id="block-05"
          num="05" 
          tag="Robotics" 
          title="Robotics"
          isOpen={openBlock === '05'} 
          onToggle={() => handleToggle('05')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Mechanized systems merging mechanical design, control electronics and autonomy. Programs span automation, healthcare bots, education and defense prototypes.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom Robotics Projects</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Robots aligned to automation, healthcare, or education scenarios.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Covers drivetrain design, sensor fusion and embedded control.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Pre-Designed Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Reference bots tuned for college expos or grants.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Accelerate delivery while retaining room for innovation.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Documentation & Support</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Mechanical drawings, wiring and firmware repositories included.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Coach-led testing, tuning and presentation rehearsals.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Robot', img: '/images/projects/robotics/robot.jpg' },
                { name: 'Rover', img: '/images/projects/robotics/rover.webp' },
                { name: 'Bot Arm', img: '/images/projects/robotics/bot-arm.jpg' },
                { name: 'Conveyer Belt', img: '/images/projects/robotics/conveyer-belt.jpg' },
              ].map((prod, i) => (
                <div key={i} className="group border border-zinc-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 relative hover:border-green-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-800">{prod.name}</span>
                    <span className="text-[10px] font-bold text-green-600 tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 06. 3D PRINTING */}
        <ProjectBlock 
          id="block-06"
          num="06" 
          tag="3D Printing" 
          title="3D Printing"
          isOpen={openBlock === '06'} 
          onToggle={() => handleToggle('06')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Additive manufacturing sprints that translate CAD into functional prototypes. Students learn material selection, slicing optimization and finishing workflows.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom 3D Designs</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Concept-to-print support for unique academic problem statements.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">STL files, assembly cues and finishing suggestions included.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Library of proven mechanisms ready for personalization.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Ideal for time-bound juries needing reliable prototypes.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Precision Gears', img: '/images/projects/printing/gears.jpg' },
                { name: 'Production Run', img: '/images/projects/printing/printing.jpg' },
                { name: 'Design Review', img: '/images/projects/printing/3d-design.jpg', fullWidth: true },
              ].map((prod, i) => (
                <div key={i} className={`border border-zinc-200 rounded-xl overflow-hidden cursor-default bg-zinc-50 relative ${prod.fullWidth ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}>
                  <span className="absolute top-2 left-2 text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 border border-zinc-200 text-zinc-500 z-10 shadow-sm">Coming Soon</span>
                  <div className="aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center opacity-60">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 grayscale" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2 opacity-60">
                    <span className="text-xs font-medium text-zinc-500">{prod.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 07. PCB */}
        <ProjectBlock 
          id="block-07"
          num="07" 
          tag="PCB" 
          title="PCB Designing"
          isOpen={openBlock === '07'} 
          onToggle={() => handleToggle('07')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Printed Circuit Board programs teaching schematic capture, layout optimization and fabrication readiness for IoT, robotics and wearable devices.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom PCB Projects</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Stack-ups tailored to power, RF, or high-speed constraints.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Component selection, simulation and DFM reviews included.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Ready-Made Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Optimized reference boards adaptable quickly.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Great for showcasing best practices within tight timelines.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'HDI Stack', img: '/images/projects/pcb/pcb.jpg' },
                { name: 'System Bring-up', img: '/images/projects/pcb/integration.jpg' },
                { name: 'Layout Review', img: '/images/projects/pcb/circuit.png', fullWidth: true },
              ].map((prod, i) => (
                <div key={i} className={`border border-zinc-200 rounded-xl overflow-hidden cursor-default bg-zinc-50 relative ${prod.fullWidth ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}>
                  <span className="absolute top-2 left-2 text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 border border-zinc-200 text-zinc-500 z-10 shadow-sm">Coming Soon</span>
                  <div className="aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center opacity-60">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 grayscale" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2 opacity-60">
                    <span className="text-xs font-medium text-zinc-500">{prod.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

        {/* 08. WEB DEVELOPMENT */}
        <ProjectBlock 
          id="block-08"
          num="08" 
          tag="Web" 
          title="Web Development"
          isOpen={openBlock === '08'} 
          onToggle={() => handleToggle('08')}
        >
          <div className="p-6 lg:p-9 lg:border-r border-zinc-200 border-b lg:border-b-0">
            <p className="text-sm leading-relaxed text-zinc-500 mb-7 font-light">
              Full-stack builds spanning content hubs, ecommerce portals and secure access layers. Each engagement blends UX thinking, performance and deployment best practices.
            </p>
            <div className="flex flex-col">
              <div className="py-4 border-t border-zinc-200 first:border-t-0 first:pt-0">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Custom Web Projects</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Requirement workshops to scope CMS, e-commerce, or portal use cases.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Design systems, component libraries and integrations planned together.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Pre-Designed Solutions</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Template accelerators for landing pages, stores, or dashboards.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Ideal for students needing polished UI quickly.</span>
                </div>
              </div>
              <div className="py-4 border-t border-zinc-200">
                <div className="text-[10px] font-bold tracking-widest uppercase text-green-600 mb-2">Full Project Support</div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Backend wiring, database setup and deployment assistance.</span>
                  <span className="text-[13px] text-zinc-600 leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-green-400">Performance tuning, accessibility checks and UX reviews.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 lg:p-8 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Web Access', img: '/images/projects/web/web-access.png' },
                { name: 'Ecommerce', img: '/images/projects/web/ecommerce.jpg' },
                { name: 'Agency Pods', img: '/images/projects/web/agency-pods.jpg', fullWidth: true },
              ].map((prod, i) => (
                <div key={i} className={`border border-zinc-200 rounded-xl overflow-hidden cursor-default bg-zinc-50 relative ${prod.fullWidth ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}>
                  <span className="absolute top-2 left-2 text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/90 border border-zinc-200 text-zinc-500 z-10 shadow-sm">Coming Soon</span>
                  <div className="aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center opacity-60">
                    <img src={prod.img} alt={prod.name} onError={(e) => (e.currentTarget.style.opacity = '0')} className="w-full h-full object-contain p-2.5 grayscale" />
                  </div>
                  <div className="p-3 border-t border-zinc-200 flex items-center justify-between gap-2 opacity-60">
                    <span className="text-xs font-medium text-zinc-500">{prod.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ProjectBlock>

      </section>
    </div>
  )
}