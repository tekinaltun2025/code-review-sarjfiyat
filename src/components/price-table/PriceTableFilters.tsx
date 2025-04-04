
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
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

  // Price range options
  const priceRangeOptions = [
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Operatör ara..."
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="pl-9 border-gray-300"
        />
      </div>
      
      <div>
        <Select onValueChange={onAcPriceFilterChange} defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="AC Şarj Fiyatı" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {priceRangeOptions.map((option) => (
                <SelectItem key={`ac-${option.value}`} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select onValueChange={onDcPriceFilterChange} defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="DC Şarj Fiyatı" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {priceRangeOptions.map((option) => (
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
