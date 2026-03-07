"use client";

import { PriceResponse, formatPrice, getPriceColor, getPriceLabel } from "../lib/types";

interface Props {
  data: PriceResponse;
}

export default function PriceTable({ data }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
        Overzicht alle uren
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {data.prices.map((item) => {
          const isActive = item.hour === data.currentHour;
          const isCheapest = item.hour === data.cheapestHour;
          const isExpensive = item.hour === data.expensiveHour;

          return (
            <div
              key={item.hour}
              className={`relative rounded-xl p-3 text-center transition-all duration-200 ${
                item.isPast ? "opacity-50" : ""
              } ${
                isActive
                  ? "ring-2 ring-primary-500 ring-offset-1 shadow-md"
                  : ""
              } ${
                isCheapest
                  ? "bg-emerald-50 border border-emerald-200"
                  : isExpensive
                    ? "bg-red-50 border border-red-200"
                    : "bg-gray-50 border border-gray-100"
              }`}
            >
              {isCheapest && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">&#x2193;</span>
                </div>
              )}
              {isExpensive && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">&#x2191;</span>
                </div>
              )}
              <div className={`text-xs font-medium ${isActive ? "text-primary-700" : "text-gray-500"}`}>
                {item.hour}:00
              </div>
              <div className={`text-lg font-bold ${
                isCheapest ? "text-emerald-700" : isExpensive ? "text-red-700" : "text-gray-900"
              }`}>
                {formatPrice(item.price)}
              </div>
              <div className="text-[10px] text-gray-400">ct/kWh</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
