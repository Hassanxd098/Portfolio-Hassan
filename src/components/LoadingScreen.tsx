import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const logs = [
    'Initializing Hassan Portfolio Kernel v1.0.4...',
    'Loading developer profile & statistics...',
    'Connecting MERN stack REST API gateway...',
    'Mounting Missile Health & AI Symptom Checker modules...',
    'Loading technology ecosystem graph...',
    'Portfolio ready.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(timer);
  }, [logs.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4 select-none">
      <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-mono font-bold animate-pulse">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-slate-100 text-base">Hassan<span className="text-sky-400">.dev</span></h3>
            <p className="text-xs font-mono text-slate-500">System Boot Initialization</p>
          </div>
        </div>

        {/* Console Log Buffer */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-sky-400 space-y-2 h-36 overflow-hidden">
          {logs.slice(0, step + 1).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-emerald-400">✓</span>
              <span className="text-slate-300">{log}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-violet-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((step + 1) / logs.length) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
};
