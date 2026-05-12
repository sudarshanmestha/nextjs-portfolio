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
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);
  const { user, isAuthenticated, loading } = useAuth(); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isSolid = isScrolled || !isHomePage;

  const headerBg = isSolid 
    ? 'bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-sm' 
    : 'bg-transparent';

  const dynamicTextColor = "text-foreground dark:text-white";

  return (
    <header className={`fixed top-9 left-0 w-full z-[100] transition-all duration-300 ${headerBg}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
          
          {/* LOGO */}
          <div className="relative z-[110] flex-shrink-0">
            <Link href="/" className="block">
              <div className="text-xl font-black text-gray-500 dark:text-gray-400 tracking-tighter">
                JP
              </div>
            </Link>
          </div>

          {/* NAVIGATION MENU */}
          <div className={`
            fixed inset-0 z-[105] flex flex-col items-center justify-start pt-32 gap-4 transition-transform duration-500
            lg:static lg:flex lg:flex-row lg:inset-auto lg:translate-x-0 lg:pt-0 lg:gap-1
            ${visibleNav ? 'translate-x-0 bg-white dark:bg-[#121212]' : 'translate-x-full lg:translate-x-0'}
            ${isSolid 
              ? 'lg:bg-white lg:dark:bg-transparent' 
              : 'lg:bg-gray-100 lg:dark:bg-white/5'}
            lg:rounded-full lg:px-2 lg:py-1.5
          `}>
            <nav className="flex flex-col lg:flex-row items-center w-full lg:w-auto px-6 lg:px-0 gap-2 lg:gap-1">
              {navItems.map((item) => {
                const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setVisibleNav(false)}
                    className={`
                      w-full lg:w-auto text-center px-6 py-4 lg:py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded-full whitespace-nowrap
                      ${isActive 
                        ? 'text-white bg-black dark:text-black dark:bg-white shadow-sm' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* LOGIN BUTTON — mobile menu only */}
              {!loading && !isAuthenticated && (
                <Link
                  href="/auth/login"
                  onClick={() => setVisibleNav(false)}
                  className="lg:hidden w-full text-center px-6 py-4 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Login
                </Link>
              )}

              {/* USER — mobile menu only */}
              {!loading && isAuthenticated && user && (
                <div className="lg:hidden pt-2">
                  <User user={user} />
                </div>
              )}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 z-[110]">
            <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
              <Theme />
            </div>

            {/* LOGIN/USER — desktop only */}
            {!loading && (
              isAuthenticated && user ? (
                <User user={user} />
              ) : (
                <Link
                  href="/auth/login"
                  className="
                    hidden lg:block
                    px-5 py-2
                    text-[11px] font-bold uppercase tracking-widest
                    rounded-full transition-all duration-300
                    border border-gray-300 dark:border-gray-700
                    text-gray-500 dark:text-gray-400
                    bg-white/70 dark:bg-white/5
                    hover:bg-black hover:text-white
                    dark:hover:bg-white dark:hover:text-black
                    backdrop-blur-sm
                  "
                >
                  Login
                </Link>
              )
            )}

            {/* HAMBURGER TOGGLE */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setVisibleNav(!visibleNav)}
            >
              <div className={`w-6 h-0.5 transition-all bg-current text-white ${visibleNav ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 transition-all bg-current text-white ${visibleNav ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 transition-all bg-current text-white ${visibleNav ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}