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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isSolid = isScrolled || !isHomePage;

  const headerBg = isSolid 
    ? 'bg-white dark:bg-[#021b1b] border-b border-neutral-200 dark:border-[#39FF14]/10 shadow-md' 
    : 'bg-transparent';

  return (
    <header className={`fixed top-9 left-0 w-full z-[100] transition-all duration-300 ${headerBg}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
          
          {/* LOGO */}
          <div className="relative z-[110] flex-shrink-0">
            <Link href="/" className="block">
              <div className="text-xl font-bold tracking-tighter">
                <span className="text-[#6b21a8]">J</span>
                <span className="text-red-500">P</span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION MENU */}
          <div className={`
            fixed inset-0 z-[105] flex flex-col items-center justify-start pt-32 gap-4 transition-transform duration-500
            lg:static lg:flex lg:flex-row lg:inset-auto lg:translate-x-0 lg:pt-0 lg:gap-1
            
            /* MOBILE MENU BACKGROUND - Solid and Non-Transparent */
            ${visibleNav ? 'translate-x-0 bg-white dark:bg-[#021b1b]' : 'translate-x-full lg:translate-x-0'}
            
            /* DESKTOP PILL BACKGROUND */
            ${isSolid 
              ? 'lg:bg-white lg:dark:bg-[#021b1b] lg:shadow-md' 
              : 'lg:bg-neutral-100 lg:dark:bg-white/10 lg:backdrop-blur-md'}
            
            lg:border lg:border-neutral-200 lg:dark:border-white/15
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
                      w-full lg:w-auto text-center px-6 py-4 lg:py-2 text-lg lg:text-[10px] font-bold uppercase tracking-[0.1em] transition-all rounded-full whitespace-nowrap
                      ${isActive 
                        ? 'text-black bg-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                        : 'text-neutral-600 dark:text-white/70 hover:text-[#39FF14]'}
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* MOBILE ONLY LOGIN BUTTON (Visible inside Hamburger Menu) */}
              {!loading && !isAuthenticated && (
                <Link
                  href="/auth/login"
                  onClick={() => setVisibleNav(false)}
                  className="lg:hidden w-full mt-4 px-6 py-4 border border-[#39FF14] text-[#39FF14] text-center text-lg font-bold uppercase tracking-widest rounded-full hover:bg-[#39FF14] hover:text-black transition-all"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>

          {/* RIGHT ACTIONS (Desktop Login + Theme) */}
          <div className="flex items-center gap-4 z-[110]">
            <div className="hidden xs:block border-r border-neutral-200 dark:border-white/10 pr-4">
              <Theme />
            </div>

            {!loading && (
              isAuthenticated && user ? (
                <User user={user} />
              ) : (
                /* Hidden on Mobile because it is now inside the visibleNav menu above */
                <Link
                  href="/auth/login"
                  className="hidden lg:block px-5 py-2 border border-[#39FF14] text-[#39FF14] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#39FF14] hover:text-black transition-all"
                >
                  Login
                </Link>
              )
            )}

            {/* HAMBURGER TOGGLE */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setVisibleNav(!visibleNav)}
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-0.5 transition-all ${visibleNav ? 'rotate-45 translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-6 h-0.5 transition-all ${visibleNav ? 'opacity-0' : 'bg-neutral-800 dark:bg-white'}`} />
              <div className={`w-6 h-0.5 transition-all ${visibleNav ? '-rotate-45 -translate-y-2 bg-black dark:bg-white' : 'bg-neutral-800 dark:bg-white'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}