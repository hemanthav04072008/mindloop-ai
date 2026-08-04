import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Search, 
  Share2,
  Volume2,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_NOTE_CELLULAR_RESPIRATION } from '../data/sampleNotes';
import { EmptyState } from '../components/EmptyState';

interface SummaryPageProps {
  setActiveTab: (tab: string) => void;
  onOpenShare?: () => void;
}

export const SummaryPage: React.FC<SummaryPageProps> = ({ setActiveTab, onOpenShare }) => {
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'concepts' | 'formulas' | 'definitions' | 'examples'>('concepts');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const note = SAMPLE_NOTE_CELLULAR_RESPIRATION;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText(note.keyConcepts.join('\n\n'));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    alert("MindLoop AI Summary exported as PDF! (Simulated Download)");
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const filteredConcepts = note.keyConcepts.filter((c) =>
    c.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header & Document Metadata */}
      <div className="glass-panel p-6 space-y-4 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
              <span>AI Synthesized Note Summary</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-[#Outfit]">
              {note.title}
            </h1>
            <p className="text-xs text-slate-400">
              Source: <span className="text-slate-200">Cellular_Respiration_Bioenergetics.pdf</span> • 18 Pages • Transformed today
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button
              onClick={toggleAudio}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#4ECDC4]/20 text-[#4ECDC4] border border-[#4ECDC4]/40 animate-pulse' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#4ECDC4]" />}
              <span>{isPlayingAudio ? 'Pause Audio Digest' : '2-Min AI Audio Summary'}</span>
            </button>

            {onOpenShare && (
              <button
                onClick={onOpenShare}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#4ECDC4]" />
                <span>Share Summary</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>

        </div>

        {/* Search & Navigation Bar inside Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          
          {/* Section Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'concepts', label: 'Key Concepts' },
              { id: 'formulas', label: 'Formulas' },
              { id: 'definitions', label: 'Definitions' },
              { id: 'examples', label: 'Examples' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-[#6C63FF]/25 border border-[#6C63FF]/50 text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Filter input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter summary terms..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/[0.04] text-slate-100 placeholder-slate-400 rounded-xl border border-white/10 focus:border-[#4ECDC4]/50 focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* MAIN CONTENT AREA BY TAB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Filtered Section Body */}
        <div className="lg:col-span-8 space-y-4">
          
          {activeSubTab === 'concepts' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6C63FF]" />
                <span>Executive Key Concepts ({filteredConcepts.length})</span>
              </h2>

              {filteredConcepts.length === 0 ? (
                <EmptyState
                  title="No Matching Concepts Found"
                  description={`No key concept matches "${searchFilter}". Try adjusting your search query.`}
                  actionText="Clear Search"
                  onAction={() => setSearchFilter('')}
                />
              ) : (
                <div className="space-y-3">
                  {filteredConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="glass-panel p-4 space-y-2 border border-white/10 hover:border-[#6C63FF]/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#6C63FF]/20 text-[#6C63FF] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-slate-200 leading-relaxed font-normal">
                          {concept}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'formulas' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
                <span>Important Formulas & Equations</span>
              </h2>

              <div className="space-y-4">
                {note.formulas.map((form, idx) => (
                  <div key={idx} className="glass-panel p-5 space-y-3 border border-white/10">
                    <h3 className="text-xs font-bold text-[#4ECDC4] uppercase tracking-wider">
                      {form.title}
                    </h3>
                    <div className="p-4 rounded-xl bg-[#09090B] border border-white/10 font-mono text-sm sm:text-base text-amber-300 overflow-x-auto">
                      {form.latex}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {form.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'definitions' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white font-[#Outfit] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB84D]" />
                <span>Core Terminology & Definitions</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {note.definitions.map((def, idx) => (
                  <div key={idx} className="glass-panel p-4 space-y-2 border border-white/10">
                    <h3 className="text-sm font-bold text-white font-[#Outfit] underline decoration-[#FFB84D]">
                      {def.term}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {def.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'examples' && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white font-[#Outfit]">
                Real-World Examples & Case Studies
              </h2>

              <div className="space-y-3">
                {note.examples.map((ex, idx) => (
                  <div key={idx} className="glass-panel p-4 border border-white/10 text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-[#4ECDC4] mr-2">Example {idx + 1}:</span>
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 4 Cols: Quick Actions & Quiz Launch */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-5 space-y-4 border border-white/15">
            <h3 className="text-sm font-bold text-white font-[#Outfit] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6C63FF]" />
              <span>Next Learning Actions</span>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              MindLoop has pre-generated 32 3D Flashcards and an Adaptive Practice Quiz based on this summary.
            </p>

            <button
              onClick={() => setActiveTab('flashcards')}
              className="w-full btn-primary-glow py-3 text-xs font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Practice 3D Flashcards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Quote Widget */}
          <div className="glass-panel p-5 border border-white/10 space-y-2">
            <div className="text-[11px] font-bold text-[#FFB84D] uppercase tracking-wider">
              Famous Quote in Document
            </div>
            <p className="text-xs text-slate-300 italic">
              "{note.quotes[0]}"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
