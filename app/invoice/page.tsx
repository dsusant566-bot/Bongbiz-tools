import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { InvoiceClient } from "./ui";

export const metadata: Metadata = {
  title: "Invoice",
  description: "Professional invoice generator for Suronno Enterprises.",
};

export default function InvoicePage() {
  return (
    <ToolShell
      title="Invoice Generator"
      subtitle="Generate a professional invoice for Suronno Enterprises. Fill details and print or save as PDF using your browser."
    >
      <InvoiceClient />
    </ToolShell>
  );
}

