import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { AlertTriangle, Sparkles, ArrowRight, Target, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { WeakTopic } from '../types';

interface WeakTopicsPageProps {
  weakTopics: WeakTopic[];
  setActiveTab: (tab: string) => void;
}

export const WeakTopicsPage: React.FC<WeakTopicsPageProps> = ({ weakTopics, setActiveTab }) => {
  // Data for Recharts Radar chart
  const radarData = [
    { subject: 'Glycolysis', confidence: 85, target: 90 },
    { subject: 'Krebs Cycle', confidence: 72, target: 85 },
    { subject: 'Complex II ETC', confidence: 42, target: 80 },
    { subject: 'ATP Synthase', confidence: 78, target: 85 },
    { subject: 'PFK-1 Regulation', confidence: 65, target: 85 },
    { subject: 'Fermentation', confidence: 92, target: 90 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 space-y-2 border border-white/15">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>AI Knowledge Gap Detector</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
          Weak Topic & Mastery Analysis
        </h1>
        <p className="text-sm text-slate-300">
          MindLoop continuously tracks quiz errors and flashcard delays to pin-point exact sub-topics that need target revision.
        </p>
      </div>

      {/* TOP ROW: RADAR CHART & HEAT MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Radar Chart (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 space-y-4 border border-white/15">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <span>Topic Mastery Radar</span>
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

        {/* Right: Confidence Heat Map Grid (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 space-y-4 border border-white/15">
          <h2 className="text-base font-bold text-white font-[#Outfit] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#4ECDC4]" />
            <span>Sub-Topic Confidence Heatmap</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {radarData.map((item, idx) => {
              const isWeak = item.confidence < 70;
              return (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                    isWeak
                      ? 'bg-rose-500/10 border-rose-500/30'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <span className="text-xs font-semibold text-white line-clamp-1">
                    {item.subject}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className={`text-base font-extrabold ${isWeak ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {item.confidence}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {isWeak ? 'Review' : 'Solid'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: DETAILED WEAK TOPICS CARDS & AI RECOMMENDATIONS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Priority Remediation Items ({weakTopics.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weakTopics.map((topic) => (
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
      </div>

    </div>
  );
};
