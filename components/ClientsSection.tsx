"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import type { Client } from "@/data/clients";
import { clients } from "@/data/clients";

const LOGO_SLOT =
  "relative flex h-[160px] w-[140px] shrink-0 items-center justify-center px-3 md:h-[272px] md:w-[280px] md:px-5";

function LogoSlot({ client }: { client: Client }) {
  const inner = (
    <div className="relative h-[120px] w-full md:h-[208px]">
      <Image
        src={client.logoSrc}
        alt={client.logoAlt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 768px) 140px, 280px"
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
        className="w-full scroll-mt-28 bg-blue-400 py-8 md:py-12"
        aria-label="Clients"
      >
        <div className="mx-auto w-full max-w-none px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-slate-900 md:mb-6 md:text-3xl">
            A few of the clients I've worked with over the years
          </h2>
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
      className="w-full scroll-mt-28 bg-gradient-to-b from-slate-900 via-blue-500 to-sky-300 py-8 md:py-12"
      aria-label="Clients"
    >
      <div className="mx-auto w-full max-w-none px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-slate-50 md:mb-6 md:text-3xl">
          Brands I&apos;ve Had the Pleasure of
          <br className="md:hidden" /> Working With
        </h2>

        <p id="clients-marquee-desc" className="sr-only">
          Logos scroll horizontally and pause when hovered.
        </p>

        <div
          className="relative mt-2 overflow-hidden md:mt-0"
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
