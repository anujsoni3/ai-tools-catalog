"use client";

import { useState } from "react";

const THEME_KEY = "ai-tools-theme";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const initial = getInitialTheme();
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
    }
    return initial;
  });

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-900 shadow-sm backdrop-blur transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700/60 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
    >
      <span className="sr-only">Toggle theme</span>
      <svg
        aria-hidden
        className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none"
        viewBox="0 0 24 24"
        fill="none"
      >
        {isDark ? (
          // Sun icon
          <path
            d="M12 4.75V3m0 18v-1.75M6.364 6.364 5.01 5.01m13.98 13.98-1.354-1.354M4.75 12H3m18 0h-1.75M6.364 17.636 5.01 18.99m13.98-13.98-1.354 1.354M12 8.25A3.75 3.75 0 1 1 8.25 12 3.75 3.75 0 0 1 12 8.25Z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          // Moon icon
          <path
            d="M21 12.79A9 9 0 0 1 12.21 4 6.5 6.5 0 1 0 21 12.79Z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}
