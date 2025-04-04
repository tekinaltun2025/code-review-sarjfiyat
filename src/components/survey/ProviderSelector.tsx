
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Provider } from "@/data/types/provider.types";
import { AlertCircle, Loader2 } from "lucide-react";

interface ProviderSelectorProps {
  providers: Provider[];
  loading: boolean;
  selectedProvider: string;
  onProviderChange: (value: string) => void;
  error?: string | null;
  required?: boolean;
}

const ProviderSelector = ({
  providers,
  loading,
  selectedProvider,
  onProviderChange,
  error = null,
  required = false
}: ProviderSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Şarj Operatörü Seçin {required && <span className="text-red-500">*</span>}
      </label>
      <Select onValueChange={onProviderChange} value={selectedProvider}>
        <SelectTrigger className={`w-full ${error ? "border-red-500 ring-red-500" : ""}`}>
          <SelectValue placeholder="Şarj operatörü seçin" />
        </SelectTrigger>
        <SelectContent className="max-h-80 overflow-y-auto bg-white">
          {loading ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span>Yükleniyor...</span>
            </div>
          ) : providers.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">
              Operatör listesi yüklenemedi
            </div>
          ) : (
            providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex items-center gap-2">
                  {provider.logo ? (
                    <img 
                      src={provider.logo} 
                      alt={provider.name} 
                      className="h-6 w-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  ) : (
                    <div className="h-6 w-6 bg-gray-200 rounded-full" />
                  )}
                  <span>{provider.name}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && (
        <div className="flex items-center text-sm text-red-500 mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      {!error && selectedProvider && (
        <p className="text-sm text-gray-500 mt-1">
          Seçilen operatör: {providers.find(p => p.id === selectedProvider)?.name}
        </p>
      )}
    </div>
  );
};

export default ProviderSelector;
