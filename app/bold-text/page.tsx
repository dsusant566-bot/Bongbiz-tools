import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { BoldTextClient } from "./ui";

export const metadata: Metadata = {
  title: "Text → Bold",
  description: "Convert normal text to bold Unicode styles.",
};

export default function BoldTextPage() {
  return (
    <ToolShell
      title="Normal Text → Bold Converter"
      subtitle="Convert your text into bold Unicode styles that work on most apps (WhatsApp, Instagram, Facebook). Copy with one click."
    >
      <BoldTextClient />
    </ToolShell>
  );
}

