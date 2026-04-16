'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ResetPasswordConfirmPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract dynamic route parameters
  const uid = params.uid as string;
  const token = params.token as string;

  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic frontend validation
    if (newPassword1 !== newPassword2) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword1.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      // payload matches your doc.http requirements
      await api.confirmPasswordReset({
        uid,
        token,
        new_password1: newPassword1,
        new_password2: newPassword2,
      });
      
      setSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#202225] py-12 px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create New <span className="text-[#39FF14]">Password</span>
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 rounded-lg border border-[#39FF14]/20 bg-[#39FF14]/10 text-[#39FF14] text-sm">
              Password successfully reset! Redirecting to login...
            </div>
            <Link 
              href="/auth/login" 
              className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-[#39FF14] transition-colors"
            >
              Click here if not redirected
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-neutral-400 leading-relaxed text-center">
              Please enter your new password below.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
                New Password
              </label>
              <input
                type="password"
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">
                Confirm New Password
              </label>
              <input
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
                loading 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-[#39FF14] text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-95'
              }`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}