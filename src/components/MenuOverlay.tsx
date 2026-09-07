import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface NavItem {
  number: string;
  id: string;
  label: string;
  subtitle?: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: '01', id: 'home', label: 'HOME', subtitle: 'START // OVERVIEW' },
  { number: '02', id: 'about', label: 'ABOUT', subtitle: 'PHILOSOPHY // BIO' },
  { number: '03', id: 'projects', label: 'WORK', subtitle: 'SELECTED SYSTEMS' },
  { number: '04', id: 'skills', label: 'PROJECTS', subtitle: 'FEATURED BUILDS' },
  { number: '05', id: 'architecture', label: 'METHOD', subtitle: 'SYSTEM ARCHITECTURE' },
  { number: '06', id: 'contact', label: 'CONTACT', subtitle: 'GET IN TOUCH' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [hoveredItem, setHoveredItem] = useState<NavItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState<string>('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Live real-time clock update (IST / Local time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(`${timeStr} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Support ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Mouse move listener for smooth trailing cursor badge
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[100] bg-white dark:bg-black text-neutral-950 dark:text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden select-none transition-colors duration-300"
        >
          {/* Giant Outlined Monochrome Background Typography Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span
              className="font-display font-black text-[18vw] leading-none uppercase tracking-tighter opacity-10 dark:opacity-10 text-transparent"
              style={{
                WebkitTextStroke: '1.5px currentColor',
              }}
            >
              {hoveredItem ? hoveredItem.label : 'HASSAN'}
            </span>
          </div>

          {/* Top Bar Header */}
          <div className="relative z-10 flex items-center justify-between w-full border-b border-neutral-200 dark:border-neutral-800 pb-5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-neutral-950 dark:bg-white animate-pulse" />
              <span className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 tracking-[0.25em] uppercase font-semibold">
                NAVIGATION
              </span>
            </div>

            {/* Minimalist Close Button [X] */}
            <button
              onClick={onClose}
              className="group flex items-center justify-center w-10 h-10 border border-neutral-300 hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white bg-white dark:bg-neutral-950 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-all duration-300 shadow-sm"
              title="Close Menu (Esc)"
            >
              <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/* Middle Body Grid Layout */}
          <div className="relative z-10 my-auto py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-7xl mx-auto w-full">
            {/* Left Editorial Info Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full gap-8 order-2 lg:order-1">
              <div className="max-w-sm">
                <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 font-sans">
                  Shaping high-performance, premium web interfaces and digital systems at{' '}
                  <strong className="text-neutral-950 dark:text-white font-bold">
                    Full-Stack Scale
                  </strong>
                  . Dedicated to precise frontend craft and meaningful motion.
                </p>
              </div>

              {/* Status Indicator */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase font-semibold">
                  STATUS
                </span>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 dark:bg-white animate-pulse" />
                  <span>AVAILABLE FOR FULL-TIME / FREELANCE</span>
                </div>
              </div>

              {/* Location & Live Clock */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-500 tracking-[0.2em] uppercase font-semibold">
                  LOCATION & TIME
                </span>
                <div className="font-mono text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  <span>PERNAMBUT, IN — </span>
                  <span className="font-bold text-neutral-950 dark:text-white">
                    {currentTime || '19:16:00 IST'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Main Editorial Navigation Items List (Pure White/Black Contrast) */}
            <div className="lg:col-span-7 flex flex-col gap-1 sm:gap-2 order-1 lg:order-2">
              {NAV_ITEMS.map((item, index) => {
                const isHovered = hoveredItem?.id === item.id;
                const isAnyHovered = hoveredItem !== null;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative group cursor-pointer"
                  >
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className="w-full text-left py-2.5 sm:py-3 flex items-baseline gap-4 sm:gap-8 transition-all duration-300"
                    >
                      {/* Index Number (e.g. 01, 02) */}
                      <span
                        className={`font-mono text-xs sm:text-sm transition-all duration-300 ${
                          isHovered
                            ? 'text-neutral-950 dark:text-white font-bold translate-x-1'
                            : 'text-neutral-400 dark:text-neutral-600'
                        }`}
                      >
                        {item.number}
                      </span>

                      {/* Giant Editorial Heading in Bold Monochrome */}
                      <span
                        className={`font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase transition-all duration-300 ${
                          isHovered
                            ? 'text-neutral-950 dark:text-white translate-x-2 sm:translate-x-3'
                            : isAnyHovered
                            ? 'opacity-25 text-neutral-400 dark:text-neutral-600'
                            : 'text-neutral-900 dark:text-neutral-100'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar Footer (Social Links & Copyright) */}
          <div className="relative z-10 flex items-center justify-between w-full border-t border-neutral-200 dark:border-neutral-800 pt-5">
            {/* Social Icons (Bottom Left) */}
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com/in/hassan-dev"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="mailto:pmhassanurrahman@gmail.com"
                className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Year & Signature */}
            <div className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">
              © {new Date().getFullYear()} // HASSAN.DEV
            </div>
          </div>

          {/* Floating Interactive Cursor Hover Follower (Monochrome Clean White/Black) */}
          <AnimatePresence>
            {hoveredItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: mousePos.x + 24,
                  y: mousePos.y - 28,
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 30,
                  mass: 0.4,
                }}
                className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center"
              >
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-neutral-950 dark:border-white bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-2xl">
                  {/* Orbit Accent Dot */}
                  <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-white animate-ping" />
                  <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-white" />

                  {/* Hovered Section Name Text */}
                  <span className="font-mono font-bold text-[10px] tracking-widest text-neutral-950 dark:text-white uppercase text-center px-1">
                    {hoveredItem.label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
