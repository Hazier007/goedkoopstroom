"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Waar komen deze prijzen vandaan?",
    a: "De prijzen komen van de Europese energiebeurs (EPEX/ENTSO-E). Dit zijn de groothandelsprijzen exclusief belastingen en netkosten.",
  },
  {
    q: "Betaal ik exact deze prijs?",
    a: "Nee, je energieleverancier rekent hierop een marge, plus belastingen en netkosten. Maar de trend volgt deze prijzen wel.",
  },
  {
    q: "Hoe schakel ik over naar dynamische prijzen?",
    a: "Je hebt een digitale meter nodig en een contract met dynamische tarieven. Vraag bij je leverancier naar de mogelijkheden.",
  },
  {
    q: "Kan de prijs negatief worden?",
    a: "Ja! Bij veel zon/wind en weinig vraag kan de prijs negatief worden. Je krijgt dan geld toe om stroom te verbruiken.",
  },
  {
    q: "Wat zijn day-ahead prijzen precies?",
    a: "Day-ahead prijzen worden elke dag rond 13:00 vastgelegd op de Europese energiebeurs EPEX SPOT voor de volgende dag. Ze gelden per uur en weerspiegelen de verwachte vraag en aanbod. In Belgie bepalen deze prijzen wat je betaalt bij een dynamisch contract. Leveranciers gebruiken deze beursprijzen als basis en rekenen daar hun marge, netkosten en belastingen bovenop.",
  },
  {
    q: "Heb ik een digitale meter nodig voor dynamische prijzen?",
    a: "Ja, een digitale meter is verplicht om te kunnen profiteren van dynamische tarieven. Deze meter registreert je verbruik per kwartier, waardoor je leverancier exact weet wanneer je stroom verbruikt. In Vlaanderen worden alle huishoudens geleidelijk uitgerust met een digitale meter door Fluvius.",
  },
  {
    q: "Wat is het capaciteitstarief en hoe beinvloedt het mijn factuur?",
    a: "Sinds 2023 betaal je in Vlaanderen het capaciteitstarief, gebaseerd op je maandelijkse piekvermogen in kilowatt (kW). Hoe meer toestellen je tegelijk inschakelt, hoe hoger je piekverbruik en dus je nettarief. Spreid je verbruik over de dag om pieken te vermijden.",
  },
  {
    q: "Hoe kan ik besparen met zonnepanelen en dynamische prijzen?",
    a: "Met zonnepanelen produceer je overdag gratis stroom. Combineer dit met een dynamisch contract en je bespaart dubbel: je verbruikt eigen stroom wanneer de marktprijs hoog is, en je koopt goedkope stroom van het net tijdens daluren.",
  },
  {
    q: "Is een thuisbatterij rendabel bij dynamische tarieven?",
    a: "Een thuisbatterij wordt steeds interessanter bij dynamische prijzen. Je laadt de batterij op wanneer stroom goedkoop of zelfs negatief geprijsd is, en verbruikt die opgeslagen energie tijdens dure piekuren. Met de huidige prijsschommelingen en dalende batterijprijzen bedraagt de terugverdientijd gemiddeld 7 tot 10 jaar.",
  },
  {
    q: "Welke leveranciers bieden dynamische contracten aan in Belgie?",
    a: "Verschillende energieleveranciers in Belgie bieden dynamische contracten aan, waaronder Engie Electrabel, Luminus, Bolt Energy, DATS 24 en Frank Energie. Vergelijk niet alleen de marges maar ook de maandelijkse vaste kosten. Gebruik de VREG V-test om objectief te vergelijken.",
  },
  {
    q: "Wat is de VREG V-test en hoe gebruik ik die?",
    a: "De V-test is de officiele vergelijkingstool van de Vlaamse energieregulator VREG. Je vult je jaarverbruik in en krijgt een overzicht van alle beschikbare contracten, gesorteerd op jaarkost. Het is de meest betrouwbare manier om leveranciers objectief te vergelijken.",
  },
  {
    q: "Welke energiepremies bestaan er in Vlaanderen?",
    a: "Vlaanderen biedt diverse premies voor energiebesparende investeringen. De Mijn VerbouwPremie dekt onder meer dakisolatie, hoogrendementsbeglazing, warmtepompen en zonneboilers. Daarnaast zijn er premies voor thuisbatterijen via netbeheerder Fluvius.",
  },
  {
    q: "Hoe werkt injectie van zonnestroom op het net?",
    a: "Wanneer je zonnepanelen meer produceren dan je verbruikt, wordt het overschot op het net geinjecteerd. Bij een dynamisch contract ontvang je hiervoor de actuele marktprijs op dat moment, minus eventuele kosten.",
  },
  {
    q: "Wat is het verschil tussen een vast, variabel en dynamisch contract?",
    a: "Bij een vast contract ligt je energieprijs voor de hele looptijd vast. Een variabel contract volgt een formule die periodiek wordt aangepast. Een dynamisch contract gaat nog een stap verder: je betaalt de werkelijke uurprijs van de beurs. Dit biedt het meeste besparingspotentieel als je flexibel kunt verbruiken.",
  },
  {
    q: "Hoe kan een slim energiebeheersysteem (HEMS) mij helpen?",
    a: "Een Home Energy Management System (HEMS) stuurt automatisch je toestellen aan op basis van de energieprijzen, je zonnepaneelproductie en je batterijstatus. Populaire systemen zijn onder meer Smappee en Home Assistant.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Veelgestelde vragen
      </h2>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => (
          <div key={i} className="py-3 first:pt-0 last:pb-0">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between text-left gap-4 py-1 group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors text-sm md:text-base">
                {faq.q}
              </h3>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
                  openIndex === i ? "rotate-180 bg-primary-100 text-primary-700" : ""
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </span>
            </button>
            <div className={`faq-answer ${openIndex === i ? "open" : ""}`}>
              <div>
                <p className="text-sm text-gray-600 pt-2 pb-1 pr-8">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
