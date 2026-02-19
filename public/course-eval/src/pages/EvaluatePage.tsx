import { categories } from "../data/framework";
import { useEvaluationStore } from "../stores/evaluationStore";
import { CategorySection } from "../components/evaluate/CategorySection";
import { ProgressSidebar } from "../components/evaluate/ProgressSidebar";

export function EvaluatePage() {
  const courseName = useEvaluationStore((s) => s.courseName);
  const evaluatorName = useEvaluationStore((s) => s.evaluatorName);
  const setCourseName = useEvaluationStore((s) => s.setCourseName);
  const setEvaluatorName = useEvaluationStore((s) => s.setEvaluatorName);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label
            htmlFor="courseName"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-green-500/50"
          />
        </div>
        <div>
          <label
            htmlFor="evaluatorName"
            className="block text-xs font-medium text-slate-400 mb-1.5"
          >
            Evaluator Name
          </label>
          <input
            id="evaluatorName"
            type="text"
            value={evaluatorName}
            onChange={(e) => setEvaluatorName(e.target.value)}
            placeholder="Your name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-green-500/50"
          />
        </div>
      </div>

      {/* Two-column layout: form + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main form */}
        <div className="flex-1 space-y-4 min-w-0">
          {categories.map((category, i) => (
            <CategorySection key={category.id} category={category} index={i} />
          ))}
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <ProgressSidebar />
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <ProgressSidebar />
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-40" />
    </div>
  );
}
