import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "react-i18next";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? t("common.lightMode") : t("common.darkMode")}
      title={isDark ? t("common.lightMode") : t("common.darkMode")}
      className={`relative inline-flex items-center h-7 w-[62px] rounded-full border border-border transition-colors ${
        isDark ? "bg-slate-800" : "bg-sky-100"
      } ${className}`}
    >
      {/* Sliding thumb */}
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full shadow-sm transition-all duration-200 ease-in-out flex items-center justify-center ${
          isDark
            ? "translate-x-[32px] bg-slate-900"
            : "translate-x-0.5 bg-yellow-400"
        }`}
        aria-hidden="true"
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-slate-200" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-white" />
        )}
      </span>
      {/* Background icons */}
      <span className="relative z-0 flex-1 flex justify-center">
        <Sun
          className={`h-3.5 w-3.5 transition-opacity ${
            isDark ? "opacity-40 text-slate-500" : "opacity-0"
          }`}
        />
      </span>
      <span className="relative z-0 flex-1 flex justify-center">
        <Moon
          className={`h-3.5 w-3.5 transition-opacity ${
            !isDark ? "opacity-40 text-sky-600" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
