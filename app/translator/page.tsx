import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { TranslatorClient } from "./ui";

export const metadata: Metadata = {
  title: "Language Translator",
  description: "Free online language translator supporting multiple languages.",
};

export default function TranslatorPage() {
  return (
    <ToolShell
      title="Language Translator"
      subtitle="Easily translate text between multiple languages using our fast, free online translation tool."
    >
      <TranslatorClient />
    </ToolShell>
  );
}
