import { AuthProvider } from "@/app/contexts/AuthContext"; 
import Navbar from './components/nav';
import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Footer from './components/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { baseUrl } from './sitemap';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ReintenSpark Technology Pvt Ltd.',
    template: '%s | Innovation in Drones & AI',
  },
  description: 'Leading the future of robotics and IoT.',
}

const cx = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={cx('antialiased scroll-smooth', GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-black text-white">

        <AuthProvider>

          {/* 🔝 Top Banner (sticky) */}
          <div className="sticky top-0 h-9 bg-neutral-100 dark:bg-[#141416] border-b border-neutral-200 dark:border-white/5 flex items-center justify-center text-[12px] sm:text-sm">
            <p className="text-neutral-500 dark:text-neutral-400">
              Building the future of AI & Robotics at{" "}
              <span className="text-[#39FF14] font-medium">ReintenSpark</span>.
            </p>
          </div>

          {/* 🧭 Navbar (sticky under banner) */}
          <header className="fixed top-9 z-[60]">
            <Navbar />
          </header>

          {/* 📦 Main Content */}
          <main className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-8xl">
              {children}
            </div>
          </main>

          {/* 🔻 Footer */}
          <Footer />

          <Analytics />
          <SpeedInsights />

        </AuthProvider>
      </body>
    </html>
  )
}
