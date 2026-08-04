import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
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
  Share2,
  Users,
  Trophy,
  Crown,
  Activity,
  FileText,
  Calendar
} from 'lucide-react';
import type { UserProfile, Subject, MemoryLoopItem } from '../types';
import { AI_MOTIVATIONAL_QUOTES, HACKATHON_TEAM_MEMBERS } from '../data/mockData';

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
  const teamMembers = HACKATHON_TEAM_MEMBERS;
  const totalTeamXp = teamMembers.reduce((acc, m) => acc + m.xp, 0);

  // Weekly study data for Recharts Area Chart
  const weeklyStudyData = [
    { day: 'Mon', hours: 3.5, cards: 45 },
    { day: 'Tue', hours: 4.2, cards: 62 },
    { day: 'Wed', hours: 5.0, cards: 78 },
    { day: 'Thu', hours: 2.8, cards: 35 },
    { day: 'Fri', hours: 6.1, cards: 95 },
    { day: 'Sat', hours: 4.8, cards: 70 },
    { day: 'Sun', hours: 3.2, cards: 50 },
  ];

  // Simulated 28-day GitHub-style study heatmap intensity array (0 = light, 3 = high)
  const heatmapDays = [
    2, 3, 1, 0, 3, 2, 3,
    1, 2, 3, 3, 2, 1, 3,
    0, 2, 3, 1, 3, 2, 2,
    3, 3, 2, 1, 3, 3, 3
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner & Greeting */}
      <div className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#6C63FF]/20 blur-3xl pointer-events-none" />
        
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 text-[#4ECDC4] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Hackathon Team Hub • 4 Members Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-[#Outfit]">
            Welcome back, {user.name.split(' ')[0]}! 🚀
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            You and your <span className="text-[#4ECDC4] font-bold">4-member team</span> have reached <span className="text-amber-400 font-bold">{totalTeamXp.toLocaleString()} Team XP</span>! MindLoop has synced your team's weak topics and study schedule.
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
            <span>Upload Notes</span>
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

      {/* 4-MEMBER HACKATHON TEAM HUB WIDGET */}
      <div className="glass-panel p-6 space-y-4 border border-[#6C63FF]/30 bg-gradient-to-r from-[#6C63FF]/10 via-transparent to-[#4ECDC4]/10 shadow-[0_10px_30px_rgba(108,99,255,0.15)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#4ECDC4] p-[1.5px]">
              <div className="w-full h-full bg-[#13131A] rounded-[10.5px] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#4ECDC4]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-[#Outfit]">
                  Hackathon Team Hub (4 Members)
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Syncing Live
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Collaborative mastery leaderboard & real-time study stats across all 4 team members.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{totalTeamXp.toLocaleString()} Total XP</span>
            </div>

            <button
              onClick={() => setActiveTab('quiz')}
              className="btn-secondary-glow px-4 py-2 rounded-xl text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-900" />
              <span>Group Quiz Battle</span>
            </button>
          </div>
        </div>

        {/* 4 Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#4ECDC4]/40 transition-all flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative shrink-0">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#6C63FF]/50 group-hover:border-[#4ECDC4] transition-colors"
                />
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#09090B] ${
                  member.status === 'Online' 
                    ? 'bg-emerald-400' 
                    : member.status === 'In Quiz'
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-[#6C63FF]'
                }`} />
              </div>

              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-[#4ECDC4] transition-colors truncate">
                    {member.name}
                  </h4>
                  {idx === 0 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {member.role}
                </div>
                <div className="flex items-center justify-between text-[10px] pt-1">
                  <span className="font-semibold text-[#6C63FF]">{member.xp} XP</span>
                  <span className="text-slate-400">{member.cardsMastered} Cards</span>
                </div>
              </div>
            </div>
          ))}
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

      {/* WEEKLY PROGRESS AREA CHART & LEARNING HEATMAP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Weekly Progress Area Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#6C63FF]" />
              <span>Weekly Study Hours & Cards Mastered</span>
            </h2>
            <span className="text-xs text-emerald-400 font-semibold">+18.5% vs Last Week</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyStudyData}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13131A', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }} 
                />
                <Area type="monotone" dataKey="hours" stroke="#6C63FF" strokeWidth={2.5} fillOpacity={1} fill="url(#hoursGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: GitHub-Style Learning Heatmap Grid (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 space-y-4 border border-white/15 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#4ECDC4]" />
                <span>28-Day Study Heatmap</span>
              </h2>
              <span className="text-xs text-amber-400 font-bold">28 Days Active</span>
            </div>
            <p className="text-xs text-slate-400">
              Daily active recall intensity across the past 4 weeks.
            </p>
          </div>

          <div className="grid grid-cols-7 gap-2 my-auto">
            {heatmapDays.map((level, idx) => {
              const bgColors = [
                'bg-white/5 border-white/10',
                'bg-[#6C63FF]/30 border-[#6C63FF]/40',
                'bg-[#4ECDC4]/50 border-[#4ECDC4]/60',
                'bg-[#4ECDC4] border-emerald-400 shadow-[0_0_10px_rgba(78,205,196,0.5)]'
              ];
              return (
                <div
                  key={idx}
                  title={`Day ${idx + 1}: ${level * 1.5} hrs studied`}
                  className={`aspect-square rounded-lg border ${bgColors[level]} transition-transform hover:scale-110 cursor-pointer`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <span>Less Active</span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
              <div className="w-3 h-3 rounded bg-[#6C63FF]/30" />
              <div className="w-3 h-3 rounded bg-[#4ECDC4]/50" />
              <div className="w-3 h-3 rounded bg-[#4ECDC4]" />
            </div>
            <span>High Intensity</span>
          </div>
        </div>

      </div>

      {/* RECENT UPLOADS & MEMORY LOOP QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent Transformed Notes (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#6C63FF]" />
              <span>Recent Uploads & AI Summaries</span>
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
