import { motion } from 'framer-motion';
import type { Choice } from '../../data/scenarios/types.ts';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
  onSelect: (choice: Choice) => void;
  disabled: boolean;
  selected: boolean;
  locked?: boolean;
}

export const ChoiceCard = ({ choice, index, onSelect, disabled, selected, locked }: ChoiceCardProps) => {
  const isUnclickable = disabled || locked;

  return (
    <motion.button
      className={`
        w-full rounded-lg border p-4 text-left transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-accent/50
        ${
          locked
            ? 'border-amber-700/30 bg-surface-overlay/30 opacity-50 cursor-not-allowed'
            : selected
              ? 'border-accent/50 bg-accent/10'
              : disabled
                ? 'border-border-subtle/30 bg-surface-overlay/30 opacity-50 cursor-not-allowed'
                : 'border-border-subtle bg-surface-raised hover:border-accent/30 hover:bg-surface-overlay cursor-pointer'
        }
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={() => !isUnclickable && onSelect(choice)}
      disabled={isUnclickable}
      whileHover={isUnclickable ? undefined : { scale: 1.01 }}
      whileTap={isUnclickable ? undefined : { scale: 0.99 }}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-mono font-bold ${locked ? 'bg-amber-800/50 text-amber-400' : 'bg-surface-overlay text-text-secondary'}`}>
          {locked ? '\u{1F512}' : String.fromCharCode(65 + index)}
        </span>
        <span className={`text-sm md:text-base ${locked ? 'text-text-secondary' : 'text-text-primary'}`}>{choice.text}</span>
      </div>
      {choice.requiresTrustLevel && (
        <div className={`mt-2 ml-9 text-xs font-medium ${locked ? 'text-amber-400' : 'text-accent'}`}>
          Requires trust level {choice.requiresTrustLevel}+
        </div>
      )}
    </motion.button>
  );
};
