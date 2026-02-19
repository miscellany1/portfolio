import { motion } from 'framer-motion';
import type { Choice } from '../../data/scenarios/types.ts';
import { qualityColors, qualityLabels } from '../../styles/theme.ts';
import { Button } from '../common/Button.tsx';

interface FeedbackPanelProps {
  choice: Choice;
  optimalChoice?: Choice | null;
  onContinue: () => void;
  onGoBack: () => void;
  continueLabel?: string;
}

export const FeedbackPanel = ({ choice, optimalChoice, onContinue, onGoBack, continueLabel = 'Continue' }: FeedbackPanelProps) => {
  const colorClass = qualityColors[choice.quality] ?? '';
  const label = qualityLabels[choice.quality] ?? '';

  return (
    <motion.div
      className="space-y-4 rounded-xl border border-slate-700/50 bg-slate-800/80 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Quality badge */}
      <div className="flex items-center gap-3">
        <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${colorClass}`}>
          {label}
        </span>
        <div className="flex gap-3 text-xs font-mono">
          <span className={choice.securityScoreChange >= 0 ? 'text-green-400' : 'text-red-400'}>
            Score {choice.securityScoreChange >= 0 ? '+' : ''}{choice.securityScoreChange}
          </span>
          <span className={choice.trustChange >= 0 ? 'text-green-400' : 'text-red-400'}>
            Trust {choice.trustChange >= 0 ? '+' : ''}{choice.trustChange}
          </span>
        </div>
      </div>

      {/* Feedback content */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-slate-100">{choice.feedback.title}</h3>
        <p className="text-sm leading-relaxed text-slate-300">{choice.feedback.explanation}</p>
        <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-400">
            Real-World Context
          </p>
          <p className="text-sm text-slate-300">{choice.feedback.realWorldContext}</p>
        </div>
        {optimalChoice && choice.quality !== 'optimal' && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-400">
              Best Response
            </p>
            <p className="text-sm text-slate-300">{optimalChoice.text}</p>
            <p className="mt-2 text-sm text-slate-400">{optimalChoice.feedback.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={onGoBack}>
          ← Go Back
        </Button>
        <Button onClick={onContinue} size="md">
          {continueLabel}
        </Button>
      </div>
    </motion.div>
  );
};
