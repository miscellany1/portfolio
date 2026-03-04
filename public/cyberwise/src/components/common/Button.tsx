import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: 'bg-accent hover:bg-accent-hover text-white border-accent/50',
  secondary: 'bg-surface-overlay hover:bg-border-subtle text-text-primary border-border-subtle',
  ghost: 'bg-transparent hover:bg-surface-overlay text-text-secondary border-transparent',
  danger: 'bg-red-600/20 hover:bg-red-600/30 text-red-400 border-red-500/30',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) => (
  <motion.button
    type={type}
    whileHover={disabled ? undefined : { scale: 1.02 }}
    whileTap={disabled ? undefined : { scale: 0.98 }}
    className={`
      inline-flex items-center justify-center gap-2 rounded-lg border
      font-medium transition-colors duration-200 cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-surface
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </motion.button>
);
