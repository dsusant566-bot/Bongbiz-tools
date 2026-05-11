import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { CommodityRatesClient } from "./ui";

import { baseMetadata } from "../metadata.config";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Gold & Silver Today's Rate",
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
