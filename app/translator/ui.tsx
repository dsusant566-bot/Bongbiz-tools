"use client";

import * as React from "react";
import { Button, Field, Select, Input } from "../_components/ui";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "bn", name: "Bengali" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "or", name: "Odia" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
  { code: "as", name: "Assamese" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
];

export function TranslatorClient() {
  const [text, setText] = React.useState("");
  const [from, setFrom] = React.useState("en");
  const [to, setTo] = React.useState("bn");
  const [translatedText, setTranslatedText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [copyStatus, setCopyStatus] = React.useState("Copy");
  const [playing, setPlaying] = React.useState(false);

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    setTranslatedText("");
    try {
      const MAX_CHUNK_SIZE = 100;
      const chunks = [];
      let currentChunk = "";
      
      const lines = text.split('\n');
      for (const line of lines) {
        const words = line.split(' ');
        for (const word of words) {
          if (currentChunk.length + word.length + 1 > MAX_CHUNK_SIZE) {
            chunks.push(currentChunk);
            currentChunk = word;
          } else {
            currentChunk += (currentChunk ? " " : "") + word;
          }
        }
        if (currentChunk) {
            chunks.push(currentChunk);
            currentChunk = "";
        }
        chunks.push("\n");
      }
      
      const translatedChunks = await Promise.all(
        chunks.filter(c => c.trim().length > 0 || c === "\n").map(async (chunk) => {
          if (chunk === "\n") return "\n";
          const response = await fetch(`/api/translate?text=${encodeURIComponent(chunk)}&from=${from}&to=${to}`);
          const data = await response.json();
          return data.translatedText || chunk;
        })
      );
      
      setTranslatedText(translatedChunks.join("").trim());
    } catch {
      setTranslatedText("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy"), 2000);
  };

  const splitTextIntoChunks = (text: string, maxLength: number = 100) => {
    const chunks: string[] = [];
    let currentChunk = "";
    const sentences = text.split(/(?<=[.!?])\s+/);

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length <= maxLength) {
        currentChunk += (currentChunk ? " " : "") + sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        if (sentence.length > maxLength) {
          // Force split long sentence
          for (let i = 0; i < sentence.length; i += maxLength) {
            chunks.push(sentence.substring(i, i + maxLength));
          }
          currentChunk = "";
        } else {
          currentChunk = sentence;
        }
      }
    }
    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  };

  const handlePlayAudio = async () => {
    if (!translatedText || playing) return;
    setPlaying(true);
    
    const chunks = splitTextIntoChunks(translatedText);
    let currentChunkIndex = 0;

    const playNext = () => {
      if (currentChunkIndex < chunks.length) {
        const audioUrl = `/api/tts?text=${encodeURIComponent(chunks[currentChunkIndex])}&lang=${to}`;
        const audio = new Audio(audioUrl);
        audio.onended = () => {
            currentChunkIndex++;
            playNext();
        };
        audio.play().catch(() => setPlaying(false));
      } else {
        setPlaying(false);
      }
    };

    playNext();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="bb-panel rounded-3xl p-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="From">
              <Select value={from} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFrom(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="To">
              <Select value={to} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTo(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Source Text">
            <Input value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="Enter text to translate..." />
          </Field>
          <Button onClick={handleTranslate} disabled={loading || !text}>
            {loading ? "Translating..." : "Translate"}
          </Button>
        </div>
      </section>

      <section className="bb-panel rounded-3xl p-6">
        <Field label="Translated Text">
          <div className="relative pb-12">
            <textarea
              className="w-full min-h-[120px] rounded-xl border border-slate-700 bg-slate-900 p-4 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handlePlayAudio}
                disabled={!translatedText || playing}
              >
                {playing ? "Playing..." : "🔊"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleCopy}
                disabled={!translatedText}
              >
                {copyStatus}
              </Button>
            </div>
          </div>
        </Field>
      </section>
    </div>
  );
}
