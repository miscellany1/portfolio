import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore.ts';
import { Button } from '../components/common/Button.tsx';

export const LandingPage = () => {
  const navigate = useNavigate();
  const gameStarted = useGameStore((s) => s.gameStarted);
  const startGame = useGameStore((s) => s.startGame);
  const resetGame = useGameStore((s) => s.resetGame);
  const currentDay = useGameStore((s) => s.currentDay);
  const gameCompleted = useGameStore((s) => s.gameCompleted);

  const handleStart = () => {
    startGame();
    navigate('/scenario/monday');
  };

  const handleResume = () => {
    navigate(`/scenario/${currentDay}`);
  };

  const handleRestart = () => {
    resetGame();
    startGame();
    navigate('/scenario/monday');
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 text-center">
      <motion.div
        className="max-w-2xl space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo / Title */}
        <div className="space-y-4">
          <motion.div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          >
            <span className="text-4xl">🛡️</span>
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Cyber<span className="text-blue-400">wise</span>
          </h1>
          <p className="text-lg text-slate-400">
            Cybersecurity Awareness Training
          </p>
        </div>

        {/* Description */}
        <motion.div
          className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm leading-relaxed text-slate-300">
            Welcome to your first week at <span className="font-semibold text-blue-400">NovaTech</span>.
            As a new employee, you'll face real-world cybersecurity threats across five days — from phishing
            emails to incident response scenarios.
          </p>
          <p className="text-sm text-slate-400">
            Every choice you make affects your <span className="font-medium text-slate-300">Security Score</span> and
            {' '}<span className="font-medium text-slate-300">Trust Level</span>. Can you survive the week
            and become a Security Champion?
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-3 gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: '📧', label: '5 Scenarios' },
            { icon: '🎯', label: '20+ Decisions' },
            { icon: '🏆', label: '10 Achievements' },
          ].map((feat) => (
            <div key={feat.label} className="rounded-lg border border-slate-800 bg-slate-900/30 p-3">
              <span className="text-2xl">{feat.icon}</span>
              <p className="mt-1 text-xs font-medium text-slate-400">{feat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Primary action */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {!gameStarted || gameCompleted ? (
            <>
              <Button size="lg" onClick={handleStart}>
                Start Your First Week
              </Button>
              <Button variant="secondary" size="md" onClick={() => navigate('/days')}>
                Select a Day
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" onClick={handleResume}>
                Resume Training
              </Button>
              <div className="flex gap-3">
                <Button variant="secondary" size="md" onClick={() => navigate('/days')}>
                  Select a Day
                </Button>
                <Button variant="secondary" size="md" onClick={handleRestart}>
                  Start Over
                </Button>
              </div>
            </>
          )}
        </motion.div>

        {/* Footer links */}
        <motion.div
          className="flex justify-center gap-6 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/objectives')}
            className="text-sm text-slate-300 hover:text-slate-100 transition-colors underline underline-offset-2 decoration-slate-600 cursor-pointer"
          >
            Learning Objectives
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => navigate('/about')}
            className="text-sm text-slate-300 hover:text-slate-100 transition-colors underline underline-offset-2 decoration-slate-600 cursor-pointer"
          >
            About this Project
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
