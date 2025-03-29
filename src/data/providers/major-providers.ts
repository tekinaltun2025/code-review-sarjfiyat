
// This file is kept for reference only
// The actual data is now fetched from Google Sheets

import { Provider } from "../types/provider.types";

// Providers with custom logos provided by the user
export const majorProviders: Provider[] = [
  {
    id: "trugo",
    name: "Trugo",
    logo: "/lovable-uploads/9c4dd2d3-7787-4798-83a5-c72f0e6b15a1.png",
    acPrice: 8.49,
    dcPrice: 11.82,
    fastDcPrice: 11.82,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://trugo.com.tr",
    notes: "AC: 22 kW, DC: 180 kW ve 300 kW"
  },
  {
    id: "zes",
    name: "ZES",
    logo: "/lovable-uploads/ba1d435b-9f77-4746-a06c-2418d2fc09a7.png",
    acPrice: 8.99,
    dcPrice: 10.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://zes.net/tr",
    notes: "DC 60 kW: 10,99 TL/kWh, DC 60 kW üstü: 12,99 TL/kWh, CHAdeMO: 12,99 TL/kWh"
  },
  {
    id: "beefull",
    name: "Beefull",
    logo: "/lovable-uploads/cc0015aa-72d6-4e18-bc05-8c7486d57eb7.png",
    acPrice: 8.59,
    dcPrice: 10.99,
    fastDcPrice: 10.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://beefull.com",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "esarj",
    name: "E-Şarj",
    logo: "/lovable-uploads/9c5da173-d35f-4ee5-af1e-ade7186754c1.png",
    acPrice: 8.9,
    dcPrice: 9.9,
    fastDcPrice: 11.9,
    membershipFee: 0,
    hasApp: true,
    websiteUrl: "https://esarj.com",
    notes: "DC 60 kW: 9,90 TL/kWh, Diğer DC soketler: 11,90 TL/kWh"
  },
  {
    id: "sharz",
    name: "Sharz",
    logo: "/lovable-uploads/92c3c249-8f40-4cc6-9c8c-15f6891a5e5e.png",
    acPrice: 7.95,
    dcPrice: 9.25,
    fastDcPrice: 11.75,
    membershipFee: 150,
    hasApp: true,
    websiteUrl: "https://sharz.com.tr",
    notes: ""
  },
  {
    id: "voltrun",
    name: "Voltrun",
    logo: "/lovable-uploads/fb66fe81-1208-4c6d-a276-363ee14ce4b9.png",
    acPrice: 9.29,
    dcPrice: 12.49,
    fastDcPrice: 12.49,
    membershipFee: 200,
    hasApp: true,
    websiteUrl: "https://voltrun.com",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "astor",
    name: "Astor Şarj",
    logo: "/lovable-uploads/eb86de15-9042-4788-88e3-57c2ebc2a451.png",
    acPrice: 6.49,
    dcPrice: 8.99,
    fastDcPrice: 8.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://astorsarj.com",
    notes: "AC: 6,49 TL/kWh, DC: 8,99 TL/kWh"
  },
  {
    id: "otowatt",
    name: "Otowatt",
    logo: "/lovable-uploads/4d178d3c-d0c2-4960-a707-c4f0230e9885.png",
    acPrice: 6.49,
    dcPrice: 10.99,
    fastDcPrice: 10.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://otowatt.com.tr",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "petrolofisi",
    name: "Petrol Ofisi e-POwer",
    logo: "/lovable-uploads/6e47365f-9335-4024-9da3-18b00c4ce94b.png",
    acPrice: 7.50,
    dcPrice: 8.50,
    fastDcPrice: 8.50,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://epower.petrolofisi.com.tr",
    notes: "AC Tip 2 soketler: 7,50 TL/kWh, DC Tip CCS soketler: 8,50 TL/kWh"
  },
  {
    id: "tesla",
    name: "Tesla Supercharger",
    logo: "/lovable-uploads/ee7cd67b-4d0f-482c-ade0-f02ed83fb68a.png",
    acPrice: 7.10,
    dcPrice: 8.60,
    fastDcPrice: 8.60,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://www.tesla.com/tr_tr/supercharger",
    notes: "Tesla araçlar: 7,10 TL/kWh, Diğer araçlar: 8,60 TL/kWh"
  }
];
