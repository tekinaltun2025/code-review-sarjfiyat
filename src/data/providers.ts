
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

export const providers: Provider[] = [
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
    id: "zes",
    name: "ZES",
    logo: "/lovable-uploads/ba1d435b-9f77-4746-a06c-2418d2fc09a7.png",
    acPrice: 8.99,
    dcPrice: 10.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://zes.net",
    notes: "DC 60 kW: 10,99 TL/kWh, DC 60 kW üstü: 12,99 TL/kWh, CHAdeMO: 12,99 TL/kWh"
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
    websiteUrl: "https://sharz.net"
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
    id: "echarge",
    name: "ECharge",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 7.92,
    dcPrice: 9.18,
    fastDcPrice: 11.50,
    membershipFee: 100,
    hasApp: false,
    websiteUrl: "https://example.com"
  },
  {
    id: "powersarj",
    name: "PowerŞarj",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 8.25,
    dcPrice: 9.65,
    fastDcPrice: 12.45,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com"
  },
  {
    id: "trugo",
    name: "Trugo",
    logo: "/lovable-uploads/9c4dd2d3-7787-4798-83a5-c72f0e6b15a1.png",
    acPrice: 8.49,
    dcPrice: 11.82,
    fastDcPrice: 11.82,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "AC: 22 kW, DC: 180 kW ve 300 kW"
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
    websiteUrl: "https://example.com",
    notes: "AC: 6,49 TL/kWh, DC: 8,99 TL/kWh"
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
    websiteUrl: "https://example.com",
    notes: "DC: 60 kWh ve üzeri"
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
    websiteUrl: "https://example.com",
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
    websiteUrl: "https://example.com",
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
    websiteUrl: "https://tesla.com",
    notes: "Tesla araçlar: 7,10 TL/kWh, Diğer araçlar: 8,60 TL/kWh"
  },
  {
    id: "aksasarj",
    name: "Aksa Şarj",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 6.99,
    dcPrice: 8.99,
    fastDcPrice: 8.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "AC: 22 kW, DC: 100 kW ve üzeri"
  },
  {
    id: "multiforce",
    name: "Multiforce",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 4.20,
    dcPrice: 8.39,
    fastDcPrice: 8.39,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "AC: En düşük AC fiyatı, DC: 30 kWh ve üzeri"
  },
  {
    id: "swapp",
    name: "Swapp",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 5.90,
    dcPrice: 6.90,
    fastDcPrice: 6.90,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: En düşük DC fiyatı, DC: 30 kWh ve üzeri"
  },
  {
    id: "onlife",
    name: "Onlife",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 5.79,
    dcPrice: 9.99,
    fastDcPrice: 9.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "obisarj",
    name: "Obişarj",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 9.90,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "AC: En yüksek AC fiyatı, DC: 180 kWh ve üzeri"
  },
  {
    id: "borenco",
    name: "Borenco",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 8.99,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "vale",
    name: "Vale",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 8.99,
    dcPrice: 12.99,
    fastDcPrice: 12.99,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "nevasarj",
    name: "Neva Şarj",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 7.40,
    dcPrice: 9.90,
    fastDcPrice: 9.90,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 180 kWh ve üzeri"
  },
  {
    id: "magicline",
    name: "Magicline",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 6.60,
    dcPrice: 7.80,
    fastDcPrice: 7.80,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "rhg",
    name: "RHG",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 4.70,
    dcPrice: 8.80,
    fastDcPrice: 8.80,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 60 kWh ve üzeri"
  },
  {
    id: "dcharge",
    name: "D-Charge",
    logo: "/lovable-uploads/4b3d5c8b-d6ac-46c1-97c0-db34ddc7c98f.png",
    acPrice: 7.99,
    dcPrice: 10.29,
    fastDcPrice: 10.29,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com",
    notes: "DC: 60 kWh ve üzeri"
  }
];
