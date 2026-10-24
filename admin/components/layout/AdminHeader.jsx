import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, LogOut, Shield, Radio } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminHeader = () => {
  const { user, logout } = useAdminAuth();

  return (
    <header className="h-16 border-b border-white/10 bg-[#0c0c0c] px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/70 hidden sm:inline-block">
          SKY SQUARE INFRA <span className="text-[#d4af37]">//</span> ARCHITECTURAL CMS
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Website Preview Link */}
        <Link
          to="/archive"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/70 hover:text-[#d4af37] px-3 py-1.5 border border-white/10 hover:border-[#d4af37]/50 bg-white/[0.02] transition-colors"
        >
          <span>Live Archive</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
        </Link>

        {/* User Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#141416] border border-white/10">
          <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-mono text-xs text-white/80">{user?.username || 'Admin'}</span>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 text-white/50 hover:text-[#ff6b6b] hover:bg-white/5 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
