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
  RotateCcw,
  Star,
  ChevronDown,
  Github,
  Twitter,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Code2,
  X
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onOpenUpload: () => void;
  onOpenShare: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onOpenUpload, onOpenShare }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeFeatureCategory, setActiveFeatureCategory] = useState<'All' | 'AI Ingestion' | 'Smart Revision' | 'Analytics'>('All');

  const features = [
    {
      title: '1. Instant Note Ingestion',
      desc: 'Drag & drop PDFs, DOCX, or handwritten notes. MindLoop ingests, parses, and vectorizes structural concepts in seconds.',
      icon: FileText,
      color: '#6C63FF',
      category: 'AI Ingestion'
    },
    {
      title: '2. AI Summary Synthesizer',
      desc: 'Generates executive key concepts, mathematical formulas, core definitions, and real-world examples with copy & PDF export.',
      icon: Cpu,
      color: '#4ECDC4',
      category: 'AI Ingestion'
    },
    {
      title: '3. 3D Flip Flashcards',
      desc: 'Interactive 3D cards with spaced-repetition difficulty scoring, confidence tags, audio pronunciation, and favorite bookmarking.',
      icon: Layers,
      color: '#FFB84D',
      category: 'Smart Revision'
    },
    {
      title: '4. Adaptive Quiz Generator',
      desc: 'Generates MCQ, True/False, and short-answer quizzes that dynamically adjust difficulty based on your active retrieval score.',
      icon: HelpCircle,
      color: '#6C63FF',
      category: 'Smart Revision'
    },
    {
      title: '5. AI Weak Topic Detection',
      desc: 'Identifies memory gaps and lower-confidence sub-topics using Recharts Radar graphs and provides targeted remediation plans.',
      icon: AlertTriangle,
      color: '#FF4757',
      category: 'Analytics'
    },
    {
      title: '6. Spaced Repetition Planner',
      desc: 'Calculates optimal revision intervals leading up to your exam date based on the Ebbinghaus Forgetting Curve.',
      icon: Calendar,
      color: '#2ED573',
      category: 'Smart Revision'
    },
    {
      title: '7. Circular Exam Readiness',
      desc: 'Live circular readiness metric and retention forecast predicting your target exam grade in real-time.',
      icon: TrendingUp,
      color: '#4ECDC4',
      category: 'Analytics'
    },
    {
      title: '8. Grounded Note Assistant',
      desc: 'Chat directly with your notes and receive answers with verified PDF page & paragraph citations.',
      icon: MessageSquareText,
      color: '#FFB84D',
      category: 'AI Ingestion'
    }
  ];

  const filteredFeatures = activeFeatureCategory === 'All'
    ? features
    : features.filter(f => f.category === activeFeatureCategory);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Pre-Med Student @ Stanford University',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      quote: 'MindLoop cut my MCAT review time in half. The 3D flashcards and weak spot radar showed me exactly what to focus on before exam day.',
      rating: 5,
      subject: 'Organic Chemistry & Bioenergetics'
    },
    {
      name: 'David K. Miller',
      role: 'Computer Science Major @ MIT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote: 'The AI chat with exact PDF page citations is unmatched. I can verify formulas in seconds without flipping through 500-page textbooks.',
      rating: 5,
      subject: 'Quantum Computing & Physics'
    },
    {
      name: 'Elena Rostova',
      role: 'Neuroscience Scholar @ Harvard',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      quote: 'The Concept Connections mind map makes complex biological pathways click instantly. Truly a billion-dollar AI startup product.',
      rating: 5,
      subject: 'Molecular Neurobiology'
    }
  ];

  const faqs = [
    {
      q: 'How does MindLoop predict my Exam Readiness Score?',
      a: 'MindLoop uses cognitive neuroscience algorithms based on the Ebbinghaus Forgetting Curve, tracking your active retrieval speed, quiz accuracy, and confidence ratings across spaced-repetition loops.'
    },
    {
      q: 'Can I upload PDFs, Word documents, or handwritten notes?',
      a: 'Yes! MindLoop accepts PDF, DOCX, and TXT files up to 50MB. Text is parsed into structural vector tokens for summaries, 3D cards, and quizzes.'
    },
    {
      q: 'How does AI Chat ground answers in my uploaded notes?',
      a: 'MindLoop indexes your document into vector chunks. When you ask a question, the assistant retrieves relevant excerpts and attaches exact page & paragraph citations.'
    },
    {
      q: 'Is MindLoop designed for team and group study?',
      a: 'Absolute yes! MindLoop includes a 4-Member Hackathon Team Hub where study partners can compare XP leaderboards, battle in group quiz challenges, and sync weak spot analytics.'
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 relative overflow-hidden space-y-28 pb-20 animate-fadeIn">
      
      {/* FLOATING GRADIENT BACKGROUND ORBS & GLOW PARTICLES */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-[#6C63FF]/25 via-[#4ECDC4]/20 to-[#FFB84D]/15 blur-[160px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute top-[800px] -left-48 w-[650px] h-[650px] bg-[#6C63FF]/20 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-[1600px] -right-48 w-[650px] h-[650px] bg-[#4ECDC4]/20 blur-[180px] pointer-events-none rounded-full" />

      {/* ANIMATED HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/15 text-xs font-bold tracking-wide text-[#4ECDC4] shadow-lg">
            <Sparkles className="w-4 h-4 text-[#4ECDC4] animate-spin" />
            <span>Next-Gen AI Learning Engine 2026</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[#Outfit] tracking-tight text-white leading-[1.08]">
              MindLoop
            </h1>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-primary leading-tight">
              Learn Smarter. <br className="hidden sm:inline" />
              Remember Longer. <br className="hidden sm:inline" />
              Master Faster.
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            Upload your notes once. MindLoop transforms them into summaries, 3D flashcards, quizzes, personalized study plans, and AI learning insights.
          </p>

          {/* CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="btn-primary-glow w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(108,99,255,0.4)] hover:scale-105 transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenShare}
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center gap-2.5 backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#4ECDC4]" />
              <span>Share Access</span>
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center gap-2.5 backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#4ECDC4] fill-[#4ECDC4]" />
              <span>View Demo</span>
            </button>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-extrabold text-white font-[#Outfit]">94.8%</div>
              <div className="text-xs text-slate-400 font-medium">Exam Pass Rate</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#4ECDC4] font-[#Outfit]">3.2x</div>
              <div className="text-xs text-slate-400 font-medium">Faster Retention</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#FFB84D] font-[#Outfit]">500k+</div>
              <div className="text-xs text-slate-400 font-medium">Notes Converted</div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Floating AI Cards & 3D Visual */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-[36px] glass-panel p-6 border border-white/20 shadow-[0_20px_80px_rgba(108,99,255,0.35)] flex flex-col justify-between overflow-hidden group">
            
            {/* Glowing Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 via-transparent to-[#4ECDC4]/20 pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-semibold backdrop-blur-md">
                <BrainCircuit className="w-4 h-4 text-[#4ECDC4] animate-pulse" />
                <span>Neural Adaptation Active</span>
              </div>
              <span className="text-xs font-bold text-[#FFB84D] bg-[#FFB84D]/10 px-3 py-1 rounded-full border border-[#FFB84D]/30">
                86% Readiness
              </span>
            </div>

            {/* Central Animated Core */}
            <div className="relative my-auto flex flex-col items-center justify-center py-6">
              <div className="w-48 h-48 rounded-full border-2 border-dashed border-[#6C63FF]/50 animate-spin [animation-duration:15s] flex items-center justify-center" />
              <div className="absolute w-36 h-36 rounded-full border border-[#4ECDC4]/60 animate-spin [animation-duration:10s] [animation-direction:reverse]" />

              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#6C63FF] via-[#4ECDC4] to-[#FFB84D] p-1 shadow-[0_0_50px_rgba(78,205,196,0.6)] flex items-center justify-center animate-pulse">
                <div className="w-full h-full bg-[#13131A] rounded-full flex items-center justify-center">
                  <Zap className="w-10 h-10 text-[#4ECDC4]" />
                </div>
              </div>

              {/* Floating Mini Flashcard Chips */}
              <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-xl glass-panel text-[11px] font-semibold text-white border border-white/20 shadow-lg animate-float">
                💡 ATP Yield: 30-32
              </div>

              <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-xl glass-panel text-[11px] font-semibold text-[#4ECDC4] border border-[#4ECDC4]/30 shadow-lg animate-float [animation-delay:2s]">
                🎯 Memory Loop™ Active
              </div>
            </div>

            {/* Bottom Status */}
            <div className="z-10 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Next Spaced Review:</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#6C63FF]" /> Today, 6:00 PM
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* STATISTICS COUNTER BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#6C63FF]/10 via-[#13131A] to-[#4ECDC4]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-[#Outfit]">500,000+</div>
            <div className="text-xs text-slate-400 font-medium">Notes Transformed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#4ECDC4] font-[#Outfit]">94.8%</div>
            <div className="text-xs text-slate-400 font-medium">Exam Pass Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#FFB84D] font-[#Outfit]">12.4M</div>
            <div className="text-xs text-slate-400 font-medium">3D Flashcards Mastered</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#6C63FF] font-[#Outfit]">4.9 / 5.0</div>
            <div className="text-xs text-slate-400 font-medium">Student Rating</div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FEATURE CARDS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold uppercase tracking-widest border border-[#6C63FF]/30">
            Engineered For High Performance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[#Outfit]">
            Everything You Need To Master Any Subject
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Replace fragmented study tools with an end-to-end AI platform built around cognitive science and active recall.
          </p>

          {/* Feature Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {(['All', 'AI Ingestion', 'Smart Revision', 'Analytics'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFeatureCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFeatureCategory === cat
                    ? 'bg-[#6C63FF] text-white shadow-lg border border-[#6C63FF]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={onGetStarted}
                className="glass-card-interactive p-6 space-y-4 flex flex-col justify-between group cursor-pointer border border-white/15 hover:-translate-y-1.5 transition-all duration-300"
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

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-bold uppercase tracking-widest border border-[#4ECDC4]/30">
            Loved By Top Scholars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-[#Outfit]">
            What High Performers Say About MindLoop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-6 space-y-4 border border-white/15 flex flex-col justify-between hover:border-[#4ECDC4]/40 hover:-translate-y-1 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#4ECDC4]" />
                <div>
                  <h4 className="text-xs font-bold text-white font-[#Outfit]">{t.name}</h4>
                  <span className="text-[11px] text-slate-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 text-[#6C63FF] text-xs font-bold uppercase tracking-widest border border-[#6C63FF]/30">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-[#Outfit]">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel border border-white/15 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left text-sm font-bold text-white font-[#Outfit] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#4ECDC4] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PROFESSIONAL FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-white/10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-[#Outfit] font-extrabold text-xl text-white">
              <Zap className="w-5 h-5 text-[#4ECDC4]" />
              <span>MindLoop AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Billion-dollar AI learning engine transforming static notes into adaptive flashcards, quizzes, and retention mastery.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white font-[#Outfit] uppercase tracking-wider">Product Features</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={onGetStarted} className="hover:text-[#4ECDC4]">AI Executive Summaries</button></li>
              <li><button onClick={onGetStarted} className="hover:text-[#4ECDC4]">3D Flip Flashcards</button></li>
              <li><button onClick={onGetStarted} className="hover:text-[#4ECDC4]">Adaptive Quiz Generator</button></li>
              <li><button onClick={onGetStarted} className="hover:text-[#4ECDC4]">Weak Topic Radar</button></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white font-[#Outfit] uppercase tracking-wider">Hackathon Roster</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Alex Morgan <span className="text-[#4ECDC4] font-semibold">(Member 1 • Frontend)</span></li>
              <li>Priya Sharma <span className="text-slate-500">(Member 2 • AI Lead)</span></li>
              <li>Marcus Vance <span className="text-slate-500">(Member 3 • Full Stack)</span></li>
              <li>Elena Rostova <span className="text-slate-500">(Member 4 • UI/UX)</span></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white font-[#Outfit] uppercase tracking-wider">Community & Code</h4>
            <div className="flex items-center gap-3">
              <button onClick={onOpenShare} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-400">
              © 2026 MindLoop AI Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* DEMO VIDEO MODAL PREVIEW */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-3xl p-6 space-y-4 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-[#Outfit]">MindLoop Product Demo Tour</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="aspect-video w-full rounded-2xl bg-[#13131A] border border-white/10 flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#6C63FF]/20 flex items-center justify-center border border-[#6C63FF]/50 animate-pulse">
                <Play className="w-8 h-8 text-[#4ECDC4] fill-[#4ECDC4] ml-1" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-[#Outfit]">Interactive Prototype Ready</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  Click "Launch MindLoop Dashboard" below to explore all live features directly in your browser!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onGetStarted();
                }}
                className="btn-primary-glow px-6 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
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
