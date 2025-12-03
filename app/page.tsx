import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import type { ProjectItem } from "@/components/ProjectsSection";

const projects: ProjectItem[] = [
  {
    id: "photoprint",
    title: "E-Commerce Website",
    subtitle: "Full Stack E-Commerce Website",
    imageUrls: [
      "/projects/photoprint/pp1.jpg",
      "/projects/photoprint/pp2.jpg",
      "/projects/photoprint/pp3.jpg",
      "/projects/photoprint/pp4.jpg",
      "/projects/photoprint/pp5.jpg",
    ],
    href: "/projects/odinbook",
  },
  {
    id: "odinbook",
    title: "Social Media Application",
    subtitle: "Full Stack Web Application",
    imageUrls: [
      "/projects/odinbook/ob1.jpg",
      "/projects/odinbook/ob2.jpg",
      "/projects/odinbook/ob3.jpg",
      "/projects/odinbook/ob4.jpg",
      "/projects/odinbook/ob5.jpg",
    ],
    href: "/projects/odinbook",
  },
  {
    id: "project-2",
    title: "Project 2",
    subtitle: "Illumination shaped by craft",
    imageUrls: [
      "/project-placeholder-2.jpg",
      "/project-placeholder-1.jpg",
      "/project-placeholder-3.jpg",
    ],
    href: "/projects/project-2",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsSection items={projects} />
    </main>
  );
}
