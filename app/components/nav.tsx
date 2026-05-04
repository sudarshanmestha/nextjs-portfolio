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
  { name: 'Courses', path: '/courses' }, 
  { name: 'Projects', path: '/projects' },
  { name: 'Ai-Tools', path: '/ai-tools' },
  { name: 'Careers', path: '/careers' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  const { user, isAuthenticated, loading } = useAuth(); 

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Threshold matches banner height logic
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force visible styling if on subpages or if mobile menu is open
  const shouldShowBg = isScrolled || !isHomePage || visibleNav;

  return (
    <header 
      className={`fixed top-9 left-0 w-full z-[60] transition-all duration-300 ${
        shouldShowBg
          ? 'bg-white/95 dark:bg-[#021b1b]/95 backdrop-blur-2xl border-b border-neutral-200 dark:border-[#39FF14]/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
          
          {/* LOGO */}
          <div className="relative flex-shrink-0 flex items-center z-[70]">
            <Link href="/" className="block">
              <div className="text-2xl font-black italic tracking-tighter">
                <span className="text-[#6b21a8]">J</span>
                <span className="text-red-500">P</span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION MENU */}
          <div className={`
            fixed inset-0 z-60 flex flex-col items-center justify-center gap-8 transition-all duration-500
            lg:static lg:flex lg:flex-row lg:inset-auto lg:translate-x-0
            lg:bg-neutral-100/50 lg:dark:bg-white/10 lg:border lg:border-neutral-200 lg:dark:border-white/10 lg:rounded-full lg:px-2 lg:py-1.5
            ${visibleNav 
              ? 'translate-x-0 opacity-100 bg-white dark:bg-[#021b1b]' 
              : 'translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100'}
          `}>
            <nav className="flex flex-col lg:flex-row items-center gap-4 lg:gap-1">
              {navItems.map((item) => {
                const isActive = item.path === '/' 
                  ? pathname === '/' 
                  : pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setVisibleNav(false)}
                    className={`
                      px-8 py-3 text-xl lg:text-[11px] lg:px-5 lg:py-2.5 font-bold uppercase tracking-[0.1em] transition-all rounded-full whitespace-nowrap
                      ${isActive 
                        ? 'text-black bg-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.5)]' 
                        : 'text-neutral-600 dark:text-white/70 hover:text-[#39FF14]'}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 lg:gap-5 z-[70]">
            <div className="hidden xs:block border-r border-neutral-200 dark:border-white/10 pr-3 lg:pr-5">
              <Theme />
            </div>

            {!loading && (
              isAuthenticated && user ? (
                <User user={user} />
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden sm:block px-6 py-2.5 bg-transparent border border-[#39FF14] text-[#39FF14] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#39FF14] hover:text-black transition-all"
                >
                  Login
                </Link>
              )
            )}

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10"
              onClick={() => setVisibleNav(!visibleNav)}
              aria-label="Toggle Menu"
            >
              <div className={`w-5 h-0.5 transition-all duration-300 ${visibleNav ? 'rotate-45 translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-5 h-0.5 transition-all duration-300 ${visibleNav ? 'opacity-0' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-5 h-0.5 transition-all duration-300 ${visibleNav ? '-rotate-45 -translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}