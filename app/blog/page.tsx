'use client'
import BlogPosts from 'app/components/posts'



export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">About Us</h1>
      <BlogPosts />
    </section>
  )
}