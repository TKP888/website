"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (pathname !== "/") {
      return;
    }

    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  return (
    <header className="fixed top-0 left-0 right-0 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-slate-100">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Antony Petsas
            </Link>
          </div>

          <ul className="hidden md:flex space-x-6">
            <li>
              <Link
                href="/#about"
                onClick={(e) => handleScrollTo(e, "about")}
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#projects"
                onClick={(e) => handleScrollTo(e, "projects")}
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/#experience"
                onClick={(e) => handleScrollTo(e, "experience")}
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          <a
            href="/Antony_Petsas_CV_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg transition-colors duration-200 border border-slate-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View CV
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-lg animate-in slide-in-from-top duration-200"
          >
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  href="/#about"
                  onClick={(e) => handleScrollTo(e, "about")}
                  className="block px-4 py-3 text-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  onClick={(e) => handleScrollTo(e, "projects")}
                  className="block px-4 py-3 text-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  onClick={(e) => handleScrollTo(e, "experience")}
                  className="block px-4 py-3 text-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={(e) => handleScrollTo(e, "contact")}
                  className="block px-4 py-3 text-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li className="px-4 py-3 mt-2">
                <a
                  href="/Antony_Petsas_CV_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg transition-colors duration-200 border border-slate-700"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View CV
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
