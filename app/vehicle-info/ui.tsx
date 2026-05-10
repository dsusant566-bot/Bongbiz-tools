"use client";

import * as React from "react";
import { Button, Field, Input, Stat } from "../_components/ui";

function normalizeReg(v: string) {
  return v.toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9]/g, "");
}

export function VehicleInfoClient() {
  const [reg, setReg] = React.useState("WB12AB1234");
  const normalized = normalizeReg(reg);
  const [ran, setRan] = React.useState(false);

  const parivahan = "https://parivahan.gov.in/parivahan/";
  const vahanCitizen = "https://vahan.parivahan.gov.in/nrservices/faces/user/citizen/citizenlogin.xhtml";
  const mParivahan = "https://play.google.com/store/apps/details?id=com.nic.mparivahan";
  const googleQuery = normalized
    ? `https://www.google.com/search?q=${encodeURIComponent(
        `site:parivahan.gov.in ${normalized} vehicle details`
      )}`
    : "";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Vehicle registration number" hint="Example: WB12AB1234">
            <Input value={reg} onChange={(e) => setReg(e.target.value)} />
          </Field>

          <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="text-xs text-zinc-400">Normalized</div>
            <div className="mt-1 break-all font-mono text-sm font-semibold text-white">
              {normalized || "—"}
            </div>
            <div className="mt-2 text-xs text-zinc-500">
              Click Search to open a reliable official lookup path (portal + searchable redirect).
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={vahanCitizen}
              target="_blank"
              rel="noreferrer"
              className={[
                "bb-ring inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold",
                normalized
                  ? "bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
                  : "bg-white/5 text-zinc-400 ring-1 ring-white/10 pointer-events-none",
              ].join(" ")}
              onClick={() => setRan(true)}
              aria-label="Open Vahan Citizen Services"
            >
              Search (Official)
            </a>
            <a
              href={googleQuery}
              target="_blank"
              rel="noreferrer"
              className={[
                "bb-ring inline-flex items-center justify-center rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold ring-1 ring-white/10 hover:bg-white/10",
                normalized ? "" : "pointer-events-none opacity-60",
              ].join(" ")}
              onClick={() => setRan(true)}
              aria-label="Open search redirect"
            >
              Search redirect
            </a>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setReg("WB12AB1234");
                setRan(false);
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(normalized);
              }}
              disabled={!normalized}
            >
              Copy
            </Button>
          </div>

          {ran ? (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-300 ring-1 ring-white/10">
              Search opened. If the official portal requires OTP/captcha/login, that’s expected.
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
              This tool uses official portals and a safe search redirect. It does not scrape private databases.
            </div>
          )}
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Integration" value="Redirect-based" subvalue="Reliable" />
          <Stat label="Reg no." value={normalized ? "Validated" : "—"} subvalue="Normalized format" />
          <Stat label="Expected flow" value="OTP/Captcha" subvalue="Official access" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Official portals</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={parivahan}
              target="_blank"
              rel="noreferrer"
              className="bb-ring rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10"
            >
              <div className="text-sm font-semibold text-white">Parivahan Home</div>
              <div className="mt-1 text-xs text-zinc-400">Main government portal</div>
            </a>
            <a
              href={vahanCitizen}
              target="_blank"
              rel="noreferrer"
              className="bb-ring rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10"
            >
              <div className="text-sm font-semibold text-white">Vahan Citizen Services</div>
              <div className="mt-1 text-xs text-zinc-400">Login + citizen services</div>
            </a>
            <a
              href={mParivahan}
              target="_blank"
              rel="noreferrer"
              className="bb-ring rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 sm:col-span-2"
            >
              <div className="text-sm font-semibold text-white">mParivahan App</div>
              <div className="mt-1 text-xs text-zinc-400">Official mobile app for many services</div>
            </a>
          </div>

          <div className="mt-4 rounded-2xl bg-white/5 p-4 text-xs text-zinc-400 ring-1 ring-white/10">
            If a portal asks for OTP/login or shows a captcha, that’s expected for official access. This tool intentionally avoids bypassing those protections.
          </div>
        </div>
      </section>
    </div>
  );
}

