"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function ContactSection() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const formContainerRef = useRef<HTMLDivElement>(null);

  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

  const handleButtonClick = () => {
    setIsFormVisible(true);
    setIsClosing(false);
  };

  const handleCloseForm = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFormVisible(false);
      setIsClosing(false);
      setSubmitStatus("idle");
    }, 1500);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFormVisible &&
        !isClosing &&
        formContainerRef.current &&
        !formContainerRef.current.contains(event.target as Node)
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
  }, [isFormVisible, isClosing, handleCloseForm]);

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 bg-slate-900 scroll-mt-28"
    >
      <div className="container mx-auto px-4">
        {!isFormVisible ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 whitespace-nowrap">
              Interested in working together?
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Let&apos;s connect.
            </p>
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Say hello
            </button>
          </div>
        ) : (
          <div ref={formContainerRef} className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-4 whitespace-nowrap">
                Interested in working together?
              </h2>
              <p className="text-xl md:text-2xl text-slate-300">
                Let&apos;s connect.
              </p>
            </div>

            <form
              className={`bg-slate-800/50 rounded-lg p-6 md:p-8 space-y-6 ${
                isClosing ? "animate-fadeOut" : "animate-fadeIn"
              }`}
              action={formspreeEndpoint}
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!formspreeEndpoint) {
                  console.error(
                    "Formspree endpoint not configured. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your .env.local file"
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
                      formspreeEndpoint
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
                    }, 3000);
                  } else {
                    let errorMessage =
                      "Something went wrong. Please try again.";
                    try {
                      const errorData = await response.json();
                      console.error("Formspree error response:", errorData);

                      if (errorData.errors) {
                        const errorMessages = Object.values(
                          errorData.errors
                        ).flat();
                        errorMessage = errorMessages.join(", ");
                      } else if (errorData.error) {
                        errorMessage = errorData.error;
                      } else if (errorData.message) {
                        errorMessage = errorData.message;
                      }
                    } catch (parseError) {
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
                    console.error("Error details:", error.message, error.stack);
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
                  <p className="text-green-400 text-sm font-medium animate-fadeIn">
                    Message sent successfully! Thank you for reaching out.
                  </p>
                )}

                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm font-medium animate-fadeIn">
                    Something went wrong. Please try again or contact me
                    directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
