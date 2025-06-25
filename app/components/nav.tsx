'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': { name: 'Home' },
  '': { name: 'About Us' },
  '': { name: 'More' },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <aside className="mb-10 tracking-tight">
      <div className="lg:sticky lg:top-6 bg-white dark:bg-black rounded-xl shadow-sm p-4">
        <nav
          className="flex flex-row gap-4 justify-center items-center"
          id="nav"
        >
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path

            return (
              <Link
                key={path}
                href={path}
                className={`text-md px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-800'
                }`}
              >
                {name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
