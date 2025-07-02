'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formatDate } from '@/lib/date-utils'

export default function BlogPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://justpythonindia.pythonanywhere.com/api/posts/')
      .then(res => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts
        .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 bg-white dark:bg-zinc-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex-shrink-0">
                <Image
                  className="h-48 w-full object-cover rounded-md"
                  src={'https://via.placeholder.com/400x300'}
                  alt={post.title}
                  width={400}
                  height={300}
                  unoptimized
                />
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.published_at)}
              </p>

              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
