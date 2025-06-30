'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info, MoreHorizontal } from 'lucide-react'

const navItems = {
  '/': { name: 'Home', icon: <Home size={18} /> },
  '/blog': { name: 'About Us', icon: <Info size={18} /> },
  '/more': { name: 'More', icon: <MoreHorizontal size={18} /> },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="mb-10 tracking-tight">
      <div className="lg:sticky lg:top-6 bg-white dark:bg-black rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
        <nav
          className="flex flex-row justify-center gap-4 items-center"
          id="nav"
        >
          {Object.entries(navItems).map(([path, { name, icon }]) => {
            const isActive = pathname === path

            return (
              <Link
                key={path}
                href={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-blue-600'
                }`}
              >
                {icon}
                {name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
