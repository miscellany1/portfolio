import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";
import { CriterionRow } from "./CriterionRow";

export function CategorySection({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const ratedCount = useEvaluationStore((s) =>
    s.getCategoryRatedCount(category.id),
  );
  const total = category.criteria.length;
  const allRated = ratedCount === total;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              allRated
                ? "bg-green-400/20 text-green-400"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {allRated ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <span>
                {ratedCount}/{total}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-100 text-sm">
            {category.name}
          </h3>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              {category.criteria.map((criterion) => (
                <CriterionRow key={criterion.id} criterion={criterion} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
