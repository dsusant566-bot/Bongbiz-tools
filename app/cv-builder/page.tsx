import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CvBuilderClient } from "./ui";

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create your professional CV in your browser.",
};

export default function CvBuilderPage() {
  return (
    <ToolShell
      title="CV Builder"
      subtitle="Build a professional CV quickly and easily."
    >
      <CvBuilderClient />
    </ToolShell>
  );
}
