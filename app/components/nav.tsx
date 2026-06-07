"use client";

/* ─────────────────────────────────────────────────────────────
   Navbar — Fixed · Glassmorphism · Responsive
   Layout:  [Logo]  ·  [Centered Nav Pill]  ·  [CTA + Theme]
   Mobile:  [Logo]  ·  [Theme + Hamburger]  →  Side Drawer
───────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Theme from '@/app/components/Theme';
import User from '@/app/components/Header/User';
import { useAuth } from '@/app/contexts/AuthContext';

/* ── Navigation links ── */
const navItems = [
  { name: 'Home',     path: '/' },
  { name: 'Courses',  path: '/courses' },
  { name: 'Projects', path: '/projects' },
  { name: 'Ai-Tools', path: '/ai-tools' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAuth();

  /* ── State ── */
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  /* Spotlight glow on the desktop pill */
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });
  const pillRef         = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close drawer on route change ── */
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  /* ── Lock body scroll while mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Spotlight: update CSS variable on the pill ── */
  useEffect(() => {
    if (!pillRef.current) return;
    pillRef.current.style.setProperty(
      '--nav-glow',
      glow.active
        ? `radial-gradient(circle 100px at ${glow.x}px ${glow.y}px, rgba(255,255,255,0.12) 0%, transparent 70%)`
        : 'transparent'
    );
  }, [glow]);

  const handlePillMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };

  /* ── Header background: solid glass when scrolled or off homepage ── */
  const isHomePage   = pathname === '/';
  const solidHeader  = isScrolled || !isHomePage;

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      {/* ═══════════════════════════════════════
          HEADER BAR
      ═══════════════════════════════════════ */}
      <header
        className={`
          fixed top-9 left-0 w-full z-[100]
          transition-all duration-300
          ${solidHeader
            ? 'bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] shadow-[0_1px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'}
        `}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

          {/* 3-column grid: Logo · Nav · Actions */}
          <div className={`grid grid-cols-3 items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>

            {/* ── LOGO ── */}
            <div className="flex items-center z-[110]">
              <Link href="/" className="group flex items-center gap-2 select-none">
                {/* Logo mark */}
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-md shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/40 transition-shadow duration-300">
                  <span className="text-white font-black text-sm leading-none">JP</span>
                </div>
                {/* Wordmark — hidden on very small screens */}
                <span className="hidden sm:block gradient-text font-black text-lg tracking-tight">
                  JustPython
                </span>
              </Link>
            </div>

            {/* ── DESKTOP NAV PILL (centered) ── */}
            <div className="hidden lg:flex justify-center">
              <div
                ref={pillRef}
                onMouseMove={handlePillMouseMove}
                onMouseLeave={() => setGlow(g => ({ ...g, active: false }))}
                className="
                  nav-glow-container
                  flex items-center gap-0.5
                  bg-[var(--nav-pill)] border border-[var(--border)]
                  rounded-full px-2 py-1.5
                  shadow-sm
                "
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`
                      group relative px-5 py-2 rounded-full
                      text-[11px] font-bold uppercase tracking-widest whitespace-nowrap
                      transition-all duration-300 overflow-hidden
                      ${isActive(item.path)
                        ? 'bg-[var(--background)] text-[var(--accent)] shadow-sm border border-[var(--border)]'
                        : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]'}
                    `}
                  >
                    {/* Spotlight overlay per item */}
                    <span className="
                      absolute inset-0 rounded-full pointer-events-none
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-[radial-gradient(circle_60px_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]
                    " />

                    {/* Animated underline */}
                    {!isActive(item.path) && (
                      <span className="
                        absolute bottom-1.5 left-1/2 -translate-x-1/2
                        h-px w-0 group-hover:w-4/5
                        bg-[var(--accent)]/50 rounded-full
                        transition-all duration-300
                      " />
                    )}

                    <span className="relative z-[1]">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── RIGHT ACTIONS ── */}
            <div className="flex items-center justify-end gap-2 z-[110]">

              {/* Theme toggle */}
              <div className="border-r border-[var(--border)] pr-3 mr-1">
                <Theme />
              </div>

              {/* Desktop CTAs */}
              {!loading && (
                isAuthenticated && user
                  ? <User user={user} />
                  : (
                    <div className="hidden lg:flex items-center gap-2">
                      {/* Login — ghost */}
                      <Link
                        href="/auth/login"
                        className="
                          px-4 py-2 rounded-full
                          text-[11px] font-bold uppercase tracking-widest
                          text-[var(--foreground)]/60
                          border border-transparent
                          transition-all duration-300
                          hover:text-[var(--accent)] hover:border-[var(--accent)]/30
                          hover:bg-[var(--accent)]/5
                        "
                      >
                        Log In
                      </Link>

                      {/* Sign Up — filled CTA */}
                      <Link
                        href="/auth/register"
                        className="
                          px-5 py-2 rounded-full
                          text-[11px] font-bold uppercase tracking-widest
                          gradient-bg text-white
                          shadow-md shadow-[var(--accent)]/20
                          transition-all duration-300
                          hover:opacity-90 hover:shadow-[var(--accent)]/35
                          hover:scale-[1.03] active:scale-95
                        "
                      >
                        Sign Up
                      </Link>
                    </div>
                  )
              )}

              {/* ── HAMBURGER (mobile only) ── */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="
                  lg:hidden
                  flex flex-col justify-center items-center gap-[5px]
                  w-10 h-10 rounded-xl
                  bg-[var(--nav-pill)] border border-[var(--border)]
                  transition-all duration-300
                  hover:border-[var(--accent)]/40
                "
              >
                <span className={`block w-5 h-[2px] rounded-full bg-[var(--foreground)] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-5 h-[2px] rounded-full bg-[var(--foreground)] transition-all duration-300            ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-5 h-[2px] rounded-full bg-[var(--foreground)] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>

            </div>
          </div>
        </div>
      </header>


      {/* ═══════════════════════════════════════
          MOBILE — Backdrop overlay (tap to close)
      ═══════════════════════════════════════ */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-[90] lg:hidden
          bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════
          MOBILE — Side drawer
      ═══════════════════════════════════════ */}
      <aside
        aria-label="Mobile navigation"
        className={`
          fixed top-0 right-0 h-full w-[280px] z-[95] lg:hidden
          bg-[var(--background)] border-l border-[var(--border)]
          shadow-2xl shadow-black/25
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-black text-xs">JP</span>
            </div>
            <span className="gradient-text font-black text-base tracking-tight">JustPython</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--foreground)]/40 hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-4 flex-1">
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${i * 40}ms` }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-bold uppercase tracking-widest
                transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                  : 'text-[var(--foreground)]/55 hover:text-[var(--foreground)] hover:bg-[var(--muted)]'}
              `}
            >
              {/* Active indicator dot */}
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${isActive(item.path) ? 'bg-[var(--accent)]' : 'bg-[var(--foreground)]/20'}`} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Drawer CTAs */}
        <div className="px-4 py-5 border-t border-[var(--border)] flex flex-col gap-2">
          {!loading && (
            isAuthenticated && user
              ? (
                <div className="px-2 py-1">
                  <User user={user} />
                </div>
              )
              : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMenuOpen(false)}
                    className="
                      block w-full text-center px-4 py-3 rounded-xl
                      text-sm font-bold uppercase tracking-widest
                      border border-[var(--border)]
                      text-[var(--foreground)]/60
                      transition-all duration-200
                      hover:text-[var(--accent)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5
                    "
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMenuOpen(false)}
                    className="
                      block w-full text-center px-4 py-3 rounded-xl
                      text-sm font-bold uppercase tracking-widest
                      gradient-bg text-white
                      shadow-md shadow-[var(--accent)]/20
                      transition-all duration-200
                      hover:opacity-90 active:scale-95
                    "
                  >
                    Sign Up
                  </Link>
                </>
              )
          )}
        </div>
      </aside>
    </>
  );
}
