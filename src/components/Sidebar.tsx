import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Calendar, 
  AlertTriangle, 
  MessageSquareText, 
  Network, 
  User, 
  Sparkles,
  Compass,
  ArrowRight,
  Flame
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  examReadiness: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  examReadiness
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'library', label: 'Study Library', icon: BookOpen, badge: '3' },
    { id: 'summary', label: 'AI Summary', icon: Sparkles, badge: 'New' },
    { id: 'flashcards', label: 'Flashcards 3D', icon: Layers, badge: '32' },
    { id: 'quiz', label: 'Quiz Generator', icon: HelpCircle, badge: 'Adaptive' },
    { id: 'weak-topics', label: 'Weak Topics', icon: AlertTriangle, badge: '2 Alert' },
    { id: 'planner', label: 'Study Planner', icon: Calendar, badge: 'Target' },
    { id: 'chat', label: 'AI Chat Notes', icon: MessageSquareText, badge: 'Sources' },
    { id: 'concept-map', label: 'Concept Map', icon: Network, badge: 'Graph' },
    { id: 'profile', label: 'Profile & XP', icon: User, badge: 'Lvl 14' },
    { id: 'landing', label: 'Landing Page', icon: Compass, badge: 'Public' },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] p-4 border-r border-white/10 bg-[#09090B]/60 backdrop-blur-md overflow-y-auto">
      <div className="flex flex-col h-full justify-between gap-6">
        
        {/* Navigation List */}
        <div className="space-y-1">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation Hub
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6C63FF]/25 to-[#4ECDC4]/15 border border-[#6C63FF]/40 text-white shadow-[0_4px_16px_rgba(108,99,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#4ECDC4]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive 
                      ? 'bg-[#4ECDC4]/20 text-[#4ECDC4] border border-[#4ECDC4]/30' 
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Exam Readiness & Memory Loop Widget Card */}
        <div className="glass-panel p-4 space-y-3 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#6C63FF]/15 blur-xl group-hover:scale-125 transition-transform" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Exam Readiness</span>
            <span className="text-xs font-bold text-[#4ECDC4]">{examReadiness}%</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-emerald-400 transition-all duration-1000"
              style={{ width: `${examReadiness}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            AI predicts <span className="text-emerald-400 font-semibold">High Readiness</span> for your Molecular Biology final in 6 days.
          </p>

          <button
            onClick={() => setActiveTab('weak-topics')}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#6C63FF] hover:text-[#4ECDC4] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 rounded-xl border border-[#6C63FF]/30 transition-all cursor-pointer"
          >
            <span>Review Weak Spots</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
