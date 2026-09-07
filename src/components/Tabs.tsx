import React from 'react';
import { motion } from 'framer-motion';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 p-1.5 glass-panel rounded-2xl ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 z-10 ${
              isActive
                ? 'text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-sky-500 rounded-xl -z-10 shadow-md shadow-sky-500/25"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
};
