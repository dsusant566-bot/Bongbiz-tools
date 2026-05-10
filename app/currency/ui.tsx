"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

const currencyOptions = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "BDT",
  "AED",
  "SAR",
  "SGD",
  "JPY",
  "CAD",
  "AUD",
] as const;

type Mode = "live" | "manual";

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function CurrencyClient() {
  const [mode, setMode] = React.useState<Mode>("live");
  const [from, setFrom] = React.useState("USD");
  const [to, setTo] = React.useState("INR");
  const [amount, setAmount] = React.useState("100");
  const [manualRate, setManualRate] = React.useState("83.0");

  const [liveRate, setLiveRate] = React.useState<number | null>(null);
  const [liveDate, setLiveDate] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const amt = parseNum(amount);
  const mRate = parseNum(manualRate);

  const effectiveRate =
    mode === "manual" ? (Number.isFinite(mRate) && mRate > 0 ? mRate : NaN) : liveRate ?? NaN;

  const converted =
    Number.isFinite(amt) && amt >= 0 && Number.isFinite(effectiveRate)
      ? amt * effectiveRate
      : NaN;

  async function refresh() {
    if (mode !== "live") return;
    if (from === to) {
      setLiveRate(1);
      setLiveDate(new Date().toISOString().slice(0, 10));
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/fx?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
      const data = (await res.json()) as
        | { rate: number; date?: string }
        | { error: string };
      if (!res.ok || "error" in data) throw new Error("Failed to load rate");
      setLiveRate(data.rate);
      setLiveDate(data.date ?? null);
    } catch {
      setError("Live rate unavailable. Switch to manual mode.");
      setLiveRate(null);
      setLiveDate(null);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, mode]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Mode">
            <Select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
              <option value="live">Live rates (recommended)</option>
              <option value="manual">Manual rate (offline / fallback)</option>
            </Select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="From">
              <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                {currencyOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="To">
              <Select value={to} onChange={(e) => setTo(e.target.value)}>
                {currencyOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Amount" hint="Enter 0 or more">
            <Input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>

          {mode === "manual" ? (
            <Field label={`Manual rate (1 ${from} = ? ${to})`}>
              <Input
                inputMode="decimal"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="e.g. 83.0"
              />
            </Field>
          ) : (
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-zinc-400">Live rate</div>
                <Button type="button" variant="ghost" onClick={() => void refresh()} disabled={loading}>
                  {loading ? "Refreshing…" : "Refresh"}
                </Button>
              </div>
              <div className="mt-2 text-sm text-zinc-200">
                {liveRate != null ? (
                  <span className="font-semibold text-white">
                    1 {from} = {formatNumber(liveRate, 6)} {to}
                  </span>
                ) : (
                  <span className="text-zinc-500">—</span>
                )}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                {liveDate ? `As of ${liveDate}` : "ECB-based provider"}
              </div>
              {error ? <div className="mt-2 text-xs text-rose-300">{error}</div> : null}
            </div>
          )}

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setMode("live");
                setFrom("USD");
                setTo("INR");
                setAmount("100");
                setManualRate("83.0");
                setError(null);
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFrom(to);
                setTo(from);
                if (mode === "manual" && Number.isFinite(mRate) && mRate > 0) {
                  setManualRate(String(1 / mRate));
                }
              }}
            >
              Swap ↔
            </Button>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Rate" value={Number.isFinite(effectiveRate) ? formatNumber(effectiveRate, 6) : "—"} subvalue={`1 ${from} in ${to}`} />
          <Stat label="Converted" value={Number.isFinite(converted) ? `${formatNumber(converted, 4)} ${to}` : "—"} subvalue="Result amount" />
          <Stat
            label="Inverse"
            value={Number.isFinite(effectiveRate) && effectiveRate > 0 ? formatNumber(1 / effectiveRate, 6) : "—"}
            subvalue={`1 ${to} in ${from}`}
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Tip</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            For payments and invoices, use manual mode and paste the exact bank/card rate you want to apply (including markup),
            so your totals match real-world settlements.
          </p>
        </div>
      </section>
    </div>
  );
}

