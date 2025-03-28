
import { Provider } from "../types/provider.types";

// Providers without custom logos - using the generic charging station logo
export const otherProviders: Provider[] = [
  {
    id: "echarge",
    name: "ECharge",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 7.92,
    dcPrice: 9.18,
    fastDcPrice: 11.50,
    membershipFee: 100,
    hasApp: false,
    websiteUrl: "https://echarge.com.tr",
    notes: ""
  },
  {
    id: "powersarj",
    name: "PowerŞarj",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 8.25,
    dcPrice: 9.65,
    fastDcPrice: 12.45,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://powersarj.com",
    notes: ""
  },
  {
    id: "aksasarj",
    name: "Aksa Şarj",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 6.99,
    dcPrice: 8.99,
    fastDcPrice: 8.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://aksasarj.com",
    notes: "AC: 22 kW, DC: 100 kW ve üzeri"
  },
  {
    id: "multiforce",
    name: "Multiforce",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 4.20,
    dcPrice: 8.39,
    fastDcPrice: 8.39,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://bp.com/tr/turkey/home/products-and-services/elektrikli-arac-sarj-istasyonlari.html",
    notes: "AC: En düşük AC fiyatı, DC: 30 kWh ve üzeri"
  },
  {
    id: "swapp",
    name: "Swapp",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 5.90,
    dcPrice: 6.90,
    fastDcPrice: 6.90,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://swapp.com.tr",
    notes: "DC: En düşük DC fiyatı, DC: 30 kWh ve üzeri"
  },
  {
    id: "onlife",
    name: "Onlife",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 5.79,
    dcPrice: 9.99,
    fastDcPrice: 9.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://onlife.io",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "obisarj",
    name: "Obişarj",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 9.90,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://obisarj.com",
    notes: "AC: En yüksek AC fiyatı, DC: 180 kWh ve üzeri"
  },
  {
    id: "borenco",
    name: "Borenco",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 8.99,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://borenco.com.tr",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "vale",
    name: "Vale",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 8.99,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://vale.com.tr",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "nevasarj",
    name: "Neva Şarj",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 7.40,
    dcPrice: 9.90,
    fastDcPrice: 9.90,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://nevasarj.com",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "magicline",
    name: "Magicline",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 6.60,
    dcPrice: 7.80,
    fastDcPrice: 7.80,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://magicline.com.tr",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "rhg",
    name: "RHG",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 4.70,
    dcPrice: 8.80,
    fastDcPrice: 8.80,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://rhg.com.tr/ev-sarj-cihazlari",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "dcharge",
    name: "D-Charge",
    logo: "/lovable-uploads/07d1d847-f0a9-4a61-bbff-16b2b1e4a3bf.png",
    acPrice: 7.99,
    dcPrice: 10.29,
    fastDcPrice: 10.29,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://dcharge.com.tr",
    notes: "DC: 60 kWh ve üzeri"
  }
];
