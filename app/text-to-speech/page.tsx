import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { TextToSpeechClient } from "./ui";

export const metadata: Metadata = {
  title: "Text to Speech Converter",
  description: "Free and fast text-to-speech converter. Convert text to natural-sounding speech directly in your browser using Web Speech API.",
};

export default function TextToSpeechPage() {
  return (
    <ToolShell
      title="Text to Speech"
      subtitle="Convert your text into spoken audio instantly, completely free and private. No external servers needed."
    >
      <TextToSpeechClient />
    </ToolShell>
  );
}
