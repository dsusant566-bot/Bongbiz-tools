import type { Metadata } from "next";
import { ToolShell } from "../_components/tool-shell";
import { VehicleInfoClient } from "./ui";

export const metadata: Metadata = {
  title: "Vehicle Info",
  description: "India RTO / Parivahan quick links and lookup helpers.",
};

export default function VehicleInfoPage() {
  return (
    <ToolShell
      title="Vehicle Info Search (India RTO)"
      subtitle="Quick access to official Parivahan services and state RTO portals. This tool provides links and helpers (no private data scraping)."
    >
      <VehicleInfoClient />
    </ToolShell>
  );
}

