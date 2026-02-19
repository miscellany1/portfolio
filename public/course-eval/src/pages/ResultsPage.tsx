import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEvaluationStore } from "../stores/evaluationStore";
import { RadarChart } from "../components/results/RadarChart";
import { OverallScore } from "../components/results/OverallScore";
import { CategoryBreakdown } from "../components/results/CategoryBreakdown";
import { StrengthsWeaknesses } from "../components/results/StrengthsWeaknesses";

export function ResultsPage() {
  const navigate = useNavigate();
  const courseName = useEvaluationStore((s) => s.courseName);
  const evaluatorName = useEvaluationStore((s) => s.evaluatorName);
  const date = useEvaluationStore((s) => s.date);
  const isComplete = useEvaluationStore((s) => s.isComplete);
  const resetEvaluation = useEvaluationStore((s) => s.resetEvaluation);
  const getRatedCount = useEvaluationStore((s) => s.getRatedCount);

  const handleNewEvaluation = () => {
    resetEvaluation();
    navigate("/evaluate");
  };

  if (getRatedCount() === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">
          No evaluation data yet. Start by rating a course.
        </p>
        <button
          onClick={() => navigate("/evaluate")}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Start Evaluation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-bold text-white">
          {courseName || "Untitled Course"}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {evaluatorName && `Evaluated by ${evaluatorName} · `}
          {date}
          {!isComplete() && (
            <span className="text-amber-400 ml-2">(Incomplete)</span>
          )}
        </p>
      </motion.div>

      {/* Overall score */}
      <div className="mb-6">
        <OverallScore />
      </div>

      {/* Radar chart — full width */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 flex items-center justify-center"
        data-print-light
      >
        <RadarChart />
      </div>

      {/* Strengths & Weaknesses */}
      <div className="mb-8">
        <StrengthsWeaknesses />
      </div>

      {/* Category Breakdown */}
      <div className="mb-8 print-break-before">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Category Breakdown
        </h2>
        <CategoryBreakdown />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center no-print pb-8">
        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
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
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          Export PDF
        </button>
        <button
          onClick={handleNewEvaluation}
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Evaluate Another Course
        </button>
      </div>
    </div>
  );
}
