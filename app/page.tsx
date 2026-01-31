'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

interface PriceData {
  hour: number;
  price: number;
  time: string;
  isPast: boolean;
}

interface PriceResponse {
  prices: PriceData[];
  currency: string;
  area: string;
  cheapestHour: number;
  expensiveHour: number;
  averagePrice: number;
  currentHour: number;
  currentPrice: number;
}

export default function Home() {
  const [data, setData] = useState<PriceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('BE');

  const countries = [
    { code: 'BE', name: 'België', area: '10YBE----------2' },
    { code: 'NL', name: 'Nederland', area: '10YNL----------L' },
    { code: 'DE', name: 'Duitsland', area: '10Y1001A1001A82H' },
    { code: 'FR', name: 'Frankrijk', area: '10YFR-RTE------C' },
  ];

  useEffect(() => {
    fetchPrices();
  }, [selectedCountry]);

  const fetchPrices = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/prices?country=${selectedCountry}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kon prijzen niet ophalen');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  };

  const getPriceColor = (price: number, avg: number) => {
    const ratio = price / avg;
    if (ratio <= 0.7) return 'bg-green-500';
    if (ratio <= 0.9) return 'bg-green-400';
    if (ratio <= 1.1) return 'bg-yellow-400';
    if (ratio <= 1.3) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const getPriceLabel = (price: number, avg: number) => {
    const ratio = price / avg;
    if (ratio <= 0.7) return 'Zeer goedkoop';
    if (ratio <= 0.9) return 'Goedkoop';
    if (ratio <= 1.1) return 'Gemiddeld';
    if (ratio <= 1.3) return 'Duur';
    return 'Zeer duur';
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const getTimeUntilCheapest = (cheapestHour: number, currentHour: number) => {
    if (cheapestHour === currentHour) return 'Nu!';
    let hoursUntil = cheapestHour - currentHour;
    if (hoursUntil < 0) hoursUntil += 24;
    if (hoursUntil === 1) return 'Over 1 uur';
    return `Over ${hoursUntil} uur`;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ⚡ Goedkoopste Stroom
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Bekijk de dynamische stroomprijzen per uur
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Country Selector */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <label className="block text-gray-700 font-medium mb-2">🌍 Kies je land</label>
          <div className="flex flex-wrap gap-3">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`px-4 py-2 rounded-xl border-2 transition-all ${
                  selectedCountry === country.code
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Prijzen ophalen...</p>
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              ⚠️ {error}
            </div>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Current Price Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Huidige prijs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl text-white ${getPriceColor(data.currentPrice, data.averagePrice)}`}>
                  <div className="text-sm opacity-90">Nu ({data.currentHour}:00 - {data.currentHour + 1}:00)</div>
                  <div className="text-4xl font-bold">{formatPrice(data.currentPrice)}</div>
                  <div className="text-sm">cent/kWh</div>
                  <div className="mt-2 text-sm font-medium">
                    {getPriceLabel(data.currentPrice, data.averagePrice)}
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-green-100 text-green-800">
                  <div className="text-sm">Goedkoopste uur vandaag</div>
                  <div className="text-3xl font-bold">{data.cheapestHour}:00</div>
                  <div className="text-lg">{formatPrice(data.prices.find(p => p.hour === data.cheapestHour)?.price || 0)} cent/kWh</div>
                  <div className="mt-2 text-sm font-medium">
                    {getTimeUntilCheapest(data.cheapestHour, data.currentHour)}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-100 text-gray-800">
                  <div className="text-sm">Gemiddelde prijs</div>
                  <div className="text-3xl font-bold">{formatPrice(data.averagePrice)}</div>
                  <div className="text-lg">cent/kWh</div>
                  <div className="mt-2 text-sm">
                    Duurste: {data.expensiveHour}:00 ({formatPrice(data.prices.find(p => p.hour === data.expensiveHour)?.price || 0)} ct)
                  </div>
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Prijzen per uur</h2>
              <div className="overflow-x-auto">
                <div className="flex gap-1 min-w-max pb-4">
                  {data.prices.map((item) => {
                    const maxPrice = Math.max(...data.prices.map(p => p.price));
                    const height = Math.max(20, (item.price / maxPrice) * 150);
                    
                    return (
                      <div key={item.hour} className="flex flex-col items-center">
                        <div className="text-xs text-gray-500 mb-1">{formatPrice(item.price)}</div>
                        <div 
                          className={`w-8 rounded-t transition-all ${
                            item.isPast ? 'opacity-40' : ''
                          } ${
                            item.hour === data.currentHour 
                              ? 'ring-2 ring-orange-500 ring-offset-2' 
                              : ''
                          } ${getPriceColor(item.price, data.averagePrice)}`}
                          style={{ height: `${height}px` }}
                          title={`${item.hour}:00 - ${formatPrice(item.price)} cent/kWh`}
                        />
                        <div className={`text-xs mt-1 ${
                          item.hour === data.currentHour ? 'font-bold text-orange-600' : 'text-gray-600'
                        }`}>
                          {item.hour}
                        </div>
                        {item.hour === data.cheapestHour && (
                          <div className="text-green-500 text-xs">⭐</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-600">Zeer goedkoop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-400"></div>
                  <span className="text-sm text-gray-600">Goedkoop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-400"></div>
                  <span className="text-sm text-gray-600">Gemiddeld</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-400"></div>
                  <span className="text-sm text-gray-600">Duur</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm text-gray-600">Zeer duur</span>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Alle uren</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {data.prices.map((item) => (
                  <div 
                    key={item.hour}
                    className={`p-3 rounded-lg text-center ${
                      item.isPast ? 'opacity-50' : ''
                    } ${
                      item.hour === data.currentHour 
                        ? 'ring-2 ring-orange-500' 
                        : ''
                    } ${
                      item.hour === data.cheapestHour 
                        ? 'bg-green-100 text-green-800' 
                        : item.hour === data.expensiveHour
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium">{item.hour}:00</div>
                    <div className="text-lg font-bold">{formatPrice(item.price)}</div>
                    <div className="text-xs text-gray-500">cent/kWh</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Slim verbruiken</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔋</span>
                  <div>
                    <h3 className="font-semibold">Laad je EV slim</h3>
                    <p className="text-gray-600">Plan het laden van je elektrische auto tijdens de goedkoopste uren.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧺</span>
                  <div>
                    <h3 className="font-semibold">Wasmachine & droogkast</h3>
                    <p className="text-gray-600">Gebruik de timer om je was te draaien wanneer stroom het goedkoopst is.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍳</span>
                  <div>
                    <h3 className="font-semibold">Koken & bakken</h3>
                    <p className="text-gray-600">Grote ovens en inductiekookplaten verbruiken veel - plan slim!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❄️</span>
                  <div>
                    <h3 className="font-semibold">Airco & warmtepomp</h3>
                    <p className="text-gray-600">Verwarm of koel je huis op tijdens goedkope uren.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Over dynamische stroomprijzen</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Met een dynamisch energiecontract betaal je de werkelijke marktprijs voor stroom. 
              Deze prijs verandert elk uur en wordt bepaald door vraag en aanbod op de energiemarkt.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Wanneer is stroom goedkoop?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>&#39;s Nachts (00:00 - 06:00)</strong> - Weinig vraag, vaak de laagste prijzen</li>
              <li><strong>Middagpiek (12:00 - 15:00)</strong> - Zonne-energie drukt de prijs (zomer)</li>
              <li><strong>Weekend</strong> - Minder industriële vraag</li>
              <li><strong>Winderige dagen</strong> - Veel windenergie beschikbaar</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 mt-4">Wanneer is stroom duur?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Ochtendpiek (07:00 - 09:00)</strong> - Iedereen wordt wakker</li>
              <li><strong>Avondpiek (17:00 - 21:00)</strong> - Koken, TV, verwarming</li>
              <li><strong>Koude winterdagen</strong> - Hoge verwarmingsvraag</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Veelgestelde vragen</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Waar komen deze prijzen vandaan?</h3>
              <p className="text-gray-600">De prijzen komen van de Europese energiebeurs (EPEX/ENTSO-E). Dit zijn de groothandelsprijzen exclusief belastingen en netkosten.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Betaal ik exact deze prijs?</h3>
              <p className="text-gray-600">Nee, je energieleverancier rekent hierop een marge, plus belastingen en netkosten. Maar de trend volgt deze prijzen wel.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Hoe schakel ik over naar dynamische prijzen?</h3>
              <p className="text-gray-600">Je hebt een digitale meter nodig en een contract met dynamische tarieven. Vraag bij je leverancier naar de mogelijkheden.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Kan de prijs negatief worden?</h3>
              <p className="text-gray-600">Ja! Bij veel zon/wind en weinig vraag kan de prijs negatief worden. Je krijgt dan geld toe om stroom te verbruiken.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Over de maker</h2>
          <p className="text-gray-600">
            Ik ben Bart, een Belgische webontwikkelaar en ondernemer. Als eigenaar van{' '}
            <a href="https://hazier.be" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline">
              Hazier
            </a>{' '}
            en co-founder van{' '}
            <a href="https://collectpro.be" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline">
              CollectPro
            </a>{' '}
            bouw ik graag handige online tools die het dagelijks leven makkelijker maken — gratis en zonder poespas.
          </p>
          <p className="text-gray-600 mt-3">
            Vragen of suggesties? Mail gerust naar{' '}
            <a href="mailto:info@hazier.be" className="text-yellow-600 hover:text-yellow-800 underline">
              info@hazier.be
            </a>
          </p>
        </div>

        <Footer />
      </div>
    </main>
    </>
  );
}
