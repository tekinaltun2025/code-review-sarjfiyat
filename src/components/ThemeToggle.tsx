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
      onClick={toggleTheme}
      aria-label={isDark ? t("common.lightMode") : t("common.darkMode")}
      title={isDark ? t("common.lightMode") : t("common.darkMode")}
      className={`inline-flex items-center justify-center h-9 w-9 rounded-md text-foreground hover:bg-muted transition-colors ${className}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
