"use client";

import { cn } from "@/lib/utils/cn";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "light" | "dark" | "auto";
  className?: string;
}

const sizes = {
  sm: { icon: 24, text: "text-lg", gap: "gap-1.5" },
  md: { icon: 32, text: "text-xl", gap: "gap-2" },
  lg: { icon: 40, text: "text-2xl", gap: "gap-2.5" },
  xl: { icon: 48, text: "text-3xl", gap: "gap-3" },
};

/**
 * Horizon Logo - Official Brand Logo
 * Rising Sun/Horizon: A half-circle representing a sunrise over a horizon line
 * Symbolizes new beginnings, upward trajectory, and hope for better credit
 */
export function Logo({
  variant = "full",
  size = "md",
  theme = "auto",
  className,
}: LogoProps) {
  const s = sizes[size];
  
  const getColors = () => {
    if (theme === "light") return { primary: "#1E3A5F", accent: "#E8A838" };
    if (theme === "dark") return { primary: "#ffffff", accent: "#E8A838" };
    return { primary: "currentColor", accent: "#E8A838" };
  };
  
  const colors = getColors();

  const IconSVG = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Horizon line */}
      <rect
        x="4"
        y="28"
        width="40"
        height="3"
        rx="1.5"
        fill={colors.primary}
      />
      {/* Rising sun arc */}
      <path
        d="M8 28C8 19.163 15.163 12 24 12C32.837 12 40 19.163 40 28"
        stroke={colors.accent}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Sun rays */}
      <path
        d="M24 4V8"
        stroke={colors.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M12 10L14.5 13"
        stroke={colors.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M36 10L33.5 13"
        stroke={colors.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Credit score indicator */}
      <circle cx="24" cy="36" r="6" fill={colors.primary} />
      <path
        d="M21 36L23 38L27 34"
        stroke={theme === "dark" ? "#1E3A5F" : "#ffffff"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <IconSVG />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "font-serif font-bold tracking-tight",
          s.text,
          className
        )}
        style={{ color: colors.primary }}
      >
        Horizon
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center", s.gap, className)}>
      <IconSVG />
      <span
        className={cn("font-serif font-bold tracking-tight", s.text)}
        style={{ color: colors.primary }}
      >
        Horizon
      </span>
    </div>
  );
}

/**
 * Alternative Logo - Option 2: Abstract H with Upward Arrow
 * Modern, tech-focused design
 */
export function LogoAlt({
  variant = "full",
  size = "md",
  theme = "auto",
  className,
}: LogoProps) {
  const s = sizes[size];
  
  const getColors = () => {
    if (theme === "light") return { primary: "#1E3A5F", accent: "#E8A838" };
    if (theme === "dark") return { primary: "#ffffff", accent: "#E8A838" };
    return { primary: "currentColor", accent: "#E8A838" };
  };
  
  const colors = getColors();

  const IconSVG = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* H shape */}
      <rect x="8" y="8" width="6" height="32" rx="3" fill={colors.primary} />
      <rect x="34" y="8" width="6" height="32" rx="3" fill={colors.primary} />
      <rect x="14" y="20" width="20" height="6" rx="3" fill={colors.primary} />
      {/* Upward arrow overlay */}
      <path
        d="M24 6L32 16H26V28H22V16H16L24 6Z"
        fill={colors.accent}
      />
    </svg>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <IconSVG />
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center", s.gap, className)}>
      <IconSVG />
      <span
        className={cn("font-serif font-bold tracking-tight", s.text)}
        style={{ color: colors.primary }}
      >
        Horizon
      </span>
    </div>
  );
}

/**
 * Alternative Logo - Option 3: Shield with Checkmark
 * Trust and security focused
 */
export function LogoShield({
  variant = "full",
  size = "md",
  theme = "auto",
  className,
}: LogoProps) {
  const s = sizes[size];
  
  const getColors = () => {
    if (theme === "light") return { primary: "#1E3A5F", accent: "#E8A838" };
    if (theme === "dark") return { primary: "#ffffff", accent: "#E8A838" };
    return { primary: "currentColor", accent: "#E8A838" };
  };
  
  const colors = getColors();

  const IconSVG = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Shield shape */}
      <path
        d="M24 4L6 12V22C6 33.05 13.8 43.22 24 46C34.2 43.22 42 33.05 42 22V12L24 4Z"
        fill={colors.primary}
      />
      {/* Inner shield */}
      <path
        d="M24 8L10 14.4V22.4C10 31.18 16.44 39.22 24 41.6C31.56 39.22 38 31.18 38 22.4V14.4L24 8Z"
        fill={theme === "dark" ? "#1E3A5F" : "#ffffff"}
      />
      {/* Checkmark */}
      <path
        d="M18 24L22 28L30 20"
        stroke={colors.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <IconSVG />
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center", s.gap, className)}>
      <IconSVG />
      <div className="flex flex-col">
        <span
          className={cn("font-serif font-bold tracking-tight leading-none", s.text)}
          style={{ color: colors.primary }}
        >
          Horizon
        </span>
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: colors.accent }}
        >
          Credit Repair
        </span>
      </div>
    </div>
  );
}

