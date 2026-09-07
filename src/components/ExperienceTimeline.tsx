import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  year: string;
  type: string;
  highlights: string[];
}

export const ExperienceTimeline: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.experience && Array.isArray(data.experience)) {
          setExperiences(data.experience);
        }
      })
      .catch(() => {
        // Fallback initialized
      });
  }, []);

  return (
    <section id="experience" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="06. CAREER HISTORY & EXPERIENCE" />
            </span>
            <TypographicHeadline
              text={"EDITORIAL\nTIMELINE."}
              highlightWords={['TIMELINE.']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-4xl sm:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Full-Stack engineering milestones, enterprise deliverables, and professional roles."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Minimal Editorial Year Timeline List */}
        <div className="space-y-16">
          {experiences.map((item, index) => (
            <motion.div
              key={item.company || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 sm:p-12 border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 group hover:border-neutral-900 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Large Year Typography */}
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-900 pb-6 lg:pb-0 lg:pr-8">
                  <span className="font-display font-black text-6xl sm:text-8xl text-neutral-300 dark:text-neutral-800 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-500 block leading-none">
                    {item.year || '2026'}
                  </span>
                  <div className="mt-4 font-mono text-xs space-y-1">
                    <p className="text-neutral-950 dark:text-white font-bold uppercase">{item.company}</p>
                    <p className="text-neutral-600 dark:text-neutral-400">{item.period}</p>
                    <p className="text-neutral-500 text-[10px] uppercase">{item.type}</p>
                  </div>
                </div>

                {/* Role Details & Highlights */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">
                      ROLE & POSITION
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white uppercase tracking-tight">
                      {item.role}
                    </h3>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">
                      KEY DELIVERABLES & IMPACT
                    </span>
                    {item.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-3 font-sans text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-neutral-950 dark:text-white shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
