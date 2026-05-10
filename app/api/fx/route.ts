export const revalidate = 60; // cache for 60s

type FrankfurterResponse = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = (searchParams.get("from") ?? "USD").toUpperCase();
  const to = (searchParams.get("to") ?? "INR").toUpperCase();

  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to)) {
    return Response.json({ error: "Invalid currency code" }, { status: 400 });
  }
  if (from === to) {
    return Response.json({ from, to, rate: 1, date: new Date().toISOString() });
  }

  // Frankfurter is a free ECB-based API (no key).
  const url = `https://api.frankfurter.app/latest?from=${encodeURIComponent(
    from
  )}&to=${encodeURIComponent(to)}`;

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    // Revalidation hint for Next's data cache
    next: { revalidate },
  });

  if (!res.ok) {
    return Response.json(
      { error: "Rate provider unavailable" },
      { status: 502 }
    );
  }

  const data = (await res.json()) as FrankfurterResponse;
  const rate = data.rates?.[to];
  if (typeof rate !== "number" || !Number.isFinite(rate)) {
    return Response.json({ error: "Rate missing" }, { status: 502 });
  }

  return Response.json({
    from,
    to,
    rate,
    date: data.date,
    source: "frankfurter.app",
  });
}

