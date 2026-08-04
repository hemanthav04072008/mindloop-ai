import React, { useState } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  TrendingUp,
  Brain,
  Award,
  Zap
} from 'lucide-react';
import { WeakTopic } from '../types';
import { EmptyState } from '../components/EmptyState';

interface WeakTopicsPageProps {
  weakTopics: WeakTopic[];
  setActiveTab: (tab: string) => void;
}

export const WeakTopicsPage: React.FC<WeakTopicsPageProps> = ({ weakTopics, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [topicTab, setTopicTab] = useState<'weak' | 'strong'>('weak');

  // Data for Recharts Radar chart
  const radarData = [
    { subject: 'Glycolysis', confidence: 85, target: 90 },
    { subject: 'Krebs Cycle', confidence: 72, target: 85 },
    { subject: 'Complex II ETC', confidence: 42, target: 80 },
    { subject: 'ATP Synthase', confidence: 78, target: 85 },
    { subject: 'PFK-1 Regulation', confidence: 65, target: 85 },
    { subject: 'Fermentation', confidence: 92, target: 90 },
  ];

  // Ebbinghaus Memory Retention Curve data
  const retentionCurveData = [
    { day: 'Day 0', withSpacedRecall: 100, withoutRecall: 100 },
    { day: 'Day 1', withSpacedRecall: 94, withoutRecall: 60 },
    { day: 'Day 2', withSpacedRecall: 91, withoutRecall: 45 },
    { day: 'Day 3', withSpacedRecall: 88, withoutRecall: 33 },
    { day: 'Day 5', withSpacedRecall: 86, withoutRecall: 25 },
    { day: 'Day 7', withSpacedRecall: 84, withoutRecall: 18 },
  ];

  // Strong Topics (Mastered 85%+)
  const strongTopics = [
    { name: 'Fermentation & Anaerobic Glycolysis', confidence: 92, category: 'Biology', lastReviewed: '2 days ago' },
    { name: 'Glycolysis Preparation Phase', confidence: 88, category: 'Biology', lastReviewed: 'Yesterday' },
    { name: 'Citrate Synthase Condensation', confidence: 86, category: 'Biology', lastReviewed: '3 days ago' },
    { name: 'SN2 Nucleophilic Attack Mechanics', confidence: 91, category: 'Chemistry', lastReviewed: 'Today' },
  ];

  const filteredWeakTopics = weakTopics.filter((t) => {
    const matchesSearch = t.topicName.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = urgencyFilter === 'All' || t.urgency === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 space-y-2 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
              <Brain className="w-4 h-4 text-[#4ECDC4]" />
              <span>AI Learning Analytics & Retention Radar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
              Knowledge Score & Mastery Analytics
            </h1>
            <p className="text-sm text-slate-300">
              MindLoop tracks quiz error rates, active retrieval speed, and memory decay to forecast your exam readiness.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/[0.04] text-slate-100 placeholder-slate-400 rounded-xl border border-white/10 focus:border-[#4ECDC4]/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TOP KNOWLEDGE SCORE SUMMARY GAUGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 border border-white/15 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">AI Knowledge Score</span>
            <div className="text-3xl font-extrabold text-[#4ECDC4] font-[#Outfit]">88 / 100</div>
            <div className="text-[11px] text-emerald-400 font-semibold">+6 pts this week</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 flex items-center justify-center text-[#4ECDC4]">
            <Brain className="w-7 h-7" />
          </div>
        </div>

        <div className="glass-panel p-5 border border-white/15 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">7-Day Retention Probability</span>
            <div className="text-3xl font-extrabold text-[#6C63FF] font-[#Outfit]">84.2%</div>
            <div className="text-[11px] text-[#6C63FF] font-semibold">Memory Loop™ Active</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/10 border border-[#6C63FF]/30 flex items-center justify-center text-[#6C63FF]">
            <Zap className="w-7 h-7" />
          </div>
        </div>

        <div className="glass-panel p-5 border border-white/15 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400">Exam Readiness Grade</span>
            <div className="text-3xl font-extrabold text-amber-400 font-[#Outfit]">A+ (92%+)</div>
            <div className="text-[11px] text-amber-400 font-semibold">Target Grade On Track</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: RADAR CHART & MEMORY RETENTION CURVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Radar Chart (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <span>Sub-Topic Mastery Radar</span>
            </h2>
            <span className="text-xs text-slate-400">Target: 85%+</span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" />
                <Radar 
                  name="Confidence" 
                  dataKey="confidence" 
                  stroke="#6C63FF" 
                  fill="#6C63FF" 
                  fillOpacity={0.35} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Ebbinghaus Memory Retention Curve Chart (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 space-y-4 border border-white/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
              <span>Ebbinghaus Memory Retention Curve</span>
            </h2>
            <span className="text-xs text-[#4ECDC4] font-semibold">Active Spacing Impact</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurveData}>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13131A', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="withSpacedRecall" stroke="#4ECDC4" strokeWidth={3} name="With MindLoop Spacing" />
                <Line type="monotone" dataKey="withoutRecall" stroke="#FF4757" strokeWidth={2} strokeDasharray="4 4" name="Without Revision" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5 text-[#4ECDC4] font-semibold">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" /> MindLoop Active Spacing (+66% Retention)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Passive Cramming Decay
            </span>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: WEAK TOPICS VS STRONG TOPICS SPLIT TABS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTopicTab('weak')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                topicTab === 'weak'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Priority Weak Topics ({filteredWeakTopics.length})
            </button>

            <button
              onClick={() => setTopicTab('strong')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                topicTab === 'strong'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              Mastered Strong Topics ({strongTopics.length})
            </button>
          </div>

          {topicTab === 'weak' && (
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              {(['All', 'High', 'Medium', 'Low'] as const).map((urgency) => (
                <button
                  key={urgency}
                  onClick={() => setUrgencyFilter(urgency)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    urgencyFilter === urgency
                      ? 'bg-[#6C63FF] text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {urgency}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: WEAK TOPICS GRID */}
        {topicTab === 'weak' && (
          filteredWeakTopics.length === 0 ? (
            <EmptyState
              title="No Weak Topics Match Filter"
              description="You don't have any weak topics matching your current search query and urgency filter."
              actionText="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setUrgencyFilter('All');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWeakTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="glass-panel p-5 space-y-3 border border-white/15 hover:border-rose-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                      Urgency: {topic.urgency}
                    </span>
                    <span className="text-xs text-slate-400">
                      {topic.confidenceScore}% Confidence
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white font-[#Outfit]">
                      {topic.topicName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Subject: {topic.subject} • Error Rate: {topic.errorRate}%
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-[#4ECDC4] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Recommendation:
                    </span>
                    <p>{topic.recommendation}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className="w-full btn-primary-glow py-2.5 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Drill Targeted Flashcards</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )
        )}

        {/* TAB 2: STRONG TOPICS GRID */}
        {topicTab === 'strong' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strongTopics.map((topic, idx) => (
              <div 
                key={idx}
                className="glass-panel p-5 space-y-3 border border-white/15 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mastered Topic
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {topic.confidence}% Score
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-[#Outfit]">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Category: {topic.category} • Last Reviewed: {topic.lastReviewed}
                  </p>
                </div>

                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4ECDC4] to-emerald-400"
                    style={{ width: `${topic.confidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
