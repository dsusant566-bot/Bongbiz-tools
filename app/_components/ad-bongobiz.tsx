import Link from "next/link";

export function BongoBizAd() {
  return (
    <section className="bb-panel relative overflow-hidden rounded-3xl p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/10 ring-1 ring-white/10">
            <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.6)]" />
          </span>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Advertisement
            </div>
            <h3 className="mt-1 text-base font-semibold text-white">
              Grow your business with BongoBiz
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-6 text-zinc-300">
              Website, branding, automation, and growth support — built with the same premium quality as these tools.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://bongobiz.com"
            target="_blank"
            rel="noreferrer"
            className="bb-ring inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 px-4 py-3 text-sm font-semibold text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
          >
            Visit BongoBiz
          </a>
          <Link
            href="/"
            className="bb-ring inline-flex items-center justify-center rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 ring-1 ring-white/10 hover:bg-white/10"
          >
            More tools
          </Link>
        </div>
      </div>
    </section>
  );
}

