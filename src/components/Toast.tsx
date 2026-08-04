import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'xp';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-[#4ECDC4] shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    xp: <Sparkles className="w-5 h-5 text-[#6C63FF] shrink-0 animate-pulse" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-[#09090B]/90',
    info: 'border-[#4ECDC4]/30 bg-[#09090B]/90',
    warning: 'border-amber-500/30 bg-[#09090B]/90',
    xp: 'border-[#6C63FF]/40 bg-gradient-to-r from-[#6C63FF]/20 to-[#13131A]'
  };

  return (
    <div className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-start justify-between gap-3 animate-slideUp ${borders[toast.type]}`}>
      <div className="flex items-start gap-3">
        {icons[toast.type]}
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-white font-[#Outfit]">{toast.title}</h4>
          {toast.message && <p className="text-[11px] text-slate-300 leading-relaxed">{toast.message}</p>}
        </div>
      </div>

      <button 
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
