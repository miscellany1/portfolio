import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-slate-800/80 border-slate-700/50',
  elevated: 'bg-slate-800 border-slate-600/50 shadow-lg shadow-black/20',
  outlined: 'bg-transparent border-slate-700',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
}: CardProps) => (
  <motion.div
    className={`rounded-xl border ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
