
import React from "react";
import { Info } from "lucide-react";

interface PriceTableInfoFooterProps {
  lastUpdated: Date | null;
}

const PriceTableInfoFooter: React.FC<PriceTableInfoFooterProps> = ({ lastUpdated }) => {
  return (
    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 text-sm text-teal-700">
      <p className="flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <span>
          {lastUpdated ? (
            <>
              Fiyatlar {lastUpdated.toLocaleDateString('tr-TR')} tarihinde saat {lastUpdated.toLocaleTimeString('tr-TR')} 
              itibariyle güncellenmiştir. Geçerli fiyatlar için lütfen 
              ilgili operatörün resmi websitesini ziyaret ediniz. Tüm fiyatlar TL/kWh cinsindendir 
              ve KDV dahildir.
            </>
          ) : (
            <>
              Fiyat bilgileri için lütfen ilgili operatörün resmi websitesini ziyaret ediniz. 
              Tüm fiyatlar TL/kWh cinsindendir ve KDV dahildir.
            </>
          )}
        </span>
      </p>
    </div>
  );
};

export default PriceTableInfoFooter;
