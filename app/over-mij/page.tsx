import Link from "next/link";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Over | Goedkoopstroom.be",
  description:
    "Leer meer over Bart, de maker van Goedkoopstroom.be en andere handige Belgische online tools.",
};

const tools = [
  { name: "BTW Calculator", url: "https://btw-calculator.be", desc: "BTW berekenen voor België" },
  { name: "IBAN Validator", url: "https://ibanvalidator.be", desc: "IBAN nummer controleren" },
  { name: "Huurrendement Calculator", url: "https://huurrendementcalculator.be", desc: "Vastgoed rendement berekenen" },
  { name: "KM Vergoeding", url: "https://kmvergoeding.be", desc: "Kilometervergoeding berekenen" },
  { name: "Datum Berekenen", url: "https://datumberekenen.be", desc: "Dagen tussen datums" },
  { name: "Zwangerschapscalculator", url: "https://zwangerschapscalculator.be", desc: "Uitgerekende datum" },
  { name: "Kleurcodes", url: "https://kleurcodes.be", desc: "HEX RGB kleurconverter" },
  { name: "Buiten Drogen", url: "https://buitendrogen.be", desc: "Was droogtijd berekenen" },
];

export default function OverMij() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="text-primary-200 hover:text-white text-sm mb-3 inline-flex items-center gap-1 transition-colors"
            >
              ← Terug naar calculator
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Over de maker</h1>
            <p className="text-primary-200 mt-2 text-lg">De mens achter Goedkoopstroom.be</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 -mt-4">
          {/* Bio */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg">
                B
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Hallo, ik ben Bart!
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Belgische webontwikkelaar en ondernemer met een passie voor het bouwen van
                  handige online tools. Tools die het dagelijks leven net iets makkelijker
                  maken — <strong>gratis en zonder poespas</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Als eigenaar van{" "}
                  <a href="https://hazier.be" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-300 underline-offset-2">
                    Hazier
                  </a>{" "}
                  help ik bedrijven met webdesign, SEO en online marketing. Daarnaast ben ik
                  co-founder van{" "}
                  <a href="https://collectpro.be" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 font-medium underline decoration-primary-300 underline-offset-2">
                    CollectPro
                  </a>
                  , een platform voor debiteurenbeheer.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Deze gratis tools zijn mijn manier om iets terug te geven aan de community.
                  Heb je feedback of ideeën voor nieuwe tools? Laat het me weten!
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Contact</h2>
            <p className="text-gray-600 mb-5">
              Vragen, suggesties of gewoon even hallo zeggen? Stuur me gerust een mailtje!
            </p>
            <a
              href="mailto:info@hazier.be"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              ✉️ info@hazier.be
            </a>
          </section>

          {/* Tools */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Meer handige tools</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Bekijk ook mijn andere gratis online tools:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-primary-50 rounded-xl transition-colors group border border-transparent hover:border-primary-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-primary-200 transition-colors">
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 group-hover:text-primary-700 text-sm">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-400">{tool.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
