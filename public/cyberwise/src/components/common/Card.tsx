import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-surface-raised border-border-subtle shadow-sm',
  elevated: 'bg-surface-raised border-border-subtle shadow-md',
  outlined: 'bg-transparent border-border-subtle',
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
