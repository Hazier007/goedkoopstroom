export default function InfoSection() {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
        Over dynamische stroomprijzen
      </h2>
      <div className="space-y-6 text-gray-600 text-[15px] leading-relaxed">
        <div>
          <p>
            Met een dynamisch energiecontract betaal je de werkelijke marktprijs voor stroom.
            Deze prijs verandert elk uur en wordt bepaald door vraag en aanbod op de energiemarkt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5">
            <h3 className="text-base font-semibold text-emerald-800 mb-3">
              Wanneer is stroom goedkoop?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">&#x2193;</span>
                <span><strong>&#39;s Nachts (00:00 - 06:00)</strong> &mdash; Weinig vraag, vaak de laagste prijzen</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">&#x2193;</span>
                <span><strong>Middagpiek (12:00 - 15:00)</strong> &mdash; Zonne-energie drukt de prijs (zomer)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">&#x2193;</span>
                <span><strong>Weekend</strong> &mdash; Minder industriele vraag</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500 font-bold">&#x2193;</span>
                <span><strong>Winderige dagen</strong> &mdash; Veel windenergie beschikbaar</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-red-50 border border-red-100 p-5">
            <h3 className="text-base font-semibold text-red-800 mb-3">
              Wanneer is stroom duur?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">&#x2191;</span>
                <span><strong>Ochtendpiek (07:00 - 09:00)</strong> &mdash; Iedereen wordt wakker</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">&#x2191;</span>
                <span><strong>Avondpiek (17:00 - 21:00)</strong> &mdash; Koken, TV, verwarming</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">&#x2191;</span>
                <span><strong>Koude winterdagen</strong> &mdash; Hoge verwarmingsvraag</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Alles over de Belgische energiemarkt</h3>
          <p>
            De Belgische energiemarkt heeft de afgelopen jaren ingrijpende veranderingen doorgemaakt.
            Waar consumenten vroeger enkel konden kiezen tussen een vast of variabel tarief, is er nu een derde optie:
            het <strong>dynamisch energiecontract</strong>. Bij dit type contract betaal je de werkelijke groothandelsprijs per uur,
            ook wel de day-ahead prijs genoemd. Deze prijzen worden dagelijks vastgesteld op de Europese energiebeurs EPEX SPOT.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Hoe werkt de day-ahead markt?</h3>
          <p>
            Elke dag rond 13:00 worden de prijzen voor de 24 uren van de volgende dag bekendgemaakt.
            Energieproducenten en -leveranciers dienen biedingen in op basis van hun verwachte productie en de verwachte vraag.
            Het snijpunt van vraag en aanbod bepaalt de prijs per uur. In Belgie is de prijszone gekoppeld aan de Belgische
            transmissienetbeheerder Elia, die deel uitmaakt van het Europese ENTSO-E netwerk.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Waarom schommelen stroomprijzen zo sterk?</h3>
          <p>
            De volatiliteit van energieprijzen wordt bepaald door diverse factoren. Hernieuwbare energiebronnen zoals wind en zon
            produceren wisselvallig: op een zonnige en winderige dag kan er een overschot ontstaan waardoor prijzen kelderen of zelfs
            negatief worden. Omgekeerd stijgen de prijzen fors op koude winterdagen met weinig wind wanneer gasgestookte centrales
            moeten bijspringen. Ook geopolitieke factoren, brandstofprijzen en onderhoud aan kerncentrales spelen een rol.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">De rol van de digitale meter in Vlaanderen</h3>
          <p>
            De uitrol van digitale meters door Fluvius in Vlaanderen is een cruciale voorwaarde voor dynamische tarieven.
            Deze slimme meters meten je verbruik per kwartier en communiceren automatisch met je netbeheerder.
            Hierdoor kan je leverancier exact berekenen hoeveel je verbruikte op elk moment en welke prijs daarvoor gold.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips om maximaal te besparen</h3>
          <p>
            De sleutel tot besparen met een dynamisch contract is <strong>flexibel verbruik</strong>. Verschuif grote verbruikers
            zoals de wasmachine, droogkast, vaatwasser en elektrische boiler naar de goedkoopste uren. Gebruik timers of slimme stekkers
            om toestellen automatisch in te schakelen. Combineer je dynamisch contract met zonnepanelen en een thuisbatterij voor
            optimaal resultaat.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Het capaciteitstarief begrijpen</h3>
          <p>
            Sinds januari 2023 geldt in Vlaanderen het capaciteitstarief voor de distributienettarieven. Dit tarief is gebaseerd op
            je gemiddelde maandelijkse piekvermogen, uitgedrukt in kilowatt (kW). Hoe hoger je pieken, hoe meer je betaalt aan netkosten.
            Het doel is om het elektriciteitsnet efficienter te benutten door verbruik beter te spreiden.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">De toekomst van energie in Belgie</h3>
          <p>
            Belgie investeert fors in de energietransitie. De bouw van nieuwe offshore windparken in de Noordzee,
            de geplande energiehub Prinses Elisabeth-eiland en de verdere groei van zonne-energie zullen het aanbod van
            hernieuwbare stroom de komende jaren sterk verhogen. Dit betekent meer prijsschommelingen op de energiemarkt,
            wat dynamische contracten nog aantrekkelijker maakt voor flexibele verbruikers.
          </p>
        </div>
      </div>
    </section>
  );
}
