import { motion } from "framer-motion";
import { categories, getRatingLevel } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";

export function CategoryBreakdown() {
  const ratings = useEvaluationStore((s) => s.ratings);
  const getCategoryScore = useEvaluationStore((s) => s.getCategoryScore);
  const notes = useEvaluationStore((s) => s.notes);

  return (
    <div className="space-y-4">
      {categories.map((category, catIdx) => {
        const catScore = getCategoryScore(category.id);
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: catIdx * 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 print-break-inside-avoid"
            data-print-light
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-slate-200">
                {category.name}
              </h3>
              <span className="text-sm font-mono text-slate-400">
                {catScore.toFixed(1)} / 4.0
              </span>
            </div>
            <div className="space-y-2.5">
              {category.criteria.map((criterion) => {
                const value = ratings[criterion.id] || 0;
                const level = getRatingLevel(value as 1 | 2 | 3 | 4);
                const pct = value > 0 ? (value / 4) * 100 : 0;
                const note = notes[criterion.id];

                return (
                  <div key={criterion.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">{criterion.name}</span>
                      <span
                        className={`font-mono ${level?.textClass || "text-slate-600"}`}
                      >
                        {value > 0 ? level?.label : "Unrated"}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: level?.color || "#475569",
                        }}
                      />
                    </div>
                    {note && (
                      <p className="text-xs text-slate-500 mt-1 italic">
                        {note}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
