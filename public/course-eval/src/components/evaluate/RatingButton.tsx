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
          : "border-border-subtle text-text-secondary hover:border-text-secondary hover:text-text-primary"
      }`}
    >
      {level.label}
    </button>
  );
}
