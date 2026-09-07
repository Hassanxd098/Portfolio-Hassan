import React, { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useTheme } from '../hooks/useTheme';
import { MenuOverlay } from './MenuOverlay';
import { Download, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const scrollProgress = useScrollProgress();
  const { mode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Hassan-Resume.pdf';
    link.download = 'Hassan-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Top Monochrome Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-neutral-800 dark:bg-neutral-900">
        <div
          className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        {/* Brand Logo / Name (Left) */}
        <button
          onClick={() => scrollTo('home')}
          className="pointer-events-auto flex items-center gap-3 group text-left px-3 py-1.5 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
          <span className="font-display font-bold text-lg tracking-wider text-neutral-950 dark:text-white uppercase group-hover:opacity-80 transition-opacity">
            HASSAN
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 uppercase tracking-widest">
            Full-Stack Dev
          </span>
        </button>

        {/* Primary Navigation - TOP RIGHT (Desktop & Mobile) */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
            title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {mode === 'dark' ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-neutral-900" />}
          </button>

          {/* Quick Resume Button */}
          <button
            onClick={handleDownloadResume}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* Primary Top-Right Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-md border border-neutral-950 dark:border-neutral-200"
          >
            <span className="w-2 h-2 bg-white dark:bg-black rounded-full animate-pulse" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  );
};
