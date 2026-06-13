"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const OPTIONS = [
  {
    value: "theme-violet" as const,
    label: "Violet Tech",
    hint: "Dark",
    icon: Moon,
    swatch: "linear-gradient(135deg,#7c3aed,#4f46e5)",
  },
  {
    value: "theme-gold" as const,
    label: "Royal Gold",
    hint: "Light",
    icon: Sun,
    swatch: "linear-gradient(135deg,#ead08a,#c9a227)",
  },
];

/* Segmented selector — used in the profile dropdown */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="px-2">
      <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-subtle)]">
        Interface Theme
      </p>
      <div
        className="grid grid-cols-2 gap-1.5 rounded-2xl border p-1.5"
        style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        role="radiogroup"
        aria-label="Interface theme"
      >
        {OPTIONS.map((opt) => {
          const active = theme === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setTheme(opt.value)}
              className="relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 transition-all duration-300"
              style={{
                background: active ? "var(--surface)" : "transparent",
                boxShadow: active ? "var(--card-shadow)" : "none",
                outline: active ? "1px solid var(--border-strong)" : "1px solid transparent",
              }}
            >
              <span
                className="grid h-8 w-8 place-items-center rounded-lg text-white shadow-md"
                style={{ backgroundImage: opt.swatch }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex flex-col items-center leading-none">
                <span
                  className="text-xs font-bold"
                  style={{ color: active ? "var(--text)" : "var(--text-muted)" }}
                >
                  {opt.label}
                </span>
                <span className="mt-0.5 text-[10px] font-medium text-[var(--text-subtle)]">
                  {opt.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Compact icon toggle — used in the top nav */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "theme-violet";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "theme-gold" : "theme-violet")}
      aria-label={`Switch to ${isDark ? "Royal Gold (light)" : "Violet Tech (dark)"} theme`}
      title={`Switch to ${isDark ? "Royal Gold (light)" : "Violet Tech (dark)"} theme`}
      className={`group relative grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${className}`}
      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
    >
      <span className="relative h-4 w-4">
        <Sun
          className="absolute inset-0 h-4 w-4 transition-all duration-500"
          style={{
            color: "var(--accent-2)",
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0) scale(1)",
          }}
        />
        <Moon
          className="absolute inset-0 h-4 w-4 transition-all duration-500"
          style={{
            color: "var(--accent)",
            opacity: isDark ? 1 : 0,
            transform: isDark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
        />
      </span>
    </button>
  );
}

export default ThemeSwitcher;
