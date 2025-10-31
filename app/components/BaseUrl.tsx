// app/components/BaseUrl.tsx
import { ReactNode } from 'react'

type Props = {
  path?: string
  children?: ReactNode
  className?: string
  [key: string]: any
}

/**
 * <BaseUrl path="/Ai-Tools">Projects</BaseUrl>
 * → <a href="http://localhost:3000/Ai-Tools">Projects</a>  (dev)
 * → <a href="https://justpython.in/Ai-Tools">Projects</a> (prod)
 */
export default function BaseUrl({ path = '', children, className, ...rest }: Props) {
  // 1. In the browser we can read the current origin
  const isBrowser = typeof window !== 'undefined'
  const base = isBrowser
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://justpython.in'   // fallback for SSR

  const href = `${base}${path.startsWith('/') ? path : '/' + path}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children ?? href}
    </a>
  )
}