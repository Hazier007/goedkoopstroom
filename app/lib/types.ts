export interface PriceData {
  hour: number;
  price: number;
  time: string;
  isPast: boolean;
}

export interface PriceResponse {
  prices: PriceData[];
  currency: string;
  area: string;
  cheapestHour: number;
  expensiveHour: number;
  averagePrice: number;
  currentHour: number;
  currentPrice: number;
}

export const countries = [
  { code: "BE", name: "Belgie", area: "10YBE----------2" },
  { code: "NL", name: "Nederland", area: "10YNL----------L" },
  { code: "DE", name: "Duitsland", area: "10Y1001A1001A82H" },
  { code: "FR", name: "Frankrijk", area: "10YFR-RTE------C" },
] as const;

export function getPriceColor(price: number, avg: number): string {
  const ratio = price / avg;
  if (ratio <= 0.7) return "bg-emerald-500";
  if (ratio <= 0.9) return "bg-emerald-400";
  if (ratio <= 1.1) return "bg-amber-400";
  if (ratio <= 1.3) return "bg-orange-400";
  return "bg-red-500";
}

export function getPriceBarColor(price: number, avg: number): string {
  const ratio = price / avg;
  if (ratio <= 0.7) return "#059669";
  if (ratio <= 0.9) return "#34d399";
  if (ratio <= 1.1) return "#fbbf24";
  if (ratio <= 1.3) return "#fb923c";
  return "#ef4444";
}

export function getPriceLabel(price: number, avg: number): string {
  const ratio = price / avg;
  if (ratio <= 0.7) return "Zeer goedkoop";
  if (ratio <= 0.9) return "Goedkoop";
  if (ratio <= 1.1) return "Gemiddeld";
  if (ratio <= 1.3) return "Duur";
  return "Zeer duur";
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
