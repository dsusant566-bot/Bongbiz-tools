export function clampNumber(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

export function formatMoney(
  amount: number,
  currency: string,
  locale: string = "en-IN"
) {
  if (!Number.isFinite(amount)) return "—";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return amount.toFixed(2);
  }
}

export function formatNumber(n: number, maxFractionDigits = 2) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: maxFractionDigits,
  }).format(n);
}

