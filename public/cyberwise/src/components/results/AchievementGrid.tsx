import { motion } from 'framer-motion';
import { achievements } from '../../data/achievements.ts';

interface AchievementGridProps {
  unlocked: string[];
}

export const AchievementGrid = ({ unlocked }: AchievementGridProps) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
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
                ? 'border-accent-gold/30 bg-accent-gold/5'
                : 'border-border-subtle/30 bg-surface-overlay/30 opacity-40'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isUnlocked ? 1 : 0.4, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-2xl">{isUnlocked ? ach.icon : '🔒'}</span>
            <span className="text-xs font-semibold text-text-primary">{ach.name}</span>
          </motion.div>
        );
      })}
    </div>
  </div>
);
