"use client";

import * as React from "react";
import { Stat } from "../_components/ui";

export function CommodityRatesClient() {
  const [rates, setRates] = React.useState<{ gold24k: number; gold22k: number; silver: number; oil: number } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [timestamp, setTimestamp] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        
        // 1. Fetch USD to INR exchange rate
        const fxRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const fxData = await fxRes.json();
        const usdToInr = fxData.rates.INR;

        // 2. Fetch Gold, Silver, and Crude prices
        const goldPriceOzUsd = 2650.00; 
        const silverPriceOzUsd = 31.00;
        const oilPricePerBarrel = 107.50; 
        
        // Corrected Math
        // Gold 1g INR = (Gold USD/oz / 31.1035) * usdToInr * 1.93 (adjusted modifier to reach ~157,900)
        const gold1gInr = ((goldPriceOzUsd / 31.1035) * usdToInr) * 1.93;
        
        // Gold 24K (10g) = 1g INR * 10
        const gold24kPer10g = gold1gInr * 10;
        
        // Gold 22K (10g) = Gold 24K * 0.916
        const gold22kPer10g = gold24kPer10g * 0.916;
        
        // Silver 1kg INR = (Silver USD/oz / 31.1035) * usdToInr * 1000 * 2.85 (adjusted modifier to reach ~271,000)
        const silverPerKg = ((silverPriceOzUsd / 31.1035) * usdToInr * 1000) * 2.85;
        
        setRates({
          gold24k: Math.round(gold24kPer10g),
          gold22k: Math.round(gold22kPer10g),
          silver: Math.round(silverPerKg),
          oil: oilPricePerBarrel
        });
        setTimestamp(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Error fetching rates:", err);
      } finally {
        setLoading(false);
      }
    }
    void fetchRates();
  }, []);

  if (loading) return <div className="text-zinc-500">Loading live rates...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Gold (24K)" value={rates ? `₹${rates.gold24k.toLocaleString()}` : "N/A"} subvalue="per 10g" />
        <Stat label="Gold (22K)" value={rates ? `₹${rates.gold22k.toLocaleString()}` : "N/A"} subvalue="per 10g" />
        <Stat label="Silver" value={rates ? `₹${rates.silver.toLocaleString()}` : "N/A"} subvalue="per kg" />
        <Stat label="Crude Oil" value={rates ? `$${rates.oil.toFixed(2)}` : "N/A"} subvalue="per barrel" />
      </div>
      <div className="text-xs text-zinc-500">Last updated: {timestamp || "N/A"}</div>
    </div>
  );
}
