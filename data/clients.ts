export interface Client {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  href?: string;
}

export const clients: Client[] = [
  {
    id: "client-1",
    name: "Amazon",
    logoSrc: "/clients/1-amazon.png",
    logoAlt: "Amazon",
  },
  {
    id: "client-2",
    name: "BAE Systems",
    logoSrc: "/clients/2-bae-systems.png",
    logoAlt: "BAE Systems",
  },
  {
    id: "client-3",
    name: "Frameless",
    logoSrc: "/clients/3-frameless.webp",
    logoAlt: "Frameless",
  },
  {
    id: "client-4",
    name: "Iconic Hotels & Resorts",
    logoSrc: "/clients/4-iconic.png",
    logoAlt: "Iconic Hotels & Resorts",
  },
  {
    id: "client-5",
    name: "IMD",
    logoSrc: "/clients/5-IMD.png",
    logoAlt: "IMD",
  },
  {
    id: "client-6",
    name: "Lyst",
    logoSrc: "/clients/6-lyst-white.png",
    logoAlt: "Lyst",
  },
  {
    id: "client-7",
    name: "Meydan",
    logoSrc: "/clients/7-meydan.png",
    logoAlt: "Meydan",
  },
  {
    id: "client-8",
    name: "New Balance",
    logoSrc: "/clients/8-NB.png",
    logoAlt: "New Balance",
  },
  {
    id: "client-9",
    name: "Philips",
    logoSrc: "/clients/9-philips.png",
    logoAlt: "Philips",
  },
  {
    id: "client-10",
    name: "Royal Air Force",
    logoSrc: "/clients/10-RAF.png",
    logoAlt: "Royal Air Force",
  },
  {
    id: "client-11",
    name: "Royal Navy",
    logoSrc: "/clients/11-RN.png",
    logoAlt: "Royal Navy",
  },
  {
    id: "client-12",
    name: "SES",
    logoSrc: "/clients/12-SES.png",
    logoAlt: "SES",
  },
  {
    id: "client-13",
    name: "Vodafone",
    logoSrc: "/clients/13-Vodafone.png",
    logoAlt: "Vodafone",
  },
  {
    id: "client-14",
    name: "Xerox",
    logoSrc: "/clients/14-Xerox.png",
    logoAlt: "Xerox",
  },
];
