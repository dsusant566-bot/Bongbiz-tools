"use client";

import * as React from "react";
import { Button, Field, Input, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a: Date, b: Date) {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

function diffYMD(from: Date, to: Date) {
  // from <= to
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();

  if (d < 0) {
    // borrow from previous month
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0); // last day previous month
    d += prevMonth.getDate();
    m -= 1;
  }
  if (m < 0) {
    m += 12;
    y -= 1;
  }

  return { years: y, months: m, days: d };
}

function safeParseDate(value: string) {
  // value from <input type="date"> => YYYY-MM-DD in local time
  const [yy, mm, dd] = value.split("-").map((x) => Number(x));
  if (!yy || !mm || !dd) return null;
  const d = new Date(yy, mm - 1, dd);
  if (d.getFullYear() !== yy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
    return null;
  }
  return d;
}

export function AgeClient() {
  const today = startOfDay(new Date());
  const defaultDob = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
  const [dob, setDob] = React.useState(
    `${defaultDob.getFullYear()}-${String(defaultDob.getMonth() + 1).padStart(2, "0")}-${String(
      defaultDob.getDate()
    ).padStart(2, "0")}`
  );

  const dobDate = safeParseDate(dob);
  const valid = dobDate != null && dobDate.getTime() <= today.getTime();

  const ymd = valid ? diffYMD(dobDate!, today) : null;
  const livedDays = valid ? daysBetween(dobDate!, today) : NaN;

  const nextBirthday = React.useMemo(() => {
    if (!valid) return null;
    const d = dobDate!;
    let nb = new Date(today.getFullYear(), d.getMonth(), d.getDate());
    if (nb.getTime() < today.getTime()) nb = new Date(today.getFullYear() + 1, d.getMonth(), d.getDate());
    return nb;
  }, [valid, dobDate, today]);

  const daysToBirthday = valid && nextBirthday ? daysBetween(today, nextBirthday) : NaN;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Date of birth" hint="Must be today or earlier">
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </Field>

          <div className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300 ring-1 ring-white/10">
            {valid ? (
              <div className="flex flex-col gap-1">
                <div className="text-xs text-zinc-400">Next birthday</div>
                <div className="font-semibold text-white">
                  {nextBirthday?.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-xs text-zinc-500">
                  In{" "}
                  <span className="font-medium text-zinc-200">
                    {formatNumber(daysToBirthday)}
                  </span>{" "}
                  days
                </div>
              </div>
            ) : (
              "Enter a valid birth date."
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDob(
                  `${defaultDob.getFullYear()}-${String(defaultDob.getMonth() + 1).padStart(2, "0")}-${String(
                    defaultDob.getDate()
                  ).padStart(2, "0")}`
                );
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-zinc-500">Uses local timezone</div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="Years"
            value={valid ? formatNumber(ymd!.years) : "—"}
            subvalue="Completed years"
          />
          <Stat
            label="Months"
            value={valid ? formatNumber(ymd!.months) : "—"}
            subvalue="After years"
          />
          <Stat
            label="Days"
            value={valid ? formatNumber(ymd!.days) : "—"}
            subvalue="After months"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Stat
            label="Days lived"
            value={valid ? formatNumber(livedDays, 0) : "—"}
            subvalue="Since birthdate"
          />
          <Stat
            label="Approx. hours lived"
            value={valid ? formatNumber(livedDays * 24, 0) : "—"}
            subvalue="Days × 24"
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Note</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            For exact legal age cutoffs, always use official guidance. This tool is designed for clarity and everyday use.
          </p>
        </div>
      </section>
    </div>
  );
}

