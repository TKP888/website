"use client";

import { useCallback, useEffect, useState } from "react";
import { streamIframeAutoplaySrc } from "@/lib/cloudflare-stream";

const customerCode =
  process.env.NEXT_PUBLIC_CF_STREAM_CUSTOMER_CODE?.trim() ?? "";
const videoUid =
  process.env.NEXT_PUBLIC_CF_STREAM_VIDEO_UID_SHOWREEL?.trim() ?? "";

const buttonBaseClassName =
  "inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200 border border-slate-700";

export default function ShowreelButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!customerCode || !videoUid) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[buttonBaseClassName, className].filter(Boolean).join(" ")}
      >
        <svg
          className="w-5 h-5 mr-2 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5.14v13.72a1 1 0 001.54.84l10.82-6.86a1 1 0 000-1.68L9.54 4.3A1 1 0 008 5.14z" />
        </svg>
        View Showreel
      </button>

      {open && (
        <ShowreelModal
          customerCode={customerCode}
          videoUid={videoUid}
          onClose={close}
        />
      )}
    </>
  );
}

function ShowreelModal({
  customerCode,
  videoUid,
  onClose,
}: {
  customerCode: string;
  videoUid: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Showreel video"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-label="Close showreel"
      />
      <div className="relative z-10 w-full max-w-5xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-200 transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          aria-label="Close showreel"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-8 border-white bg-slate-900 shadow-2xl">
          <iframe
            title="Showreel"
            src={streamIframeAutoplaySrc(customerCode, videoUid)}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
