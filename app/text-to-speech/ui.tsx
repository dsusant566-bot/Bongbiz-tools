"use client";

import * as React from "react";
import { Button, Field, Input, Select } from "../_components/ui";

export function TextToSpeechClient() {
  const [text, setText] = React.useState("");
  const [selectedVoice, setSelectedVoice] = React.useState<string>("en"); // Default to English
  const [pitch, setPitch] = React.useState(1); // Pitch and Rate might not apply to Google TTS URL, but keeping them for UI
  const [rate, setRate] = React.useState(1); // Pitch and Rate might not apply to Google TTS URL, but keeping them for UI
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const languages = [
    { code: "bn", name: "Bengali" },
    { code: "hi", name: "Hindi" },
    { code: "en", name: "English" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
  ];

  // Initialize audio element
  React.useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  }, []);

  const getTTSUrl = (textChunk: string, lang: string) => {
    return `/api/tts?text=${encodeURIComponent(textChunk)}&lang=${lang}`;
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

  const handleSpeak = async () => {
    if (!text || !audioRef.current) return;
    const chunks = splitTextIntoChunks(text);
    let currentChunkIndex = 0;

    const playNext = () => {
      if (currentChunkIndex < chunks.length) {
        audioRef.current!.src = getTTSUrl(chunks[currentChunkIndex], selectedVoice);
        audioRef.current!.play().catch(e => console.error("Error playing audio:", e));
        currentChunkIndex++;
      }
    };

    audioRef.current.onended = playNext;
    playNext();
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleResume = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error resuming audio:", e));
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.onended = null;
    }
  };

  const handleDownload = async () => {
    if (!text) return;
    try {
      const chunks = splitTextIntoChunks(text);
      const audioBlobs: Blob[] = [];
      
      for (const chunk of chunks) {
        const response = await fetch(getTTSUrl(chunk, selectedVoice));
        if (!response.ok) throw new Error("Failed to fetch chunk");
        audioBlobs.push(await response.blob());
      }

      const combinedBlob = new Blob(audioBlobs, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(combinedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `speech.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
  };

  return (
    <div className="bb-panel rounded-3xl p-6">
      <div className="flex flex-col gap-6">
        <Field label="Text to speak">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-2xl bg-white/5 p-4 text-sm text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-emerald-400"
            rows={6}
            placeholder="Enter your text here..."
          />
        </Field>

        <Field label="Language"> {/* Changed label from Voice to Language */}
          <Select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label={`Pitch (${pitch.toFixed(1)})`}>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </Field>
          <Field label={`Rate (${rate.toFixed(1)})`}>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </Field>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSpeak}>Speak</Button>
          <Button variant="ghost" onClick={handlePause}>Pause</Button>
          <Button variant="ghost" onClick={handleResume}>Resume</Button>
          <Button variant="ghost" onClick={handleStop}>Stop</Button>
          <Button onClick={handleDownload}>Download Audio</Button>
        </div>
      </div>
    </div>
  );
}
