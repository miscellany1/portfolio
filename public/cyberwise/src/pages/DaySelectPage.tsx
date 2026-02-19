import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore.ts';
import { DAY_ORDER, DAY_LABELS } from '../game/progression.ts';
import type { DayId } from '../data/scenarios/types.ts';
import { getScenario } from '../hooks/useScenarioEngine.ts';
import { Button } from '../components/common/Button.tsx';

const DAY_ICONS: Record<DayId, string> = {
  monday: '1',
  tuesday: '2',
  wednesday: '3',
  thursday: '4',
  friday: '5',
};

const BLOOM_SHORT: Record<DayId, string> = {
  monday: 'Knowledge',
  tuesday: 'Comprehension',
  wednesday: 'Application',
  thursday: 'Analysis',
  friday: 'Evaluation',
};

export const DaySelectPage = () => {
  const navigate = useNavigate();
  const completedDays = useGameStore((s) => s.completedDays);
  const currentDay = useGameStore((s) => s.currentDay);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const jumpToDay = useGameStore((s) => s.jumpToDay);

  const handleSelectDay = (day: DayId) => {
    jumpToDay(day);
    navigate(`/scenario/${day}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
      <motion.div
        className="w-full max-w-2xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-100">Select a Day</h1>
          <p className="text-sm text-slate-400">
            Jump to any day of your first week at NovaTech.
          </p>
        </div>

        <div className="space-y-3">
          {DAY_ORDER.map((day, i) => {
            const scenario = getScenario(day);
            const isCompleted = completedDays.includes(day);
            const isCurrent = gameStarted && currentDay === day && !isCompleted;

            return (
              <motion.button
                key={day}
                onClick={() => handleSelectDay(day)}
                className="w-full cursor-pointer rounded-xl border border-slate-700/50 bg-slate-800/60 p-5 text-left transition-colors hover:border-blue-500/40 hover:bg-slate-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                      isCompleted
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : isCurrent
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-slate-700/50 text-slate-400 border border-slate-600/30'
                    }`}
                  >
                    {isCompleted ? '\u2713' : DAY_ICONS[day]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">
                        {DAY_LABELS[day]}
                      </span>
                      {isCompleted && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400">
                          Completed
                        </span>
                      )}
                      {isCurrent && (
                        <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {scenario.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {BLOOM_SHORT[day]} &middot; {scenario.simulationType}
                    </p>
                  </div>
                  <span className="text-slate-500">&rarr;</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="md" onClick={() => navigate('/')}>
            &larr; Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
