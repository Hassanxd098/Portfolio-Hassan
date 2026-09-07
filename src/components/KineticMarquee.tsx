import React from 'react';
import { motion } from 'framer-motion';

interface KineticMarqueeProps {
  items?: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  itemClassName?: string;
}

const DEFAULT_ITEMS = [
  'REACT.JS 18',
  'NODE.JS',
  'REDUX TOOLKIT',
  'EXPRESS.JS',
  'MONGODB ATLAS',
  'REST API ARCHITECTURE',
  'FULL-STACK ENGINEERING',
  'TAILWIND CSS',
  'SYSTEM DESIGN',
  'HIGH PERFORMANCE',
];

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  direction = 'left',
  speed = 25,
  className = '',
  itemClassName = '',
}) => {
  // Duplicate list to achieve seamless infinite loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden py-3 select-none border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
      >
        {displayItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase font-bold text-neutral-600 dark:text-neutral-400 ${itemClassName}`}
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
