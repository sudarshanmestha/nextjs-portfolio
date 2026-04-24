// app/components/nav.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Theme from '@/app/components/Theme'; 
import User from '@/app/components/Header/User';
import { useAuth } from '@/app/contexts/AuthContext'; 

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Ai-Tools', path: '/ai-tools' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' }, 
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  const { user, isAuthenticated, loading } = useAuth(); 

  // Detect if we are on the homepage to handle transparency
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-9 left-0 w-full z-[60] transition-all duration-300 ${
        // If scrolled OR not on homepage, show background. Otherwise transparent.
        isScrolled || !isHomePage
          ? 'bg-white/90 dark:bg-[#021b1b]/95 backdrop-blur-2xl border-b border-neutral-200 dark:border-[#39FF14]/10 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
          
          {/* LOGO */}
          <div className="relative flex-shrink-0 flex items-center min-w-[180px] sm:min-w-[240px]">
            <Link href="/" className="relative z-10 block">
              <div className="text-xl font-bold">
                <span className="text-[#6b21a8]">J</span>
                <span className="text-red-500">P</span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION */}
          <div className={`
            fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300
            lg:static lg:flex lg:flex-row lg:inset-auto lg:translate-x-0
            lg:bg-neutral-100/50 lg:dark:bg-white/10 lg:border lg:border-neutral-200 lg:dark:border-white/10 lg:rounded-full lg:px-2 lg:py-1.5
            ${visibleNav ? 'translate-x-0 bg-white dark:bg-[#021b1b]' : 'translate-x-full lg:translate-x-0'}
          `}>
            <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-1">
              {navItems.map((item) => {
                // Improved active logic: handles sub-pages correctly
                const isActive = item.path === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setVisibleNav(false)}
                    className={`
                      px-6 py-3 text-lg lg:text-[10px] lg:px-4 lg:py-2 font-bold uppercase tracking-[0.08em] transition-all rounded-full whitespace-nowrap
                      ${isActive 
                        ? 'text-black bg-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.4)]' 
                        : 'text-neutral-600 dark:text-white/70 hover:text-[#39FF14]'}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {!loading && !isAuthenticated && (
                <Link
                  href="/auth/login"
                  onClick={() => setVisibleNav(false)}
                  className="lg:hidden mt-4 px-10 py-4 bg-[#39FF14] text-black text-sm font-bold uppercase tracking-widest rounded-full"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 lg:pl-8">
            <div className="hidden sm:block border-r border-neutral-200 dark:border-white/10 pr-4">
              <Theme />
            </div>

            {!loading && (
               isAuthenticated && user ? (
                <User user={user} />
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden lg:block px-6 py-2.5 border border-[#39FF14] text-[#39FF14] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#39FF14] hover:text-black transition-all"
                >
                  Login
                </Link>
              )
            )}

            {/* HAMBURGER TOGGLE */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 z-50 relative"
              onClick={() => setVisibleNav(!visibleNav)}
              aria-label="Toggle Menu"
            >
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? 'rotate-45 translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? 'opacity-0' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-7 h-0.5 transition-all ${visibleNav ? '-rotate-45 -translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}