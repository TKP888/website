"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  skills: string[];
  responsibilities: string[];
}

interface ExperienceSectionProps {
  items: ExperienceItem[];
}

export default function ExperienceSection({ items }: ExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }
    return () => {
      clearTimeout(timer);
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [activeTab, items.length, checkScrollPosition]);

  if (items.length === 0) {
    return null;
  }

  const activeExperience = items[activeTab];

  return (
    <section
      id="experience"
      className="w-full pt-16 pb-2 md:py-24 bg-slate-900 scroll-mt-28"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-12 text-center">
          Experience
        </h2>

        <div className="mb-8 relative">
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className={`md:hidden bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700 flex-shrink-0 ${
                !showLeftArrow ? "opacity-0 pointer-events-none" : ""
              }`}
              aria-label="Scroll tabs left"
              disabled={!showLeftArrow}
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

            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 flex-1"
            >
              <div className="flex flex-nowrap justify-center gap-1 md:gap-2 border-b border-slate-800 pb-4 min-w-max md:min-w-0">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      activeTab === index
                        ? "bg-slate-800 text-blue-400 border-b-2 border-blue-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {item.role}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={scrollRight}
              className={`md:hidden bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700 flex-shrink-0 ${
                !showRightArrow ? "opacity-0 pointer-events-none" : ""
              }`}
              aria-label="Scroll tabs right"
              disabled={!showRightArrow}
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
        </div>

        <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 lg:p-10">
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
              {activeExperience.role}
            </h3>
            <p className="text-xl md:text-2xl text-blue-400 font-semibold mb-2">
              {activeExperience.company}
            </p>
            <p className="text-base md:text-lg text-slate-400">
              {activeExperience.startDate} - {activeExperience.endDate}
            </p>
          </div>

          {activeExperience.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg md:text-xl font-semibold text-slate-200 mb-3">
                Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeExperience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeExperience.responsibilities.length > 0 && (
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-slate-200 mb-3">
                Key Responsibilities & Achievements
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {activeExperience.responsibilities.map(
                  (responsibility, index) => (
                    <li
                      key={index}
                      className="text-base md:text-lg text-slate-300 leading-relaxed flex"
                    >
                      <span className="text-blue-400 mr-3 flex-shrink-0 leading-none self-start pt-1">
                        ▹
                      </span>
                      <span className="flex-1">{responsibility}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
