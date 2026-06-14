"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "theme-violet" | "theme-gold";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isUnlocked: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  userTier,
}: {
  children: React.ReactNode;
  userTier?: string;
}) {
  const [theme, setThemeState] = useState<Theme>("theme-violet");
  const isUnlocked = true; // Always unlocked now

  useEffect(() => {
    const savedTheme = localStorage.getItem("aura_theme") as Theme;
    if (
      savedTheme &&
      (savedTheme === "theme-violet" || savedTheme === "theme-gold")
    ) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("aura_theme", newTheme);
  };

  useEffect(() => {
    // Apply class to body
    document.body.classList.remove("theme-violet", "theme-gold");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isUnlocked }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
