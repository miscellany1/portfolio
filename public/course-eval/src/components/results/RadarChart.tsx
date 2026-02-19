import { useEffect, useState } from "react";
import { categories } from "../../data/framework";
import { useEvaluationStore } from "../../stores/evaluationStore";

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 120;
const LEVELS = 4;
const LINE_HEIGHT = 18;

function polarToCartesian(
  angle: number,
  radius: number,
): { x: number; y: number } {
  // Start from top (- PI/2) and go clockwise
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = words[0];
  for (let i = 1; i < words.length; i++) {
    if ((line + " " + words[i]).length <= maxChars) {
      line += " " + words[i];
    } else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

export function RadarChart() {
  const getCategoryScore = useEvaluationStore((s) => s.getCategoryScore);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const angleStep = 360 / categories.length;

  // Grid lines (concentric pentagons)
  const gridLines = Array.from({ length: LEVELS }, (_, level) => {
    const r = (RADIUS / LEVELS) * (level + 1);
    const points = categories
      .map((_, i) => {
        const { x, y } = polarToCartesian(i * angleStep, r);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  });

  // Axis lines
  const axes = categories.map((_, i) => {
    const { x, y } = polarToCartesian(i * angleStep, RADIUS);
    return { x, y };
  });

  // Data polygon
  const scores = categories.map((cat) => getCategoryScore(cat.id));
  const dataPoints = scores.map((score, i) => {
    const r = (RADIUS / LEVELS) * score;
    return polarToCartesian(i * angleStep, animated ? r : 0);
  });
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Labels
  const labels = categories.map((cat, i) => {
    const labelR = RADIUS + 24;
    const { x, y } = polarToCartesian(i * angleStep, labelR);
    const angle = i * angleStep;
    let anchor: "start" | "middle" | "end" = "middle";
    if (angle > 10 && angle < 170) anchor = "start";
    else if (angle > 190 && angle < 350) anchor = "end";
    const nameLines = wrapText(cat.name, 18);
    // For top-half labels, shift up so the text block sits above the anchor
    const isTop = y < CENTER;
    const yOffset = isTop ? -(nameLines.length - 1) * LINE_HEIGHT : 0;
    return { x, y, anchor, nameLines, score: scores[i], yOffset };
  });

  return (
    <div className="flex justify-center" data-print-light>
      <svg
        viewBox="-115 -45 535 370"
        className="w-full"
      >
        {/* Grid */}
        {gridLines.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#334155"
            strokeWidth={0.5}
            opacity={0.6}
          />
        ))}

        {/* Axes */}
        {axes.map((point, i) => (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={point.x}
            y2={point.y}
            stroke="#334155"
            strokeWidth={0.5}
            opacity={0.6}
          />
        ))}

        {/* Level labels (1-4) */}
        {Array.from({ length: LEVELS }, (_, i) => {
          const r = (RADIUS / LEVELS) * (i + 1);
          return (
            <text
              key={i}
              x={CENTER + 4}
              y={CENTER - r + 4}
              fill="#64748b"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {i + 1}
            </text>
          );
        })}

        {/* Data polygon */}
        <polygon
          points={dataPath}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth={2}
          style={{
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={3.5}
            fill="#22c55e"
            stroke="#0f172a"
            strokeWidth={1.5}
            style={{
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            fill="#94a3b8"
            fontSize="16"
            fontFamily="var(--font-sans)"
          >
            {label.nameLines.map((line, j) => (
              <tspan
                key={j}
                x={label.x}
                dy={j === 0 ? label.yOffset : LINE_HEIGHT}
              >
                {line}
              </tspan>
            ))}
            <tspan
              x={label.x}
              dy={LINE_HEIGHT}
              fill="#64748b"
              fontFamily="var(--font-mono)"
              fontSize="13"
            >
              {label.score.toFixed(1)}
            </tspan>
          </text>
        ))}
      </svg>
    </div>
  );
}
