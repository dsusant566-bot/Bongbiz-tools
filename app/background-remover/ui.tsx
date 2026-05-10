"use client";

import * as React from "react";
import { removeBackground } from "@imgly/background-removal";
import { Button, Field, Input, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";

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

export function BackgroundRemoverClient() {
  const [file, setFile] = React.useState<File | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [out, setOut] = React.useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function run() {
    setError(null);
    setOut(null);
    if (!file) {
      setError("Please select an image.");
      return;
    }
    setBusy(true);
    try {
      // @imgly/background-removal returns a Blob (PNG with transparency).
      const result = await removeBackground(file);
      setOut(result);
      const url = URL.createObjectURL(result);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(url);
    } catch {
      setError(
        "Background removal failed. Try a different image. (This tool may download a model on first run.)"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Select image" hint="Best: product/person photo">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile((e.target.files?.[0] as File) ?? null)}
            />
          </Field>

          {error ? (
            <div className="rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200 ring-1 ring-rose-400/20">
              {error}
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 p-3 text-xs text-zinc-400 ring-1 ring-white/10">
              One-click. Local processing. No uploads.
            </div>
          )}

          <div className="mt-1 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFile(null);
                setOut(null);
                setError(null);
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
              }}
            >
              Reset
            </Button>
            <Button type="button" onClick={() => void run()} disabled={busy}>
              {busy ? "Removing…" : "Remove background"}
            </Button>
          </div>

          {out ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => downloadBlob(out, "bongobiz-no-bg.png")}
            >
              Download PNG
            </Button>
          ) : null}
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Input size" value={file ? bytesToSize(file.size) : "—"} subvalue="Original" />
          <Stat label="Output size" value={out ? bytesToSize(out.size) : "—"} subvalue="PNG with alpha" />
          <Stat
            label="Output type"
            value={out ? out.type || "image/png" : "—"}
            subvalue="Format"
          />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Preview</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Original</div>
              <div className="mt-3 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10">
                {file ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="Original"
                    src={URL.createObjectURL(file)}
                    className="h-56 w-full object-contain"
                    onLoad={(e) => {
                      // Revoke immediately to avoid leaks; browser caches the pixels.
                      URL.revokeObjectURL((e.target as HTMLImageElement).src);
                    }}
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center text-sm text-zinc-500">
                    Select an image
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-xs text-zinc-400">Background removed</div>
              <div className="mt-3 overflow-hidden rounded-2xl bg-[linear-gradient(45deg,rgba(255,255,255,0.06)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.06)_50%,rgba(255,255,255,0.06)_75%,transparent_75%,transparent)] bg-[length:20px_20px] ring-1 ring-white/10">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="No background" src={previewUrl} className="h-56 w-full object-contain" />
                ) : (
                  <div className="flex h-56 items-center justify-center text-sm text-zinc-500">
                    Run removal to preview
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/5 p-4 text-xs text-zinc-400 ring-1 ring-white/10">
            First run may take longer while the model loads. For best results, use a clear subject with good contrast.
          </div>
        </div>
      </section>
    </div>
  );
}

