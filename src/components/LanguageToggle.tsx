import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "tr";
  const next = current === "tr" ? "en" : "tr";

  const handleClick = () => {
    void i18n.changeLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("common.language")}
      title={t("common.language")}
      className={`inline-flex items-center gap-1.5 h-9 px-2.5 rounded-md text-foreground hover:bg-muted transition-colors text-sm font-medium ${className}`}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="uppercase">{current}</span>
    </button>
  );
};

export default LanguageToggle;
