
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Provider } from "@/data/types/provider.types";

interface ProviderSelectorProps {
  providers: Provider[];
  loading: boolean;
  selectedProvider: string;
  onProviderChange: (value: string) => void;
}

const ProviderSelector = ({
  providers,
  loading,
  selectedProvider,
  onProviderChange
}: ProviderSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Şarj Operatörü Seçin</label>
      <Select onValueChange={onProviderChange} value={selectedProvider}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Şarj operatörü seçin" />
        </SelectTrigger>
        <SelectContent className="max-h-80 overflow-y-auto">
          {loading ? (
            <SelectItem value="loading" disabled>Yükleniyor...</SelectItem>
          ) : (
            providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex items-center gap-2">
                  <img 
                    src={provider.logo} 
                    alt={provider.name} 
                    className="h-6 w-6 object-contain"
                  />
                  <span>{provider.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProviderSelector;
