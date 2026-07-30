import React from 'react';
import { 
  User, 
  Sparkles, 
  Trophy, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Award, 
  Star, 
  ShieldCheck, 
  Zap,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const xpPercentage = Math.round((user.xp / user.nextLevelXp) * 100);

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* USER PROFILE HEADER CARD */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/20 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-tr from-[#6C63FF]/25 to-[#4ECDC4]/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 z-10 text-center sm:text-left">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#6C63FF] via-[#4ECDC4] to-[#FFB84D] shadow-[0_0_30px_rgba(108,99,255,0.5)]">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-[#6C63FF] text-white text-[10px] font-bold border-2 border-[#09090B]">
              Lvl {user.level}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
                {user.name}
              </h1>
              <ShieldCheck className="w-5 h-5 text-[#4ECDC4]" />
            </div>
            <p className="text-xs text-slate-300">
              {user.email} • Stanford University
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6C63FF]/15 border border-[#6C63FF]/30 text-[#6C63FF] text-xs font-bold uppercase tracking-wider mt-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Title: {user.levelTitle}</span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Box */}
        <div className="glass-panel p-5 space-y-3 border border-white/15 w-full sm:w-72 z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Level {user.level} Progress</span>
            <span className="text-[#4ECDC4] font-bold">{user.xp} / {user.nextLevelXp} XP</span>
          </div>

          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-emerald-400 transition-all duration-1000"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-400 text-center">
            Earn <span className="text-white font-semibold">{user.nextLevelXp - user.xp} XP</span> to unlock Level {user.level + 1}
          </div>
        </div>
      </div>

      {/* GAMIFICATION STATS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 border border-white/10 text-center space-y-1">
          <Flame className="w-6 h-6 text-amber-400 fill-amber-400 mx-auto" />
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">{user.streakDays} Days</div>
          <div className="text-xs text-slate-400">Current Study Streak</div>
        </div>

        <div className="glass-panel p-5 border border-white/10 text-center space-y-1">
          <Clock className="w-6 h-6 text-[#6C63FF] mx-auto" />
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">{user.hoursStudiedTotal} hrs</div>
          <div className="text-xs text-slate-400">Total Deep Study</div>
        </div>

        <div className="glass-panel p-5 border border-white/10 text-center space-y-1">
          <CheckCircle2 className="w-6 h-6 text-[#4ECDC4] mx-auto" />
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">{user.cardsCompletedTotal}</div>
          <div className="text-xs text-slate-400">Cards Completed</div>
        </div>

        <div className="glass-panel p-5 border border-white/10 text-center space-y-1">
          <Trophy className="w-6 h-6 text-[#FFB84D] mx-auto" />
          <div className="text-2xl font-extrabold text-[#FFB84D] font-[#Outfit]">{user.badges.length}</div>
          <div className="text-xs text-slate-400">Badges Unlocked</div>
        </div>
      </div>

      {/* UNLOCKED BADGES & ACHIEVEMENTS GRID */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-[#Outfit] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FFB84D]" />
          <span>Unlocked Achievements & Medals ({user.badges.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.badges.map((badge) => (
            <div 
              key={badge.id}
              className="glass-panel p-5 space-y-3 border border-white/15 hover:border-amber-400/40 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center text-2xl shrink-0">
                {badge.icon}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-[#Outfit]">
                    {badge.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
                <div className="text-[10px] text-amber-400 font-semibold pt-1">
                  Unlocked: {badge.unlockedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
