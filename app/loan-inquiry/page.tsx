import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { LoanInquiryClient } from "./ui";

export const metadata: Metadata = {
  title: "Loan Inquiry",
  description: "Apply for a loan with a professional inquiry form.",
};

export default function LoanInquiryPage() {
  return (
    <ToolShell
      title="Loan Inquiry Form"
      subtitle="Share your details and preferred loan type. We’ll contact you on WhatsApp/phone to guide you through the next steps."
    >
      <LoanInquiryClient />
    </ToolShell>
  );
}

