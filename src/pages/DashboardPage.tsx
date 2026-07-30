import React from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  ArrowRight, 
  RotateCcw,
  Zap,
  Quote,
  Target,
  Share2
} from 'lucide-react';
import type { UserProfile, Subject, MemoryLoopItem } from '../types';
import { AI_MOTIVATIONAL_QUOTES } from '../data/mockData';

interface DashboardPageProps {
  user: UserProfile;
  subjects: Subject[];
  memoryItems: MemoryLoopItem[];
  setActiveTab: (tab: string) => void;
  onOpenUpload: () => void;
  onOpenShare?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  subjects,
  memoryItems,
  setActiveTab,
  onOpenUpload,
  onOpenShare
}) => {
  const randomQuote = AI_MOTIVATIONAL_QUOTES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner & Greeting */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#6C63FF]/20 blur-3xl pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 text-[#4ECDC4] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Adaptive Engine Online</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-[#Outfit]">
            Welcome back, {user.name.split(' ')[0]}! 🚀
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            You are on a <span className="text-amber-400 font-bold">{user.streakDays}-day streak</span>! MindLoop has scheduled 2 spaced flashcard reviews today to lock in your long-term memory.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          {onOpenShare && (
            <button
              onClick={onOpenShare}
              className="px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#4ECDC4]" />
              <span>Share Access</span>
            </button>
          )}

          <button
            onClick={onOpenUpload}
            className="btn-primary-glow w-full md:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Quick Upload PDF</span>
          </button>
          
          <button
            onClick={() => setActiveTab('planner')}
            className="px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Target className="w-4 h-4 text-[#4ECDC4]" />
            <span>Today's Plan</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Stat 1: Hours Studied */}
        <div className="glass-panel p-4 space-y-2 border border-white/10 hover:border-[#6C63FF]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Hours Studied</span>
            <Clock className="w-4 h-4 text-[#6C63FF]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">
            {user.hoursStudiedTotal} hrs
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>+3.2 hrs this week</span>
          </div>
        </div>

        {/* Stat 2: Flashcards Completed */}
        <div className="glass-panel p-4 space-y-2 border border-white/10 hover:border-[#4ECDC4]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Flashcards Mastered</span>
            <Layers className="w-4 h-4 text-[#4ECDC4]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">
            {user.cardsCompletedTotal}
          </div>
          <div className="text-[11px] text-slate-400">
            81% Retained
          </div>
        </div>

        {/* Stat 3: Quiz Accuracy */}
        <div className="glass-panel p-4 space-y-2 border border-white/10 hover:border-[#FFB84D]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Quiz Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-[#FFB84D]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-[#Outfit]">
            {user.overallQuizAccuracy}%
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">
            Top 5% of Students
          </div>
        </div>

        {/* Stat 4: Study Streak */}
        <div className="glass-panel p-4 space-y-2 border border-white/10 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-[#Outfit]">
            {user.streakDays} Days
          </div>
          <div className="text-[11px] text-amber-400 font-semibold">
            2x XP Multiplier Active
          </div>
        </div>

        {/* Stat 5: Circular Exam Readiness */}
        <div className="glass-panel p-4 col-span-2 md:col-span-1 flex flex-col justify-between border border-white/10 hover:border-[#4ECDC4]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Exam Readiness</span>
            <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
          </div>
          <div className="flex items-center gap-3 my-1">
            {/* SVG Progress Ring */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#4ECDC4] stroke-current"
                  strokeDasharray={`${user.examReadinessPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-extrabold text-white">
                {user.examReadinessPercent}%
              </span>
            </div>
            <div className="text-[11px] text-slate-300">
              Target Grade: <span className="text-[#4ECDC4] font-bold">A+ (92%+)</span>
            </div>
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: RECENT SUBJECTS & MINDLOOP MEMORY LOOP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Subjects (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#6C63FF]" />
              <span>Active Subjects & Transformed Notes</span>
            </h2>
            <button 
              onClick={() => setActiveTab('library')}
              className="text-xs font-semibold text-[#6C63FF] hover:text-[#4ECDC4] flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({subjects.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setActiveTab('summary')}
                className="glass-panel p-5 space-y-3 border border-white/10 hover:border-[#6C63FF]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                      {sub.category}
                    </span>
                    <span className="text-xs font-bold text-[#4ECDC4]">
                      {sub.readinessScore}% Score
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#4ECDC4] transition-colors line-clamp-2">
                    {sub.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {sub.summaryPreview}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{sub.masteredCards}/{sub.totalCards} Flashcards</span>
                    <span>{sub.weakTopicCount} Weak Spots</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6C63FF] to-[#4ECDC4]"
                      style={{ width: `${(sub.masteredCards / sub.totalCards) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: MindLoop Memory Loop™ (Spaced Repetition Queue) (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#4ECDC4]" />
              <span>Memory Loop™ (Due Today)</span>
            </h2>
          </div>

          <div className="glass-panel p-5 space-y-3 border border-white/15">
            <p className="text-xs text-slate-400 leading-relaxed">
              AI spaced-repetition algorithm based on the <span className="text-white font-semibold">Ebbinghaus Forgetting Curve</span>.
            </p>

            <div className="space-y-2.5">
              {memoryItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab('flashcards')}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-white group-hover:text-[#4ECDC4]">
                      {item.conceptTitle}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.subjectName} • {item.daysSinceLastReview} days ago
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400">
                      {item.retentionProbability}% Retained
                    </span>
                    <div className="text-[9px] font-semibold text-[#6C63FF] uppercase tracking-wider">
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('flashcards')}
              className="w-full btn-secondary-glow py-2.5 text-xs font-bold text-slate-900 rounded-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Zap className="w-4 h-4 fill-slate-900" />
              <span>Start 10-Min Review Loop</span>
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: DAILY AI MOTIVATION & QUICK ACTIONS */}
      <div className="glass-panel p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFB84D]/10 border border-[#FFB84D]/30 flex items-center justify-center shrink-0">
            <Quote className="w-6 h-6 text-[#FFB84D]" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#FFB84D] uppercase tracking-widest">
              Daily AI Learning Insight
            </div>
            <p className="text-sm font-medium text-slate-200 italic">
              "{randomQuote.quote}"
            </p>
            <div className="text-xs text-slate-400">
              — {randomQuote.author}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-4 py-2.5 rounded-xl bg-[#6C63FF]/20 hover:bg-[#6C63FF]/30 border border-[#6C63FF]/40 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Take Adaptive Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
