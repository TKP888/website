import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="about"
      className="container mx-auto px-4 min-h-[calc(100vh-200px)] flex items-center justify-center scroll-mt-28"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl">
        <div className="flex-shrink-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-whites shadow-lg">
            <Image
              src="/Ant 2025 1x1.webp"
              alt="Antony Petsas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-4">
            Full Stack Developer
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-6"></h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            I&apos;m Antony, a{" "}
            <strong className="text-slate-100">self-taught</strong> full stack
            developer specialising in building fast, responsive, and
            user-friendly web applications with modern tools like{" "}
            <strong className="text-slate-100">TypeScript</strong>,{" "}
            <strong className="text-slate-100">React</strong>, and{" "}
            <strong className="text-slate-100">Next.js</strong>.
          </p>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mt-4">
            I have <strong className="text-slate-100">over a decade</strong> of
            experience in creative media, combining technical expertise with
            creativity, problem-solving, and collaborative project management to
            deliver high-quality, user-focused solutions.
          </p>
          <div className="mt-6">
            <a
              href="https://github.com/TKP888"
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
              View my GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
