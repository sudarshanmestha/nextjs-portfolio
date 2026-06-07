"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Theme from '@/app/components/Theme';
import User from '@/app/components/Header/User';
import { useAuth } from '@/app/contexts/AuthContext';

const navItems = [
  { name: 'Home',     path: '/' },
  { name: 'Courses',  path: '/courses' },
  { name: 'Projects', path: '/projects' },
  { name: 'Ai-Tools', path: '/ai-tools' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled]   = useState(false);
  const [visibleNav, setVisibleNav]   = useState(false);
  const [glow, setGlow]               = useState({ x: 0, y: 0, show: false });
  const pillRef                       = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isSolid    = isScrolled || !isHomePage;

  /* Update the CSS variable on the pill whenever glow position changes */
  useEffect(() => {
    if (!pillRef.current) return;
    pillRef.current.style.setProperty(
      '--nav-glow',
      glow.show
        ? `radial-gradient(circle 90px at ${glow.x}px ${glow.y}px, rgba(255,255,255,0.10) 0%, transparent 70%)`
        : 'transparent'
    );
  }, [glow]);

  const handlePillMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
  };

  const headerBg = isSolid
    ? 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
    : 'bg-transparent backdrop-blur-sm';

  return (
    <header className={`fixed top-9 left-0 w-full z-[100] transition-all duration-500 ${headerBg}`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>

          {/* LOGO */}
          <div className="relative z-[110] flex-shrink-0">
            <Link href="/" className="block">
              <div className="gradient-text text-xl font-black tracking-tighter select-none">JP</div>
            </Link>
          </div>

          {/* NAV PILL — navy glass + spotlight glow */}
          <div
            ref={pillRef}
            onMouseMove={handlePillMouseMove}
            onMouseLeave={() => setGlow(g => ({ ...g, show: false }))}
            className={`
              nav-glow-container
              fixed inset-0 z-[105] flex flex-col items-center justify-start pt-32 gap-4
              transition-all duration-500
              lg:static lg:flex lg:flex-row lg:inset-auto lg:translate-x-0 lg:pt-0 lg:gap-1
              ${visibleNav
                ? 'translate-x-0 bg-[var(--background)]/95 backdrop-blur-2xl'
                : 'translate-x-full lg:translate-x-0'}
              lg:bg-[var(--nav-pill)]
              lg:border lg:border-[var(--border)]
              lg:rounded-full lg:px-2 lg:py-1.5
              lg:backdrop-blur-none
            `}
          >
            <nav className="relative z-[1] flex flex-col lg:flex-row items-center w-full lg:w-auto px-6 lg:px-0 gap-2 lg:gap-0.5">
              {navItems.map((item) => {
                const isActive = item.path === '/' ? pathname === '/' : pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setVisibleNav(false)}
                    className={`
                      group relative w-full lg:w-auto text-center px-5 py-4 lg:py-2
                      text-[11px] font-bold uppercase tracking-widest
                      transition-all duration-200 rounded-full whitespace-nowrap overflow-hidden
                      ${isActive
                        ? 'bg-[var(--background)] dark:bg-[#21262d] text-[var(--accent)] shadow-sm border border-[var(--border)]'
                        : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]'}
                    `}
                  >
                    {/* per-item spotlight */}
                    <span className="
                      absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 pointer-events-none
                      bg-[radial-gradient(circle_60px_at_50%_50%,rgba(255,255,255,0.09),transparent_70%)]
                    " />
                    <span className="relative z-[1]">{item.name}</span>
                  </Link>
                );
              })}

              {/* LOGIN — mobile only */}
              {!loading && !isAuthenticated && (
                <Link
                  href="/auth/login"
                  onClick={() => setVisibleNav(false)}
                  className="lg:hidden w-full text-center px-5 py-4 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all border border-[var(--border)] text-[var(--foreground)]/50 hover:text-[var(--accent)] hover:border-[var(--accent)]/50"
                >
                  Login
                </Link>
              )}

              {/* USER — mobile only */}
              {!loading && isAuthenticated && user && (
                <div className="lg:hidden pt-2">
                  <User user={user} />
                </div>
              )}
            </nav>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 z-[110]">
            <div className="border-r border-[var(--border)] pr-3">
              <Theme />
            </div>

            {!loading && (
              isAuthenticated && user ? (
                <User user={user} />
              ) : (
                <Link
                  href="/auth/login"
                  className="
                    hidden lg:block px-5 py-2
                    text-[11px] font-bold uppercase tracking-widest rounded-full
                    bg-[var(--nav-pill)] border border-[var(--border)]
                    text-[var(--foreground)]/60
                    transition-all duration-200
                    hover:border-[var(--accent)]/50 hover:text-[var(--accent)]
                    hover:shadow-[0_0_16px_rgba(88,166,255,0.2)]
                  "
                >
                  Login
                </Link>
              )
            )}

            {/* HAMBURGER */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2.5 rounded-xl bg-[var(--nav-pill)] border border-[var(--border)] transition-all hover:border-[var(--accent)]/40"
              onClick={() => setVisibleNav(!visibleNav)}
              aria-label="Toggle menu"
            >
              <div className={`w-4.5 h-px rounded-full transition-all duration-300 bg-[var(--foreground)] ${visibleNav ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <div className={`w-4.5 h-px rounded-full transition-all duration-300 bg-[var(--foreground)] ${visibleNav ? 'opacity-0 scale-x-0' : ''}`} />
              <div className={`w-4.5 h-px rounded-full transition-all duration-300 bg-[var(--foreground)] ${visibleNav ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
