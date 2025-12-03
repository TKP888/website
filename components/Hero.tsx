import Image from "next/image";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl">
        {/* Photo on Left */}
        <div className="flex-shrink-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-700 shadow-lg">
            <Image
              src="/Ant 2025 1x1.webp"
              alt="Antony Petsas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content on Right */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-4">
            Junior Full Stack Developer
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-300 mb-6"></h2>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-xl">
            I&apos;m Antony, a{" "}
            <strong className="text-slate-100">self-taught</strong> junior full
            stack web developer who enjoys building responsive, user-friendly
            websites and web applications using{" "}
            <strong className="text-slate-100">HTML</strong>,{" "}
            <strong className="text-slate-100">CSS</strong>, and{" "}
            <strong className="text-slate-100">JavaScript</strong>.
          </p>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mt-4">
            I have <strong className="text-slate-100">over a decade</strong> of
            experience in creative media, combining technical expertise with
            creativity, problem-solving, and collaborative project management to
            deliver high-quality, user-focused solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
