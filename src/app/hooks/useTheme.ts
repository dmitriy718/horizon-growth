import { useColorScheme } from "react-native";

const lightColors = {
  primary: "#1E3A5F",
  secondary: "#E8A838",
  accent: "#6B4C9A",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  text: "#1F2937",
  textSecondary: "#6B7280",
  muted: "#9CA3AF",
  border: "#E5E7EB",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
  info: "#3B82F6",
  // Score colors
  scoreExcellent: "#22C55E",
  scoreGood: "#84CC16",
  scoreFair: "#EAB308",
  scorePoor: "#F97316",
  scoreVeryPoor: "#EF4444",
};

const darkColors = {
  primary: "#3B82F6",
  secondary: "#E8A838",
  accent: "#8B5CF6",
  background: "#0F1419",
  surface: "#1A2332",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  muted: "#6B7280",
  border: "#374151",
  error: "#F87171",
  success: "#34D399",
  warning: "#FBBF24",
  info: "#60A5FA",
  // Score colors
  scoreExcellent: "#34D399",
  scoreGood: "#A3E635",
  scoreFair: "#FDE047",
  scorePoor: "#FB923C",
  scoreVeryPoor: "#F87171",
};

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    isDark,
    colors: isDark ? darkColors : lightColors,
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    typography: {
      h1: { fontSize: 32, fontWeight: "700" as const, lineHeight: 40 },
      h2: { fontSize: 24, fontWeight: "600" as const, lineHeight: 32 },
      h3: { fontSize: 20, fontWeight: "600" as const, lineHeight: 28 },
      h4: { fontSize: 18, fontWeight: "500" as const, lineHeight: 24 },
      body: { fontSize: 16, fontWeight: "400" as const, lineHeight: 24 },
      bodySmall: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
      caption: { fontSize: 12, fontWeight: "400" as const, lineHeight: 16 },
    },
  };
}

