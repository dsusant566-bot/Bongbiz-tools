"use client";

import * as React from "react";
import { Button, Field, Input, Stat } from "../_components/ui";
import { formatNumber } from "../_lib/format";
import { jsPDF } from "jspdf";
import { PDFDocument } from "pdf-lib";

type Tab = "merge" | "images" | "pdf-to-img";

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "bb-ring rounded-2xl px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition",
        active ? "bg-white/10 text-white" : "bg-white/5 text-zinc-300 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function PdfConverterClient() {
  const [tab, setTab] = React.useState<Tab>("merge");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [pdfFiles, setPdfFiles] = React.useState<File[]>([]);
  const [imgFiles, setImgFiles] = React.useState<File[]>([]);
  const [toImgFiles, setToImgFiles] = React.useState<File[]>([]);

  const [pageSize, setPageSize] = React.useState<"fit" | "a4">("fit");

  const totalFiles = tab === "merge" ? pdfFiles.length : (tab === "images" ? imgFiles.length : toImgFiles.length);

  // ১. Merge PDFs Function
  async function mergePdfs() {
    setError(null);
    if (pdfFiles.length < 2) {
      setError("কমপক্ষে ২টি পিডিএফ ফাইল সিলেক্ট করুন।");
      return;
    }
    setBusy(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-bongobiz.pdf";
      a.click();
    } catch (err) {
      setError("Merge failed. Some PDFs might be protected.");
    } finally {
      setBusy(false);
    }
  }

  // ২. Images to PDF Function
  async function imagesToPdf() {
    setError(null);
    if (imgFiles.length < 1) {
      setError("এক বা একাধিক ছবি সিলেক্ট করুন।");
      return;
    }
    setBusy(true);
    try {
      const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      for (let i = 0; i < imgFiles.length; i++) {
        const file = imgFiles[i];
        const imageData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        if (i > 0) doc.addPage();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        if (pageSize === "fit") {
          doc.addImage(imageData, "JPEG", 0, 0, pageWidth, pageHeight);
        } else {
          doc.addImage(imageData, "JPEG", 10, 10, pageWidth - 20, pageHeight - 20);
        }
      }
      doc.save("images-bongobiz.pdf");
    } catch (err) {
      setError("Image conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  // ৩. PDF to Image Function (Local Worker Fix)
  async function pdfToImages() {
    setError(null);
    if (toImgFiles.length < 1) {
      setError("একটি পিডিএফ ফাইল সিলেক্ট করুন।");
      return;
    }
    setBusy(true);
    try {
      // ডাইনামিক ইমপোর্ট
      const pdfjsLib = await import("pdfjs-dist");
      
      // আপনার public ফোল্ডার থেকে ফাইলটি লোড করা হচ্ছে
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      const file = toImgFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ canvasContext: context!, viewport }).promise;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `bongobiz-page-${i}.png`;
        link.click();
      }
    } catch (err) {
      console.error(err);
      setError("পিডিএফ প্রসেস করতে সমস্যা হয়েছে। আপনার ব্রাউজার বা ফাইলটি চেক করুন।");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <section className="bb-panel rounded-3xl p-6 lg:col-span-2">
        <div className="grid grid-cols-3 gap-2">
          <TabButton active={tab === "merge"} onClick={() => setTab("merge")}>
            Merge PDFs
          </TabButton>
          <TabButton active={tab === "images"} onClick={() => setTab("images")}>
            Img → PDF
          </TabButton>
          <TabButton active={tab === "pdf-to-img"} onClick={() => setTab("pdf-to-img")}>
            PDF → Img
          </TabButton>
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
          {tab === "merge" ? (
            <Field label="Select PDFs" hint="Pick 2+ files">
              <Input type="file" accept=".pdf" multiple onChange={(e) => setPdfFiles(Array.from(e.target.files ?? []))} />
            </Field>
          ) : tab === "images" ? (
            <>
              <Field label="Select images" hint="JPG/PNG supported">
                <Input type="file" accept="image/*" multiple onChange={(e) => setImgFiles(Array.from(e.target.files ?? []))} />
              </Field>
              <Field label="Page size">
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className={["bb-ring rounded-2xl px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition", pageSize === "fit" ? "bg-white/10 text-white" : "bg-white/5 text-zinc-300 hover:bg-white/10"].join(" ")} onClick={() => setPageSize("fit")}>Fit to image</button>
                  <button type="button" className={["bb-ring rounded-2xl px-4 py-3 text-sm font-semibold ring-1 ring-white/10 transition", pageSize === "a4" ? "bg-white/10 text-white" : "bg-white/5 text-zinc-300 hover:bg-white/10"].join(" ")} onClick={() => setPageSize("a4")}>A4 (centered)</button>
                </div>
              </Field>
            </>
          ) : (
            <Field label="Select PDF to extract images" hint="Single file only">
              <Input type="file" accept=".pdf" onChange={(e) => setToImgFiles(Array.from(e.target.files ?? []))} />
            </Field>
          )}

          {error ? (
            <div className="rounded-2xl bg-rose-500/10 p-3 text-xs text-rose-200 ring-1 ring-rose-400/20">{error}</div>
          ) : (
            <div className="text-xs text-zinc-500">সবকিছু আপনার ব্রাউজারে প্রসেস হচ্ছে।</div>
          )}

          <div className="mt-1 flex items-center justify-between gap-3">
            <Button type="button" variant="ghost" onClick={() => { setError(null); setPdfFiles([]); setImgFiles([]); setToImgFiles([]); setTab("merge"); }}>Reset</Button>
            <Button type="button" onClick={() => void (tab === "merge" ? mergePdfs() : tab === "images" ? imagesToPdf() : pdfToImages())} disabled={busy}>
              {busy ? "Working…" : tab === "merge" ? "Merge & Download" : tab === "images" ? "Convert & Download" : "Extract Images"}
            </Button>
          </div>
        </div>
      </section>

      <section className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Mode" value={tab === "merge" ? "Merge PDFs" : tab === "images" ? "Images → PDF" : "PDF → Images"} subvalue="Tool" />
          <Stat label="Selected files" value={formatNumber(totalFiles, 0)} subvalue="Count" />
          <Stat label="Output" value={tab === "pdf-to-img" ? "PNG/JPG" : "PDF"} subvalue="Format" />
        </div>

        <div className="bb-panel mt-6 rounded-3xl p-6">
          <h2 className="text-sm font-semibold text-white">Notes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>PDF to Image অপশনে প্রতি পেজ আলাদা ছবি হিসেবে ডাউনলোড হবে।</li>
            <li>পাসওয়ার্ড দেওয়া পিডিএফে সমস্যা হতে পারে।</li>
            <li>আপনার ডেটা আমাদের সার্ভারে আপলোড হয় না, এটি সম্পূর্ণ নিরাপদ।</li>
          </ul>
        </div>
      </section>
    </div>
  );
}