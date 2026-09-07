import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedParagraphProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      className={`leading-relaxed ${className}`}
    >
      {sentences.map((sentence, idx) => (
        <motion.span key={idx} variants={item} className="inline mr-1">
          {sentence.trim()}{' '}
        </motion.span>
      ))}
    </motion.p>
  );
};
