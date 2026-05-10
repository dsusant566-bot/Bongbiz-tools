import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { LoanEmiClient } from "./ui";

export const metadata: Metadata = {
  title: "Loan EMI",
  description: "Calculate monthly EMI, total interest, and total payable.",
};

export default function LoanEmiPage() {
  return (
    <ToolShell
      title="Loan EMI Calculator"
      subtitle="Compute EMI, total interest, and total payable. Adjust tenure, rate, and principal with instant results."
    >
      <div className="mb-6">
        <a
          href="/loan-inquiry"
          className="bb-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-emerald-300/90 to-emerald-400/70 px-4 py-3 text-sm font-semibold text-black ring-1 ring-emerald-300/30 hover:from-emerald-200/90 hover:to-emerald-300/80"
        >
          Apply for Loan <span aria-hidden>→</span>
        </a>
      </div>
      <LoanEmiClient />
    </ToolShell>
  );
}

