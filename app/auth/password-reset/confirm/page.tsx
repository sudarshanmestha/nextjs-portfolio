'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

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

  const inputClass = "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-2xl custom-box shadow-lg space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Set New <span className="text-gray-500">Password</span>
      </h1>
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg text-center">
          {error}
        </div>
      )}
      <input
        type="password"
        placeholder="New Password"
        className={inputClass}
        onChange={(e) => setFormData({...formData, new_password1: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className={inputClass}
        onChange={(e) => setFormData({...formData, new_password2: e.target.value})}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
          loading
            ? 'bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90 active:scale-95'
        }`}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}

export default function PasswordResetConfirmPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
