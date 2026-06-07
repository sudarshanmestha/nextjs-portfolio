"use client";

import React, { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

const Theme = ({ className }: { className?: string }) => {
  const darkMode = useDarkMode(false, {
    classNameDark:  'dark',
    classNameLight: 'light',
    element: typeof document !== 'undefined' ? document.documentElement : undefined,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-11 h-6" />;

  return (
    <button
      onClick={darkMode.toggle}
      title={darkMode.value ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        group relative inline-flex items-center h-6 w-11 rounded-full
        transition-all duration-300
        bg-[var(--nav-pill)] border border-[var(--border)]
        hover:border-[var(--accent)]/50
        hover:shadow-[0_0_14px_rgba(88,166,255,0.25)]
        ${className}
      `}
    >
      {/* Track fill */}
      <span className={`
        absolute inset-0 rounded-full transition-all duration-300
        ${darkMode.value ? 'bg-[#1c2333]' : 'bg-[#eaeef2]'}
      `} />
      {/* Dot */}
      <span className={`
        relative z-[1] inline-block h-4 w-4 rounded-full shadow-sm
        transition-all duration-300
        ${darkMode.value
          ? 'translate-x-6 bg-[var(--accent)] shadow-[0_0_8px_rgba(88,166,255,0.6)]'
          : 'translate-x-1 bg-[var(--accent-dark,#0969da)]'}
      `} />
    </button>
  );
};

export default Theme;
