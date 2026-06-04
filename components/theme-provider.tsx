"use client";

import * as React from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialise from the class the server set on <html> (read from the cookie),
  // so client state matches SSR with no flash.
  const [theme, setThemeState] = React.useState<Theme>("dark");

  React.useEffect(() => {
    setThemeState(
      document.documentElement.classList.contains("light") ? "light" : "dark"
    );
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
    // Persist in a cookie so the server can render the correct theme on next load.
    document.cookie = `theme=${t}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
