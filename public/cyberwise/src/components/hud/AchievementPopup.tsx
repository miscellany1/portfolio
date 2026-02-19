import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore.ts';
import { getAchievement } from '../../data/achievements.ts';
import { useEffect } from 'react';

export const AchievementPopup = () => {
  const pendingAchievement = useGameStore((s) => s.pendingAchievement);
  const dismissAchievement = useGameStore((s) => s.dismissAchievement);

  const achievement = pendingAchievement ? getAchievement(pendingAchievement) : null;

  useEffect(() => {
    if (pendingAchievement) {
      const timer = setTimeout(dismissAchievement, 4000);
      return () => clearTimeout(timer);
    }
  }, [pendingAchievement, dismissAchievement]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-slate-800/95 px-5 py-4 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={dismissAchievement}
          role="alert"
        >
          <span className="text-3xl">{achievement.icon}</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
              Achievement Unlocked
            </p>
            <p className="text-sm font-bold text-slate-100">{achievement.name}</p>
            <p className="text-xs text-slate-400">{achievement.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
