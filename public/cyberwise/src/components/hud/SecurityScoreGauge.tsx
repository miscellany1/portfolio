import { motion } from 'framer-motion';
import { useAnimatedScore } from '../../hooks/useAnimatedScore.ts';
import { getScoreColor } from '../../game/scoring.ts';

interface SecurityScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { dim: 80, stroke: 6, text: 'text-lg', label: 'text-xs' },
  md: { dim: 120, stroke: 8, text: 'text-2xl', label: 'text-xs' },
  lg: { dim: 160, stroke: 10, text: 'text-3xl', label: 'text-sm' },
};

export const SecurityScoreGauge = ({ score, size = 'md' }: SecurityScoreGaugeProps) => {
  const animatedScore = useAnimatedScore(score);
  const color = getScoreColor(animatedScore);
  const { dim, stroke, text, label } = sizes[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ type: 'spring', damping: 20, stiffness: 80 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`${text} font-bold font-mono`} style={{ color }}>
          {animatedScore}
        </span>
        <span className={`${label} font-medium text-slate-400 uppercase tracking-wider`}>
          Score
        </span>
      </div>
    </div>
  );
};
