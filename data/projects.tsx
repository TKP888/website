import React from "react";
import type { ProjectItem } from "@/components/ProjectsSection";

export const projects: ProjectItem[] = [
  {
    id: "photoprint",
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
    title: "Portfolio Website",
    subtitle: "Frontend Website",
    imageUrls: [
      "/projects/portfolio/comingsoonimg.jpg",
      // "/projects/odinbook/ob2.jpg",
      // "/projects/odinbook/ob3.jpg",
      // "/projects/odinbook/ob4.jpg",
      // "/projects/odinbook/ob5.jpg",
    ],
    // href: "/projects/portfolio",
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
    id: "Video Game Tracker",
    title: "Video Game Tracker",
    subtitle: "iOS Application",
    imageUrls: [
      "/projects/portfolio/comingsoonimg.jpg",
      // "/projects/odinbook/ob2.jpg",
      // "/projects/odinbook/ob3.jpg",
      // "/projects/odinbook/ob4.jpg",
      // "/projects/odinbook/ob5.jpg",
    ],
    // href: "/projects/portfolio",
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
];

export function getProjectById(id: string): ProjectItem | undefined {
  return projects.find((project) => project.id === id);
}
