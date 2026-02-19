import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore.ts';
import { DAY_ORDER, DAY_LABELS } from '../../game/progression.ts';

export const ProgressBar = () => {
  const completedDays = useGameStore((s) => s.completedDays);
  const currentDay = useGameStore((s) => s.currentDay);
  const gameStarted = useGameStore((s) => s.gameStarted);

  if (!gameStarted) return null;

  return (
    <div className="border-b border-slate-800/50 bg-slate-900/50">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-2">
        {DAY_ORDER.map((day, i) => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay && !completedDays.includes(day);

          return (
            <div key={day} className="flex flex-1 items-center">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span
                  className={`text-xs font-medium uppercase tracking-wide ${
                    isCurrent
                      ? 'text-blue-400'
                      : isCompleted
                        ? 'text-green-400'
                        : 'text-slate-400'
                  }`}
                >
                  {DAY_LABELS[day].slice(0, 3)}
                </span>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    className={`h-full rounded-full ${
                      isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
              {i < DAY_ORDER.length - 1 && (
                <div
                  className={`mx-1 h-px w-4 ${isCompleted ? 'bg-green-500/50' : 'bg-slate-800'}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
