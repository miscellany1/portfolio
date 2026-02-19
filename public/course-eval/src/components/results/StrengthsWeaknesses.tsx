import { motion } from "framer-motion";
import { categories, getRatingLevel, type RatingValue } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";

export function StrengthsWeaknesses() {
  const ratings = useEvaluationStore((s) => s.ratings);

  // Flatten all criteria with their scores
  const scored = categories.flatMap((cat) =>
    cat.criteria.map((cr) => ({
      ...cr,
      categoryName: cat.name,
      score: (ratings[cr.id] || 0) as RatingValue,
    })),
  );

  const strengths = scored
    .filter((c) => c.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const improvements = scored
    .filter((c) => c.score > 0 && c.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Strengths */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 print-break-inside-avoid"
        data-print-light
      >
        <h3 className="font-semibold text-sm text-green-400 mb-3 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Strengths
        </h3>
        {strengths.length === 0 ? (
          <p className="text-xs text-slate-500">
            No criteria scored 3 or above.
          </p>
        ) : (
          <ul className="space-y-2">
            {strengths.map((item) => {
              const level = getRatingLevel(item.score);
              return (
                <li key={item.id} className="flex items-start gap-2 text-xs">
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded font-mono ${level?.bgClass} ${level?.textClass}`}
                  >
                    {item.score}
                  </span>
                  <div>
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-600 ml-1">
                      ({item.categoryName})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Areas for Improvement */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-xl p-5 print-break-inside-avoid"
        data-print-light
      >
        <h3 className="font-semibold text-sm text-amber-400 mb-3 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Areas for Improvement
        </h3>
        {improvements.length === 0 ? (
          <p className="text-xs text-slate-500">
            No criteria scored 2 or below.
          </p>
        ) : (
          <ul className="space-y-2">
            {improvements.map((item) => {
              const level = getRatingLevel(item.score);
              return (
                <li key={item.id} className="flex items-start gap-2 text-xs">
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded font-mono ${level?.bgClass} ${level?.textClass}`}
                  >
                    {item.score}
                  </span>
                  <div>
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-600 ml-1">
                      ({item.categoryName})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
