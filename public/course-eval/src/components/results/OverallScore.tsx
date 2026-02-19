import { motion } from "framer-motion";
import { useEvaluationStore } from "../../stores/evaluationStore";
import { getTierLabel } from "../../data/framework";

export function OverallScore() {
  const score = useEvaluationStore((s) => s.getOverallScore());
  const tier = getTierLabel(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center"
      data-print-light
    >
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
        Overall Score
      </p>
      <p className="text-5xl font-bold text-white font-mono">
        {score.toFixed(1)}
      </p>
      <p className="text-sm text-slate-400 mt-1">out of 4.0</p>
      <p className={`text-lg font-semibold mt-3 ${tier.color}`}>
        {tier.label}
      </p>
    </motion.div>
  );
}
