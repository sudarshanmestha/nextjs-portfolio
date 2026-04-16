// app/auth/password-reset/confirm/page.tsx
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

// 1. Logic inside a child component
function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({ new_password1: '', new_password2: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid || !token) return setError("Invalid reset link.");
    
    setLoading(true);
    try {
      if (formData.new_password1 !== formData.new_password2) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      await api.confirmPasswordReset({ ...formData, uid, token });
      router.push('/auth/login?reset=success');
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl border border-[#39FF14]/10 bg-black/60 backdrop-blur-xl shadow-2xl space-y-6">
      <h1 className="text-2xl font-bold text-white text-center">Set New <span className="text-[#39FF14]">Password</span></h1>
      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">{error}</div>}
      <input
        type="password"
        placeholder="New Password"
        className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none"
        onChange={(e) => setFormData({...formData, new_password1: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full px-4 py-3 rounded-lg border border-neutral-700 bg-[#202225] text-white focus:border-[#39FF14] outline-none"
        onChange={(e) => setFormData({...formData, new_password2: e.target.value})}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-full bg-[#39FF14] text-black font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}

// 2. Main page wrapping in Suspense
export default function PasswordResetConfirmPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#121212]">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}