export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-400 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} BongoBiz Tools.{" "}
          <span className="text-zinc-500">
            Developed by Susanta | Powered by Suronno Enterprises
          </span>
        </p>
        <p className="text-xs text-zinc-500">
          Calculations are estimates; verify with official sources when needed.
        </p>
      </div>
    </footer>
  );
}

