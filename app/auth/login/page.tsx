'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData);
      setIsSuccess(true);
      setTimeout(() => router.push('/courses'), 1500);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError(''); setLoading(true);
        await googleLogin(tokenResponse.access_token);
        setIsSuccess(true);
        setTimeout(() => router.push('/courses'), 1500);
      } catch (err: any) {
        setError(err.message || 'Google login failed');
        setLoading(false);
      }
    },
    onError: () => { setError('Google login failed. Please try again.'); setLoading(false); },
  });

  return (
    <div className="relative w-full flex items-center justify-center py-8 overflow-x-hidden">

      {/* Dark gold gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]" />

      {/* Floating amber orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#58a6ff]/15 blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full bg-[#388bfd]/10 blur-[110px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#1f6feb]/8 blur-[90px] pointer-events-none" />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="
          bg-[var(--card)]/80
          backdrop-blur-2xl
          border border-[var(--border)]
          rounded-3xl p-5 sm:p-8
          shadow-2xl shadow-black/20
        ">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg shadow-lg shadow-[#58a6ff]/30 mb-4">
              <span className="text-white font-black text-xl">JP</span>
            </div>
            <h1 className="text-2xl font-black text-[var(--foreground)]">Welcome back</h1>
            <p className="text-[var(--foreground)]/40 text-sm mt-1 tracking-wide">
              Sign in to <span className="gradient-text font-bold">JustPython</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-sm bg-red-500/15 text-red-300 border border-red-500/25 backdrop-blur-sm">
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="mb-4 p-3 rounded-xl text-sm bg-[#58a6ff]/15 text-[#79c0ff] border border-[var(--border)] text-center animate-pulse backdrop-blur-sm">
              ✓ Success! Redirecting…
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/50">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-[var(--background)]/70 border border-[var(--border)]
                  text-[var(--foreground)] placeholder-[var(--foreground)]/25
                  backdrop-blur-sm
                  focus:outline-none focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
                  transition-all duration-200
                "
                placeholder="your_username"
                required
                disabled={loading || isSuccess}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/50">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-[var(--background)]/70 border border-[var(--border)]
                  text-[var(--foreground)] placeholder-[var(--foreground)]/25
                  backdrop-blur-sm
                  focus:outline-none focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
                  transition-all duration-200
                "
                placeholder="••••••••"
                required
                disabled={loading || isSuccess}
              />
            </div>

            <div className="text-right">
              <Link
                href="/auth/forgot-password"
                className="text-[var(--foreground)]/30 hover:text-[#58a6ff] text-xs uppercase tracking-widest font-bold transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`w-full py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${
                loading || isSuccess
                  ? 'bg-[#58a6ff]/10 text-[var(--foreground)]/20 cursor-not-allowed border border-[var(--border)]'
                  : 'gradient-bg text-white shadow-lg shadow-[#58a6ff]/25 hover:opacity-90 hover:shadow-[#58a6ff]/30 active:scale-95'
              }`}
            >
              {isSuccess ? 'Redirecting…' : loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-[var(--border)]" />
            <span className="absolute px-4 text-[var(--foreground)]/25 text-xs uppercase tracking-widest">or</span>
          </div>

          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={loading || isSuccess}
            className={`
              w-full py-3 rounded-full font-bold uppercase tracking-widest
              flex items-center justify-center gap-3
              border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-sm
              transition-all duration-300
              ${loading || isSuccess
                ? 'text-[var(--foreground)]/20 cursor-not-allowed'
                : 'text-[var(--foreground)]/60 hover:border-[#58a6ff]/50 hover:text-[var(--foreground)] hover:bg-[#58a6ff]/8 active:scale-95'}
            `}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"/>
              <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.2-6z"/>
              <path fill="#34A853" d="M24 47c5.4 0 10-1.8 13.3-4.8l-7.4-5.7c-1.8 1.2-4.1 1.9-5.9 1.9-6.3 0-11.6-4.3-13.5-10l-8.2 6C7 41.3 14.8 47 24 47z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-[var(--foreground)]/30">
            No account yet?{' '}
            <Link href="/auth/register" className="font-bold text-[var(--accent)] hover:text-[var(--accent)] hover:underline transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
