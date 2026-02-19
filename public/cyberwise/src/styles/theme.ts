export const colors = {
  bg: {
    primary: '#0f172a',    // slate-900
    secondary: '#1e293b',  // slate-800
    surface: '#334155',    // slate-700
    elevated: '#475569',   // slate-600
  },
  accent: {
    blue: '#3b82f6',
    cyan: '#06b6d4',
  },
  semantic: {
    optimal: '#22c55e',    // green-500
    acceptable: '#eab308', // yellow-500
    poor: '#f97316',       // orange-500
    dangerous: '#ef4444',  // red-500
  },
  text: {
    primary: '#f1f5f9',    // slate-100
    secondary: '#94a3b8',  // slate-400
    muted: '#64748b',      // slate-500
  },
} as const;

export const qualityColors: Record<string, string> = {
  optimal: 'text-green-400 bg-green-500/10 border-green-500/30',
  acceptable: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  poor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  dangerous: 'text-red-400 bg-red-500/10 border-red-500/30',
};

export const qualityLabels: Record<string, string> = {
  optimal: 'Optimal Choice',
  acceptable: 'Acceptable',
  poor: 'Poor Choice',
  dangerous: 'Dangerous',
};
