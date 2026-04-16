// app/auth/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 1. UPDATE: Add a state to track successful login
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      
      // 2. UPDATE: Trigger success state and delay redirection
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/courses');
      }, 1500); // 1.5s delay allows the user to see the success message
      
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setLoading(false); // Stop loading only if it fails
    }
  };

return (
  <div className="min-h-[85vh] w-full flex items-center justify-center bg-[#202225] rounded-none my-8 transition-all duration-500">
    
    <div className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Login to <span className="text-[#39FF14]">ReintenSpark</span>
        </h1>

      {error && (
        <div className="mb-4 p-3 rounded text-sm bg-red-500/10 text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      {/* 3. UPDATE: Add the Success Message Display */}
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
            disabled={loading || isSuccess} // Disable during processing
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
            disabled={loading || isSuccess} // Disable Dduring processing
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
          // Disable button if loading OR if we successfully logged in
          disabled={loading || isSuccess}
          className={`w-full py-3 rounded-full font-bold uppercase tracking-widest transition-all ${
            loading || isSuccess
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-[#39FF14] text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.4)] active:scale-95'
          }`}
        >
          {/* Change text based on state */}
          {isSuccess ? 'Redirecting...' : loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

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