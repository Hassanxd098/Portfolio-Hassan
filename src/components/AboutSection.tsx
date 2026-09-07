import React from 'react';
import { motion } from 'framer-motion';
import { Check, Layout, Server, Cpu, Database, Palette, Zap, Accessibility } from 'lucide-react';
import { TypographicHeadline } from './TypographicHeadline';
import { ScrambleText } from './ScrambleText';
import { AnimatedParagraph } from './AnimatedParagraph';

const DISCIPLINES = [
  {
    code: '01',
    title: 'Frontend Engineering',
    icon: Layout,
    desc: 'Crafting responsive, highly reactive UI systems using React.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP with zero frame drops.'
  },
  {
    code: '02',
    title: 'Backend Engineering',
    icon: Server,
    desc: 'Architecting RESTful microservices with Node.js and Express.js, implementing strict request validation, CORS policies, and error boundaries.'
  },
  {
    code: '03',
    title: 'API Architecture',
    icon: Cpu,
    desc: 'Designing clean, versioned REST endpoints (/api/v1/*), rate-limiting controllers, JWT authentication, and structured payload schemas.'
  },
  {
    code: '04',
    title: 'Database Design',
    icon: Database,
    desc: 'Modeling MongoDB collections, compound indexes, Mongoose schemas, population references, and high-performance aggregation pipelines.'
  },
  {
    code: '05',
    title: 'UI/UX & Aesthetics',
    icon: Palette,
    desc: 'Delivering Awwwards-caliber minimalist designs, custom cursor mechanics, fluid cubic-bezier animations, and editorial typographic systems.'
  },
  {
    code: '06',
    title: 'Performance',
    icon: Zap,
    desc: 'Optimizing Lighthouse Web Vitals to 98+, utilizing memoized state hooks, code splitting, lazy loading, and sub-100ms API response times.'
  },
  {
    code: '07',
    title: 'Accessibility (a11y)',
    icon: Accessibility,
    desc: 'Building WCAG-compliant, keyboard-navigable applications with explicit ARIA roles, high-contrast monochrome themes, and prefers-reduced-motion support.'
  }
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 bg-[#fbfbfb] dark:bg-black text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-900 relative transition-colors duration-300">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 mono-grid-pattern opacity-40 dark:opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.3em] uppercase block mb-3">
              // <ScrambleText text="01. PHILOSOPHY & ABOUT" />
            </span>
            <TypographicHeadline
              text={"I BUILD DIGITAL\nEXPERIENCES AND\nSCALABLE SYSTEMS."}
              highlightWords={['EXPERIENCES', 'SCALABLE']}
              highlightClassName="text-neutral-400 dark:text-neutral-500"
              className="text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-neutral-950 dark:text-white leading-tight"
            />
          </div>

          <div className="max-w-md font-mono text-xs text-neutral-600 dark:text-neutral-400 space-y-4 border-l-2 border-neutral-300 dark:border-neutral-800 pl-6">
            <AnimatedParagraph
              text="Full-Stack Developer with expertise across React.js, Redux Toolkit, Node.js, Express, and MongoDB. Currently engineering production web apps at Colan Infotech and formerly Aspirasys."
              className="text-neutral-700 dark:text-neutral-300 font-sans text-sm leading-relaxed"
            />
            <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 text-[11px] pt-2 border-t border-neutral-200 dark:border-neutral-900 font-mono">
              <span className="font-bold text-neutral-900 dark:text-neutral-100">EXP: 1.5+ YEARS</span>
              <span>•</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">PROJECTS: 12+ BUILT</span>
            </div>
          </div>
        </div>

        {/* Core Disciplines Editorial Layout Grid */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              // <ScrambleText text="CORE TECHNICAL DISCIPLINES & CAPABILITIES" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 hover:border-neutral-900 dark:hover:border-neutral-600 p-6 sm:p-8 flex flex-col justify-between group relative transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-4 mb-6">
                      <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                        <ScrambleText text={item.code} />
                      </span>
                      <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                    </div>

                    <h4 className="font-display font-bold text-lg text-neutral-950 dark:text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed group-hover:text-neutral-800 dark:group-hover:text-neutral-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                    <span>STATUS: ACTIVE</span>
                    <Check className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Minimal Editorial Quote / Philosophy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm"
        >
          <TypographicHeadline
            text={'"SOFTWARE ENGINEERING IS NOT MERELY ABOUT WRITING CODE,\nBUT BUILDING PREDICTABLE, HIGH-PERFORMANCE PRODUCTS THAT DELIVER TANGIBLE VALUE."'}
            className="text-lg sm:text-xl lg:text-2xl text-neutral-900 dark:text-neutral-200 uppercase tracking-tight leading-snug mb-4 font-semibold"
            highlightWords={['PREDICTABLE,', 'HIGH-PERFORMANCE', 'VALUE.']}
            highlightClassName="text-neutral-500 dark:text-neutral-400"
          />
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
            — HASSAN // FULL-STACK ENGINEER
          </span>
        </motion.div>

      </div>
    </section>
  );
};
