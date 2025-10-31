'use client'
import BlogPosts from 'app/components/posts'
export default function AiToolsBlog() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-900" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Project
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Documentary
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            In-depth explorations of Projects, AI tools and agentic systems.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-32 text-zinc-900" preserveAspectRatio="none">
            <path d="M0,0 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Posts */}
      <BlogPosts/>

      <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-800">
        © 2025 JustPython. AI Tools Documentary.
      </footer>
    </div>
  )
}