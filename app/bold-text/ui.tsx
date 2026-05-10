"use client";

import * as React from "react";
import { Button, Field, Input, Select, Stat } from "../_components/ui";

type Style = "bold" | "italic" | "bold-italic" | "monospace";

const ranges: Record<Style, { A: number; a: number; zero: number }> = {
  bold: { A: 0x1d400, a: 0x1d41a, zero: 0x1d7ce },
  italic: { A: 0x1d434, a: 0x1d44e, zero: 0x1d7e2 },
  "bold-italic": { A: 0x1d468, a: 0x1d482, zero: 0x1d7ec },
  monospace: { A: 0x1d670, a: 0x1d68a, zero: 0x1d7f6 },
};

function mapChar(ch: string, style: Style) {
  const code = ch.codePointAt(0);
  if (code == null) return ch;
  const r = ranges[style];
  if (code >= 65 && code <= 90) return String.fromCodePoint(r.A + (code - 65));
  if (code >= 97 && code <= 122) return String.fromCodePoint(r.a + (code - 97));
  if (code >= 48 && code <= 57) return String.fromCodePoint(r.zero + (code - 48));
  return ch;
}

function convert(text: string, style: Style) {
  let out = "";
  for (const ch of text) out += mapChar(ch, style);
  return out;
}

export function BoldTextClient() {
  const [style, setStyle] = React.useState<Style>("bold");
  const [text, setText] = React.useState("write your text here");

  const out = convert(text, style);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <Field label="Style">
            <Select value={style} onChange={(e) => setStyle(e.target.value as Style)}>
              <option value="bold">Bold</option>
              <option value="italic">Italic</option>
              <option value="bold-italic">Bold Italic</option>
              <option value="monospace">Monospace</option>
            </Select>
          </Field>

          <Field label="Input text">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something…" />
          </Field>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStyle("bold");
                setText("Susanta Daw · Suronno Enterprises");
              }}
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(out);
              }}
            >
              Copy
            </Button>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Chars" value={String(text.length)} subvalue="Input length" />
          <Stat label="Style" value={style.replace("-", " ")} subvalue="Unicode mapping" />
          <Stat label="Output" value="Ready" subvalue="Copy to use" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Output</h2>
          <div className="mt-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="select-all whitespace-pre-wrap break-words text-lg font-semibold text-white">
              {out || "—"}
            </div>
            <div className="mt-3 text-xs text-zinc-500">
              Some platforms may not support all Unicode styles. If it looks broken, try a different style.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

