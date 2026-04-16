'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth(); // register is from AuthContext
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
  
  // Track successful registration for UI feedback
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Client-side validation
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
      // Calls the register function which handles API and LocalStorage
      await register(formData);
      
      setIsSuccess(true);
      
      // Delay redirection so the user can see the success message
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      // Standardize error message extraction from api.ts
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

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
            Join <span className="text-[#39FF14]">ReintenSpark</span>
          </h1>
          <p className="mt-2 text-neutral-400 text-sm uppercase tracking-widest font-medium">
            Innovation in Drones & AI
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Success Message UI */}
        {isSuccess && (
          <div className="mb-4 p-3 rounded-lg border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14] text-sm text-center animate-pulse font-bold uppercase tracking-widest">
            Welcome aboard! Redirecting...
          </div>
        )}

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
              placeholder="reinten_pilot"
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
              placeholder="pilot@reintenspark.com"
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