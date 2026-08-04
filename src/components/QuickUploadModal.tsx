import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Cpu,
  Layers,
  HelpCircle,
  AlertCircle,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (docTitle: string) => void;
}

export const QuickUploadModal: React.FC<QuickUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const presets = [
    { title: 'Cellular Respiration & Bioenergetics.pdf', size: '2.4 MB', pages: 18, tag: 'Biology' },
    { title: 'Quantum Mechanics & Wave Functions.pdf', size: '4.1 MB', pages: 32, tag: 'Physics' },
    { title: 'Organic Chemistry Reactions.docx', size: '1.8 MB', pages: 14, tag: 'Chemistry' },
  ];

  const steps = [
    { label: 'Parsing PDF & extracting structural tokens...', icon: FileText },
    { label: 'Building MindLoop vector embeddings & concept graph...', icon: Cpu },
    { label: 'Detecting weak topic patterns & key formulas...', icon: Layers },
    { label: 'Generating 32 3D Flashcards & Adaptive Quiz...', icon: Sparkles }
  ];

  const handleStartProcessing = (title: string) => {
    setErrorMessage(null);
    setSelectedPreset(title);
    setIsProcessing(true);
    setIsCompleted(false);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setIsCompleted(true);
            try {
              confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
            } catch (e) {
              // fallback
            }
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 50 * 1024 * 1024) {
        setErrorMessage("File exceeds maximum size limit of 50MB.");
        return;
      }
      handleStartProcessing(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleStartProcessing(file.name);
    }
  };

  const handleFinish = () => {
    if (selectedPreset) {
      onUploadSuccess(selectedPreset);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#09090B]/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept=".pdf,.docx,.txt" 
          className="hidden" 
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isProcessing && !isCompleted ? (
          <>
            <div>
              <div className="flex items-center gap-2 text-[#4ECDC4] text-xs font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
                <span>AI Note Transformation</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-[#Outfit]">
                Upload PDF or Study Notes
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                MindLoop automatically turns documents into summaries, 3D flashcards, quizzes, and weak-topic radar.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Drag and Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                isDragging 
                  ? 'border-[#4ECDC4] bg-[#4ECDC4]/10 scale-102' 
                  : 'border-[#6C63FF]/40 hover:border-[#4ECDC4] bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7 text-[#6C63FF] group-hover:text-[#4ECDC4]" />
              </div>
              <p className="text-sm font-semibold text-slate-200">
                Drag & drop your file here, or <span className="text-[#4ECDC4] underline">browse files</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF, DOCX, TXT (Max 50MB)
              </p>
            </div>

            {/* Quick Demo Presets */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Or pick a preset sample document:
              </span>
              <div className="space-y-2">
                {presets.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStartProcessing(preset.title)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#6C63FF]/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
                          {preset.title}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {preset.size} • {preset.pages} pages • {preset.tag}
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-semibold text-[#6C63FF] group-hover:text-[#4ECDC4]">
                      <span>Transform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : isProcessing ? (
          /* Processing Animation State */
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-[#6C63FF] border-r-[#4ECDC4] animate-spin" />
              <Sparkles className="w-8 h-8 text-[#4ECDC4] animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-[#Outfit]">
                MindLoop Neural Engine Processing
              </h3>
              <p className="text-xs text-slate-400">
                Transforming <span className="text-[#4ECDC4] font-semibold">{selectedPreset}</span>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6C63FF] via-[#4ECDC4] to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Steps Progress Checklist */}
            <div className="w-full max-w-md space-y-3 text-left bg-white/[0.02] p-4 rounded-2xl border border-white/10">
              {steps.map((step, idx) => {
                const isDone = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#4ECDC4] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                    )}
                    <span className={`text-xs ${
                      isDone 
                        ? 'text-slate-300 line-through opacity-70' 
                        : isCurrent 
                        ? 'text-white font-semibold' 
                        : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* SUCCESS CELEBRATION STATE */
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <Check className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white font-[#Outfit]">
                Transformation Complete! 🎉
              </h3>
              <p className="text-xs text-slate-300">
                Generated <span className="text-emerald-400 font-bold">32 3D Flashcards</span>, <span className="text-[#4ECDC4] font-bold">AI Executive Summary</span>, and <span className="text-amber-400 font-bold">Adaptive Practice Quiz</span>.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="btn-primary-glow px-8 py-3.5 text-xs font-bold text-white rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore Transformed Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
