
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
    logo: "/placeholder.svg", // Changed to local placeholder
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
    logo: "/placeholder.svg", // Changed to local placeholder
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
    logo: "/placeholder.svg", // Changed to local placeholder
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
    logo: "/placeholder.svg", // Changed to local placeholder
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
    logo: "/placeholder.svg", // Using local placeholder
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
    logo: "/placeholder.svg", // Using local placeholder
    acPrice: 8.25,
    dcPrice: 9.65,
    fastDcPrice: 12.45,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com"
  }
];
