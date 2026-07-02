import Image from "next/image";
import { getInstagramMedia, getInstagramProfileUrl } from "@/lib/instagram";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default async function PhotographySection() {
  const posts = await getInstagramMedia(12);
  const profileUrl = getInstagramProfileUrl();
  const hasPosts = posts.length > 0;

  return (
    <section
      id="photography"
      className="w-full scroll-mt-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 md:py-24"
      aria-label="Photography"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-400">
            Photography
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-100 md:text-4xl">
            Shot Recently{" "}
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            A quick look at what I've been shooting lately.
          </p>
        </div>

        {hasPosts ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg bg-slate-800 outline-none ring-blue-400 transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label={
                  post.caption
                    ? `View Instagram post: ${post.caption.slice(0, 80)}`
                    : "View Instagram post"
                }
              >
                <Image
                  src={post.imageUrl}
                  alt={post.caption?.slice(0, 120) ?? "Instagram photo"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-300 group-hover:bg-slate-950/20" />
                <div className="absolute right-3 top-3 rounded-full bg-slate-900/70 p-2 text-slate-100 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-slate-700 bg-slate-800/50 px-6 py-12 text-center">
            <InstagramIcon className="mx-auto mb-4 h-10 w-10 text-slate-500" />
            <p className="text-lg font-medium text-slate-200">
              Instagram feed unavailable
            </p>
            <p className="mt-2 text-slate-400">
              Recent posts could not be loaded right now. You can still view
              photography on Instagram.
            </p>
          </div>
        )}

        {profileUrl && (
          <div className="mt-10 flex justify-center md:mt-12">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <InstagramIcon className="h-5 w-5" />
              View more on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
