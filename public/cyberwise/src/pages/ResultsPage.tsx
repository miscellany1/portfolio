import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore.ts';
import { SecurityScoreGauge } from '../components/hud/SecurityScoreGauge.tsx';
import { TrustLevel } from '../components/hud/TrustLevel.tsx';
import { ScoreBreakdown } from '../components/results/ScoreBreakdown.tsx';
import { AchievementGrid } from '../components/results/AchievementGrid.tsx';
import { EndingNarrative } from '../components/results/EndingNarrative.tsx';
import { Button } from '../components/common/Button.tsx';
import { determineEnding } from '../game/endings.ts';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const securityScore = useGameStore((s) => s.securityScore);
  const trustLevel = useGameStore((s) => s.trustLevel);
  const choiceHistory = useGameStore((s) => s.choiceHistory);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const gameCompleted = useGameStore((s) => s.gameCompleted);
  const resetGame = useGameStore((s) => s.resetGame);

  useEffect(() => {
    if (!gameCompleted) navigate('/');
  }, [gameCompleted, navigate]);

  const { ending, trustPenalized, trustPenaltyNarrative } = determineEnding(securityScore, trustLevel);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          Week Complete
        </p>
        <h1 className="text-3xl font-bold text-slate-100">Your Security Report Card</h1>
        <p className="text-sm text-slate-400">
          Here's how you performed during your first week at NovaTech.
        </p>
      </motion.div>

      {/* Score overview */}
      <motion.div
        className="flex flex-col items-center justify-center gap-8 sm:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SecurityScoreGauge score={securityScore} size="lg" />
        <div className="w-48 space-y-4">
          <TrustLevel trust={trustLevel} />
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Decisions Made
            </p>
            <p className="text-2xl font-bold font-mono text-slate-200">{choiceHistory.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Ending narrative */}
      <EndingNarrative ending={ending} trustPenalized={trustPenalized} originalEndingNarrative={trustPenaltyNarrative} />

      {/* Score breakdown */}
      <ScoreBreakdown choiceHistory={choiceHistory} />

      {/* Achievements */}
      <AchievementGrid unlocked={unlockedAchievements} />

      {/* Actions */}
      <motion.div
        className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button size="lg" onClick={handlePlayAgain}>
          Play Again
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/about')}>
          About This Project
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate('/objectives')}>
          Review Objectives
        </Button>
      </motion.div>
    </div>
  );
};
