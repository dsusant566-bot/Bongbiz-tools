"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
};

const navCore: NavItem[] = [
  { href: "/loan-inquiry", label: "Apply for Loan", icon: <IconApply /> },
  { href: "/loan-emi", label: "Loan EMI", icon: <IconCalculator /> },
  { href: "/pdf-converter", label: "PDF Converter", icon: <IconFile /> },
  { href: "/gst", label: "GST", icon: <IconReceipt /> },
  { href: "/currency", label: "Currency", icon: <IconArrows /> },
  { href: "/gold-silver-rate", label: "Gold & Silver Today's Rate", icon: <IconGoldBar /> },
  { href: "/percentage", label: "Percentage", icon: <IconPercent /> },
  { href: "/age", label: "Age", icon: <IconClock /> },
  { href: "/cv-maker", label: "CV Maker", icon: <IconEdit /> },
  { href: "/translator", label: "Language Translator", icon: <IconGlobe /> },
  { href: "/text-to-speech", label: "Text to Speech", icon: <IconSpeaker /> },
];

const navPro: NavItem[] = [
  { href: "/bmi", label: "BMI", icon: <IconHeart /> },
  { href: "/image-compressor", label: "Image Compressor", icon: <IconImage /> },
  { href: "/background-remover", label: "Background Remover", icon: <IconSparkles /> },
  { href: "/qr", label: "QR Generator", icon: <IconQr /> },
  { href: "/invoice", label: "Invoice Generator", icon: <IconInvoice /> },
  { href: "/vehicle-info", label: "Vehicle Info (RTO)", icon: <IconCar /> },
  { href: "/bold-text", label: "Text → Bold", icon: <IconText /> },
  { href: "/captions", label: "Captions & Hashtags", icon: <IconChat /> },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-[calc(100vh-1px)]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/40 lg:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="bb-ring inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 ring-1 ring-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.6)]" />
            </span>
            tools.bongobiz.com
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bb-ring inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 ring-1 ring-white/10 hover:bg-white/10"
          >
            <IconMenu />
            Menu
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6 sm:px-6">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <Sidebar />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[320px] max-w-[85vw] border-r border-white/10 bg-zinc-950 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="bb-ring inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 ring-1 ring-white/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.6)]" />
                </span>
                tools.bongobiz.com
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bb-ring rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10"
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <div className="mt-4">
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="bb-panel rounded-3xl p-4">
      <div className="flex items-center justify-between gap-3 px-2 py-2">
        <Link
          href="/"
          onClick={onNavigate}
          className="bb-ring inline-flex items-center gap-2 rounded-2xl px-2 py-1 text-sm font-semibold text-white hover:bg-white/5"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/25 to-cyan-400/15 ring-1 ring-white/10">
            <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.55)]" />
          </span>
          <span className="leading-none">
            tools<span className="text-zinc-400">.bongobiz.com</span>
          </span>
        </Link>
      </div>

      <div className="mt-3 max-h-[calc(100vh-160px)] space-y-2 overflow-y-auto">
        <NavSection
          title="Core"
          items={navCore}
          pathname={pathname}
          onNavigate={onNavigate}
        />
        <NavSection
          title="Professional"
          items={navPro}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      </div>

      <div className="mt-4 rounded-3xl bg-gradient-to-b from-white/5 to-transparent p-4 ring-1 ring-white/10">
        <div className="text-xs font-medium text-zinc-400">Pro tip</div>
        <div className="mt-1 text-sm leading-6 text-zinc-200">
          Pin your most-used tool in your browser for one-click access.
        </div>
        <a
          href="https://bongobiz.com"
          target="_blank"
          rel="noreferrer"
          className="bb-ring mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 ring-1 ring-white/10 hover:bg-white/10"
        >
          Visit BongoBiz
        </a>
      </div>
    </div>
  );
}

