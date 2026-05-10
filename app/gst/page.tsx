import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { GstClient } from "./ui";

export const metadata: Metadata = {
  title: "GST",
  description: "Add or remove GST and get a clear tax breakdown.",
};

export default function GstPage() {
  return (
    <ToolShell
      title="GST Calculator"
      subtitle="Add GST to a base price or remove GST from a final price. See the tax amount instantly."
    >
      <GstClient />
    </ToolShell>
  );
}

