import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CurrencyClient } from "./ui";

export const metadata: Metadata = {
  title: "Currency",
  description: "Convert currencies using live rates or a manual rate.",
};

export default function CurrencyPage() {
  return (
    <ToolShell
      title="Currency Converter"
      subtitle="Convert with live rates (no API key) or switch to manual rate mode for offline/backup use."
    >
      <CurrencyClient />
    </ToolShell>
  );
}

