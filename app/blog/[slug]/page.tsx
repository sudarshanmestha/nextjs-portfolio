// app/blog/[slug]/page.tsx (✅ server component)
import axios from 'axios'

type Post = {
  title: string
  content: string
  publishedAt: string
  image?: string
  slug: string
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  //const res = await fetch(`https://justpythonindia.pythonanywhere.com/api/posts/${params.slug}/`)
  const res = await fetch(`http://127.0.0.1:8001/api/posts/${params.slug}/`)
  const post: Post = await res.json()

  return (
    <div className="prose dark:prose-invert max-w-3xl mx-auto py-10">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
      <img src={'https://via.placeholder.com/400x300'} alt={post.title} className="rounded-lg my-6" />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
