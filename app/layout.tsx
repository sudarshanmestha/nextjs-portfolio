import { AuthProvider } from "@/app/contexts/AuthContext"; 
import Navbar from './components/nav';
import './global.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Footer from './components/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const cx = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={cx('antialiased scroll-smooth', GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning // Excellent: This is required for theme toggles to prevent hydration mismatch errors.
    >
      {/* 
          FIX APPLIED: 
          Removed 'bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300'.
          Your global.css is now handling the base colors and transitions cleanly.
          The body tag now only handles layout classes.
      */}
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>
          
          {/* Top Banner - Kept the clean monochrome setup[cite: 8] */}
          <div className="sticky top-0 z-[100] h-9 bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-center text-[10px] uppercase tracking-widest font-bold transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400">
              Building the future of AI & Robotics at{" "}
              <span className="text-black dark:text-white">Just</span>
              <span className="text-gray-400 dark:text-gray-500">Python</span>.
            </p>
          </div>

          <Navbar />

          <main className="flex-1 w-full flex justify-center">
            {/* pt-20 ensures content is below the fixed header/nav[cite: 8] */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
              {children}
            </div>
          </main>

          <Footer />
          <Analytics />
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  )
}