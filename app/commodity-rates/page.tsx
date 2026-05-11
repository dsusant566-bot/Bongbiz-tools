import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CommodityRatesClient } from "./ui";

export const metadata: Metadata = {
  title: "Gold & Silver Today's Rate",
  description: "View live market prices for Gold, Silver, and Crude Oil in INR.",
};

export default function CommodityRatesPage() {
  return (
    <ToolShell
      title="Gold & Silver Today's Rate"
      subtitle="Stay updated with the latest market trends for gold, silver, and oil."
    >
      <CommodityRatesClient />
    </ToolShell>
  );
}
