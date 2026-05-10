import Link from "next/link";
import { BongoBizAd } from "./ad-bongobiz";

export function ToolShell({
  title,
  subtitle,
  backHref = "/",
  children,
}: {
  title: string;
  subtitle: string;
  backHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={backHref}
            className="bb-ring inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            <span aria-hidden>←</span>
            Home
          </Link>
          <div className="hidden items-center gap-2 text-xs text-zinc-400 sm:flex">
            <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
            Private in your browser
          </div>
        </div>

        <div className="bb-panel rounded-3xl p-7 sm:p-9">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
            {subtitle}
          </p>
        </div>
      </div>

      {children}

      <div className="mt-8">
        <BongoBizAd />
      </div>
    </div>
  );
}

