"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "./ProjectsSection";

interface ProjectDetailProps {
  project: ProjectItem;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === project.imageUrls.length - 1 ? 0 : prev + 1
    );
    resetTimer();
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.imageUrls.length - 1 : prev - 1
    );
    resetTimer();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (project.imageUrls.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === project.imageUrls.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (project.imageUrls.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === project.imageUrls.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [project.imageUrls.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container mx-auto px-2 pt-1 pb-12 md:py-12 max-w-6xl">
        <div className="mb-12">
          <div className="relative w-full h-[250px] md:h-[500px] lg:h-[600px] rounded-lg border-8 border-white overflow-hidden bg-slate-800">
            {project.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className={`object-cover object-top transition-opacity duration-500 ${
                  index === currentImageIndex
                    ? "opacity-100"
                    : "opacity-0 absolute"
                }`}
                priority={index === 0}
              />
            ))}
          </div>

          {project.imageUrls.length > 1 && (
            <div className="flex items-center justify-center gap-4  mt-4">
              <button
                onClick={goToPrevious}
                className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700"
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex justify-center gap-2">
                {project.imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-blue-400 w-8"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700"
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-2 ">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-xl md:text-2xl text-slate-300 mb-4">
              {project.subtitle}
            </p>
          )}
        </div>

        <div className="mb-8 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              Overview
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-base md:text-lg text-slate-300 leading-relaxed flex"
                >
                  <span className="text-blue-400 mr-3 flex-shrink-0 leading-none self-start pt-1">
                    ▹
                  </span>
                  <span className="flex-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-3">
              Tech Stack
            </h3>
            <div className="space-y-4">
              {project.techStack.frontend &&
                project.techStack.frontend.length > 0 && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                      Frontend:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.frontend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {project.techStack.backend &&
                project.techStack.backend.length > 0 && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                      Backend:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.backend.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {project.techStack.testing &&
                project.techStack.testing.length > 0 && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                      Testing:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.testing.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              {project.techStack.devTools &&
                project.techStack.devTools.length > 0 && (
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                      Development Tools:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.devTools.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg transition-colors duration-200 border border-slate-700"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link
          href="/#projects"
          className="inline-flex items-center text-slate-300 hover:text-blue-400 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
