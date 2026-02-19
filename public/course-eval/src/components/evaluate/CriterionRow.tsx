import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Criterion, RatingValue } from "../../data/framework";
import { ratingLevels } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";
import { RatingButton } from "./RatingButton";

export function CriterionRow({ criterion }: { criterion: Criterion }) {
  const rating = useEvaluationStore(
    (s) => s.ratings[criterion.id] || (0 as RatingValue),
  );
  const note = useEvaluationStore((s) => s.notes[criterion.id] || "");
  const setRating = useEvaluationStore((s) => s.setRating);
  const setNote = useEvaluationStore((s) => s.setNote);
  const [showNotes, setShowNotes] = useState(note.length > 0);

  return (
    <div className="py-4 border-b border-slate-800/50 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-slate-200">
            {criterion.name}
          </h4>
          <p className="text-xs text-slate-500 mt-1">{criterion.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className="shrink-0 p-1.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          title="Add notes"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {ratingLevels.map((level) => (
          <RatingButton
            key={level.value}
            level={level}
            selected={rating === level.value}
            onSelect={(v) => setRating(criterion.id, v)}
          />
        ))}
      </div>
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <textarea
              value={note}
              onChange={(e) => setNote(criterion.id, e.target.value)}
              placeholder="Add notes for this criterion..."
              className="mt-3 w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 resize-y min-h-[60px] focus:outline-none focus:border-green-500/50"
              rows={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
