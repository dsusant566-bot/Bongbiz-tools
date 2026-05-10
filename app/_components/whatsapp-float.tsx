"use client";

import * as React from "react";

export function WhatsAppFloatButton({
  phone = "917585999923",
}: {
  phone?: string;
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi Susanta, I have an inquiry from tools.bongobiz.com"
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-html2canvas-ignore
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-b from-emerald-300/95 to-emerald-400/80 px-4 py-3 text-sm font-semibold text-black shadow-[0_18px_55px_rgba(16,185,129,0.35)] ring-1 ring-emerald-200/40 transition hover:-translate-y-0.5 hover:from-emerald-200/95 hover:to-emerald-300/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.1 17.2c-.3-.2-1.7-.8-2-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1c-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6c.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6s-.7-1.6-1-2.2c-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.8 1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4 0-.1-.3-.2-.6-.4z" />
      <path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.6 1.8 6.6L3.6 28.4l6-1.1c2 .9 4.2 1.4 6.4 1.4 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.5.7.7-3.4-.2-.4C6 20 5.4 18 5.4 16 5.4 10.2 10.2 5.4 16 5.4S26.6 10.2 26.6 16 21.8 26.6 16 26.6z" />
    </svg>
  );
}

