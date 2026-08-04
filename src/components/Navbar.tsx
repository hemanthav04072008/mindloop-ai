import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  UploadCloud, 
  Focus, 
  Flame, 
  Sparkles, 
  Share2,
  Code2
} from 'lucide-react';
import type { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
  onOpenFocusMode: () => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenUpload,
  onOpenFocusMode,
  onOpenShare
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#09090B]/75 border-b border-white/10 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] via-[#4ECDC4] to-[#FFB84D] p-[1.5px] shadow-[0_0_25px_rgba(108,99,255,0.45)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#13131A] rounded-[10.5px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#4ECDC4] group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-[#Outfit] font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                MindLoop <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-md bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/30 uppercase">AI v2.6</span>
              </span>
            </div>
          </div>

          {/* Hackathon Team Role Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-[#4ECDC4]" />
            <span>Member 1 • Frontend Lead</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, notes, formulas, or flashcards... (Cmd + K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.09] text-sm text-slate-100 placeholder-slate-400 rounded-xl border border-white/10 focus:border-[#6C63FF]/60 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
            />
          </div>
        </div>

        {/* Right Actions & Gamification */}
        <div className="flex items-center gap-3">
          
          {/* Streak Counter */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{user.streakDays} Day Streak</span>
          </div>

          {/* XP Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/30 text-[#6C63FF] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>{user.xp.toLocaleString()} XP</span>
          </div>

          {/* Share CTA */}
          <button
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
            title="Share MindLoop with Everyone"
          >
            <Share2 className="w-4 h-4 text-[#4ECDC4]" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Upload CTA */}
          <button
            onClick={onOpenUpload}
            className="btn-primary-glow flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white rounded-xl cursor-pointer shadow-md"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload Notes</span>
          </button>

          {/* Focus Mode CTA */}
          <button
            onClick={onOpenFocusMode}
            title="Enter Distraction-Free Focus Mode"
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-[#4ECDC4] transition-all cursor-pointer"
          >
            <Focus className="w-4 h-4" />
          </button>

          {/* User Profile Avatar */}
          <div 
            onClick={() => setActiveTab('profile')} 
            className="relative cursor-pointer group pl-1"
          >
            <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#6C63FF] to-[#4ECDC4] group-hover:scale-105 transition-transform">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#4ECDC4] border-2 border-[#09090B]" />
          </div>

        </div>

      </div>
    </header>
  );
};
