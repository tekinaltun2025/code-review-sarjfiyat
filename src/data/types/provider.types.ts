
export interface Provider {
  id: string;
  name: string;
  logo: string;
  acPrice: number;
  dcPrice: number;
  fastDcPrice: number;
  membershipFee: number | null;
  hasApp: boolean;
  websiteUrl: string;
  stationCount?: number;
  stationInfo?: string; // Lokasyon/Soket formatındaki istasyon bilgisi
  supportLine?: string; // Destek hattı bilgisi
  notes?: string;
}
