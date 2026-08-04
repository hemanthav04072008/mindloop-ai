import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-panel p-6 space-y-4 border border-white/10 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 rounded-md bg-white/10" />
        <div className="w-12 h-4 rounded-md bg-white/10" />
      </div>
      <div className="w-3/4 h-6 rounded-lg bg-white/15" />
      <div className="space-y-2">
        <div className="w-full h-3 rounded bg-white/5" />
        <div className="w-5/6 h-3 rounded bg-white/5" />
      </div>
      <div className="w-full h-2 rounded-full bg-white/10 pt-2" />
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-8 space-y-3 border border-white/10 animate-pulse">
        <div className="w-32 h-5 rounded bg-white/10" />
        <div className="w-64 h-8 rounded-lg bg-white/20" />
        <div className="w-96 h-4 rounded bg-white/10" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="glass-panel p-4 space-y-3 border border-white/10 animate-pulse">
            <div className="w-16 h-3 rounded bg-white/10" />
            <div className="w-20 h-6 rounded bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
};
