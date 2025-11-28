// app/more/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

type Post = {
  title: string;
  image_url: string | null;
  description: string;
  html_content: string;
  date: string;
};

// ---- Fetch Post Function (Fixed) ----
async function getPost(slug: string): Promise<Post> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("❌ NEXT_PUBLIC_API_URL is missing");
    throw new Error("API URL missing in environment variables");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/DocPost/doc/${slug}/`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

// ---- Page Component ----
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <article className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">{post.title}</h1>
        <p className="text-zinc-400 text-lg mb-4">{post.date}</p>

        {post.image_url && (
          <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <p className="text-xl text-zinc-300 leading-relaxed mb-12 max-w-3xl mx-auto">
          {post.description}
        </p>

        {/* ---- FIXED PROSE CLASS ---- */}
        <div className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700 prose-pre:overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
        </div>
      </div>
    </article>
  );
}
