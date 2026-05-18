"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  streamIframeSrc,
  streamThumbnailUrl,
} from "@/lib/cloudflare-stream";
import type {
  FilmProduction,
  FilmProjectItem,
  ProjectItem,
  WebProjectItem,
} from "./ProjectsSection";

const GALLERY_FRAME_WIDTH_TRIM_PX = 13;

const STREAM_CAROUSEL_INTRINSIC = { w: 1920, h: 1080 };

type GallerySlide =
  | { type: "image"; url: string; key: string; altSuffix: string }
  | { type: "stream"; uid: string; posterSrc: string; key: string };

function buildGallerySlides(project: ProjectItem): GallerySlide[] {
  const imageSlides: GallerySlide[] = project.imageUrls.map((url, i) => ({
    type: "image",
    url,
    key: `img-${url}-${i}`,
    altSuffix: `Image ${i + 1}`,
  }));

  const customerCode = process.env.NEXT_PUBLIC_CF_STREAM_CUSTOMER_CODE?.trim();
  if (project.category !== "film" || !customerCode) return imageSlides;

  const film = project as FilmProjectItem;
  const rawUids =
    film.streamVideoUids && film.streamVideoUids.length > 0
      ? film.streamVideoUids
      : film.streamVideoUid
        ? [film.streamVideoUid]
        : [];

  const uids = [...new Set(rawUids.map((u) => u?.trim()).filter(Boolean))] as
    | string[]
    | [];
  if (uids.length === 0) return imageSlides;

  const streamSlides: GallerySlide[] = uids.map((uid) => ({
    type: "stream",
    uid,
    posterSrc: streamThumbnailUrl(customerCode, uid),
    key: `stream-${uid}`,
  }));

  return [...streamSlides, ...imageSlides];
}

interface ProjectDetailProps {
  project: ProjectItem;
}

function techStackHasEntries(stack: WebProjectItem["techStack"]): boolean {
  return (
    (stack.frontend?.length ?? 0) > 0 ||
    (stack.backend?.length ?? 0) > 0 ||
    (stack.testing?.length ?? 0) > 0 ||
    (stack.devTools?.length ?? 0) > 0
  );
}

/** Features + filmProduction.deliverables, deduped (film pages only). */
function filmMergedDeliverableLines(project: ProjectItem): string[] {
  if (project.category !== "film") return [];
  const fromProduction = project.filmProduction?.deliverables ?? [];
  return [...new Set([...project.features, ...fromProduction])];
}

function filmProductionHasRoleEquipmentSoftware(fp?: FilmProduction): boolean {
  if (!fp) return false;
  return !!(
    fp.role?.trim() ||
    (fp.equipment?.length ?? 0) > 0 ||
    (fp.software?.length ?? 0) > 0
  );
}

