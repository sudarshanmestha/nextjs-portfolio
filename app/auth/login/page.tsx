'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin} = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/courses');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError('');
        setLoading(true);
        await googleLogin(tokenResponse.access_token); // ← use context, not api
        setIsSuccess(true);
        setTimeout(() => router.push('/courses'), 1500);
      } catch (err: any) {
        setError(err.message || 'Google login failed');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed. Please try again.');
      setLoading(false);
    },
  });

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center bg-[#202225] rounded-none my-8 transition-all duration-500">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Login to <span className="text-[#39FF14]">JustPython</span>
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded text-sm bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 rounded text-sm bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 text-center animate-pulse">
            Success! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-400">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 rounded border border-neutral-700 bg-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50 transition-all"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-400">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded border border-neutral-700 bg-[#202225] text-white focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50 transition-all"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              className="text-[#39FF14] hover:underline text-xs uppercase tracking-widest font-bold"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className={`w-full py-3 rounded-full font-bold uppercase tracking-widest transition-all ${
              loading || isSuccess
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-[#39FF14] text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.4)] active:scale-95'
            }`}
          >
            {isSuccess ? 'Redirecting...' : loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-neutral-700" />
          <span className="absolute bg-black/60 px-3 text-neutral-500 text-xs uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={loading || isSuccess}
          className={`w-full py-3 rounded-full font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-3 ${
            loading || isSuccess
              ? 'border-neutral-700 text-neutral-500 cursor-not-allowed'
              : 'border-neutral-700 text-white hover:border-[#39FF14]/50 hover:text-[#39FF14] active:scale-95'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"/>
            <path fill="#FBBC05" d="M10.7 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.6l8.2-6z"/>
            <path fill="#34A853" d="M24 47c5.4 0 10-1.8 13.3-4.8l-7.4-5.7c-1.8 1.2-4.1 1.9-5.9 1.9-6.3 0-11.6-4.3-13.5-10l-8.2 6C7 41.3 14.8 47 24 47z"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-bold text-[#39FF14] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}