import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  FileText, 
  Cpu, 
  Layers, 
  HelpCircle, 
  AlertTriangle, 
  Calendar, 
  MessageSquareText,
  Zap,
  Share2,
  BrainCircuit,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenUpload: () => void;
  onOpenShare: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenUpload, onOpenShare }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const features = [
    {
      title: '1. Upload Notes',
      desc: 'Drag and drop PDFs, DOCX, or TXT notes. MindLoop instantly ingests and vectorizes your material.',
      icon: FileText,
      color: '#6C63FF'
    },
    {
      title: '2. AI Summary Engine',
      desc: 'Auto-generates executive summaries, key concepts, formulas, definitions, and real-world examples.',
      icon: Cpu,
      color: '#4ECDC4'
    },
    {
      title: '3. 3D Flip Flashcards',
      desc: 'Interactive 3D cards with spaced-repetition difficulty scoring and favorite bookmarking.',
      icon: Layers,
      color: '#FFB84D'
    },
    {
      title: '4. Adaptive Quiz Generator',
      desc: 'Smart MCQ, True/False, and short-answer quizzes that adjust difficulty based on your performance.',
      icon: HelpCircle,
      color: '#6C63FF'
    },
    {
      title: '5. Weak Topic Detection',
      desc: 'AI detects memory gaps and lower-confidence sub-topics with radar graph visualization.',
      icon: AlertTriangle,
      color: '#FF4757'
    },
    {
      title: '6. AI Study Planner',
      desc: 'Calculates optimal revision intervals leading up to your exam date to prevent cramming.',
      icon: Calendar,
      color: '#2ED573'
    },
    {
      title: '7. Exam Readiness Score',
      desc: 'Live circular readiness metric and retention curve forecast predicting your target grade.',
      icon: TrendingUp,
      color: '#4ECDC4'
    },
    {
      title: '8. Chat with Notes & Sources',
      desc: 'Ask questions directly to your uploaded notes with exact page & paragraph citations.',
      icon: MessageSquareText,
      color: '#FFB84D'
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden space-y-24 pb-20">
      
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#6C63FF]/20 via-[#4ECDC4]/15 to-[#FFB84D]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] -left-40 w-[600px] h-[600px] bg-[#6C63FF]/15 blur-[160px] pointer-events-none rounded-full" />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-bold tracking-wide text-[#4ECDC4] shadow-lg animate-float">
            <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
            <span>Next-Gen AI Learning Engine 2026</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[#Outfit] tracking-tight text-white leading-[1.1]">
              MindLoop
            </h1>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-primary leading-tight">
              Learn Smarter. <br className="hidden sm:inline" />
              Remember Longer. <br className="hidden sm:inline" />
              Master Faster.
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Upload your notes once. MindLoop automatically creates executive summaries, interactive 3D flashcards, adaptive quizzes, personalized study plans, and predicts your exam readiness using AI.
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="btn-primary-glow w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(108,99,255,0.4)] cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenShare}
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2.5 backdrop-blur-md transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#4ECDC4]" />
              <span>Share Access</span>
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2.5 backdrop-blur-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#4ECDC4] fill-[#4ECDC4]" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-extrabold text-white font-[#Outfit]">94.8%</div>
              <div className="text-xs text-slate-400">Exam Pass Rate</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#4ECDC4] font-[#Outfit]">3.2x</div>
              <div className="text-xs text-slate-400">Faster Retention</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#FFB84D] font-[#Outfit]">500k+</div>
              <div className="text-xs text-slate-400">Notes Converted</div>
            </div>
          </div>

        </div>

        {/* Right Column: 3D AI Brain & Learning Loop Visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          <div className="relative w-full max-w-md aspect-square rounded-[32px] glass-panel p-6 border border-white/20 shadow-[0_20px_80px_rgba(108,99,255,0.3)] flex flex-col justify-between overflow-hidden group">
            
            {/* Glowing Neural Mesh Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 via-transparent to-[#4ECDC4]/20 pointer-events-none" />

            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white font-semibold">
                <BrainCircuit className="w-4 h-4 text-[#4ECDC4] animate-pulse" />
                <span>Neural Adaptation Active</span>
              </div>
              <span className="text-xs font-bold text-[#FFB84D] bg-[#FFB84D]/10 px-2.5 py-1 rounded-full border border-[#FFB84D]/20">
                86% Readiness
              </span>
            </div>

            {/* Central Animated 3D AI Brain Visual */}
            <div className="relative my-auto flex flex-col items-center justify-center py-6">
              
              {/* Rotating Outer Ring */}
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#6C63FF]/50 animate-spin [animation-duration:15s] flex items-center justify-center" />
              
              {/* Counter Rotating Inner Ring */}
              <div className="absolute w-36 h-36 rounded-full border border-[#4ECDC4]/60 animate-spin [animation-duration:10s] [animation-direction:reverse]" />

              {/* Glowing Core */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#6C63FF] via-[#4ECDC4] to-[#FFB84D] p-1 shadow-[0_0_50px_rgba(78,205,196,0.6)] flex items-center justify-center animate-pulse">
                <div className="w-full h-full bg-[#13131A] rounded-full flex items-center justify-center">
                  <Zap className="w-10 h-10 text-[#4ECDC4]" />
                </div>
              </div>

              {/* Floating Mini Flashcards around core */}
              <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-xl glass-panel text-[11px] font-semibold text-white border border-white/20 shadow-lg animate-float">
                💡 ATP Yield: 30-32
              </div>
              <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-xl glass-panel text-[11px] font-semibold text-[#4ECDC4] border border-[#4ECDC4]/30 shadow-lg animate-float [animation-delay:2s]">
                🎯 Memory Loop™ Active
              </div>

            </div>

            {/* Bottom Status Badge */}
            <div className="z-10 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Next Spaced Review:</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#6C63FF]" /> Today, 6:00 PM
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold uppercase tracking-widest border border-[#6C63FF]/30">
            Engineered For Top Performance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[#Outfit]">
            Everything You Need To Master Any Subject
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Replace fragmented study tools with an end-to-end AI platform built around cognitive science and active recall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card-interactive p-6 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feat.color}20`, border: `1px solid ${feat.color}40` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feat.color }} />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#4ECDC4] transition-colors font-[#Outfit]">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-2 text-xs font-semibold text-slate-400 group-hover:text-white flex items-center gap-1">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* DEMO VIDEO MODAL PREVIEW */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-3xl p-6 space-y-4 border border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">MindLoop Product Tour</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-white/10"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-video w-full rounded-2xl bg-[#13131A] border border-white/10 flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#6C63FF]/20 flex items-center justify-center border border-[#6C63FF]/50 animate-pulse">
                <Play className="w-8 h-8 text-[#4ECDC4] fill-[#4ECDC4] ml-1" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Interactive Prototype Ready</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  Click "Get Started Free" below to explore all live features directly in your browser!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onGetStarted();
                }}
                className="btn-primary-glow px-6 py-2.5 rounded-xl text-xs font-bold text-white"
              >
                Launch MindLoop Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
