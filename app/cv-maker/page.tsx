import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CvBuilderClient } from "./ui";

export const metadata: Metadata = {
  title: "CV Maker",
  description: "Create your professional CV in your browser.",
};

export default function CvBuilderPage() {
  return (
    <ToolShell
      title="CV Maker"
      subtitle="Build a professional CV quickly and easily."
    >
      <CvBuilderClient />
    </ToolShell>
  );
}
