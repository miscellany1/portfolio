export const colors = {
  bg: {
    primary: '#FAF8F5',    // warm cream
    secondary: '#F5F0EB',  // overlay
    surface: '#FFFFFF',    // raised
    elevated: '#E2DDD8',   // border
  },
  accent: {
    blue: '#CC5959',       // terracotta (primary accent)
    cyan: '#4A635D',       // smokey jade
  },
  semantic: {
    optimal: '#22c55e',    // green-500
    acceptable: '#eab308', // yellow-500
    poor: '#f97316',       // orange-500
    dangerous: '#ef4444',  // red-500
  },
  text: {
    primary: '#2D2D2D',    // soft black
    secondary: '#6D7C90',  // warm gray
    muted: '#9CA3AF',      // lighter gray
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
