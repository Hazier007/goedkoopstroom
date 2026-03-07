import type { Metadata } from 'next';
import PageWrapper from '../components/PageWrapper';

export const metadata: Metadata = {
  title: 'Over | Goedkoopstroom.be',
};

export default function Page() {
  return (
    <PageWrapper>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Over Goedkoopstroom.be</h1>
      <p className="text-sm text-gray-400 mb-6">Slim verbruiken, minder betalen</p>

      <div className="prose prose-gray max-w-none prose-a:text-primary-600">
        <p>Goedkoopstroom.be is een informatieve website die dynamische stroomprijzen per uur toont. Zo kan je zien wanneer stroom het goedkoopst is en je verbruik daarop afstemmen.</p>
        <p>De site is gebouwd door <a href="https://hazier.be" target="_blank" rel="noopener noreferrer">Hazier</a>, een Belgisch webbureau gespecialiseerd in slimme online tools.</p>

        <h2>Hoe werkt het?</h2>
        <p>We halen elke dag de <strong>day-ahead uurprijzen</strong> op van de Europese energiebeurs (ENTSO-E). Deze prijzen worden visueel weergegeven zodat je in één oogopslag ziet wanneer je het best je wasmachine, droogkast of EV-lader aanzet.</p>

        <h2>Waarom?</h2>
        <p>Met dynamische energiecontracten (bv. bij Tibber, Frank Energie, Eneco) betaal je per uur een andere prijs. Wie slim plant, kan honderden euro&apos;s per jaar besparen.</p>

        <p>Contact: <a href="mailto:info@hazier.be">info@hazier.be</a></p>
      </div>
    </PageWrapper>
  );
}
