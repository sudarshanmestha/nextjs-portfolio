'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";
import { useGoogleLogin } from '@react-oauth/google';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '', email: '', password1: '', password2: '',
    first_name: '', last_name: '',
  });
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password1 !== formData.password2) { setError('Passwords do not match'); return; }
    if (formData.password1.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      await register(formData);
      setIsSuccess(true);
      setTimeout(() => router.push('/'), 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError(''); setLoading(true);
        await googleLogin(tokenResponse.access_token);
        setIsSuccess(true);
        setTimeout(() => router.push('/'), 2000);
      } catch (err: any) {
        setError(err.message || 'Google signup failed');
        setLoading(false);
      }
    },
    onError: () => { setError('Google signup failed. Please try again.'); setLoading(false); },
  });

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-[var(--muted)]/80
    border border-[var(--border)]
    text-[var(--foreground)] placeholder-[var(--foreground)]/30
    backdrop-blur-sm
    focus:outline-none focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
    transition-all duration-200
    disabled:opacity-40
  `;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pb-8 overflow-hidden">

      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]" />

      {/* Floating orbs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#58a6ff]/15 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[#388bfd]/8 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#1f6feb]/8 blur-[100px] pointer-events-none" />

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="
          bg-[var(--card)]/80
          backdrop-blur-2xl
          border border-[var(--border)]
          rounded-3xl p-8
          shadow-2xl shadow-black/40
        ">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg shadow-lg shadow-[#58a6ff]/30 mb-4">
              <span className="text-[var(--foreground)] font-black text-xl">JP</span>
            </div>
            <h1 className="text-2xl font-black text-[var(--foreground)]">
              Join <span className="gradient-text">JustPython</span>
            </h1>
            <p className="text-[var(--foreground)]/35 text-xs mt-1 uppercase tracking-widest">
              Innovation in Robotics & AI
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/25 bg-red-500/15 text-red-300 text-sm backdrop-blur-sm">
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="mb-4 p-3 rounded-xl border border-green-500/25 bg-green-500/15 text-green-300 text-sm text-center animate-pulse font-bold uppercase tracking-widest backdrop-blur-sm">
              Welcome aboard! Redirecting…
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={() => handleGoogleSignup()}
            disabled={loading || isSuccess}
            className={`
              w-full py-3 rounded-full font-bold uppercase tracking-widest mb-6
              flex items-center justify-center gap-3
              border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-sm
              transition-all duration-300
              ${loading || isSuccess
                ? 'text-[var(--foreground)]/20 cursor-not-allowed'
                : 'text-[var(--foreground)]/60 hover:border-[#58a6ff]/50 hover:text-[var(--foreground)] hover:bg-[var(--accent)]/10 active:scale-95'}
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

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-[var(--border)]" />
            <span className="absolute px-4 text-[var(--foreground)]/25 text-xs uppercase tracking-widest bg-transparent">
              or register manually
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">First Name</label>
                <input type="text" value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className={inputClass} placeholder="John" disabled={loading || isSuccess} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Last Name</label>
                <input type="text" value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className={inputClass} placeholder="Doe" disabled={loading || isSuccess} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Username *</label>
              <input type="text" value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={inputClass} placeholder="justPython_pilot" required disabled={loading || isSuccess} />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Email *</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass} placeholder="pilot@justpython.in" required disabled={loading || isSuccess} />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Password *</label>
              <input type="password" value={formData.password1}
                onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
                className={inputClass} placeholder="••••••••" required disabled={loading || isSuccess} />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Confirm Password *</label>
              <input type="password" value={formData.password2}
                onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                className={inputClass} placeholder="••••••••" required disabled={loading || isSuccess} />
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 mt-2 ${
                loading || isSuccess
                  ? 'bg-white/10 text-[var(--foreground)]/25 cursor-not-allowed border border-white/10'
                  : 'gradient-bg text-white shadow-lg shadow-[var(--accent)]/30 hover:opacity-90 hover:shadow-[var(--accent)]/50 active:scale-95'
              }`}
            >
              {isSuccess ? 'Account Created' : loading ? 'Initializing…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--foreground)]/35">
            Already a member?{' '}
            <Link href="/auth/login" className="font-bold text-[#58a6ff] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
