import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import type { ExperienceItem } from "@/components/ExperienceSection";
import { projects } from "@/data/projects";

const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Freelance",
    role: "Full Stack Developer",
    startDate: "Nov 2023",
    endDate: "Present",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Bootstrap",
      "Git",
      "GitHub",
      "PostgreSQL",
      "Express",
      "EJS",
      "RESTful APIs",
      "Supabase",
      "Prisma ORM",
      "Passport.js",
      "Bcrypt",
      "Cloudinary",
      "Jest",
      "ESLint",
      "Turbopack",
    ],
    responsibilities: [
      "Developed full-stack web applications from concept to deployment, including e-commerce platforms and social media applications.",
      "Implemented responsive user interfaces and secure authentication systems using React, Next.js, and modern backend technologies.",
      "Deployed applications to production environments and maintained code quality through version control and testing practices.",
    ],
  },
  {
    id: "exp-2",
    company: "Whites Beaconsfield",
    role: "Digital Media Producer",
    startDate: "Nov 2022",
    endDate: "Present",
    skills: [
      "Adobe Creative Suite",
      "DaVinci Resolve",
      "Photography",
      "Videography",
      "Video Editing",
      "Lighting",
      "Sound",
      "Directing",
      "Scripting",
      "Storyboarding",
      "Pre-Production",
      "Post-Production",
      "Photo Editing",
      "Graphic Design",
      "Social Media",
    ],

    responsibilities: [
      "Briefed UGC creators and created organic video content tailored for TikTok, Instagram, and YouTube, achieving 50+ million views across all platforms.",
      "Updating exisiting and creating new product packaging for EU expansion across France, Germany, Spain, and Italy.",
      "Created dynamic LED animations for live televised events reaching audiences of over 100,000 viewers.",
    ],
  },
  {
    id: "exp-3",
    company: "Freelance",
    role: "Videographer & Photographer",
    startDate: "Oct 2022",
    endDate: "Present",
    skills: [
      "Adobe Creative Suite",
      "DaVinci Resolve",
      "Photography",
      "Videography",
      "Video Editing",
      "Lighting",
      "Sound",
      "Directing",
      "Scripting",
      "Storyboarding",
      "Pre-Production",
      "Post-Production",
      "Photo Editing",
    ],
    responsibilities: [
      "Planned, directed, and produced original video content and event photography for diverse clients, managing projects from concept to final delivery.",
      "Executed end-to-end production including storyboarding, multi-camera operation, lighting design, and post-production editing.",
      "Delivered high-quality visual content independently, ensuring client satisfaction through effective communication and project management.",
    ],
  },
  {
    id: "exp-4",
    company: "MediaZoo",
    role: "Video Editor",
    startDate: "Jan 2022",
    endDate: "Oct 2022",
    skills: [
      "Adobe Creative Suite",
      "Multicam Editing",
      "Video Editing",
      "Colour Grading",
      "Lighting",
      "Sound",
      "Directing",
      "Scripting",
      "Storyboarding",
      "Pre-Production",
      "Post-Production",
    ],
    responsibilities: [
      "Directed and edited interviews, promotional videos, and event highlights for international clients, including managing and organising film crews for executive-level productions.",
      "Created 2D motion graphics and performed advanced colour grading to enhance visual storytelling and brand consistency.",
      "Oversaw production workflows and media management, ensuring smooth creative execution from pre-production through post-production.",
    ],
  },
  {
    id: "exp-5",
    company: "M Integrated Solutions",
    role: "Lead Technical Editor",
    startDate: "Mar 2015",
    endDate: "Dec 2021",
    skills: [
      "Adobe Creative Suite",
      "Photography",
      "Videography",
      "Video Editing",
      "Lighting",
      "Sound",
      "Directing",
      "Dataton Watchout",
      "Vision Mixing",
      "Pre-Production",
      "Post-Production",
      "Photo Editing",
    ],
    responsibilities: [
      "Directed, filmed, and edited interviews, promos, and highlight reels for live events.",
      "Produced 2D motion graphics and performed colour grading for various productions.",
      "Operated and programmed Dataton Watchout and vision mixing systems for live events.",
    ],
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection items={projects} />
      <ExperienceSection items={experiences} />
      <ContactSection />
    </main>
  );
}
