import { useTranslation } from "react-i18next";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "tr";
  const isEn = current === "en";

  const handleToggle = () => {
    void i18n.changeLanguage(isEn ? "tr" : "en");
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      onClick={handleToggle}
      aria-label={t("common.language")}
      title={t("common.language")}
      className={`relative inline-flex items-center h-7 w-[62px] rounded-full bg-muted border border-border transition-colors hover:bg-muted/80 ${className}`}
    >
      {/* Sliding thumb */}
      <span
        className={`absolute top-0.5 h-6 w-7 rounded-full bg-teal-500 shadow-sm transition-transform duration-200 ease-in-out ${
          isEn ? "translate-x-[30px]" : "translate-x-0.5"
        }`}
        aria-hidden="true"
      />
      {/* Labels */}
      <span
        className={`relative z-10 flex-1 text-[10px] font-bold text-center transition-colors ${
          !isEn ? "text-white" : "text-muted-foreground"
        }`}
      >
        TR
      </span>
      <span
        className={`relative z-10 flex-1 text-[10px] font-bold text-center transition-colors ${
          isEn ? "text-white" : "text-muted-foreground"
        }`}
      >
        EN
      </span>
    </button>
  );
};

export default LanguageToggle;
