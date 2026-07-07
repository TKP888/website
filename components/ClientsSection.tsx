"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { Client } from "@/data/clients";
import { clients } from "@/data/clients";

const LOGO_SLOT =
  "relative flex h-[100px] w-[120px] shrink-0 items-center justify-center px-3 md:h-[140px] md:w-[200px] md:px-5";

function LogoSlot({ client }: { client: Client }) {
  const inner = (
    <div className="relative h-[72px] w-full md:h-[100px]">
      <Image
        src={client.logoSrc}
        alt={client.logoAlt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 768px) 120px, 200px"
      />
    </div>
  );

  const wrapped = client.href ? (
    <Link
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full outline-none ring-blue-400 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    >
      {inner}
    </Link>
  ) : (
    inner
  );

  return (
    <div className={LOGO_SLOT} role="listitem">
      {wrapped}
    </div>
  );
}

export default function ClientsSection() {
  const reduceMotion = useReducedMotion();
  const gap = "gap-x-8 gap-y-8 md:gap-x-12";

  if (reduceMotion) {
    return (
      <section
        id="clients"
        className="flex w-full scroll-mt-28 flex-col items-center justify-center bg-blue-400 pt-8 pb-3 md:pt-10 md:pb-4"
        aria-label="Clients"
      >
        <div className="flex w-full flex-col items-center gap-3 md:gap-4">
          <div className="mx-auto w-full max-w-none px-4 md:px-8">
            <h2 className="text-center text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
              A few of the clients I've worked with over the years
            </h2>
          </div>
          <div
            className={`flex flex-wrap items-center justify-center ${gap}`}
            role="list"
          >
            {clients.map((c) => (
              <LogoSlot key={c.id} client={c} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="clients"
      className="flex w-full scroll-mt-28 flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-blue-500 to-sky-300 pt-8 pb-3 md:pt-10 md:pb-4"
      aria-label="Clients"
    >
      <div className="flex w-full flex-col items-center gap-3 md:gap-4">
        <div className="mx-auto w-full max-w-none px-4 md:px-8">
          <h2 className="text-center text-2xl font-bold leading-tight text-slate-50 md:text-3xl">
            Brands I&apos;ve had the pleasure of
            <br className="md:hidden" /> working with
          </h2>
        </div>

        <p id="clients-marquee-desc" className="sr-only">
          Logos scroll horizontally and pause when hovered.
        </p>

        <div
          className="relative w-full overflow-hidden"
          aria-describedby="clients-marquee-desc"
        >
          <div
            className="clients-marquee-track flex w-max hover:[animation-play-state:paused]"
            aria-hidden
          >
            <div className={`flex shrink-0 pr-8 md:pr-12 ${gap}`}>
              {clients.map((c) => (
                <LogoSlot key={`${c.id}-a`} client={c} />
              ))}
            </div>
            <div className={`flex shrink-0 pr-8 md:pr-12 ${gap}`} aria-hidden>
              {clients.map((c) => (
                <LogoSlot key={`${c.id}-b`} client={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
