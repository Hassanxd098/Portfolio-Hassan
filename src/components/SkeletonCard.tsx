import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 animate-pulse space-y-4">
      <div className="h-48 bg-slate-800/80 rounded-xl w-full" />
      <div className="h-6 bg-slate-800/80 rounded w-3/4" />
      <div className="h-4 bg-slate-800/60 rounded w-full" />
      <div className="h-4 bg-slate-800/60 rounded w-5/6" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-slate-800/80 rounded-full w-16" />
        <div className="h-6 bg-slate-800/80 rounded-full w-20" />
      </div>
    </div>
  );
};
