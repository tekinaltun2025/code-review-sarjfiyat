
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
  notes?: string;
}
