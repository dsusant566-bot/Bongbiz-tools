"use client";

import * as React from "react";
import { Button, Field, Input, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

type Tab = "of" | "change" | "reverse";

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "bb-ring rounded-2xl px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition",
        active ? "bg-white/10 text-white" : "bg-white/5 text-zinc-300 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function PercentageClient() {
  const [tab, setTab] = React.useState<Tab>("of");

  const [p1, setP1] = React.useState("15");
  const [x1, setX1] = React.useState("250");

  const [oldV, setOldV] = React.useState("100");
  const [newV, setNewV] = React.useState("120");

  const [part, setPart] = React.useState("45");
  const [percent, setPercent] = React.useState("30");

  const P1 = parseNum(p1);
  const X1 = parseNum(x1);
  const ofResult = Number.isFinite(P1) && Number.isFinite(X1) ? (P1 / 100) * X1 : NaN;

  const Old = parseNum(oldV);
  const New = parseNum(newV);
  const changeAbs = Number.isFinite(Old) && Number.isFinite(New) ? New - Old : NaN;
  const changePct =
    Number.isFinite(Old) && Number.isFinite(New) && Old !== 0 ? ((New - Old) / Old) * 100 : NaN;

  const Part = parseNum(part);
  const Percent = parseNum(percent);
  const reverse =
    Number.isFinite(Part) && Number.isFinite(Percent) && Percent !== 0 ? (Part * 100) / Percent : NaN;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <TabButton active={tab === "of"} onClick={() => setTab("of")}>
            Percent of
          </TabButton>
          <TabButton active={tab === "change"} onClick={() => setTab("change")}>
            Percent change
          </TabButton>
          <TabButton active={tab === "reverse"} onClick={() => setTab("reverse")}>
            Reverse percent
          </TabButton>
        </div>

        <div className="mt-5 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
          {tab === "of" ? (
            <div className="flex flex-col gap-4">
              <Field label="Percent (%)">
                <Input inputMode="decimal" value={p1} onChange={(e) => setP1(e.target.value)} />
              </Field>
              <Field label="Of (number)">
                <Input inputMode="decimal" value={x1} onChange={(e) => setX1(e.target.value)} />
              </Field>
            </div>
          ) : null}

          {tab === "change" ? (
            <div className="flex flex-col gap-4">
              <Field label="Old value">
                <Input inputMode="decimal" value={oldV} onChange={(e) => setOldV(e.target.value)} />
              </Field>
              <Field label="New value">
                <Input inputMode="decimal" value={newV} onChange={(e) => setNewV(e.target.value)} />
              </Field>
            </div>
          ) : null}

          {tab === "reverse" ? (
            <div className="flex flex-col gap-4">
              <Field label="Part (result value)">
                <Input inputMode="decimal" value={part} onChange={(e) => setPart(e.target.value)} />
              </Field>
              <Field label="Percent (%)">
                <Input inputMode="decimal" value={percent} onChange={(e) => setPercent(e.target.value)} />
              </Field>
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setTab("of");
                setP1("15");
                setX1("250");
                setOldV("100");
                setNewV("120");
                setPart("45");
                setPercent("30");
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-zinc-500">
              {tab === "of"
                ? "Result = (p/100) × x"
                : tab === "change"
                  ? "Change% = (new−old)/old × 100"
                  : "Original = part × 100 / percent"}
            </div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        {tab === "of" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="Percent" value={Number.isFinite(P1) ? `${formatNumber(P1)}%` : "—"} subvalue="Input" />
            <Stat label="Of" value={Number.isFinite(X1) ? formatNumber(X1) : "—"} subvalue="Input" />
            <Stat label="Result" value={Number.isFinite(ofResult) ? formatNumber(ofResult) : "—"} subvalue="(p/100)×x" />
          </div>
        ) : null}

        {tab === "change" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="Absolute change" value={Number.isFinite(changeAbs) ? formatNumber(changeAbs) : "—"} subvalue="new − old" />
            <Stat
              label="Percent change"
              value={Number.isFinite(changePct) ? `${formatNumber(changePct)}%` : "—"}
              subvalue={Old === 0 ? "Old value must be non-zero" : "Relative change"}
            />
            <Stat
              label="Direction"
              value={
                Number.isFinite(changeAbs)
                  ? changeAbs === 0
                    ? "No change"
                    : changeAbs > 0
                      ? "Increase"
                      : "Decrease"
                  : "—"
              }
              subvalue="Interpretation"
            />
          </div>
        ) : null}

        {tab === "reverse" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="Part" value={Number.isFinite(Part) ? formatNumber(Part) : "—"} subvalue="Input" />
            <Stat label="Percent" value={Number.isFinite(Percent) ? `${formatNumber(Percent)}%` : "—"} subvalue="Input" />
            <Stat
              label="Original"
              value={Number.isFinite(reverse) ? formatNumber(reverse) : "—"}
              subvalue={Percent === 0 ? "Percent must be non-zero" : "part×100/percent"}
            />
          </div>
        ) : null}

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Common uses</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Discounts and markups (e.g. 12% off)</li>
            <li>Growth metrics (MoM / YoY percent change)</li>
            <li>Back-calculating GST-inclusive figures</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

