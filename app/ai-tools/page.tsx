'use client'

import BlogPosts from 'app/components/posts'

const aiTools = [
  {
    category: 'Content Creation',
    tools: [
      'ChatGPT',
      'Claude',
      'Gemini',
      'Jasper'
    ]
  },
  {
    category: 'Image Generation',
    tools: [
      'Midjourney',
      'DALL·E',
      'Leonardo AI',
      'Stable Diffusion'
    ]
  },
  {
    category: 'Developer AI',
    tools: [
      'GitHub Copilot',
      'Cursor',
      'Codeium',
      'Phind'
    ]
  }
]

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen px-4 sm:px-8 lg:px-12">

      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center py-20 lg:py-28">

          <div className="w-20 h-20 mx-auto mb-6 rounded-full 
                          bg-zinc-900 border border-zinc-800 
                          flex items-center justify-center 
                          text-2xl font-bold">
            AI
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Explore Powerful{" "}
            <span className="text-[#39FF14]">
              AI Tools
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-zinc-400">
            Curated tools for content creation, coding,
            automation, and productivity.
          </p>

        </section>


        {/* TOOL SECTIONS */}
        <section className="space-y-10 pb-20">

          {aiTools.map((section, i) => (
            <div
              key={i}
              className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-950"
            >

              {/* Section Header */}
              <div className="p-6 lg:p-8 border-b border-zinc-800">
                <div className="text-xs tracking-widest uppercase text-[#39FF14] mb-3 font-bold">
                  Category {i + 1}
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold">
                  {section.category}
                </h2>
              </div>

              {/* Tool Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 lg:p-8">

                {section.tools.map((tool) => (
                  <div
                    key={tool}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-5
                               hover:border-[#39FF14]
                               hover:-translate-y-1
                               transition-all duration-300"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {tool}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      Explore how {tool} can improve workflows.
                    </p>
                  </div>
                ))}

              </div>

            </div>
          ))}

        </section>


        {/* BLOG / POSTS */}
        <section className="py-20 border-t border-zinc-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold">
              Latest AI Articles
            </h2>

            <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
              Tutorials, reviews and experiments with AI tools.
            </p>
          </div>

          <BlogPosts />
        </section>

      </div>

    </div>
  )
}