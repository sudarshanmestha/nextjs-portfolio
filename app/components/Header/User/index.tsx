"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { useAuth } from '@/app/contexts/AuthContext'; // Ensure this path is correct

const User = ({ className, user }: { className?: string; user?: any }) => {
  const [visible, setVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Access the logout function from your AuthContext
  const { logout } = useAuth(); 

  useOutsideClick(menuRef, () => setVisible(false));

  // --- UPDATED LOGIC ---
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Calls api.logout() which sends the DELETE/POST request to Django
      // 2. Clears localStorage tokens as per your api.ts logic
      await logout(); 
      
      setVisible(false);
      // 3. Redirect to login or home after state is cleared
      router.push('/auth/login'); 
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if the server fails, we usually want to force a local logout
      localStorage.clear();
      window.location.href = '/auth/login';
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get initials for the avatar as requested previously
  const initials = (user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase();

  return (
    <div className={`relative ${className || ''}`} ref={menuRef}>
      <div 
        className="flex items-center gap-3 p-1 pr-4 rounded-full border border-white/10 bg-white/5 cursor-pointer hover:border-[#39FF14]/50 transition-all group"
        onClick={() => setVisible(!visible)}
      >
        <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#202225] border border-[#39FF14]/40 text-[#39FF14] text-[10px] font-bold shadow-neon group-hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]">
          {initials}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white hidden sm:block">
          {user?.first_name || user?.username || 'User'}
        </div>
      </div>

      {visible && (
        <div className="absolute top-full right-0 mt-4 w-56 glass-panel rounded-2xl p-4 shadow-neon-strong z-[100] bg-[#0a0b0c] border border-white/10">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${
                isLoggingOut 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#39FF14] hover:text-black text-white'
            }`}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}
    </div>
  );
};

export default User;