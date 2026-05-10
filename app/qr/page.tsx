import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { QrClient } from "./ui";

export const metadata: Metadata = {
  title: "QR",
  description: "Generate QR codes for URLs and WhatsApp links.",
};

export default function QrPage() {
  return (
    <ToolShell
      title="QR Code Generator"
      subtitle="Generate a clean QR code for any URL or a WhatsApp message link. Download as PNG and print-ready."
    >
      <QrClient />
    </ToolShell>
  );
}

