import Link from "next/link";

export default function Home() {
  return (
    <div className="py-2">
      <div className="bb-panel rounded-3xl p-7 sm:p-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              Modern SaaS-style dashboard tools
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              BongoBiz Tools Dashboard
            </h1>
            <p className="max-w-2xl text-pretty text-sm leading-6 text-zinc-300 sm:text-base">
              Utilities with premium UI for BongoBiz & Suronno Enterprises. Everything runs locally in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              href="/loan-emi"
              title="Loan EMI Calculator"
              desc="EMI, interest, and total payable with a clean breakdown."
              icon={<IconCalculator />}
              accent="from-emerald-300/25 to-cyan-300/10"
            />
            <ToolCard
              href="/pdf-converter"
              title="PDF Converter"
              desc="Merge PDFs or convert images to a single PDF (in-browser)."
              icon={<IconFile />}
              accent="from-cyan-300/20 to-violet-300/10"
            />
            <ToolCard
              href="/gst"
              title="GST Calculator"
              desc="Add/remove GST instantly with a clear tax split."
              icon={<IconReceipt />}
              accent="from-amber-300/20 to-rose-300/10"
            />
            <ToolCard
              href="/currency"
              title="Currency Converter"
              desc="Live-rate conversion plus manual mode fallback."
              icon={<IconArrows />}
              accent="from-sky-300/20 to-emerald-300/10"
            />
            <ToolCard
              href="/commodity-rates"
              title="Gold & Silver Today's Rate"
              desc="Live market prices for Gold and Silver in India, including taxes."
              icon={<IconCoins />}
              accent="from-amber-300/20 to-yellow-300/10"
            />
            <ToolCard
              href="/percentage"
              title="Percentage Calculator"
              desc="Percent of, percent change, and reverse percent."
              icon={<IconPercent />}
              accent="from-violet-300/20 to-cyan-300/10"
            />
            <ToolCard
              href="/cv-builder"
              title="CV Builder"
              desc="Create your professional CV in your browser."
              icon={<IconEdit />}
              accent="from-blue-300/20 to-indigo-300/10"
            />
            <ToolCard
              href="/age"
              title="Age Calculator"
              desc="Years/months/days, next birthday countdown, time lived."
              icon={<IconClock />}
              accent="from-rose-300/20 to-amber-300/10"
            />
            <ToolCard
              href="/bmi"
              title="BMI Calculator"
              desc="BMI, ideal range, and health status in one view."
              icon={<IconHeart />}
              accent="from-emerald-300/20 to-sky-300/10"
            />
            <ToolCard
              href="/image-compressor"
              title="Image Compressor"
              desc="High-quality compression with smaller file size."
              icon={<IconImage />}
              accent="from-cyan-300/20 to-emerald-300/10"
            />
            <ToolCard
              href="/background-remover"
              title="Background Remover"
              desc="One-click background removal (client-side)."
              icon={<IconSparkles />}
              accent="from-violet-300/20 to-cyan-300/10"
            />
            <ToolCard
              href="/qr"
              title="QR Code Generator"
              desc="Create QR for URL or WhatsApp instantly."
              icon={<IconQr />}
              accent="from-sky-300/20 to-violet-300/10"
            />
            <ToolCard
              href="/invoice"
              title="Invoice Generator"
              desc="Professional bill maker for Suronno Enterprises."
              icon={<IconInvoice />}
              accent="from-amber-300/20 to-rose-300/10"
            />
            <ToolCard
              href="/vehicle-info"
              title="Vehicle Info Search"
              desc="India RTO quick links and official lookup."
              icon={<IconCar />}
              accent="from-emerald-300/20 to-zinc-300/5"
            />
            <ToolCard
              href="/bold-text"
              title="Text → Bold Converter"
              desc="Convert normal text to bold Unicode styles."
              icon={<IconText />}
              accent="from-zinc-300/10 to-violet-300/10"
            />
            <ToolCard
              href="/captions"
              title="Captions & Hashtags"
              desc="Generate social captions + hashtag packs."
              icon={<IconChat />}
              accent="from-rose-300/20 to-cyan-300/10"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="bb-panel rounded-3xl p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Why this dashboard feels premium</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MiniStat label="Design" value="Dark glass + gradients" />
            <MiniStat label="UX" value="Fast, validated inputs" />
            <MiniStat label="Privacy" value="Runs locally" />
          </div>
        </div>
        <div className="bb-panel rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Quick start</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Use the sidebar to jump between tools, or open a card above.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/loan-emi"
              className="bb-ring inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 px-4 py-3 text-sm font-semibold text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
            >
              Start with EMI
            </Link>
            <Link
              href="/currency"
              className="bb-ring inline-flex flex-1 items-center justify-center rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-100 ring-1 ring-white/10 hover:bg-white/10"
            >
              Convert currency
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({
  href,
  title,
  desc,
  icon,
  accent,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group bb-panel relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100",
          "bg-gradient-to-br",
          accent,
        ].join(" ")}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="flex h-full flex-col gap-3">
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition group-hover:bg-white/10">
              {icon}
            </span>
            <h2 className="text-base font-semibold tracking-tight text-white">
              {title}
            </h2>
          </div>
          <span className="mt-1 text-zinc-500 transition group-hover:text-zinc-300" aria-hidden>
            →
          </span>
        </div>
        <p className="text-sm leading-6 text-zinc-300">{desc}</p>
        <div className="mt-auto pt-2 text-sm font-medium text-emerald-300/90">
          Open tool →
        </div>
      </div>
    </Link>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-xs font-medium text-zinc-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function IconBase({ children }: { children: React.ReactNode }) {
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

{/* --- নতুন PDF Editor আইকন --- */}
function IconCoins() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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