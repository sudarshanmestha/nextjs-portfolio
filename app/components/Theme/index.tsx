// app/components/Theme.tsx
"use client";

import React, { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

const Theme = ({ className }: { className?: string }) => {
  // CONFIGURATION FIX: explicitly set 'dark' and 'light' class names
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',   // This matches Tailwind's expectation
    classNameLight: 'light',
    element: typeof document !== 'undefined' ? document.documentElement : undefined, 
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-11 h-6" />; 

  return (
    <button
      onClick={darkMode.toggle}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${
        darkMode.value ? 'bg-gray-700' : 'bg-gray-200'
      } ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          darkMode.value ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default Theme;