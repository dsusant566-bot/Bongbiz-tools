"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatMoney, formatNumber } from "../_lib/format";

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function computeEmi({
  principal,
  annualRatePercent,
  months,
}: {
  principal: number;
  annualRatePercent: number;
  months: number;
}) {
  if (!(principal > 0) || !(months > 0) || !(annualRatePercent >= 0)) {
    return null;
  }
  const r = annualRatePercent / 12 / 100;
  if (r === 0) {
    const emi = principal / months;
    return {
      emi,
      totalPayable: emi * months,
      totalInterest: emi * months - principal,
    };
  }
  const pow = Math.pow(1 + r, months);
  const emi = (principal * r * pow) / (pow - 1);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - principal;
  return { emi, totalPayable, totalInterest };
}

export function LoanEmiClient() {
  const [currency, setCurrency] = React.useState("INR");
  const [principal, setPrincipal] = React.useState("500000");
  const [annualRate, setAnnualRate] = React.useState("10.5");
  const [tenureYears, setTenureYears] = React.useState("5");

  const p = parseNum(principal);
  const rate = parseNum(annualRate);
  const years = parseNum(tenureYears);
  const months = Math.round(years * 12);

  const result = computeEmi({
    principal: p,
    annualRatePercent: rate,
    months,
  });

  const isValid =
    Number.isFinite(p) &&
    p > 0 &&
    Number.isFinite(rate) &&
    rate >= 0 &&
    Number.isFinite(years) &&
    years > 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Principal amount" hint="Loan amount">
            <Input
              inputMode="decimal"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 500000"
            />
          </Field>

          <Field label="Annual interest rate (%)" hint="Nominal rate">
            <Input
              inputMode="decimal"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g. 10.5"
            />
          </Field>

          <Field label="Tenure (years)" hint={`${months || "—"} months`}>
            <Input
              inputMode="decimal"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              placeholder="e.g. 5"
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
                setPrincipal("500000");
                setAnnualRate("10.5");
                setTenureYears("5");
                setCurrency("INR");
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-zinc-500">
              EMI formula:{" "}
              <span className="font-mono text-zinc-400">P·r·(1+r)^n / ((1+r)^n − 1)</span>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="Monthly EMI"
            value={result ? formatMoney(result.emi, currency) : "—"}
            subvalue={isValid ? "Approximate monthly payment" : "Enter valid inputs"}
          />
          <Stat
            label="Total interest"
            value={result ? formatMoney(result.totalInterest, currency) : "—"}
            subvalue={result ? `${formatNumber((result.totalInterest / p) * 100)}% of principal` : undefined}
          />
          <Stat
            label="Total payable"
            value={result ? formatMoney(result.totalPayable, currency) : "—"}
            subvalue={result ? `${months} payments` : undefined}
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold text-white">Quick insight</h2>
              <span className="text-xs text-zinc-500">No data is uploaded</span>
            </div>

            {result ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InsightRow
                  label="Principal"
                  value={formatMoney(p, currency)}
                  accent="text-zinc-100"
                />
                <InsightRow
                  label="Interest"
                  value={formatMoney(result.totalInterest, currency)}
                  accent="text-amber-200"
                />
                <div className="sm:col-span-2">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-300/90 to-cyan-300/70"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, (p / (result.totalPayable || 1)) * 100)
                        )}%`,
                      }}
                      aria-label="Principal share of total payable"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span>Principal share</span>
                    <span className="font-medium text-zinc-300">
                      {formatNumber((p / result.totalPayable) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300 ring-1 ring-white/10">
                Enter principal, rate, and tenure to see results.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InsightRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className={["mt-1 text-base font-semibold", accent ?? "text-white"].join(" ")}>
        {value}
      </div>
    </div>
  );
}

