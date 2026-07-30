import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Focus,
  Maximize2
} from 'lucide-react';

interface FocusModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSound, setSelectedSound] = useState('Deep Space Alpha Waves');

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B] text-white p-6 overflow-hidden animate-fadeIn">
      
      {/* Dynamic Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6C63FF]/20 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4ECDC4]/15 blur-[120px] pointer-events-none animate-pulse-glow" />

      {/* Exit Button Header */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#4ECDC4]" />}
          <span>{isMuted ? 'Muted' : selectedSound}</span>
        </button>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-xl w-full flex flex-col items-center justify-center text-center space-y-8 z-10">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#4ECDC4] uppercase tracking-widest">
          <Focus className="w-4 h-4 text-[#4ECDC4]" />
          <span>MindLoop Focus Engine</span>
        </div>

        {/* Circular Pomodoro Timer Display */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center rounded-full glass-panel border border-white/15 shadow-[0_0_80px_rgba(108,99,255,0.25)]">
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-white/10 stroke-current"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-[#6C63FF] stroke-current transition-all duration-1000"
              strokeWidth="4"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * (25 * 60 - timeLeft)) / (25 * 60)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-6xl sm:text-7xl font-extrabold font-[#Outfit] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(108,99,255,0.6)]">
              {formattedTime}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Deep Concentration Mode
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-primary-glow px-8 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-bold text-white shadow-xl cursor-pointer"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Focus Loop</span>
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Prompt */}
        <p className="text-xs text-slate-400 italic max-w-sm">
          "Zero distractions. MindLoop is silently logging your deep work session (+25 XP upon completion)."
        </p>

      </div>
    </div>
  );
};
