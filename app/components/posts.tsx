
import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getBlogPosts } from '@/lib/blog-utils'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {allBlogs
        .sort((a, b) => {
          return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
        })
        .map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 bg-white dark:bg-zinc-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover rounded-md"
                  src="https://www.shutterstock.com/image-illustration/realistic-drone-carrying-first-aid-600w-2480530807.jpg"
                  alt={post.metadata.title}
                  width={400}
                  height={300}
                  unoptimized // only if you're using external images and haven’t configured the domain in next.config.js
                />
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.metadata.publishedAt, false)}
              </p>

              <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