function NavSection({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  pathname: string | null;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="px-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {title}
      </div>
      <nav className="mt-2 flex flex-col gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                "bb-ring group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold ring-1 ring-transparent transition",
                active
                  ? "bg-white/10 text-white ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span className="flex items-center gap-3">
                <span
                  className={[
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl ring-1 transition",
                    active
                      ? "bg-gradient-to-b from-emerald-300/20 to-cyan-300/10 ring-white/10"
                      : "bg-white/5 ring-white/10 group-hover:bg-white/10",
                  ].join(" ")}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>
              {item.badge ? (
                <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold text-zinc-200 ring-1 ring-white/10">
                  {item.badge}
                </span>
              ) : (
                <span className="text-zinc-500 transition group-hover:text-zinc-300">
                  <IconChevron />
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function IconBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-zinc-100"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function IconGlobe() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </IconBase>
  );
}

function IconSpeaker() {
  return (
    <IconBase>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </IconBase>
  );
}

function IconEdit() {
  return (
    <IconBase>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
    </IconBase>
  );
}

function IconCalculator() {
  return (
    <IconBase>
      <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M8 7h8" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
      <path d="M9 14h.01M12 14h.01M15 14h.01" />
      <path d="M9 17h.01M12 17h.01M15 17h.01" />
    </IconBase>
  );
}
function IconFile() {
  return (
    <IconBase>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v5h5" />
      <path d="M8 13h8M8 17h6" />
    </IconBase>
  );
}
function IconReceipt() {
  return (
    <IconBase>
      <path d="M6 2h12v20l-2-1-2 1-2-1-2 1-2-1-2 1V2Z" />
      <path d="M9 7h6M8 11h8M8 15h8" />
    </IconBase>
  );
}
function IconArrows() {
  return (
    <IconBase>
      <path d="M16 3h5v5" />
      <path d="M21 3l-7 7" />
      <path d="M8 21H3v-5" />
      <path d="M3 21l7-7" />
    </IconBase>
  );
}
function IconPercent() {
  return (
    <IconBase>
      <path d="M19 5 5 19" />
      <path d="M7 7h.01" />
      <path d="M17 17h.01" />
      <path d="M8.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      <path d="M18.5 17a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </IconBase>
  );
}
function IconClock() {
  return (
    <IconBase>
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
      <path d="M12 6v6l4 2" />
    </IconBase>
  );
}
function IconApply() {
  return (
    <IconBase>
      <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8" />
      <path d="M8 12h5" />
      <path d="M14.5 12.5l1.2 1.2 2.8-2.8" />
      <path d="M8 16h8" />
    </IconBase>
  );
}
function IconHeart() {
  return (
    <IconBase>
      <path d="M12 21s-7-4.6-9.3-9.1C.7 8.1 3 5 6.2 5c1.8 0 3.3 1 3.8 2.1C10.5 6 12 5 13.8 5 17 5 19.3 8.1 21.3 11.9 19 16.4 12 21 12 21Z" />
    </IconBase>
  );
}
function IconImage() {
  return (
    <IconBase>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
      <path d="M8 14l2-2 3 3 2-2 3 3" />
      <path d="M9 9h.01" />
    </IconBase>
  );
}
function IconSparkles() {
  return (
    <IconBase>
      <path d="M12 2l1.2 3.6L17 7l-3.8 1.4L12 12l-1.2-3.6L7 7l3.8-1.4L12 2Z" />
      <path d="M19 12l.8 2.4L22 15l-2.2.6L19 18l-.8-2.4L16 15l2.2-.6L19 12Z" />
      <path d="M5 13l.8 2.4L8 16l-2.2.6L5 19l-.8-2.4L2 16l2.2-.6L5 13Z" />
    </IconBase>
  );
}
function IconQr() {
  return (
    <IconBase>
      <path d="M3 3h8v8H3V3Z" />
      <path d="M13 3h8v8h-8V3Z" />
      <path d="M3 13h8v8H3v-8Z" />
      <path d="M14 14h3v3h-3v-3Z" />
      <path d="M18 14h3M14 18h7M18 18v3" />
    </IconBase>
  );
}
function IconInvoice() {
  return (
    <IconBase>
      <path d="M6 2h12v20l-2-1-2 1-2-1-2 1-2-1-2 1V2Z" />
      <path d="M9 7h6" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
      <path d="M14 15h2" />
    </IconBase>
  );
}
function IconCar() {
  return (
    <IconBase>
      <path d="M5 16l1-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l1 6" />
      <path d="M7 16h10" />
      <path d="M7 16v3M17 16v3" />
      <path d="M8 19h.01M16 19h.01" />
    </IconBase>
  );
}
function IconText() {
  return (
    <IconBase>
      <path d="M4 6h16" />
      <path d="M9 6v14" />
      <path d="M15 6v14" />
      <path d="M7 20h10" />
    </IconBase>
  );
}
function IconChat() {
  return (
    <IconBase>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.2-4A8 8 0 1 1 21 12Z" />
      <path d="M7 12h10" />
      <path d="M7 9h7" />
    </IconBase>
  );
}
function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconGoldBar() {
  return (
    <IconBase>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M12 6v12M8 6v12M16 6v12" />
    </IconBase>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

