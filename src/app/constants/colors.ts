export const colors = {
  // Brand Colors
  horizon: {
    blue: "#1E3A5F",
    gold: "#E8A838",
    violet: "#6B4C9A",
    sky: "#E8F4FD",
    sage: "#4CAF50",
    coral: "#FF6B6B",
  },

  // Score Colors
  score: {
    excellent: "#22C55E", // 750+
    good: "#84CC16", // 700-749
    fair: "#EAB308", // 650-699
    poor: "#F97316", // 550-649
    veryPoor: "#EF4444", // <550
  },

  // Semantic Colors
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Neutrals
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

export function getScoreColor(score: number): string {
  if (score >= 750) return colors.score.excellent;
  if (score >= 700) return colors.score.good;
  if (score >= 650) return colors.score.fair;
  if (score >= 550) return colors.score.poor;
  return colors.score.veryPoor;
}

export function getScoreRating(score: number): string {
  if (score >= 750) return "Excellent";
  if (score >= 700) return "Good";
  if (score >= 650) return "Fair";
  if (score >= 550) return "Poor";
  return "Very Poor";
}

