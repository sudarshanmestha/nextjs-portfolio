'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ResetPasswordConfirmPage() {
  const params = useParams();
  const router = useRouter();
  const uid   = params.uid as string;
  const token = params.token as string;

  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState(false);
  const [loading, setLoading]           = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword1 !== newPassword2) { setError('Passwords do not match.'); return; }
    if (newPassword1.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await api.confirmPasswordReset({ uid, token, new_password1: newPassword1, new_password2: newPassword2 });
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl
    bg-[var(--muted)]/80 border border-[var(--border)]
    text-[var(--foreground)] placeholder-[var(--foreground)]/30 backdrop-blur-sm
    focus:outline-none focus:border-[#58a6ff]/60 focus:ring-1 focus:ring-[#58a6ff]/30
    transition-all duration-200
  `;

  return (
    <div className="relative w-full flex items-center justify-center py-8 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]" />
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#58a6ff]/15 blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#388bfd]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[var(--card)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-3xl p-5 sm:p-8 shadow-2xl shadow-black/40">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-bg shadow-lg shadow-[#58a6ff]/30 mb-4">
              <span className="text-[var(--foreground)] font-black text-xl">JP</span>
            </div>
            <h1 className="text-2xl font-black text-[var(--foreground)]">
              Create New <span className="gradient-text">Password</span>
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/25 bg-red-500/15 text-red-300 text-sm">{error}</div>
          )}

          {success ? (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-xl border border-green-500/25 bg-green-500/15 text-green-300 text-sm">
                Password reset! Redirecting to login…
              </div>
              <Link href="/auth/login" className="inline-block text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/35 hover:text-[#58a6ff] transition-colors">
                Click here if not redirected
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm text-[var(--foreground)]/40 text-center">Enter your new password below.</p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">New Password</label>
                <input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} placeholder="••••••••" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[var(--foreground)]/40">Confirm Password</label>
                <input type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} placeholder="••••••••" className={inputClass} required />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${
                  loading
                    ? 'bg-white/10 text-[var(--foreground)]/25 cursor-not-allowed border border-white/10'
                    : 'gradient-bg text-[var(--foreground)] shadow-lg shadow-[var(--accent)]/30 hover:opacity-90 active:scale-95'
                }`}
              >
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
