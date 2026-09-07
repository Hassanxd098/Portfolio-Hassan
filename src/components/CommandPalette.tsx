import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { useTheme } from '../hooks/useTheme';
import { useDispatch } from 'react-redux';
import { setTerminalOpen, setAiAssistantOpen, setWhatsAppModalOpen } from '../store/slices/uiSlice';
import { Search, Home, User, Code2, FolderGit2, Briefcase, Layers, Github, Mail, Moon, Sun, Terminal, Bot, MessageSquare } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isOpen, close } = useCommandPalette();
  const { mode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const scrollTo = (id: string) => {
    close();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const commands = [
    { id: 'home', label: 'Go to Home', icon: Home, action: () => scrollTo('home') },
    { id: 'about', label: 'View About & Experience', icon: User, action: () => scrollTo('about') },
    { id: 'skills', label: 'Inspect Skills Ecosystem', icon: Code2, action: () => scrollTo('skills') },
    { id: 'projects', label: 'Explore Featured Projects', icon: FolderGit2, action: () => scrollTo('projects') },
    { id: 'experience', label: 'View Career Timeline', icon: Briefcase, action: () => scrollTo('experience') },
    { id: 'architecture', label: 'How I Build Applications', icon: Layers, action: () => scrollTo('architecture') },
    { id: 'github', label: 'Dynamic GitHub Explorer', icon: Github, action: () => scrollTo('github') },
    { id: 'contact', label: 'Contact Hassan', icon: Mail, action: () => scrollTo('contact') },
    { id: 'theme', label: `Toggle Theme (Current: ${mode})`, icon: mode === 'dark' ? Sun : Moon, action: () => { toggleTheme(); close(); } },
    { id: 'terminal', label: 'Open Developer CLI Terminal', icon: Terminal, action: () => { close(); dispatch(setTerminalOpen(true)); } },
    { id: 'ai', label: 'Ask Hassan\'s AI Assistant', icon: Bot, action: () => { close(); dispatch(setAiAssistantOpen(true)); } },
    { id: 'whatsapp', label: 'Chat on WhatsApp Direct', icon: MessageSquare, action: () => { close(); dispatch(setWhatsAppModalOpen(true)); } },
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-white dark:bg-neutral-950 rounded-none border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10"
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <Search className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="TYPE A COMMAND OR SEARCH SECTION..."
                className="w-full bg-transparent border-none outline-none font-mono text-xs text-neutral-950 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:ring-0 uppercase"
              />
              <kbd className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-[10px] font-mono text-neutral-600 dark:text-neutral-400">ESC</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-xs font-mono text-neutral-500">
                  NO MATCHING COMMANDS FOUND.
                </div>
              ) : (
                filtered.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-left group uppercase"
                    >
                      <Icon className="w-4 h-4 text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                      <span>{cmd.label}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-500 flex items-center justify-between uppercase">
              <span>↑ ↓ TO NAVIGATE</span>
              <span>RAYCAST PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
