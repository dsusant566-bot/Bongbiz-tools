import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { BackgroundRemoverClient } from "./ui";

export const metadata: Metadata = {
  title: "Background Remover",
  description: "One-click background removal in your browser.",
};

export default function BackgroundRemoverPage() {
  return (
    <ToolShell
      title="Background Remover"
      subtitle="Remove image backgrounds with one click. Runs client-side; your image stays on your device."
    >
      <BackgroundRemoverClient />
    </ToolShell>
  );
}

