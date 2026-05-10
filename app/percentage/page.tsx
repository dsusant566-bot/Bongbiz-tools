import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { PercentageClient } from "./ui";

export const metadata: Metadata = {
  title: "Percentage",
  description: "Percent of, percent change, and reverse percentage calculator.",
};

export default function PercentagePage() {
  return (
    <ToolShell
      title="Percentage Calculator"
      subtitle="Percent of a number, percent change, and reverse percent (find the original value). Fast, clear, and validated."
    >
      <PercentageClient />
    </ToolShell>
  );
}

