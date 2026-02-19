import { Link } from "react-router-dom";
import { categories } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";

export function ProgressSidebar() {
  const getRatedCount = useEvaluationStore((s) => s.getRatedCount);
  const getTotalCriteria = useEvaluationStore((s) => s.getTotalCriteria);
  const isComplete = useEvaluationStore((s) => s.isComplete);
  const getCategoryRatedCount = useEvaluationStore(
    (s) => s.getCategoryRatedCount,
  );

  const rated = getRatedCount();
  const total = getTotalCriteria();
  const complete = isComplete();
  const progress = total > 0 ? (rated / total) * 100 : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sticky top-20">
      <h3 className="font-semibold text-sm text-slate-200 mb-3">Progress</h3>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>
            {rated} of {total} rated
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category completion */}
      <ul className="space-y-2">
        {categories.map((cat) => {
          const catRated = getCategoryRatedCount(cat.id);
          const catTotal = cat.criteria.length;
          const catComplete = catRated === catTotal;
          return (
            <li key={cat.id} className="flex items-center gap-2 text-xs">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  catComplete
                    ? "bg-green-400/20 text-green-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {catComplete ? (
                  <svg
                    className="w-2.5 h-2.5"
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
                  <span className="text-[9px]">
                    {catRated}/{catTotal}
                  </span>
                )}
              </div>
              <span
                className={
                  catComplete ? "text-slate-300" : "text-slate-500"
                }
              >
                {cat.name}
              </span>
            </li>
          );
        })}
      </ul>

      {/* View results button */}
      <Link
        to={complete ? "/results" : "#"}
        className={`mt-4 block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
          complete
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-slate-800 text-slate-500 cursor-not-allowed"
        }`}
        onClick={(e) => !complete && e.preventDefault()}
      >
        {complete ? "View Results" : `Rate ${total - rated} more to finish`}
      </Link>
    </div>
  );
}
