"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatMoney, formatNumber } from "../_lib/format";

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

export function GstClient() {
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const [amount, setAmount] = React.useState("1000");
  const [rate, setRate] = React.useState("18");
  const [currency, setCurrency] = React.useState("INR");

  const a = parseNum(amount);
  const r = parseNum(rate);
  const valid = Number.isFinite(a) && a >= 0 && Number.isFinite(r) && r >= 0;

  let base = NaN;
  let gst = NaN;
  let total = NaN;

  if (valid) {
    if (mode === "add") {
      base = a;
      gst = (a * r) / 100;
      total = base + gst;
    } else {
      total = a;
      base = total / (1 + r / 100);
      gst = total - base;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Mode">
            <Select value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <option value="add">Add GST to base price</option>
              <option value="remove">Remove GST from final price</option>
            </Select>
          </Field>

          <Field
            label={mode === "add" ? "Base amount" : "Final amount (incl. GST)"}
            hint="Enter 0 or more"
          >
            <Input
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 1000"
            />
          </Field>

          <Field label="GST rate (%)" hint="Common: 5, 12, 18, 28">
            <Input
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g. 18"
            />
          </Field>

          <Field label="Currency">
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="BDT">BDT (৳)</option>
            </Select>
          </Field>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setMode("add");
                setAmount("1000");
                setRate("18");
                setCurrency("INR");
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-zinc-500">
              {mode === "add" ? "Total = Base + GST" : "Base = Total / (1 + r)"}
            </div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="Base amount"
            value={valid ? formatMoney(base, currency) : "—"}
            subvalue={valid ? "Before GST" : "Enter valid inputs"}
          />
          <Stat
            label="GST amount"
            value={valid ? formatMoney(gst, currency) : "—"}
            subvalue={valid ? `${formatNumber(r)}% rate` : undefined}
          />
          <Stat
            label="Final amount"
            value={valid ? formatMoney(total, currency) : "—"}
            subvalue={valid ? "After GST" : undefined}
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Breakdown</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BreakRow label="Effective GST share of total">
              {valid && total > 0 ? (
                <span className="font-semibold text-zinc-100">
                  {formatNumber((gst / total) * 100)}%
                </span>
              ) : (
                <span className="text-zinc-500">—</span>
              )}
            </BreakRow>
            <BreakRow label="Price without GST">
              <span className="font-semibold text-zinc-100">
                {valid ? formatMoney(base, currency) : "—"}
              </span>
            </BreakRow>
          </div>
        </div>
      </section>
    </div>
  );
}

function BreakRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}

