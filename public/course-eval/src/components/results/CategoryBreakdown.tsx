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
            className="bg-surface-raised border border-border-subtle rounded-xl p-5 shadow-sm print-break-inside-avoid"
            data-print-light
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-text-primary">
                {category.name}
              </h3>
              <span className="text-sm font-mono text-text-secondary">
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
                      <span className="text-text-secondary">{criterion.name}</span>
                      <span
                        className={`font-mono ${level?.textClass || "text-text-secondary"}`}
                      >
                        {value > 0 ? level?.label : "Unrated"}
                      </span>
                    </div>
                    <div className="h-2 bg-surface-overlay rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: level?.color || "#E2DDD8",
                        }}
                      />
                    </div>
                    {note && (
                      <p className="text-xs text-text-secondary mt-1 italic">
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
