import { getBlogPosts } from './ai-tools/utils'

export const baseUrl = 'https://justpython.in'

export default async function sitemap() {
  // Use lowercase 'ai-tools' in the URL string
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/ai-tools/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  // Ensure root routes are lowercase
  let routes = ['', '/ai-tools', '/courses', '/auth/login'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}