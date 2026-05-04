// app/layout.tsx
import { GeistSans } from 'geist/font/sans'; // Import GeistSans
import { GeistMono } from 'geist/font/mono'; // Import GeistMono
import { AuthProvider } from "@/app/contexts/AuthContext"; 
import Navbar from './components/nav';
import './global.css';

// The helper function that was missing previously
const cx = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      className={cx('antialiased scroll-smooth', GeistSans.variable, GeistMono.variable)} 
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-black text-white">
        <AuthProvider>
          {/* 🔝 Top Banner */}
          <div className="sticky top-0 z-[70] h-9 bg-neutral-100 dark:bg-[#141416] border-b border-neutral-200 dark:border-white/5 flex items-center justify-center text-[12px] sm:text-sm text-black">
            <p className="text-neutral-500 dark:text-neutral-400">
              Building the future of AI & Robotics at{" "}
              <span className="text-[#6b21a8] font-medium">Just</span>
              <span className="text-[#ef4444] font-medium">Python</span>.
            </p>
          </div>

          <Navbar />

          <main className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-8xl">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}