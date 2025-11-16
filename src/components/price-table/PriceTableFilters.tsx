import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
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
  onDcPriceFilterChange
}) => {
  const [nameFilter, setNameFilter] = useState("");

  // Updated AC price range options
  const acPriceRangeOptions = [
    { value: "all", label: "Tümü" },
    { value: "5-9", label: "5-9 ₺" },
    { value: "9-11", label: "9-11 ₺" },
    { value: "11-20", label: "11-20 ₺" }
  ];

  // DC price range options (keep the original)
  const dcPriceRangeOptions = [
    { value: "all", label: "Tümü" },
    { value: "0-10", label: "0-10 ₺" },
    { value: "10-12", label: "10-12 ₺" },
    { value: "12-15", label: "12-15 ₺" },
    { value: "15+", label: "15+ ₺" }
  ];

  // Handle name filter change
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameFilter(value);
    onNameFilterChange(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="operator-search" className="text-sm font-medium">
          Operatör Adı
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="operator-search"
            placeholder="Operatör ara..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            className="pl-9 border-gray-300"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ac-price" className="text-sm font-medium">
          AC Şarj Fiyatı
        </Label>
        <Select onValueChange={onAcPriceFilterChange} defaultValue="all">
          <SelectTrigger id="ac-price" className="w-full">
            <SelectValue placeholder="AC Şarj Fiyatı" />
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
          DC Şarj Fiyatı
        </Label>
        <Select onValueChange={onDcPriceFilterChange} defaultValue="all">
          <SelectTrigger id="dc-price" className="w-full">
            <SelectValue placeholder="DC Şarj Fiyatı" />
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
