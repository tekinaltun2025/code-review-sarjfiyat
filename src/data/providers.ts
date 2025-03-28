
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
}

export const providers: Provider[] = [
  {
    id: "esarj",
    name: "E-Şarj",
    logo: "/lovable-uploads/9c5da173-d35f-4ee5-af1e-ade7186754c1.png",
    acPrice: 7.87,
    dcPrice: 9.12,
    fastDcPrice: 11.25,
    membershipFee: 0,
    hasApp: true,
    websiteUrl: "https://esarj.com"
  },
  {
    id: "zesev",
    name: "ZES",
    logo: "/lovable-uploads/ba1d435b-9f77-4746-a06c-2418d2fc09a7.png",
    acPrice: 8.15,
    dcPrice: 9.56,
    fastDcPrice: 12.30,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://zes.net"
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
    acPrice: 8.05,
    dcPrice: 9.45,
    fastDcPrice: 12.10,
    membershipFee: 200,
    hasApp: true,
    websiteUrl: "https://voltrun.com"
  },
  {
    id: "echarge",
    name: "ECharge",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop&auto=format",
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
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop&auto=format&q=80",
    acPrice: 8.25,
    dcPrice: 9.65,
    fastDcPrice: 12.45,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com"
  }
];
