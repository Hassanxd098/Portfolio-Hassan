import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

interface TechItem {
  name: string;
  category: string;
  level: string;
  experience: string;
  usage: string;
  projects: string[];
  description: string;
}

export const SkillsEcosystem: React.FC = () => {
  const [techList, setTechList] = useState<TechItem[]>([]);
  const [activeTech, setActiveTech] = useState<TechItem | null>(null);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.skills && Array.isArray(data.skills)) {
          setTechList(data.skills);
          setActiveTech(data.skills[0]);
        }
      })
      .catch(() => {
        // Fallback default array if JSON fetch fails
      });
  }, []);

  return (
    <section id="skills" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="03. TECHNICAL EXPERTISE & STACK" />
            </span>
            <TypographicHeadline
              text={"FULL-STACK\nTECHNOLOGY ECOSYSTEM."}
              highlightWords={['TECHNOLOGY']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Hover over or select any engineering technology to inspect detailed implementation patterns, experience history, and related production projects."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Stack Grid & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Typographic Tech Item Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techList.map((tech, index) => {
              const isSelected = activeTech?.name === tech.name;
              return (
                <div
                  key={tech.name || index}
                  onMouseEnter={() => setActiveTech(tech)}
                  onClick={() => setActiveTech(tech)}
                  className={`p-6 cursor-pointer transition-all duration-300 relative group border shadow-sm ${
                    isSelected
                      ? 'border-neutral-950 bg-white dark:border-white dark:bg-neutral-900 shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 dark:border-neutral-850 dark:bg-neutral-950 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      <ScrambleText text={tech.category} />
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-300">
                      {tech.level}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-950 dark:text-white uppercase tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                    {tech.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Stack Inspector Panel (Sticky in viewport) */}
          <div className="lg:col-span-5 sticky top-28 self-start h-fit z-20">
            <AnimatePresence mode="wait">
              {activeTech && (
                <motion.div
                  key={activeTech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 select-none shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
                    <div>
                      <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                        {activeTech.category}
                      </span>
                      <h3 className="font-display font-black text-2xl text-neutral-950 dark:text-white uppercase tracking-tight mt-1">
                        {activeTech.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-neutral-900 dark:text-white">
                      {activeTech.level}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-2">
                      SPECIFICATION & USAGE
                    </span>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed border-l-2 border-neutral-300 dark:border-neutral-800 pl-4">
                      {activeTech.description}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">PROFICIENCY</span>
                      <span className="text-neutral-950 dark:text-white font-bold">{activeTech.level}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">CATEGORY</span>
                      <span className="text-neutral-950 dark:text-white font-bold">{activeTech.category}</span>
                    </div>
                  </div>

                  {/* Projects Utilizing Tech */}
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-3">
                      ASSOCIATED PRODUCTION PROJECTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {['Missile Health', 'AI Symptom Checker', 'DevScale Analytics', 'Nexus Gateway'].map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
