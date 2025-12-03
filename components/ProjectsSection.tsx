import ProjectCard from "./ProjectCard";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrls: string[];
  href?: string;
}

interface ProjectsSectionProps {
  items: ProjectItem[];
}

export default function ProjectsSection({ items }: ProjectsSectionProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-12 text-center">
          Projects
        </h2>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {items.map((item) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              imageUrls={item.imageUrls}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

