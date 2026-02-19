import { motion } from 'framer-motion';
import type { Ending } from '../../data/scenarios/types.ts';
import { getEndingTier } from '../../game/endings.ts';

interface EndingNarrativeProps {
  ending: Ending;
  trustPenalized?: boolean;
  originalEndingNarrative?: string;
}

const tierStyles: Record<string, { border: string; glow: string; badge: string }> = {
  champion: {
    border: 'border-green-500/30',
    glow: 'shadow-green-500/10',
    badge: 'bg-green-500/10 text-green-400 border-green-500/30',
  },
  getting_there: {
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/10',
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  },
  compromised: {
    border: 'border-red-500/30',
    glow: 'shadow-red-500/10',
    badge: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
};

export const EndingNarrative = ({ ending, trustPenalized, originalEndingNarrative }: EndingNarrativeProps) => {
  const tier = getEndingTier(ending.id);
  const style = tierStyles[tier];

  return (
    <motion.div
      className={`rounded-xl border ${style.border} bg-slate-800/80 p-6 shadow-lg ${style.glow}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${style.badge}`}>
          {ending.title}
        </span>
      </div>
      <div className="space-y-3">
        {ending.narrative.split('\n\n').map((paragraph, i) => (
          <motion.p
            key={i}
            className="text-sm leading-relaxed text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
      <motion.p
        className="mt-4 text-xs font-medium text-slate-400 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {ending.outcome}
      </motion.p>
      {trustPenalized && originalEndingNarrative && (
        <motion.div
          className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            Trust Penalty
          </p>
          <p className="text-sm leading-relaxed text-amber-200/80">
            {originalEndingNarrative}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
