import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PriceTableFiltersProps {
  onNameFilterChange: (value: string) => void;
  onAcPriceFilterChange: (value: string) => void;
  onDcPriceFilterChange: (value: string) => void;
}

const PriceTableFilters: React.FC<PriceTableFiltersProps> = ({
  onNameFilterChange,
  onAcPriceFilterChange,
  onDcPriceFilterChange,
}) => {
  const { t } = useTranslation();
  const [nameFilter, setNameFilter] = useState("");

  const acPriceRangeOptions = [
    { value: "all", label: t("priceTable.rangeAll") },
    { value: "5-9", label: "5-9 ₺" },
    { value: "9-11", label: "9-11 ₺" },
    { value: "11-20", label: "11-20 ₺" },
  ];

  const dcPriceRangeOptions = [
    { value: "all", label: t("priceTable.rangeAll") },
    { value: "0-9", label: "0-9 ₺" },
    { value: "9-11", label: "9-11 ₺" },
    { value: "11-13", label: "11-13 ₺" },
    { value: "13+", label: "13+ ₺" },
  ];

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
    onNameFilterChange(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="operator-search" className="text-sm font-medium">
          {t("priceTable.operatorName")}
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="operator-search"
            placeholder={t("priceTable.searchPlaceholder")}
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ac-price" className="text-sm font-medium">
          {t("priceTable.acFilter")}
        </Label>
        <Select onValueChange={onAcPriceFilterChange} defaultValue="all">
          <SelectTrigger id="ac-price" className="w-full">
            <SelectValue placeholder={t("priceTable.acFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {acPriceRangeOptions.map((option) => (
                <SelectItem key={`ac-${option.value}`} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dc-price" className="text-sm font-medium">
          {t("priceTable.dcFilter")}
        </Label>
        <Select onValueChange={onDcPriceFilterChange} defaultValue="all">
          <SelectTrigger id="dc-price" className="w-full">
            <SelectValue placeholder={t("priceTable.dcFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dcPriceRangeOptions.map((option) => (
                <SelectItem key={`dc-${option.value}`} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PriceTableFilters;
