// app/components/BaseUrl.tsx
import { ReactNode } from 'react'

type Props = {
  path?: string
  children?: ReactNode
  className?: string
  target?: string
  [key: string]: any
}

export default function BaseUrl({ path = '', children, className, target = '_blank', ...rest }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 
               (typeof window !== 'undefined' ? window.location.origin : 'https://justpython.in')
  
  const href = `${base}${path.startsWith('/') ? path : '/' + path}`

  return (
    <a href={href} target={target} rel="noopener noreferrer" className={className} {...rest}>
      {children ?? href}
    </a>
  )
}