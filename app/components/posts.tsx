'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MoveRight } from 'lucide-react'

export default function BlogPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8001/api/posts/')
      // .get('https://justpythonindia.pythonanywhere.com/api/posts/')
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center text-neutral-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {posts
        .sort((a, b) => b.year - a.year)
        .map((post) => (
          <Link
            key={post.id}
            href={post.link || '#'}
            className="group"
          >
            <div
              className="project-card custom-box
                         rounded-[32px] p-6 md:p-10
                         flex flex-col lg:flex-row
                         items-center justify-between
                         gap-10 transition-all duration-500
                         hover:scale-[1.01]"
            >

              {/* LEFT CONTENT */}
              <div className="max-w-none lg:max-w-[420px]">

                {/* Optional logo/image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Logo"
                    className="w-[50px] h-[50px] rounded-xl object-cover"
                  />
                )}

                {/* Title */}
                <h1
                  className="bg-clip-text text-transparent
                             bg-gradient-to-r from-[#58a6ff] via-[#388bfd] to-[#1f6feb]
                             text-[36px] font-bold tracking-tight
                             mt-3 mb-3 leading-[120%]"
                >
                  {post.title}
                </h1>

                {/* Subtitle + Year */}
                <div className="flex items-center gap-2 flex-wrap">
                  {post.subtitle && (
                    <>
                      <span
                        className="text-gray-500 dark:text-gray-400
                                   tracking-wide uppercase
                                   text-[14px] font-semibold leading-[160%]"
                      >
                        {post.subtitle}
                      </span>

                      <span
                        className="text-gray-500 dark:text-gray-400
                                   tracking-[0.1em] uppercase
                                   text-[14px] font-semibold leading-[160%]"
                      >
                        •
                      </span>
                    </>
                  )}

                  <span
                    className="text-gray-500 dark:text-gray-400
                               tracking-wide uppercase
                               text-[14px] font-semibold leading-[160%]"
                  >
                    {post.year}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-4 mb-8">
                  <span
                    className="text-[18px] leading-[170%]
                               text-neutral-700 dark:text-neutral-300"
                  >
                    {post.description}
                  </span>
                </div>

                {/* Button */}
                <div>
                  <button
                    className="group/button flex items-center justify-center
                               px-6 py-4 rounded-[60px]
                               gradient-bg accent-glow
                               font-semibold transition-all duration-300
                               hover:opacity-90 hover:scale-[1.02]"
                  >
                    <span className="text-white font-bold">See the Live</span>

                    <MoveRight
                      className="w-5 h-5 ml-2 text-white transition-transform duration-300
                                 group-hover/button:translate-x-2"
                    />
                  </button>
                </div>
              </div>

              {/* RIGHT MEDIA */}
              {(post.video || post.video_url || post.image) && (
                <div className="w-full lg:w-auto">

                  {/* Uploaded Video */}
                  {post.video ? (
                    <video
                      className="rounded-[24px] w-full lg:w-[700px] h-auto
                                 object-cover shadow-lg"
                      src={post.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) :

                  /* Video URL */
                  post.video_url ? (
                    <video
                      className="rounded-[24px] w-full lg:w-[700px] h-auto
                                 object-cover shadow-lg"
                      src={post.video_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) :

                  /* Image */
                  post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="rounded-[24px] w-full lg:w-[700px]
                                 h-auto object-cover shadow-lg"
                    />
                  ) : null}
                </div>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
}