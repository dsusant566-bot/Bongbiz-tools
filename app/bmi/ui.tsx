"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

type Unit = "metric" | "imperial";

function parseNum(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function bmiCategory(bmi: number) {
  if (!Number.isFinite(bmi) || bmi <= 0) return null;
  if (bmi < 18.5) return { label: "Underweight", tone: "text-sky-200", hint: "Consider a nutrition-focused plan." };
  if (bmi < 25) return { label: "Healthy", tone: "text-emerald-200", hint: "Keep up your current routine." };
  if (bmi < 30) return { label: "Overweight", tone: "text-amber-200", hint: "Small changes can have a big impact." };
  if (bmi < 35) return { label: "Obesity (Class I)", tone: "text-rose-200", hint: "Consider speaking with a professional." };
  if (bmi < 40) return { label: "Obesity (Class II)", tone: "text-rose-200", hint: "Health risk may be higher; get guidance." };
  return { label: "Obesity (Class III)", tone: "text-rose-200", hint: "Strongly consider medical guidance." };
}

export function BmiClient() {
  const [unit, setUnit] = React.useState<Unit>("metric");
  const [heightCm, setHeightCm] = React.useState("170");
  const [weightKg, setWeightKg] = React.useState("70");

  const [heightFt, setHeightFt] = React.useState("5");
  const [heightIn, setHeightIn] = React.useState("7");
  const [weightLb, setWeightLb] = React.useState("154");

  const hCm = parseNum(heightCm);
  const wKg = parseNum(weightKg);
  const ft = parseNum(heightFt);
  const inch = parseNum(heightIn);
  const lb = parseNum(weightLb);

  const heightM =
    unit === "metric"
      ? hCm / 100
      : ((ft * 12 + inch) * 2.54) / 100;
  const weightKgEff = unit === "metric" ? wKg : lb * 0.45359237;

  const bmi =
    Number.isFinite(heightM) &&
    heightM > 0 &&
    Number.isFinite(weightKgEff) &&
    weightKgEff > 0
      ? weightKgEff / (heightM * heightM)
      : NaN;

  const cat = bmiCategory(bmi);

  const minHealthy = 18.5 * heightM * heightM;
  const maxHealthy = 24.9 * heightM * heightM;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Units">
            <Select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
              <option value="metric">Metric (cm, kg)</option>
              <option value="imperial">Imperial (ft/in, lb)</option>
            </Select>
          </Field>

          {unit === "metric" ? (
            <>
              <Field label="Height (cm)">
                <Input inputMode="decimal" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </Field>
              <Field label="Weight (kg)">
                <Input inputMode="decimal" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
              </Field>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Height (ft)">
                  <Input inputMode="decimal" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                </Field>
                <Field label="Height (in)">
                  <Input inputMode="decimal" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                </Field>
              </div>
              <Field label="Weight (lb)">
                <Input inputMode="decimal" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} />
              </Field>
            </>
          )}

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setUnit("metric");
                setHeightCm("170");
                setWeightKg("70");
                setHeightFt("5");
                setHeightIn("7");
                setWeightLb("154");
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-zinc-500">BMI = kg / m²</div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="BMI" value={Number.isFinite(bmi) ? formatNumber(bmi, 1) : "—"} subvalue="Body Mass Index" />
          <Stat
            label="Status"
            value={cat ? cat.label : "—"}
            subvalue={cat ? cat.hint : "Enter valid inputs"}
          />
          <Stat
            label="Healthy range"
            value="18.5 – 24.9"
            subvalue="Standard adult range"
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Ideal weight range (estimated)</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Based on BMI 18.5–24.9 for your height.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Min healthy weight</div>
              <div className="mt-1 text-base font-semibold text-white">
                {Number.isFinite(minHealthy) ? `${formatNumber(minHealthy, 1)} kg` : "—"}
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Max healthy weight</div>
              <div className="mt-1 text-base font-semibold text-white">
                {Number.isFinite(maxHealthy) ? `${formatNumber(maxHealthy, 1)} kg` : "—"}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white/5 p-4 text-xs text-zinc-400 ring-1 ring-white/10">
            BMI is a screening metric and doesn’t directly measure body fat. Athletic builds, pregnancy, and medical conditions can change interpretation.
          </div>
        </div>
      </section>
    </div>
  );
}

