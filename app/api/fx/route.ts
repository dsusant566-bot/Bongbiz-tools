export const dynamic = "force-dynamic";

type ERAResponse = {
  time_last_update_utc: string;
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
    return Response.json({ from, to, rate: 1, date: new Date().toISOString().slice(0, 10) });
  }

  // Using ExchangeRate-API (free, reliable)
  const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;

  const res = await fetch(url, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json(
      { error: "Rate provider unavailable" },
      { status: 502 }
    );
  }

  const data = (await res.json()) as ERAResponse;
  const rate = data.rates?.[to];
  if (typeof rate !== "number" || !Number.isFinite(rate)) {
    return Response.json({ error: "Rate missing" }, { status: 502 });
  }

  return Response.json({
    from,
    to,
    rate,
    date: data.time_last_update_utc,
    source: "open.er-api.com",
  });
}

