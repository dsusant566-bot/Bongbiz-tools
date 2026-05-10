import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { ImageCompressorClient } from "./ui";

export const metadata: Metadata = {
  title: "Image Compressor",
  description: "High-quality image compression in your browser.",
};

export default function ImageCompressorPage() {
  return (
    <ToolShell
      title="Image Compressor"
      subtitle="Compress images locally for smaller size while keeping quality. Choose quality, max width, and output format."
    >
      <ImageCompressorClient />
    </ToolShell>
  );
}

