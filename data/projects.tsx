import React from "react";
import type { ProjectItem } from "@/components/ProjectsSection";

export const projects: ProjectItem[] = [
  {
    id: "photoprint",
    category: "web",
    title: "E-Commerce Website",
    subtitle: "Full Stack Website",
    imageUrls: [
      "/projects/photoprint/pp1.jpg",
      "/projects/photoprint/pp2.jpg",
      "/projects/photoprint/pp3.jpg",
      "/projects/photoprint/pp4.jpg",
      "/projects/photoprint/pp5.jpg",
    ],
    href: "/projects/photoprint",
    description:
      "A full-featured e-commerce platform built with modern web technologies. It showcases strong full-stack development skills, offering secure user authentication, responsive design, and protected checkout flows. Users can create accounts, save payment and address information, manage their profiles, and view past orders. The system also includes comprehensive product management and secure payment processing.",
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Supabase"],
      testing: ["Jest"],
      devTools: ["Turbopack", "ESLint"],
    },
    features: [
      "User authentication and authorisation",
      "Shopping cart functionality",
      "Secure payment processing",
      "Product search and filtering",
      "Order management system",
      "User dashboard",
    ],
    githubUrl: "https://github.com/TKP888/photoprint-ecommerce",
    demoUrl: "https://photoprint-ecommerce.vercel.app/",
  },
  {
    id: "odinbook",
    category: "web",
    title: "Social Media Platform",
    subtitle: "Full Stack Web Application",
    imageUrls: [
      "/projects/odinbook/ob1.jpg",
      "/projects/odinbook/ob2.jpg",
      "/projects/odinbook/ob3.jpg",
      "/projects/odinbook/ob4.jpg",
      "/projects/odinbook/ob5.jpg",
    ],
    href: "/projects/odinbook",
    description: (
      <>
        Odinbook is a Facebook-inspired social networking application developed
        as my first full-stack project and final milestone in{" "}
        <a
          href="https://www.theodinproject.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          The Odin Project
        </a>{" "}
        curriculum. It includes user authentication, friend management, posting,
        commenting, and real-time interactions. It combines a modern, responsive
        UI with a solid backend that securely handles data storage and manages
        user connections.
      </>
    ),
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript"],
      backend: [
        "Node.js",
        "Express",
        "EJS",
        "Prisma ORM",
        "PostgreSQL",
        "Passport.js",
        "Bcrypt",
        "Cloudinary",
      ],
      testing: ["Jest"],
      devTools: ["ESLint"],
    },
    features: [
      "User profiles and friend connections",
      "Post creation and sharing",
      "Like and comment functionality",
      "Real-time notifications",
      "Image upload and storage",
      "Responsive design",
    ],
    githubUrl: "https://github.com/TKP888/odinbook",
    demoUrl: "https://odinbook-production-4ff2.up.railway.app/auth/login",
  },
  {
    id: "smallbusiness",
    category: "web",
    title: "Small Business Website",
    subtitle: "Full Stack Website",
    imageUrls: [
      "/projects/smallbusiness/sb-1.jpg",
      "/projects/smallbusiness/sb-2.jpg",
      "/projects/smallbusiness/sb-3.jpg",
      "/projects/smallbusiness/sb-4.jpg",
      "/projects/smallbusiness/sb-5.jpg",
    ],
    href: "/projects/smallbusiness",
    description: (
      <>
        A business website for Vercoe Property Maintenance built with Next.js.
        It includes service listings, project showcases, quote requests, and
        customer reviews. Built with TypeScript and Tailwind CSS, with a
        responsive design and dynamic routing.
      </>
    ),
    techStack: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Supabase"],
      testing: ["Jest"],
      devTools: ["Turbopack", "ESLint"],
    },
    features: [
      "Service listings with dynamic detail pages",
      "Interactive project showcase with hover/tap overlays",
      "Quote request form with UK postcode address lookup",
      "Customer reviews carousel",
      "Contact page with Google Maps integration",
      "Responsive design",
      "Dynamic routing for service pages",
    ],
    githubUrl: "https://github.com/TKP888/small-business-website",
    demoUrl: "https://small-business-website-mu.vercel.app/",
  },
  {
    id: "portfolio",
    category: "web",
    title: "Portfolio Website",
    subtitle: "Frontend Website",
    imageUrls: [
      "/projects/portfolio/portfolio-1.jpg",
      "/projects/portfolio/portfolio-2.jpg",
      "/projects/portfolio/portfolio-3.jpg",
    ],
    href: "/projects/portfolio",
    description: (
      <>
        A portfolio site built for a client who needed full ownership of their
        content. Built with vanilla HTML, CSS and JavaScript so they could
        confidently make updates without needing a developer. Includes a working
        contact form via Formspree, giving visitors a direct way to get in
        touch.
      </>
    ),
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript"],
      backend: [
        // "Node.js",
        // "Express",
        // "EJS",
        // "Prisma ORM",
        // "PostgreSQL",
        // "Passport.js",
        // "Bcrypt",
        // "Cloudinary",
      ],
      testing: ["Jest"],
      devTools: ["ESLint"],
    },
    features: [
      "Client Editablility",
      "Responsive Design",
      "Contact Form",
      "Project Showcase",
      "Lightweight",
    ],
    githubUrl: "https://github.com/TKP888/production_portfolio",
    demoUrl: "https://saulroland.com",
  },

  // FILM PROJECTS

  {
    id: "iconic-hotels-resorts",
    category: "film",
    title: "Iconic Hotels & Resorts",
    subtitle: "Photography / Filming / Video Editing",
    imageUrls: [
      "/projects/IHR/IHR-1.1.jpg",
      "/projects/IHR/IHR-2.jpg",
      "/projects/IHR/IHR-3.jpg",
      "/projects/IHR/IHR-4.jpg",
      "/projects/IHR/IHR-5.jpg",
      "/projects/IHR/IHR-6.jpg",
      "/projects/IHR/IHR-7.jpg",
      "/projects/IHR/IHR-8.jpg",
      "/projects/IHR/IHR-9.jpg",
    ],
    href: "/projects/iconic-hotels-resorts",
    streamVideoUids: [
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_ICONIC_HOTELS_AND_RESORT_1 ??
        "",
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_ICONIC_HOTELS_AND_RESORT_2 ??
        "",
    ],
    description:
      "Iconic Hotels & Resorts is a collection of some of the UK's most distinguished luxury properties, and I was brought in to shoot, photograph and edit coverage of their annual agent showcase evening, a one-night event held at Strand Palace, London, bringing together the group's hotel brands including Nobu, Amù, Chewton Glen and Cliveden.\n\nThe content was created with a clear purpose: to give Iconic a suite of social-ready assets that would relive the night and show the world this was anything but a typical corporate event. The aim was to capture something fun, energetic and full of genuine connection, the kind of evening that makes people wish they had been in the room.\n\nAcross the evening I handled all photography and videography on the ground, before taking the footage into the edit to deliver a full suite of content. The primary deliverable was a 60–90 second highlight reel cut to music, alongside a 30-second Instagram Reel in 9:16 and a 45–60 second LinkedIn edit in 16:9, each tailored in pace and tone to its platform.\n\nStill photography was also delivered for use across recap content and brand collateral. Key moments captured included the arrival atmosphere and room at capacity, individually styled hotel stations showcasing each property's food and hospitality offering, a live West End performance and audience reaction, and the welcome toast, all woven together to reflect a luxury brand event with real purpose behind it.",
    features: [],
    filmProduction: {
      role: "Photographer / Videographer / Editor",
      deliverables: [
        "Single-day event coverage",
        "Still photography",
        "Timelapse build",
        "Event highlight reel",
        "Vertical cut-downs for social",
      ],
      equipment: [],
      software: ["DaVinci Resolve", "Photoshop", "Lightroom"],
    },
  },

  {
    id: "IMD",
    category: "film",
    title: "IMD Business School",
    subtitle: "Video Editing / Motion Graphics / Director",
    imageUrls: [
      "/projects/IMD/imd-1.jpg",
      "/projects/IMD/imd-2.jpg",
      "/projects/IMD/imd-3.jpg",
      "/projects/IMD/imd-4.jpg",
      "/projects/IMD/imd-5.jpg",
      "/projects/IMD/imd-6.jpg",
      "/projects/IMD/imd-7.jpg",
      "/projects/IMD/imd-8.jpg",
      "/projects/IMD/imd-9.jpg",
    ],
    href: "/projects/IMD",
    streamVideoUids: [
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_IMD_1 ?? "",
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_IMD_2 ?? "",
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_IMD_3 ?? "",
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_IMD_4 ?? "",
    ],
    description: (
      <>
        IMD Business School is one of the world's leading executive education
        institutions. I worked across their subscription platform I by IMD and
        social channels as an editor, delivering content that ranged from
        long-form to short-form.
        <br />
        <br />
        The core of my work centred on multicamera CEO interviews, cutting the
        full edits and building teaser campaigns to drive anticipation ahead of
        each launch. Alongside this, I edited narrative-driven content aimed at
        inspiring prospective students and communicating the value of IMD's
        programmes.
        <br />
        <br />
        Beyond interviews, I contributed to content for OWP, IMD's flagship
        week-long event, as well as editing and building motion graphics for the
        <a
          href="https://www.imd.org/news/organizational-culture/imd-recognized-for-helping-norways-dnb-build-a-culture-of-collaboration/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {" "}
          2022 Excellence in Practice Awards{" "}
        </a>{" "}
        highlight film, in which IMD took home Silver in the Organisational
        Development category. Motion graphics ran throughout all of this, from
        bespoke animations to developing templates that elevated and
        standardised their existing graphics across platforms, ensuring a
        consistent and professional visual identity.
      </>
    ),
    features: [],
    filmProduction: {
      role: "Video Editor / Animator / Director",
      deliverables: [
        "CEO Interviews",
        "Social Teasers",
        "Narrative Content",
        "Motion Graphics",
      ],
      equipment: [],
      software: ["Premiere Pro", "After Effects"],
    },
  },
  {
    id: "new-balance",
    category: "film",
    title: "New Balance",
    subtitle: "Filming / Video Editing",
    imageUrls: [
      "/projects/NB/NB-1.1.jpg",
      "/projects/NB/NB-2.1.jpg",
      "/projects/NB/NB-3.1.jpg",
      "/projects/NB/NB-4.1.jpg",
      "/projects/NB/NB-5.1.jpg",
      "/projects/NB/NB-6.1.jpg",
      "/projects/NB/NB-7.1.jpg",
      "/projects/NB/NB-8.1.jpg",
    ],
    href: "/projects/new-balance",
    streamVideoUid: process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_NEW_BALANCE,
    description:
      "New Balance brought their Run Your Way campaign to life with a landmark launch event at Frameless, London, held in celebration of the London Marathon.\n\nI was brought in to capture the entire evening, from the finished build through to the final performance of the night. Frameless provided a spectacular backdrop, with LED and projection mapping spread across multiple rooms, creating an immersive visual experience that pushed the event far beyond anything a traditional brand activation.\n\nCapturing that environment was as much a technical challenge as a creative one, shooting in constantly shifting light and large-scale LED and projections to showcase the scale of what had been built. The brief covered everything. The dressed space in full, the hospitality and guest experience, DJ sets from Elkka, The Morning After, Sticky, Dub Naqshbandi and SoundSystem 2-Step Collective, and a headline performance from Loyle Carner, all documented as one continuous story across the evening.\n\nThe content was designed to reflect the energy and ambition of the Run Your Way campaign itself, bold, community-driven, showing New Balance's heritage and future.",
    features: [
      "Evening-long event coverage",
      "Brand-aligned pacing and tone",
      "Deliverables optimised for social and venue displays",
    ],
    filmProduction: {
      role: "Videographer / Editor",
      deliverables: ["Event highlight reel", "Vertical cut-downs for social"],
      equipment: [],
      software: ["DaVinci Resolve"],
    },
  },
  {
    id: "marks-and-spencer",
    category: "film",
    title: "Marks & Spencer",
    subtitle: "Filming / Video Editing",
    imageUrls: [
      "/projects/marks-and-spencer/ms-2.jpg",
      "/projects/marks-and-spencer/ms-1.jpg",
      "/projects/marks-and-spencer/ms-3.jpg",
      "/projects/marks-and-spencer/ms-4.jpg",
      "/projects/marks-and-spencer/ms-5.jpg",
      "/projects/marks-and-spencer/ms-6.jpg",
      "/projects/marks-and-spencer/ms-7.jpg",
      "/projects/marks-and-spencer/ms-8.jpg",
      "/projects/marks-and-spencer/ms-9.jpg",
      "/projects/marks-and-spencer/ms-10.jpg",
    ],
    href: "/projects/marks-and-spencer",
    streamVideoUid:
      process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_MARKS_AND_SPENCER,
    description:
      "Marks & Spencer brought together their global team for a one-day event focused on their new collection, with senior keynote presentations and breakout sessions running throughout the day.\n\nI was brought in to capture the event in full, with the primary goal of producing a content film for those who were unable to attend. This was less about a traditional highlights reel and more about delivering a genuine business resource. The final edit was built around the CEO and senior keynote speeches captured in their entirety, giving absent team members full access to the key messages and direction shared on the day.\n\nWith the majority of the day running as breakout sessions, the shoots were well defined and the focus was firmly on making sure every main speech was documented cleanly and cut together into something the wider international team could sit down and genuinely learn from.",
    features: [],
    filmProduction: {
      role: "Videographer / Editor",
      deliverables: [
        "Full Day Event Coverage",
        "Full Event Recording for Unattending Staff",
        "Event Highlight Reel",
      ],
      equipment: [],
      software: ["DaVinci Resolve"],
    },
  },
];

export function getProjectById(id: string): ProjectItem | undefined {
  return projects.find((project) => project.id === id);
}
