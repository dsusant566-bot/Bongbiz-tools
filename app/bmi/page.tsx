import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { BmiClient } from "./ui";

export const metadata: Metadata = {
  title: "BMI",
  description: "BMI calculator with health status and guidance.",
};

export default function BmiPage() {
  return (
    <ToolShell
      title="BMI Calculator"
      subtitle="Calculate Body Mass Index (BMI) and see a clear health status category. This is for general wellness guidance, not medical diagnosis."
    >
      <BmiClient />
    </ToolShell>
  );
}

