import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomCursor } from '../hooks/useCustomCursor';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const { position, cursorMode, cursorText, isTouchDevice } = useCustomCursor();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Instant positioning with zero lerp delay (duration: 0 / 0.01) for real-time tracking
  useEffect(() => {
    if (isTouchDevice) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Zero delay (instant tracking)
    gsap.set(dot, { x: position.x, y: position.y });
    gsap.set(ring, { x: position.x, y: position.y });
  }, [position, isTouchDevice]);

  if (isTouchDevice) return null;

  const isProject = cursorMode === 'project';
  const isButton = cursorMode === 'button';
  const isLink = cursorMode === 'link';
  const isProfile = cursorMode === 'profile';

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      {/* Center Pointer Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-150 ${
          isProject || isProfile
            ? 'w-0 h-0 opacity-0'
            : isButton || isLink
            ? 'w-2 h-2 bg-neutral-900 dark:bg-neutral-100'
            : 'w-2.5 h-2.5 bg-neutral-900 dark:bg-neutral-100'
        }`}
      />

      {/* Interactive Outer Ring & Badge Container - Quick transform */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-150 ease-out ${
          isProject
            ? 'w-28 h-28 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black shadow-2xl border-none'
            : isProfile
            ? 'w-24 h-24 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-black dark:text-neutral-100 shadow-2xl'
            : isButton
            ? 'w-12 h-12 border border-neutral-400 dark:border-neutral-300 bg-neutral-500/10'
            : isLink
            ? 'w-10 h-10 border border-neutral-500 dark:border-neutral-400 bg-transparent scale-110'
            : 'w-8 h-8 border border-neutral-400/80 dark:border-neutral-600/80 bg-transparent'
        }`}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.1 }}
              className={`font-mono font-bold tracking-wider text-[10px] uppercase text-center px-2 ${
                isProject ? 'text-white dark:text-black font-extrabold' : 'text-neutral-900 dark:text-neutral-200'
              }`}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
