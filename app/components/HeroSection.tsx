"use client";

import { PriceResponse, formatPrice, getPriceLabel } from "../lib/types";

interface Props {
  data: PriceResponse | null;
  loading: boolean;
}

export default function HeroSection({ data, loading }: Props) {
  const getTimeUntilCheapest = (cheapestHour: number, currentHour: number) => {
    if (cheapestHour === currentHour) return "Nu!";
    let hoursUntil = cheapestHour - currentHour;
    if (hoursUntil < 0) hoursUntil += 24;
    if (hoursUntil === 1) return "Over 1 uur";
    return `Over ${hoursUntil} uur`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-400" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-primary-300" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-14 md:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Stroomprijs Vandaag Belgie
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto">
            Volg de dynamische stroomprijzen per uur en verbruik slim tijdens de goedkoopste uren.
          </p>
          <p className="mt-3 text-sm md:text-base text-primary-200 max-w-2xl mx-auto">
            Inclusief indicatie van negatieve stroomprijzen en piekuren in Belgie.
          </p>
        </div>

        {/* Live price cards */}
        {data && !loading && (
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {/* Current price */}
            <div className="rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 p-5 text-center">
              <div className="text-sm text-primary-200 mb-1">
                Nu ({data.currentHour}:00 - {data.currentHour + 1}:00)
              </div>
              <div className="text-4xl font-extrabold tracking-tight">
                {formatPrice(data.currentPrice)}
              </div>
              <div className="text-sm text-primary-200">cent/kWh</div>
              <div className="mt-2 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold">
                {getPriceLabel(data.currentPrice, data.averagePrice)}
              </div>
            </div>

            {/* Cheapest hour */}
            <div className="rounded-2xl bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/30 p-5 text-center">
              <div className="text-sm text-emerald-200 mb-1">Goedkoopst vandaag</div>
              <div className="text-4xl font-extrabold tracking-tight">
                {data.cheapestHour}:00
              </div>
              <div className="text-sm text-emerald-200">
                {formatPrice(data.prices.find((p) => p.hour === data.cheapestHour)?.price || 0)} cent/kWh
              </div>
              <div className="mt-2 inline-block rounded-full bg-emerald-400/30 px-3 py-0.5 text-xs font-semibold">
                {getTimeUntilCheapest(data.cheapestHour, data.currentHour)}
              </div>
            </div>

            {/* Average */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 text-center">
              <div className="text-sm text-primary-200 mb-1">Gemiddeld</div>
              <div className="text-4xl font-extrabold tracking-tight">
                {formatPrice(data.averagePrice)}
              </div>
              <div className="text-sm text-primary-200">cent/kWh</div>
              <div className="mt-2 text-xs text-primary-300">
                Duurste: {data.expensiveHour}:00 ({formatPrice(data.prices.find((p) => p.hour === data.expensiveHour)?.price || 0)} ct)
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <p className="mt-3 text-primary-200">Prijzen ophalen...</p>
          </div>
        )}
      </div>
    </section>
  );
}
