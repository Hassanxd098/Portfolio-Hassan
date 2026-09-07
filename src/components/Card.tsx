import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden ${
        glow ? 'glow-border-cyan' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
