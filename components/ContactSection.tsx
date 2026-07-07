"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const TRANSITION_DURATION = 0.35;

export default function ContactSection() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = useCallback(() => {
    setIsFormVisible(false);
    setSubmitStatus("idle");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFormVisible &&
        !isSubmitting &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        handleCloseForm();
      }
    };

    if (isFormVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormVisible, isSubmitting, handleCloseForm]);

  useEffect(() => {
    if (!isFormVisible || !sectionRef.current) {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          handleCloseForm();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isFormVisible, handleCloseForm]);

  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: TRANSITION_DURATION, ease: EASE };

  const ctaVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
      };

  const formVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
      };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 via-blue-700 to-gray-900 scroll-mt-28"
    >
      <div
        ref={contentRef}
        className="container mx-auto px-4 flex flex-col items-center justify-center flex-1 w-full"
      >
        <div className="flex flex-col items-center justify-center text-center w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-4">
            Have a project in mind?
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6">
            Let&apos;s build something great{" "}
            <span className="text-blue-400">together</span>
          </h3>
          <p className="text-lg text-slate-300 mb-8 max-w-prose">
            Whether you have a clear project in mind or just want to explore an
            idea, feel free to reach out and start a conversation.
          </p>

          <AnimatePresence mode="popLayout">
            {!isFormVisible ? (
              <motion.div
                key="cta"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={ctaVariants}
                transition={fadeTransition}
              >
                <button
                  onClick={handleButtonClick}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-colors duration-200"
                >
                  Get in touch
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={formVariants}
                transition={fadeTransition}
                className="w-full max-w-2xl mx-auto bg-slate-800/50 rounded-lg p-6 md:p-8 space-y-6"
                action={formspreeEndpoint}
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (!formspreeEndpoint) {
                    console.error(
                      "Formspree endpoint not configured. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your .env.local file",
                    );
                    setSubmitStatus("error");
                    return;
                  }

                  setIsSubmitting(true);
                  setSubmitStatus("idle");

                  const form = e.currentTarget;
                  const formData = new FormData(form);

                  try {
                    if (process.env.NODE_ENV === "development") {
                      console.log(
                        "Submitting to Formspree endpoint:",
                        formspreeEndpoint,
                      );
                    }

                    const response = await fetch(formspreeEndpoint, {
                      method: "POST",
                      body: formData,
                      headers: {
                        Accept: "application/json",
                      },
                    });

                    console.log("Formspree response status:", response.status);

                    if (response.ok) {
                      const data = await response.json();
                      console.log("Formspree success response:", data);
                      setSubmitStatus("success");
                      form.reset();
                      setTimeout(() => {
                        handleCloseForm();
                      }, 2000);
                    } else {
                      let errorMessage =
                        "Something went wrong. Please try again.";
                      try {
                        const errorData = await response.json();
                        console.error("Formspree error response:", errorData);

                        if (errorData.errors) {
                          const errorMessages = Object.values(
                            errorData.errors,
                          ).flat();
                          errorMessage = errorMessages.join(", ");
                        } else if (errorData.error) {
                          errorMessage = errorData.error;
                        } else if (errorData.message) {
                          errorMessage = errorData.message;
                        }
                      } catch {
                        const text = await response.text();
                        console.error("Formspree error response (text):", text);
                        errorMessage = `Server error (${response.status}). Please try again.`;
                      }

                      console.error("Form submission failed:", {
                        status: response.status,
                        statusText: response.statusText,
                        message: errorMessage,
                      });
                      setSubmitStatus("error");
                    }
                  } catch (error) {
                    console.error("Form submission error:", error);
                    if (error instanceof Error) {
                      console.error(
                        "Error details:",
                        error.message,
                        error.stack,
                      );
                    }
                    setSubmitStatus("error");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-slate-200 mb-2 font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full name"
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-200 mb-2 font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-slate-200 mb-2 font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject of your message"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-200 mb-2 font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project or question..."
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                  />
                </div>

                <div className="flex flex-col items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-green-400 text-sm font-medium">
                      Message sent successfully! Thank you for reaching out.
                    </p>
                  )}

                  {submitStatus === "error" && (
                    <p className="text-red-400 text-sm font-medium">
                      Something went wrong. Please try again or contact me
                      directly.
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
