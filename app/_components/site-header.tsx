import Link from "next/link";

const links: Array<{ href: string; label: string }> = [
  { href: "/loan-emi", label: "Loan EMI" },
  { href: "/pdf-converter", label: "PDF Converter" },
  { href: "/gst", label: "GST" },
  { href: "/currency", label: "Currency" },
  { href: "/percentage", label: "Percentage" },
  { href: "/age", label: "Age" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 ring-1 ring-white/10">
            <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.55)]" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-zinc-100">
            tools.bongobiz.com
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="inline-flex items-center gap-2">
          <a
            href="https://bongobiz.com"
            className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            target="_blank"
            rel="noreferrer"
          >
            BongoBiz
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 md:hidden">
        <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

