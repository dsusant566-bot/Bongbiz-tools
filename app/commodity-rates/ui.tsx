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
        // Using GoldAPI from environment variable
        const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        const headers = {
            'x-access-token': apiKey || '',
            'Content-Type': 'application/json'
        };
        
        // Fetch Gold and Silver in INR
        const metals = await Promise.all([
            fetch('https://www.goldapi.io/api/XAU/INR', { headers }),
            fetch('https://www.goldapi.io/api/XAG/INR', { headers })
        ]);
        
        const goldData = await metals[0].json();
        const silverData = await metals[1].json();
        
        // Formulas
        const goldPriceOz = goldData.price || 0;
        const silverPriceOz = silverData.price || 0;
        
        // Gold (10g) = (Price_per_oz / 31.1035) * 10
        const gold24kPer10g = (goldPriceOz / 31.1035) * 10;
        const gold22kPer10g = gold24kPer10g * 0.9167;
        
        // Silver (1kg) = (Price_per_oz / 31.1035) * 1000
        const silverPerKg = (silverPriceOz / 31.1035) * 1000;
        
        setRates({
          gold24k: Math.round(gold24kPer10g),
          gold22k: Math.round(gold22kPer10g),
          silver: Math.round(silverPerKg),
          oil: 78.50 
        });
        setTimestamp(new Date().toLocaleTimeString());
      } catch {
        setError("Unable to load live rates at the moment.");
      } finally {
        setLoading(false);
      }
    }
    void fetchRates();
  }, []);

  if (loading) return <div className="text-zinc-500">Loading live rates...</div>;
  if (error) return <div className="text-rose-400">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Gold (24K)" value={rates?.gold24k ? `₹${rates.gold24k.toLocaleString()}` : "N/A"} subvalue="per 10g" />
        <Stat label="Gold (22K)" value={rates?.gold22k ? `₹${rates.gold22k.toLocaleString()}` : "N/A"} subvalue="per 10g" />
        <Stat label="Silver" value={rates?.silver ? `₹${rates.silver.toLocaleString()}` : "N/A"} subvalue="per kg" />
        <Stat label="Crude Oil" value={rates?.oil ? `$${rates.oil.toFixed(2)}` : "N/A"} subvalue="per barrel" />
      </div>
      <div className="text-xs text-zinc-500">Last updated: {timestamp}</div>
    </div>
  );
}
