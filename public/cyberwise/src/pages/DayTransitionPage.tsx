import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore.ts';
import { SecurityScoreGauge } from '../components/hud/SecurityScoreGauge.tsx';
import { TrustLevel } from '../components/hud/TrustLevel.tsx';
import { Button } from '../components/common/Button.tsx';
import { getNextDay, isLastDay, DAY_LABELS, DAY_ORDER } from '../game/progression.ts';
import { calculateDayScore } from '../game/scoring.ts';
import type { DayId } from '../data/scenarios/types.ts';
import { getScenario } from '../hooks/useScenarioEngine.ts';

export const DayTransitionPage = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const securityScore = useGameStore((s) => s.securityScore);
  const trustLevel = useGameStore((s) => s.trustLevel);
  const choiceHistory = useGameStore((s) => s.choiceHistory);
  const advanceToNextDay = useGameStore((s) => s.advanceToNextDay);
  const completeGame = useGameStore((s) => s.completeGame);

  if (!dayId || !DAY_ORDER.includes(dayId as DayId)) return null;

  const day = dayId as DayId;
  const dayChoices = choiceHistory.filter((c) => c.dayId === day);
  const dayScore = calculateDayScore(dayChoices.map((c) => c.quality));
  const scenario = getScenario(day);
  const lastDay = isLastDay(day);
  const nextDay = getNextDay(day);

  const handleNext = () => {
    if (lastDay) {
      completeGame();
      navigate('/results');
    } else if (nextDay) {
      advanceToNextDay(nextDay);
      navigate(`/scenario/${nextDay}`);
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 text-center">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-text-secondary">
          Day Complete
        </p>
        <h1 className="text-3xl font-bold text-text-primary">
          {DAY_LABELS[day]} Wrap-Up
        </h1>
        <p className="text-sm text-text-secondary">{scenario.title}</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="flex items-center justify-center gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SecurityScoreGauge score={securityScore} size="lg" />
        <div className="w-40 space-y-4">
          <TrustLevel trust={trustLevel} />
          <div className="rounded-lg border border-border-subtle bg-surface-raised p-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Day Performance
            </p>
            <p className="text-2xl font-bold font-mono text-text-primary">{dayScore}%</p>
          </div>
        </div>
      </motion.div>

      {/* Choice summary */}
      <motion.div
        className="flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {dayChoices.map((choice, i) => {
          const colorMap: Record<string, string> = {
            optimal: 'bg-green-500',
            acceptable: 'bg-yellow-500',
            poor: 'bg-orange-500',
            dangerous: 'bg-red-500',
          };
          return (
            <div
              key={i}
              className={`h-3 w-8 rounded-full ${colorMap[choice.quality]}`}
              title={`Step ${i + 1}: ${choice.quality}`}
            />
          );
        })}
      </motion.div>

      {/* Next action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button size="lg" onClick={handleNext}>
          {lastDay ? 'View Final Report' : `Continue to ${nextDay ? DAY_LABELS[nextDay] : ''}`}
        </Button>
      </motion.div>
    </div>
  );
};
