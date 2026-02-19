import { motion } from 'framer-motion';
import type { ChoiceRecord } from '../../data/scenarios/types.ts';
import { DAY_LABELS, DAY_ORDER } from '../../game/progression.ts';
import { qualityColors } from '../../styles/theme.ts';

interface ScoreBreakdownProps {
  choiceHistory: ChoiceRecord[];
}

export const ScoreBreakdown = ({ choiceHistory }: ScoreBreakdownProps) => {
  const dayGroups = DAY_ORDER.map((day) => ({
    day,
    label: DAY_LABELS[day],
    choices: choiceHistory.filter((c) => c.dayId === day),
  })).filter((g) => g.choices.length > 0);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        Choice Breakdown
      </h3>
      {dayGroups.map((group, gi) => (
        <motion.div
          key={group.day}
          className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.1 }}
        >
          <h4 className="mb-3 text-sm font-semibold text-slate-200">{group.label}</h4>
          <div className="flex flex-wrap gap-2">
            {group.choices.map((choice, ci) => (
              <span
                key={ci}
                className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${qualityColors[choice.quality]}`}
              >
                {choice.quality}
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-4 text-xs font-mono text-slate-400">
            <span>
              Score: {group.choices.reduce((s, c) => s + c.scoreChange, 0) >= 0 ? '+' : ''}
              {group.choices.reduce((s, c) => s + c.scoreChange, 0)}
            </span>
            <span>
              Trust: {group.choices.reduce((s, c) => s + c.trustChange, 0) >= 0 ? '+' : ''}
              {group.choices.reduce((s, c) => s + c.trustChange, 0)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
