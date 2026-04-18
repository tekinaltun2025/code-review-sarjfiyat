
import React from "react";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SortKey = 'acPrice' | 'dcPrice';

interface PriceTableHeaderProps {
  sortBy: SortKey | null;
  handleSort: (key: SortKey) => void;
  getSortIcon: (key: SortKey) => React.ReactNode;
}

const PriceTableHeader: React.FC<PriceTableHeaderProps> = ({
  sortBy,
  handleSort,
  getSortIcon,
}) => {
  const { t } = useTranslation();
  return (
    <thead>
      <tr className="bg-muted">
        <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-foreground w-32 sm:w-48">
          {t("priceTable.operator")}
        </th>
        <th
          className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground cursor-pointer hover:text-teal-600 w-16 sm:w-24"
          onClick={() => handleSort('acPrice')}
        >
          <div className="flex flex-col items-center">
            <span>{t("priceTable.acCharge")}</span>
            <span className="text-xs">(₺/kWh)</span>
            {getSortIcon('acPrice')}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center mt-1" aria-label={t("priceTable.acCharge")}>
                  <Info className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">{t("priceTable.acTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th
          className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground cursor-pointer hover:text-teal-600 w-16 sm:w-24"
          onClick={() => handleSort('dcPrice')}
        >
          <div className="flex flex-col items-center">
            <span>{t("priceTable.dcCharge")}</span>
            <span className="text-xs">(₺/kWh)</span>
            {getSortIcon('dcPrice')}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center mt-1" aria-label={t("priceTable.dcCharge")}>
                  <Info className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">{t("priceTable.dcTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground w-20 sm:w-32 hidden sm:table-cell">
          <div className="flex flex-col items-center">
            <span>{t("priceTable.stationsCol")}</span>
            <span className="text-[9px] sm:text-xs">{t("priceTable.stationsColSub")}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center mt-1" aria-label={t("priceTable.stationsCol")}>
                  <Info className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-48">{t("priceTable.stationsTooltip")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </th>
        <th className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground w-20 sm:w-28 hidden sm:table-cell">
          {t("priceTable.support")}
        </th>
        <th className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground w-12 sm:w-20">
          {t("priceTable.web")}
        </th>
        <th className="px-1 sm:px-3 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-foreground w-24 sm:w-32 hidden md:table-cell">
          {t("priceTable.notes")}
        </th>
      </tr>
    </thead>
  );
};

export default PriceTableHeader;
