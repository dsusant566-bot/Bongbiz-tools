import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { AgeClient } from "./ui";

export const metadata: Metadata = {
  title: "Age",
  description: "Calculate precise age, next birthday, and time lived.",
};

export default function AgePage() {
  return (
    <ToolShell
      title="Age Calculator"
      subtitle="Get your precise age in years, months, and days, plus next-birthday countdown. All calculations run locally in your browser."
    >
      <AgeClient />
    </ToolShell>
  );
}

