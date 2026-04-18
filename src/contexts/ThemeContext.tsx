import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "app-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const resolveTheme = (pref: ThemePreference): Theme =>
  pref === "system" ? getSystemTheme() : pref;

const getInitialPreference = (): ThemePreference => {
  if (typeof window === "undefined") return "system";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(getInitialPreference);
  const [theme, setTheme] = useState<Theme>(() => resolveTheme(getInitialPreference()));

  // Apply class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  // Listen for system theme changes when preference is "system"
  useEffect(() => {
    if (preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const setPreference = useCallback((pref: ThemePreference) => {
    setPreferenceState(pref);
    setTheme(resolveTheme(pref));
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, pref);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(theme === "dark" ? "light" : "dark");
  }, [theme, setPreference]);

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
