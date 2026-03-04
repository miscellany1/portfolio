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
    <div className="bg-surface-raised border border-border-subtle rounded-xl p-4 sticky top-20 shadow-sm">
      <h3 className="font-semibold text-sm text-text-primary mb-3">Progress</h3>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1.5">
          <span>
            {rated} of {total} rated
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-surface-overlay rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
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
                    ? "bg-accent/20 text-accent"
                    : "bg-surface-overlay text-text-secondary"
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
                  catComplete ? "text-text-primary" : "text-text-secondary"
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
            ? "bg-accent hover:bg-accent-hover text-white"
            : "bg-surface-overlay text-text-secondary cursor-not-allowed"
        }`}
        onClick={(e) => !complete && e.preventDefault()}
      >
        {complete ? "View Results" : `Rate ${total - rated} more to finish`}
      </Link>
    </div>
  );
}
