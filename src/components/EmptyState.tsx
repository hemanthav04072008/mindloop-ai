import React from 'react';
import { Sparkles, FileSearch, Inbox, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="glass-panel p-12 text-center space-y-4 border border-white/10 max-w-md mx-auto my-8 animate-fadeIn">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6C63FF]/20 to-[#4ECDC4]/20 border border-white/15 flex items-center justify-center mx-auto text-[#4ECDC4]">
        {icon || <FileSearch className="w-8 h-8 text-[#4ECDC4]" />}
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white font-[#Outfit]">{title}</h3>
        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary-glow px-5 py-2.5 text-xs font-bold text-white rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md mt-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
