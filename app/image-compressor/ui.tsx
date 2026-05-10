"use client";

import * as React from "react";
import imageCompression from "browser-image-compression";
import { Button, Field, Input, Select, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

type OutFormat = "keep" | "image/jpeg" | "image/webp" | "image/png";

function bytesToSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ImageCompressorClient() {
  const [file, setFile] = React.useState<File | null>(null);
  const [quality, setQuality] = React.useState("0.8");
  const [maxWidth, setMaxWidth] = React.useState("1920");
  const [format, setFormat] = React.useState<OutFormat>("keep");

  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [outBlob, setOutBlob] = React.useState<Blob | null>(null);
  const [outName, setOutName] = React.useState<string>("compressed");

  const q = Number(quality);
  const mw = Number(maxWidth);

  async function compress() {
    setError(null);
    setOutBlob(null);
    if (!file) {
      setError("Please select an image.");
      return;
    }
    if (!(q > 0 && q <= 1)) {
      setError("Quality must be between 0.1 and 1.0");
      return;
    }
    setBusy(true);
    try {
      const options: imageCompression.Options = {
        maxSizeMB: 10,
        maxWidthOrHeight: Number.isFinite(mw) && mw > 0 ? mw : 1920,
        useWebWorker: true,
        initialQuality: q,
        fileType: format === "keep" ? undefined : format,
      };
      const out = await imageCompression(file, options);
      setOutBlob(out);

      const base = file.name.replace(/\.[^/.]+$/, "");
      const ext =
        (format === "keep" ? file.type : format) === "image/png"
          ? "png"
          : (format === "keep" ? file.type : format) === "image/webp"
            ? "webp"
            : "jpg";
      setOutName(`${base}-compressed.${ext}`);
    } catch {
      setError("Compression failed. Try a different image or settings.");
    } finally {
      setBusy(false);
    }
  }

  const originalBytes = file?.size ?? NaN;
  const outBytes = outBlob?.size ?? NaN;
  const saved =
    Number.isFinite(originalBytes) && Number.isFinite(outBytes) && originalBytes > 0
      ? ((originalBytes - outBytes) / originalBytes) * 100
      : NaN;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Select image" hint="JPG/PNG/WebP supported">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile((e.target.files?.[0] as File) ?? null)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Quality" hint="0.1–1.0">
              <Input inputMode="decimal" value={quality} onChange={(e) => setQuality(e.target.value)} />
            </Field>
            <Field label="Max width/height" hint="px">
              <Input inputMode="decimal" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} />
            </Field>
          </div>

          <Field label="Output format">
            <Select value={format} onChange={(e) => setFormat(e.target.value as OutFormat)}>
              <option value="keep">Keep original</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WebP</option>
              <option value="image/png">PNG</option>
            </Select>
          </Field>

          {error ? (
            <div className="rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200 ring-1 ring-rose-400/20">
              {error}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
              Runs locally. No uploads.
            </div>
          )}

          <div className="mt-1 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFile(null);
                setQuality("0.8");
                setMaxWidth("1920");
                setFormat("keep");
                setOutBlob(null);
                setError(null);
              }}
            >
              Reset
            </Button>
            <Button type="button" onClick={() => void compress()} disabled={busy}>
              {busy ? "Compressing…" : "Compress"}
            </Button>
          </div>

          {outBlob ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => downloadBlob(outBlob, outName)}
            >
              Download result
            </Button>
          ) : null}
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Original size" value={file ? bytesToSize(file.size) : "—"} subvalue="Before compression" />
          <Stat label="Compressed size" value={outBlob ? bytesToSize(outBlob.size) : "—"} subvalue="After compression" />
          <Stat
            label="Saved"
            value={Number.isFinite(saved) ? `${formatNumber(saved, 1)}%` : "—"}
            subvalue="Reduction"
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Recommended settings</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Photos: JPEG/WebP, quality 0.75–0.85</li>
            <li>Logos/UI: PNG (or WebP if supported)</li>
            <li>Max width: 1600–2000px for most web uses</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

