import { AuthProvider } from "@/app/contexts/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
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
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <AuthProvider>

            {/* Top announcement bar */}
            <div className="sticky top-0 z-[100] h-9 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-center text-[10px] uppercase tracking-widest font-bold transition-colors duration-300">
              <p className="text-[var(--foreground)]/40">
                Building the future of AI & Robotics at{' '}
                <span className="gradient-text font-black">Just</span>
                <span className="text-[var(--foreground)]/30">Python</span>.
              </p>
            </div>

            <Navbar />

            <main className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-7xl px-0 pt-20">
                {children}
              </div>
            </main>

            <Footer />
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
