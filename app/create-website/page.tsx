import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CreateWebsiteClient } from "./ui";

export const metadata: Metadata = {
  title: "Build Your Website",
  description: "Get a professional website for your business with BongoBiz.",
};

export default function CreateWebsitePage() {
  return (
    <ToolShell
      title="Build Your Business Website"
      subtitle="আপনার ব্যবসার জন্য প্রফেশনাল ওয়েবসাইট বানাতে চান? নিচের ফর্মটি পূরণ করুন, আমরা আপনার সাথে যোগাযোগ করব।"
    >
      <CreateWebsiteClient />
    </ToolShell>
  );
}