/** Fixed window height = maxH; width from image aspect at that height, capped by maxW. */
function frameSizeHeightFirst(
  nw: number,
  nh: number,
  maxW: number,
  maxH: number,
): { width: number; height: number } {
  if (!nw || !nh || !maxW || !maxH) {
    return { width: Math.max(1, maxW), height: Math.max(1, maxH) };
  }
  const frameH = maxH;
  // Floor so we never overshoot intrinsic width at this height (round-up leaves 1px-ish side gutters).
  let frameW = Math.floor((nw * frameH) / nh);
  if (frameW > maxW) {
    frameW = maxW;
  }
  return { width: Math.max(1, frameW), height: frameH };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const gallerySlides = useMemo(() => buildGallerySlides(project), [project]);
  const slideCount = gallerySlides.length;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [streamPlaying, setStreamPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const galleryShellRef = useRef<HTMLDivElement>(null);
  const [galleryMaxWidth, setGalleryMaxWidth] = useState(1152);
  const [galleryMaxHeight, setGalleryMaxHeight] = useState(612);
  const [intrinsicByIndex, setIntrinsicByIndex] = useState<
    Record<number, { w: number; h: number }>
  >({});

  const updateGalleryMaxHeight = useCallback(() => {
    if (typeof window === "undefined") return;
    const vw = window.innerWidth;
    if (vw < 768) setGalleryMaxHeight(262);
    else if (vw < 1024) setGalleryMaxHeight(512);
    else setGalleryMaxHeight(612);
  }, []);

  useEffect(() => {
    updateGalleryMaxHeight();
    window.addEventListener("resize", updateGalleryMaxHeight);
    return () => window.removeEventListener("resize", updateGalleryMaxHeight);
  }, [updateGalleryMaxHeight]);

  useEffect(() => {
    const el = galleryShellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(() => {
      setGalleryMaxWidth(Math.max(1, el.clientWidth));
    });
    ro.observe(el);
    setGalleryMaxWidth(Math.max(1, el.clientWidth));
    return () => ro.disconnect();
  }, []);

  const handleCarouselImageLoaded = useCallback(
    (index: number, img: HTMLImageElement) => {
      setIntrinsicByIndex((prev) => ({
        ...prev,
        [index]: { w: img.naturalWidth, h: img.naturalHeight },
      }));
    },
    [],
  );

  useEffect(() => {
    setCurrentImageIndex(0);
    setStreamPlaying(false);
    setIntrinsicByIndex({});
  }, [project.id]);

  useEffect(() => {
    const slide = gallerySlides[currentImageIndex];
    if (!slide || slide.type !== "stream") {
      setStreamPlaying(false);
    }
  }, [currentImageIndex, gallerySlides]);

  const currentSlide = gallerySlides[currentImageIndex];
  const isStreamSlide = currentSlide?.type === "stream";
  const shouldPauseAutoplay = isStreamSlide && streamPlaying;

  const clearAutoplayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === slideCount - 1 ? 0 : prev + 1,
    );
    resetTimer();
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? slideCount - 1 : prev - 1,
    );
    resetTimer();
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    clearAutoplayInterval();
    if (slideCount <= 1) return;
    if (shouldPauseAutoplay) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    }, 3000);
  };

  useEffect(() => {
    clearAutoplayInterval();

    if (slideCount <= 1) return;
    if (shouldPauseAutoplay) return;

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearAutoplayInterval();
    };
  }, [
    slideCount,
    currentImageIndex,
    shouldPauseAutoplay,
    clearAutoplayInterval,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const intrinsic = intrinsicByIndex[currentImageIndex];
  const nw = isStreamSlide
    ? STREAM_CAROUSEL_INTRINSIC.w
    : (intrinsic?.w ?? 1920);
  const nh = isStreamSlide
    ? STREAM_CAROUSEL_INTRINSIC.h
    : (intrinsic?.h ?? 1080);

  const streamCustomerCode =
    process.env.NEXT_PUBLIC_CF_STREAM_CUSTOMER_CODE?.trim() ?? "";

  const firstImageSlideIndex = gallerySlides.findIndex(
    (s) => s.type === "image",
  );

  const { width: frameW, height: frameH } = frameSizeHeightFirst(
    nw,
    nh,
    galleryMaxWidth,
    galleryMaxHeight,
  );
  const displayFrameW = Math.max(1, frameW - GALLERY_FRAME_WIDTH_TRIM_PX);
  const mergedFilmDeliverables = filmMergedDeliverableLines(project);

  return (
    <div className="min-h-screen  text-slate-100">
      <div className="container mx-auto px-2 pt-1 pb-1 md:pt-4 pb-2 max-w-6xl">
        <div
          ref={galleryShellRef}
          className="mb-12 flex w-full flex-col items-center gap-4"
        >
          <div
            className="relative max-w-full shrink-0 overflow-hidden rounded-lg border-8 border-white bg-slate-800"
            style={{ width: displayFrameW, height: frameH }}
          >
            {gallerySlides.map((slide, index) => {
              const isActive = index === currentImageIndex;
              const visibility = isActive
                ? "z-[1] opacity-100"
                : "pointer-events-none z-0 opacity-0";

              if (slide.type === "stream") {
                const showIframe =
                  isActive && streamPlaying && !!streamCustomerCode;
                return (
                  <div
                    key={slide.key}
                    className={`absolute inset-0 transition-opacity duration-500 ${visibility}`}
                  >
                    {showIframe ? (
                      <iframe
                        title={`${project.title} showreel`}
                        src={streamIframeSrc(streamCustomerCode, slide.uid)}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={slide.posterSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-center"
                          fetchPriority={index === 0 ? "high" : undefined}
                        />
                        <div className="group absolute inset-0 flex items-center justify-center bg-black/20">
                          <button
                            type="button"
                            onClick={() => setStreamPlaying(true)}
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Play showreel video"
                          >
                            <svg
                              className="ml-1 h-8 w-8"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M8 5v14l11-7L8 5z" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              return (
                <Image
                  key={slide.key}
                  src={slide.url}
                  alt={`${project.title} - ${slide.altSuffix}`}
                  fill
                  sizes={`${Math.min(displayFrameW, galleryMaxWidth)}px`}
                  className={`absolute inset-0 object-contain object-center transition-opacity duration-500 ${visibility}`}
                  priority={index === firstImageSlideIndex}
                  onLoad={(e) =>
                    handleCarouselImageLoaded(index, e.currentTarget)
                  }
                />
              );
            })}
          </div>

          {slideCount > 1 && (
            <div className="flex w-full items-center justify-center gap-2">
              <button
                onClick={goToPrevious}
                className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700"
                aria-label="Previous slide"
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

              <div className="min-w-0 flex-1">
                <div className="flex w-full gap-2 overflow-x-auto pl-2 pr-6 py-1 scroll-px-2 snap-x snap-mandatory">
                  {gallerySlides.map((slide, index) => {
                    const isActive = index === currentImageIndex;
                    const thumbLabel =
                      slide.type === "stream"
                        ? "Go to video slide"
                        : `Go to image ${index + 1}`;
                    const thumbSrc =
                      slide.type === "stream" ? slide.posterSrc : slide.url;

                    return (
                      <button
                        key={slide.key}
                        type="button"
                        onClick={() => goToImage(index)}
                        className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-md border transition ${
                          isActive
                            ? "border-blue-400 ring-2 ring-blue-400/40"
                            : "border-slate-700 hover:border-slate-500"
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 snap-start`}
                        aria-label={thumbLabel}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbSrc}
                          alt=""
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                        />
                        {slide.type === "stream" && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/15">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow">
                              <svg
                                className="ml-0.5 h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden
                              >
                                <path d="M8 5v14l11-7L8 5z" />
                              </svg>
                            </span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={goToNext}
                className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-slate-700"
                aria-label="Next slide"
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
      </div>

      <div className="w-full bg-gradient-to-b from-gray-800 via-blue-700 to-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 ">
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
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {project.category === "web" && project.features.length > 0 && (
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
            )}

            {project.category === "film" &&
              mergedFilmDeliverables.length > 0 && (
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-3">
                    Deliverables
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {mergedFilmDeliverables.map((line, index) => (
                      <li
                        key={index}
                        className="text-base md:text-lg text-slate-300 leading-relaxed flex"
                      >
                        <span className="text-blue-400 mr-3 flex-shrink-0 leading-none self-start pt-1">
                          ▹
                        </span>
                        <span className="flex-1">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {project.category === "web" &&
              techStackHasEntries(project.techStack) && (
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
              )}

            {project.category === "film" &&
              project.filmProduction &&
              filmProductionHasRoleEquipmentSoftware(
                project.filmProduction,
              ) && (
                <div className="space-y-5">
                  {project.filmProduction.role?.trim() && (
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                        Role
                      </h4>
                      <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                        {project.filmProduction.role}
                      </p>
                    </div>
                  )}
                  {(project.filmProduction.equipment?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-slate-300 mb-2">
                        Equipment
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.filmProduction.equipment!.map(
                          (item, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base border border-blue-600/30"
                            >
                              {item}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  {(project.filmProduction.software?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                        Software
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.filmProduction.software!.map((item, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-600/20 text-white rounded-full text-sm md:text-base border border-blue-600/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-slate-700 text-slate-100 font-semibold rounded-full transition-colors duration-200 border border-slate-700"
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
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200"
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
                  {project.category === "film" ? "Watch" : "Live Demo"}
                </a>
              )}
            </div>
          )}
          <div className="container mx-auto pr-4 pt-4 max-w-6xl">
            <Link
              href="/#projects"
              className="inline-flex items-center bg-blue-600 rounded-full pr-5 pl-4 py-3 text-slate-300 hover:text-blue-400 transition-colors mb-8"
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
      </div>
    </div>
  );
}
