import { motion } from 'framer-motion';
import { useAnimatedScore } from '../../hooks/useAnimatedScore.ts';
import { getTrustLabel } from '../../game/scoring.ts';

interface TrustLevelProps {
  trust: number;
}

export const TrustLevel = ({ trust }: TrustLevelProps) => {
  const animatedTrust = useAnimatedScore(trust);
  const label = getTrustLabel(animatedTrust);

  const getColor = (val: number) => {
    if (val >= 80) return 'bg-green-500';
    if (val >= 60) return 'bg-blue-500';
    if (val >= 40) return 'bg-yellow-500';
    if (val >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">Trust Level</span>
        <span className="text-xs font-mono text-slate-300">{animatedTrust}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className={`h-full rounded-full ${getColor(animatedTrust)}`}
          animate={{ width: `${animatedTrust}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
        />
      </div>
      <span className="text-xs font-medium text-slate-400">{label}</span>
    </div>
  );
};
