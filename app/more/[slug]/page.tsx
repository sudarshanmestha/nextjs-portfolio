// app/more/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Post = {
  title: string
  image_url: string | null
  description: string
  html_content: string
  date: string
}

async function getPosts(): Promise<Post[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001'
  const res = await fetch(`${API_URL}/DocPost/doc/`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <article className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{post.title}</h1>
          <time className="text-zinc-400 text-lg">
            {new Date(post.date).toLocaleDateString()}
          </time>
        </header>

        {post.image_url && (
          <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <p className="text-xl text-zinc-300 leading-relaxed mb-12">
          {post.description}
        </p>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html_content }}
        />
      </div>
    </article>
  )
}