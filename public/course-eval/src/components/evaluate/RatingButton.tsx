import type { RatingLevel, RatingValue } from "../../data/framework";

export function RatingButton({
  level,
  selected,
  onSelect,
}: {
  level: RatingLevel;
  selected: boolean;
  onSelect: (value: RatingValue) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(level.value)}
      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
        selected
          ? `${level.bgClass} ${level.borderClass} ${level.textClass}`
          : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300"
      }`}
    >
      {level.label}
    </button>
  );
}
