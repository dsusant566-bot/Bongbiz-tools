import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { PdfConverterClient } from "./ui";

export const metadata: Metadata = {
  title: "PDF Converter",
  description: "Merge PDFs and convert images to a single PDF (in-browser).",
};

export default function PdfConverterPage() {
  return (
    <ToolShell
      title="PDF Converter"
      subtitle="Merge PDFs or convert images to a single PDF — fully in your browser (no uploads)."
    >
      <PdfConverterClient />
    </ToolShell>
  );
}

