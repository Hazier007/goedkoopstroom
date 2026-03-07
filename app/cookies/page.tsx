import type { Metadata } from 'next';
import PageWrapper from '../components/PageWrapper';

export const metadata: Metadata = {
  title: 'Cookiebeleid | Goedkoopstroom.be',
};

export default function Page() {
  return (
    <PageWrapper>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Cookiebeleid</h1>
      <p className="text-sm text-gray-400 mb-6">Laatst bijgewerkt: 2 februari 2026</p>

      <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-a:text-primary-600">
        <p>Goedkoopstroom.be gebruikt cookies en gelijkaardige technologieën om de website goed te laten werken, statistieken te verzamelen en (optioneel) advertenties te tonen.</p>

        <h2>1. Wat zijn cookies?</h2>
        <p>Cookies zijn kleine tekstbestanden die op je toestel worden opgeslagen.</p>

        <h2>2. Welke soorten cookies gebruiken we?</h2>
        <ul>
          <li><strong>Noodzakelijke cookies:</strong> nodig voor basiswerking en beveiliging.</li>
          <li><strong>Statistiekcookies:</strong> helpen ons begrijpen hoe de site gebruikt wordt (bv. GA4), afhankelijk van je toestemming.</li>
          <li><strong>Marketingcookies:</strong> gebruikt voor advertenties/meting (bv. Google AdSense), afhankelijk van je toestemming.</li>
        </ul>

        <h2>3. Cookie-instellingen</h2>
        <p>Je kan je toestemming op elk moment aanpassen via &quot;Cookie-instellingen&quot; in de footer, of via je browserinstellingen.</p>
      </div>
    </PageWrapper>
  );
}
