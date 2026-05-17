"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import CountrySelector from "./components/CountrySelector";
import PriceChart from "./components/PriceChart";
import PriceTable from "./components/PriceTable";
import AdSlot from "./components/AdSlot";
import { FAQSchema } from "./components/FAQSection";
import type { PriceResponse } from "./lib/types";

const TipsSection = dynamic(() => import("./components/TipsSection"), {
  loading: () => <SectionSkeleton />,
});
const FAQSection = dynamic(() => import("./components/FAQSection"), {
  loading: () => <SectionSkeleton />,
});
const InfoSection = dynamic(() => import("./components/InfoSection"), {
  loading: () => <SectionSkeleton />,
});

function SectionSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<PriceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("BE");

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/prices?country=${selectedCountry}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Kon prijzen niet ophalen");
        }
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Er ging iets mis");
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, [selectedCountry]);

  return (
    <>
      <Header />
      <FAQSchema />

      <main className="min-h-screen bg-gray-50">
        <HeroSection data={data} loading={loading} />

        {/* Ad after hero */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <AdSlot slot="hero-bottom" format="horizontal" />
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          {/* Intro + Country selector */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Dynamische stroomprijzen: zo lees je de grafiek
            </h2>
            <p className="text-gray-600 mb-5">
              Deze pagina toont de <strong>uurprijzen</strong> van dynamische energiecontracten (day-ahead).
              De goedkoopste uren zijn ideaal om wasmachine, droogkast of vaatwasser te laten draaien of je EV te laden.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
                <div className="font-semibold text-emerald-700">Goedkoopste uur</div>
                <div className="text-sm text-gray-500 mt-1">laagste prijs vandaag</div>
              </div>
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <div className="font-semibold text-red-700">Duurste uur</div>
                <div className="text-sm text-gray-500 mt-1">piekmomenten vermijden</div>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <div className="font-semibold text-gray-700">Gemiddelde</div>
                <div className="text-sm text-gray-500 mt-1">referentie voor kleur</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kies je land
              </label>
              <CountrySelector
                selected={selectedCountry}
                onChange={setSelectedCountry}
              />
            </div>
          </section>

          {error && (
            <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            </div>
          )}

          {data && !loading && (
            <>
              <PriceChart data={data} />
              <PriceTable data={data} />

              {/* Ad between price data and tips */}
              <AdSlot slot="mid-content" format="auto" />

              <TipsSection />
            </>
          )}

          {/* Daisycon energy provider comparison widget */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Vergelijk dynamische energiecontracten
            </h2>
            <p className="text-gray-600 mb-5">
              Vergelijk hieronder de actuele energiecontracten van Belgische leveranciers en kies het tarief dat het best past bij jouw verbruik.
            </p>
            <Script
              src="https://daisycon.tools/energy-be/app.js"
              strategy="afterInteractive"
            />
            <div
              className="dc-tool dc-energy-tool"
              data-config='{"mediaId":420740,"locale":"nl-BE","buttonText":"Bekijken","showFilters":true,"limit":10}'
            />
          </section>

          {/* Ad between tips and info */}
          <AdSlot slot="pre-info" format="auto" />

          <InfoSection />
          <FAQSection />

          {/* Ad after FAQ */}
          <AdSlot slot="post-faq" format="auto" className="pb-4" />
        </div>

        <Footer />
      </main>
    </>
  );
}
