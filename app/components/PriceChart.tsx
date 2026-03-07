"use client";

import { useState, useMemo } from "react";
import { PriceResponse, formatPrice, getPriceBarColor, getPriceLabel } from "../lib/types";

interface Props {
  data: PriceResponse;
}

export default function PriceChart({ data }: Props) {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const maxPrice = useMemo(
    () => Math.max(...data.prices.map((p) => Math.max(p.price, 0.01))),
    [data.prices]
  );

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Prijzen per uur
        </h2>
        <div className="text-sm text-gray-500">
          {data.area} &middot; vandaag
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-end gap-[3px] md:gap-1.5 min-w-[580px] h-[200px] md:h-[250px] pb-6 relative">
          {/* Average line */}
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300 z-10 pointer-events-none"
            style={{
              bottom: `${Math.max(20, (data.averagePrice / maxPrice) * 100)}%`,
            }}
          >
            <span className="absolute -top-5 right-0 text-[10px] text-gray-400 bg-white px-1">
              gem. {formatPrice(data.averagePrice)}
            </span>
          </div>

          {data.prices.map((item, i) => {
            const height = Math.max(8, (Math.max(item.price, 0) / maxPrice) * 100);
            const isActive = item.hour === data.currentHour;
            const isHovered = hoveredHour === item.hour;
            const isCheapest = item.hour === data.cheapestHour;
            const isExpensive = item.hour === data.expensiveHour;

            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center justify-end h-full relative group"
                onMouseEnter={() => setHoveredHour(item.hour)}
                onMouseLeave={() => setHoveredHour(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <div className="font-semibold">{item.hour}:00 - {item.hour + 1}:00</div>
                    <div>{formatPrice(item.price)} cent/kWh &middot; {getPriceLabel(item.price, data.averagePrice)}</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full rounded-t-md md:rounded-t-lg transition-all duration-200 cursor-pointer bar-animate ${
                    item.isPast ? "opacity-40" : ""
                  } ${isActive ? "ring-2 ring-primary-500 ring-offset-2" : ""} ${
                    isHovered ? "opacity-90 scale-x-110" : ""
                  }`}
                  style={{
                    height: `${height}%`,
                    backgroundColor: getPriceBarColor(item.price, data.averagePrice),
                    animationDelay: `${i * 20}ms`,
                  }}
                />

                {/* Hour label */}
                <div
                  className={`absolute -bottom-5 text-[10px] md:text-xs ${
                    isActive
                      ? "font-bold text-primary-700"
                      : "text-gray-400"
                  }`}
                >
                  {item.hour}
                </div>

                {/* Markers */}
                {isCheapest && (
                  <div className="absolute -bottom-5 text-emerald-500 text-[10px] font-bold -translate-y-3">
                    &#9660;
                  </div>
                )}
                {isExpensive && (
                  <div className="absolute -bottom-5 text-red-500 text-[10px] font-bold -translate-y-3">
                    &#9650;
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 pt-4 border-t border-gray-100">
        {[
          { color: "#059669", label: "Zeer goedkoop" },
          { color: "#34d399", label: "Goedkoop" },
          { color: "#fbbf24", label: "Gemiddeld" },
          { color: "#fb923c", label: "Duur" },
          { color: "#ef4444", label: "Zeer duur" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
