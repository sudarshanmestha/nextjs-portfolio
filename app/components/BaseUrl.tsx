// app/components/BaseUrl.tsx
import { ReactNode } from 'react'

interface BaseUrlProps {
  children?: ReactNode
  path?: string
  className?: string
  [key: string]: any
}

export default function BaseUrl({ children, path = '', className, ...props }: BaseUrlProps) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://justpython.in'
  const href = `${base}${path}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children || href}
    </a>
  )
}