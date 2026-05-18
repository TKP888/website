"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export type ProjectCategory = "film" | "web";

/** Web-style tooling buckets (detail page Tech Stack section). */
export interface TechStackShape {
  frontend?: string[];
  backend?: string[];
  testing?: string[];
  devTools?: string[];
}

/**
 * Film/media-only metadata on the detail page. Use `features` for bullet
 * highlights shared with web projects; use this block for role, gear, etc.
 */
export interface FilmProduction {
  role?: string;
  deliverables?: string[];
  equipment?: string[];
  software?: string[];
}

interface ProjectBase {
  id: string;
  title: string;
  subtitle?: string;
  imageUrls: string[];
  href?: string;
  description: string | React.ReactNode;
  features: string[];
}

export interface WebProjectItem extends ProjectBase {
  category: "web";
  techStack: TechStackShape;
  githubUrl?: string;
  demoUrl?: string;
}

export interface FilmProjectItem extends ProjectBase {
  category: "film";
  /** Cloudflare Stream video UID (embed). Requires NEXT_PUBLIC_CF_STREAM_CUSTOMER_CODE. */
  streamVideoUid?: string;
  /** Optional multiple Cloudflare Stream UIDs (embed). */
  streamVideoUids?: string[];
  /** Optional poster; defaults to Stream thumbnail URL. */
  streamPosterSrc?: string;
  filmProduction?: FilmProduction;
  githubUrl?: string;
  demoUrl?: string;
}

export type ProjectItem = WebProjectItem | FilmProjectItem;

interface ProjectsSectionProps {
  items: ProjectItem[];
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

function ProjectColumn({
  title,
  eyebrow,
  items,
  animateCards,
}: {
  title: string;
  eyebrow: string;
  items: ProjectItem[];
  animateCards: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {eyebrow}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h3>
      </div>
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 bg-slate-100/80 px-4 py-8 text-center text-slate-600">
          Projects coming soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-0">
          {items.map((item, index) => {
            const card = (
              <ProjectCard
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                imageUrls={item.imageUrls}
                href={item.href}
              />
            );

            if (!animateCards) {
              return <React.Fragment key={item.id}>{card}</React.Fragment>;
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.04,
                }}
              >
                {card}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection({ items }: ProjectsSectionProps) {
  const filmItems = items.filter((i) => i.category === "film");
  const webItems = items.filter((i) => i.category === "web");
  const reduceMotion = useReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const animateCards = isLg && !reduceMotion;

  return (
    <section
      id="projects"
      className="w-full pt-16 pb-12 md:py-24 bg-slate-200 scroll-mt-28"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
          <div id="projects-film" className="scroll-mt-28">
            <ProjectColumn
              eyebrow="Film & media"
              title="Film Projects"
              items={filmItems}
              animateCards={animateCards}
            />
          </div>
          <div id="projects-web" className="scroll-mt-28">
            <ProjectColumn
              eyebrow="Development"
              title="Web Projects"
              items={webItems}
              animateCards={animateCards}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
