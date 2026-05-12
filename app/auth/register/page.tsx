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
    username: '',
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password1 !== formData.password2) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password1.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

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
        setError('');
        setLoading(true);
        await googleLogin(tokenResponse.access_token);
        setIsSuccess(true);
        setTimeout(() => router.push('/'), 2000);
      } catch (err: any) {
        setError(err.message || 'Google signup failed');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google signup failed. Please try again.');
      setLoading(false);
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#202225] py-12 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.4)]">
              <span className="text-black font-black text-2xl">RS</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Join <span className="text-[#39FF14]">Justpython</span>
          </h1>
          <p className="mt-2 text-neutral-400 text-sm uppercase tracking-widest font-medium">
            Innovation in Robotics & AI
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 rounded-lg border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14] text-sm text-center animate-pulse font-bold uppercase tracking-widest">
            Welcome aboard! Redirecting...
          </div>
        )}

        {/* Google Signup */}
        <button
          type="button"
          onClick={() => handleGoogleSignup()}
          disabled={loading || isSuccess}
          className={`w-full py-3 rounded-full font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-3 mb-6 ${
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

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-full border-t border-neutral-700" />
          <span className="absolute bg-black/60 px-3 text-neutral-500 text-xs uppercase tracking-widest">
            or register manually
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
                First Name
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
                placeholder="John"
                disabled={loading || isSuccess}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
                Last Name
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
                placeholder="Doe"
                disabled={loading || isSuccess}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
              placeholder="justPython_pilot"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
              placeholder="pilot@justpython.in"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
              Password *
            </label>
            <input
              type="password"
              value={formData.password1}
              onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
              placeholder="••••••••"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
              Confirm Password *
            </label>
            <input
              type="password"
              value={formData.password2}
              onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
              placeholder="••••••••"
              required
              disabled={loading || isSuccess}
            />
          </div>

          <button
            type="submit"
            disabled={loading || isSuccess}
            className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all mt-4 ${
              loading || isSuccess
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-[#39FF14] text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-95'
            }`}
          >
            {isSuccess ? 'Account Created' : loading ? 'Initializing...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Already a member?{' '}
          <Link href="/auth/login" className="font-bold text-[#39FF14] hover:underline transition-all">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}