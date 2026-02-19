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
  primary: 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500/50',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-slate-100 border-slate-600/50',
  ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 border-transparent',
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
      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </motion.button>
);
