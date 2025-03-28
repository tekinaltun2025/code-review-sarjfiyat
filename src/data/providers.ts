
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
    logo: "https://www.esarj.com/wp-content/uploads/2021/10/esarj_logo_turkuaz.png",
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
    logo: "https://www.zes.net/assets/images/logo-white.png",
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
    logo: "https://www.sharz.net/wp-content/uploads/2021/03/sharz-logo.png",
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
    logo: "https://voltrun.com/wp-content/uploads/2022/08/voltrun-logo.svg",
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
    logo: "https://placeholder.svg",
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
    logo: "https://placeholder.svg",
    acPrice: 8.25,
    dcPrice: 9.65,
    fastDcPrice: 12.45,
    membershipFee: null,
    hasApp: true,
    websiteUrl: "https://example.com"
  }
];
