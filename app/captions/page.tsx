import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CaptionsClient } from "./ui";

export const metadata: Metadata = {
  title: "Captions & Hashtags",
  description: "Generate social captions and hashtag packs quickly.",
};

export default function CaptionsPage() {
  return (
    <ToolShell
      title="Social Media Caption & Hashtag Generator"
      subtitle="Generate polished captions and ready-to-copy hashtag packs for Instagram/Facebook/WhatsApp. Template-based (fast + private)."
    >
      <CaptionsClient />
    </ToolShell>
  );
}

