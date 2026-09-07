import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

interface LanguageName {
  text: string;
  lang: string;
  code: string;
  subtext: string;
}

const LANGUAGES: LanguageName[] = [
  { text: 'HASSAN', lang: 'ENGLISH', code: 'EN', subtext: 'Full-Stack Developer' },
  { text: 'حَسَّان', lang: 'ARABIC', code: 'AR', subtext: 'مطور برمجيات متكامل' },
  { text: '哈桑', lang: 'CHINESE', code: 'ZH', subtext: '全栈开发工程师' },
  { text: 'ஹசன்', lang: 'TAMIL', code: 'TA', subtext: 'முழு-அடுக்கு உருவாக்குநர்' },
  { text: 'ハッサン', lang: 'JAPANESE', code: 'JA', subtext: 'フルスタックエンジニア' },
  { text: 'ХАССАН', lang: 'RUSSIAN', code: 'RU', subtext: 'Фуллстек-разработчик' },
  { text: 'हसन', lang: 'HINDI', code: 'HI', subtext: 'फुल-स्टैक डेवलपर' },
  { text: '하산', lang: 'KOREAN', code: 'KO', subtext: '풀스택 개발자' },
  { text: 'HASSAN', lang: 'GLOBAL', code: 'WORLD', subtext: 'Architecting Digital Systems' },
];

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  const finishIntro = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    // Show English 'HASSAN' initially then rapidly cycle through languages at fast 360ms pace
    const startMultiLangTimer = setTimeout(() => {
      let index = 1;
      setCurrentIndex(index);

      const interval = setInterval(() => {
        index += 1;
        if (index < LANGUAGES.length) {
          setCurrentIndex(index);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            finishIntro();
          }, 400);
        }
      }, 360);

      return () => clearInterval(interval);
    }, 1200);

    // ESC key or Click to skip intro anytime
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(startMultiLangTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentItem = LANGUAGES[currentIndex];

  return (
    <div
      ref={containerRef}
      onClick={finishIntro}
      className="fixed inset-0 z-[100] bg-black text-neutral-100 flex flex-col items-center justify-between p-8 sm:p-12 select-none overflow-hidden cursor-pointer"
    >
      {/* Background Grid Texture */}
      <div className="absolute inset-0 mono-grid-pattern opacity-25 pointer-events-none" />

      {/* Top Header Information */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="tracking-widest uppercase">
            HASSAN // MULTILINGUAL INTRO
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          className="px-3 py-1.5 border border-neutral-800 hover:border-white bg-neutral-950 text-neutral-400 hover:text-white uppercase tracking-wider text-[11px] transition-colors"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Main Multilingual Name Display Container */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4 max-w-5xl">
        {/* Dynamic Language Tag Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`code-${currentItem.code}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 flex items-center gap-2 px-3 py-1 border border-neutral-800 bg-neutral-950/80 font-mono text-xs text-neutral-400 tracking-[0.25em] uppercase shadow-sm"
          >
            <span className="text-white font-bold">[{currentItem.code}]</span>
            <span>{currentItem.lang}</span>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Name in Language */}
        <div className="h-28 sm:h-36 md:h-44 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`name-${currentItem.text}`}
              initial={{ opacity: 0, y: 35, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -35, scale: 1.08, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight text-white uppercase leading-none drop-shadow-2xl"
              style={{
                fontFamily:
                  currentItem.code === 'AR'
                    ? "'Tahoma', 'Syne', sans-serif"
                    : currentItem.code === 'TA'
                    ? "'Noto Sans Tamil', 'Syne', sans-serif"
                    : undefined,
              }}
            >
              {currentItem.text}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Dynamic Subtext in Language */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${currentItem.subtext}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-[0.3em] font-medium"
          >
            {currentItem.subtext}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom Footer Info (Clean without dashes) */}
      <div className="relative z-10 w-full flex items-center justify-end font-mono text-[11px] text-neutral-600">
        <div className="uppercase tracking-widest text-[10px] text-neutral-500">
          CLICK ANYWHERE TO ENTER PORTFOLIO
        </div>
      </div>
    </div>
  );
};
