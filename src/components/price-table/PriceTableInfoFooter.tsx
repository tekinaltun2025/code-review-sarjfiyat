
import React from "react";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PriceTableInfoFooterProps {
  lastUpdated: Date | null;
}

const PriceTableInfoFooter: React.FC<PriceTableInfoFooterProps> = ({ lastUpdated }) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("en") ? "en-GB" : "tr-TR";

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formatTime = (date: Date) =>
    date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 text-sm text-teal-700 dark:text-teal-300">
      <p className="flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <span>
          {lastUpdated
            ? t("priceTable.infoWithDate", { date: formatDate(lastUpdated), time: formatTime(lastUpdated) })
            : t("priceTable.infoNoDate")}
        </span>
      </p>
    </div>
  );
};

export default PriceTableInfoFooter;
