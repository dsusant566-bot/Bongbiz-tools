"use client";

import * as React from "react";
import QRCode from "qrcode";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

type Mode = "url" | "whatsapp";

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

function buildWhatsAppLink(phone: string, message: string) {
  const p = phone.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message);
  if (!p) return "";
  return `https://wa.me/${p}?text=${text}`;
}

export function QrClient() {
  const [mode, setMode] = React.useState<Mode>("url");
  const [url, setUrl] = React.useState("https://tools.bongobiz.com");

  const [phone, setPhone] = React.useState("91");
  const [message, setMessage] = React.useState("Hello from BongoBiz!");

  const [size, setSize] = React.useState("512");
  const [ec, setEc] = React.useState<"L" | "M" | "Q" | "H">("M");

  const [dataUrl, setDataUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const payload =
    mode === "url" ? url.trim() : buildWhatsAppLink(phone, message);

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      setError(null);
      if (!payload) {
        setDataUrl("");
        return;
      }
      try {
        const s = Number(size);
        const out = await QRCode.toDataURL(payload, {
          width: Number.isFinite(s) && s > 100 ? s : 512,
          margin: 2,
          errorCorrectionLevel: ec,
          color: { dark: "#f4f4f5", light: "#00000000" },
        });
        if (!cancelled) setDataUrl(out);
      } catch {
        if (!cancelled) setError("Could not generate QR. Please check your input.");
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [payload, size, ec]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Mode">
            <Select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
              <option value="url">URL</option>
              <option value="whatsapp">WhatsApp</option>
            </Select>
          </Field>

          {mode === "url" ? (
            <Field label="URL">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
            </Field>
          ) : (
            <>
              <Field label="Phone number" hint="Include country code (e.g. 91…)">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="9198xxxxxx" />
              </Field>
              <Field label="Message">
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message…" />
              </Field>
              <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
                Link preview:{" "}
                <span className="break-all font-mono text-zinc-200">{payload || "—"}</span>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="Size (px)">
              <Input inputMode="decimal" value={size} onChange={(e) => setSize(e.target.value)} />
            </Field>
            <Field label="Error correction">
              <Select value={ec} onChange={(e) => setEc(e.target.value as any)}>
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </Select>
            </Field>
          </div>

          {error ? (
            <div className="rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200 ring-1 ring-rose-400/20">
              {error}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
              Transparent background, light QR for dark UI.
            </div>
          )}

          <div className="mt-1 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setMode("url");
                setUrl("https://tools.bongobiz.com");
                setPhone("91");
                setMessage("Hello from BongoBiz!");
                setSize("512");
                setEc("M");
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (dataUrl) downloadDataUrl(dataUrl, "bongobiz-qr.png");
              }}
              disabled={!dataUrl}
            >
              Download PNG
            </Button>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Payload" value={payload ? "Ready" : "—"} subvalue={mode === "url" ? "URL" : "WhatsApp link"} />
          <Stat label="Size" value={`${formatNumber(Number(size) || 512, 0)}px`} subvalue="Output width" />
          <Stat label="EC level" value={ec} subvalue="Error correction" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">QR Preview</h2>
          <div className="mt-4 grid place-items-center rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt="QR code"
                src={dataUrl}
                className="h-auto w-full max-w-[360px] rounded-2xl ring-1 ring-white/10"
              />
            ) : (
              <div className="text-sm text-zinc-500">Enter details to generate a QR code.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

