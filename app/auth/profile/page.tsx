// app/auth/profile/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, updateUser, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password1: '',
    new_password2: '',
  });
  
  // Separate message/error states for each form so they don't bleed into each other
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileMessage('');
    setUpdatingProfile(true);
    try {
      await updateUser(formData);
      setProfileMessage('Profile updated successfully!');
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordMessage('');

    // --- Client-side checks (mirror Django serializer order) ---

    // 1. old_password must not be empty
    if (!passwordData.old_password) {
      setPasswordError('Please enter your current password.');
      return;
    }

    // 2. new passwords must match (mirrors validate() → new_password2 check)
    if (passwordData.new_password1 !== passwordData.new_password2) {
      setPasswordError('New passwords do not match.');
      return;
    }

    // 3. new password must differ from old (mirrors validate() → new_password1 check)
    if (passwordData.old_password === passwordData.new_password1) {
      setPasswordError('New password must be different from your current password.');
      return;
    }

    // 4. minimum length (mirrors Django's MinimumLengthValidator)
    if (passwordData.new_password1.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    setUpdatingPassword(true);

    try {
      await api.changePassword(passwordData);
      // ✅ Only reaches here if Django returned 200 OK
      setPasswordMessage('Password changed successfully!');
      setPasswordData({ old_password: '', new_password1: '', new_password2: '' });
    } catch (err: any) {
      // --- Server-side error parsing ---
      // Django's CustomPasswordChangeSerializer returns structured field errors:
      // validate_old_password() → { "old_password": ["Current password is incorrect."] }
      // validate() mismatch    → { "new_password2": ["New passwords do not match."] }
      // validate() same-as-old → { "new_password1": ["New password must be different..."] }
      // validate_password()    → { "new_password1": ["This password is too common."] }
      let errorMessage = 'Failed to change password.';

      try {
        const parsed = JSON.parse(err.message);

        if (parsed.old_password) {
          errorMessage = Array.isArray(parsed.old_password)
            ? parsed.old_password[0]
            : parsed.old_password;
        } else if (parsed.new_password2) {
          errorMessage = Array.isArray(parsed.new_password2)
            ? parsed.new_password2[0]
            : parsed.new_password2;
        } else if (parsed.new_password1) {
          errorMessage = Array.isArray(parsed.new_password1)
            ? parsed.new_password1[0]
            : parsed.new_password1;
        } else if (parsed.detail) {
          errorMessage = parsed.detail;
        } else {
          errorMessage = Object.entries(parsed)
            .map(([field, msgs]) =>
              `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`
            )
            .join(' | ');
        }
      } catch {
        errorMessage = err.message || 'Failed to change password.';
      }

      // ❌ Only reaches here on error
      setPasswordError(errorMessage);
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#202225]">
        <div className="text-[#39FF14] animate-pulse font-bold tracking-widest uppercase">
          Loading ReintenSpark Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-4 bg-[#202225]">
      <div className="max-w-4xl w-full space-y-8">
        
        <div className="flex items-center justify-between border-b border-[#39FF14]/20 pb-4">
          <h1 className="text-4xl font-bold text-white">
            User <span className="text-[#39FF14]">Profile</span>
          </h1>
          <Link href="/" className="text-xs font-bold text-neutral-400 hover:text-[#39FF14] transition-colors uppercase tracking-widest">
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Information Card */}
          <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Account Information</h2>

            {/* Profile-specific feedback */}
            {profileMessage && (
              <div className="mb-4 p-4 rounded-lg bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20">
                {profileMessage}
              </div>
            )}
            {profileError && (
              <div className="mb-4 p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                {profileError}
              </div>
            )}
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500">Username (Permanent)</label>
                  <input
                    type="text"
                    value={user?.username || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-[#1a1c1e] text-neutral-500 border border-white/5 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={updatingProfile}
                className="px-8 py-3 rounded-full font-bold uppercase tracking-widest bg-[#39FF14] text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all active:scale-95 disabled:opacity-50"
              >
                {updatingProfile ? 'Processing...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Security</h2>

            {/* Password-specific feedback */}
            {passwordMessage && (
              <div className="mb-4 p-4 rounded-lg bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20">
                {passwordMessage}
              </div>
            )}
            {passwordError && (
              <div className="mb-4 p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                {passwordError}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password1}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password1: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-400">Confirm New</label>
                  <input
                    type="password"
                    value={passwordData.new_password2}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password2: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#202225] text-white border border-neutral-700 focus:border-[#39FF14] outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={updatingPassword}
                className="px-8 py-3 rounded-full font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {updatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}