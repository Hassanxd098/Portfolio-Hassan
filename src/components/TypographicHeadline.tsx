import React from 'react';
import { motion } from 'framer-motion';

interface TypographicHeadlineProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export const TypographicHeadline: React.FC<TypographicHeadlineProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-neutral-400 dark:text-neutral-500',
  delay = 0,
  as = 'h2',
}) => {
  const lines = text.split('\n');
  const Component = motion[as] as any;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '115%',
      opacity: 0,
      rotateX: 25,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`font-display font-black tracking-tight leading-tight select-none ${className}`}
    >
      {lines.map((line, lineIdx) => {
        const words = line.trim().split(' ');
        return (
          <span key={lineIdx} className="block overflow-hidden py-0.5">
            {words.map((word, wordIdx) => {
              const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
              const isHighlighted = highlightWords.some(
                (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
              );

              return (
                <span key={wordIdx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block transform-gpu ${
                      isHighlighted ? highlightClassName : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
};
