import { motion } from 'framer-motion';
import { achievements } from '../../data/achievements.ts';

interface AchievementGridProps {
  unlocked: string[];
}

export const AchievementGrid = ({ unlocked }: AchievementGridProps) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
      Achievements ({unlocked.length}/{achievements.length})
    </h3>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {achievements.map((ach, i) => {
        const isUnlocked = unlocked.includes(ach.id);
        return (
          <motion.div
            key={ach.id}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-center ${
              isUnlocked
                ? 'border-yellow-500/30 bg-yellow-500/5'
                : 'border-slate-700/30 bg-slate-800/30 opacity-40'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isUnlocked ? 1 : 0.4, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-2xl">{isUnlocked ? ach.icon : '🔒'}</span>
            <span className="text-xs font-semibold text-slate-300">{ach.name}</span>
          </motion.div>
        );
      })}
    </div>
  </div>
);
