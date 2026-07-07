"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const SECTION_IDS = [
  "about",
  "projects",
  "photography",
  "experience",
  "contact",
] as const;

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "photography", label: "Photography" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const HEADER_OFFSET = 100;

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (pathname !== "/") {
      return;
    }

    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled((prev) => (prev ? y > 40 : y > 90));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const updateActiveSection = () => {
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= HEADER_OFFSET) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 md:px-6 pt-4 md:pt-6">
        <motion.div
          initial={false}
          animate={{
            maxWidth: isScrolled ? "100%" : "72rem",
            borderRadius: 9999,
            backgroundColor: isScrolled
              ? "rgba(15, 23, 42, 0.95)"
              : "rgba(15, 23, 42, 0.75)",
            boxShadow: isScrolled
              ? "0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)"
              : "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full mx-auto border border-slate-800 backdrop-blur-sm"
        >
          <nav className="relative px-4 md:px-6 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div className="text-xl md:text-3xl font-bold text-slate-100">
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Image
                    src="/ap-logo-v2.svg"
                    alt="Antony Petsas Logo"
                    width={300}
                    height={300}
                    className="w-48 h-8 md:w-72 md:h-12"
                  />
                </Link>
              </div>

              <ul className="hidden md:flex items-baseline space-x-6">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id} className="leading-none">
                    <Link
                      href={`/#${item.id}`}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className={[
                        "inline-block font-extrabold leading-none text-slate-300 hover:text-blue-400 transition-[font-size,color] duration-300",
                        activeSection === item.id ? "text-xl" : "text-base",
                        item.id === "contact" ? "pr-8" : "",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                ref={menuButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="md:hidden text-slate-300 hover:text-blue-400 transition-colors p-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className={[
                  "md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-lg",
                  "animate-in slide-in-from-top duration-200",
                  isScrolled ? "rounded-b-2xl" : "rounded-b-[2rem]",
                ].join(" ")}
              >
                <ul className="flex flex-col items-center py-4">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/#${item.id}`}
                        onClick={(e) => handleScrollTo(e, item.id)}
                        className="block px-4 py-3 text-xl font-extrabold text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors text-center w-full"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
