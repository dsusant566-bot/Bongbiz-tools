"use client";

import * as React from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-zinc-200">{label}</span>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "bb-ring w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500",
        "transition hover:bg-white/[0.07]",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "bb-ring w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-zinc-100 ring-1 ring-white/10",
        "transition hover:bg-white/[0.07]",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function Button({
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  const base =
    "bb-ring inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
      : "bg-white/5 text-zinc-200 ring-1 ring-white/10 hover:bg-white/10";

  return <button {...props} className={[base, styles, props.className].join(" ")} />;
}

export function Stat({
  label,
  value,
  subvalue,
}: {
  label: string;
  value: string;
  subvalue?: string;
}) {
  return (
    <div className="bb-panel-strong rounded-3xl p-5 ring-1 ring-white/10">
      <div className="text-xs font-medium text-zinc-400">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight text-white">
        {value}
      </div>
      {subvalue ? (
        <div className="mt-1 text-xs text-zinc-400">{subvalue}</div>
      ) : null}
    </div>
  );
}

