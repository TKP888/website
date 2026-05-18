/**
 * Client logos for the marquee. Replace placeholder SVGs in /public/placeholders
 * with real assets and update paths. Logos render in fixed slots with
 * `object-contain` so mixed aspect ratios stay visually even (gap on the track).
 */
export interface Client {
  id: string;
  name: string;
  /** Public path, e.g. "/logos/acme.svg" */
  logoSrc: string;
  logoAlt: string;
  href?: string;
}

export const clients: Client[] = [
  {
    id: "client-1",
    name: "Client one",
    logoSrc: "/placeholders/1-amazon.png",
    logoAlt: "Client one (placeholder logo)",
  },
  {
    id: "client-2",
    name: "Client two",
    logoSrc: "/placeholders/2-bae-systems.png",
    logoAlt: "Client two (placeholder logo)",
  },
  // {
  //   id: "client-3",
  //   name: "Client three",
  //   logoSrc: "/placeholders/3-bai-comms.png",
  //   logoAlt: "Client three (placeholder logo)",
  // },
  // {
  //   id: "client-4",
  //   name: "Client four",
  //   logoSrc: "/placeholders/4-biblica.png",
  //   logoAlt: "Client four (placeholder logo)",
  // },
  {
    id: "client-5",
    name: "Client five",
    logoSrc: "/placeholders/5-frameless.webp",
    logoAlt: "Client five (placeholder logo)",
  },
  {
    id: "client-6",
    name: "Client six",
    logoSrc: "/placeholders/6-iconic.png",
    logoAlt: "Client six (placeholder logo)",
  },
  {
    id: "client-7",
    name: "Client seven",
    logoSrc: "/placeholders/7-IMD.png",
    logoAlt: "Client seven (placeholder logo)",
  },
  {
    id: "client-8",
    name: "Client eight",
    logoSrc: "/placeholders/8-lyst-white.png",
    logoAlt: "Client eight (placeholder logo)",
  },
  {
    id: "client-9",
    name: "Client nine",
    logoSrc: "/placeholders/9-meydan.png",
    logoAlt: "Client nine (placeholder logo)",
  },
  {
    id: "client-10",
    name: "Client ten",
    logoSrc: "/placeholders/10-NB.png",
    logoAlt: "Client ten (placeholder logo)",
  },
  {
    id: "client-11",
    name: "Client eleven",
    logoSrc: "/placeholders/11-philips.png",
    logoAlt: "Client eleven (placeholder logo)",
  },
  {
    id: "client-12",
    name: "Client twelve",
    logoSrc: "/placeholders/12-RAF.png",
    logoAlt: "Client twelve (placeholder logo)",
  },
  // {
  //   id: "client-13",
  //   name: "Client thirteen",
  //   logoSrc: "/placeholders/13-RM.png",
  //   logoAlt: "Client thirteen (placeholder logo)",
  // },
  {
    id: "client-14",
    name: "Client fourteen",
    logoSrc: "/placeholders/14-RN.png",
    logoAlt: "Client fourteen (placeholder logo)",
  },
  {
    id: "client-15",
    name: "Client fifteen",
    logoSrc: "/placeholders/15-SES.png",
    logoAlt: "Client fifteen (placeholder logo)",
  },
  {
    id: "client-16",
    name: "Client sixteen",
    logoSrc: "/placeholders/16-Vodafone.png",
    logoAlt: "Client sixteen (placeholder logo)",
  },
  {
    id: "client-17",
    name: "Client seventeen",
    logoSrc: "/placeholders/17-Xerox.png",
    logoAlt: "Client seventeen (placeholder logo)",
  },
];
