import type { Metadata } from 'next';
import PageWrapper from '../components/PageWrapper';

export const metadata: Metadata = {
  title: 'Disclaimer | Goedkoopstroom.be',
};

export default function Page() {
  return (
    <PageWrapper>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-6">Laatst bijgewerkt: 2 februari 2026</p>

      <div className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-a:text-primary-600">
        <p>De informatie en tools op goedkoopstroom.be zijn bedoeld voor algemene informatiedoeleinden. We doen ons best om alles correct en up-to-date te houden, maar we geven geen garanties over volledigheid of juistheid.</p>
        <p>Gebruik van calculators/tools gebeurt op eigen verantwoordelijkheid. Goedkoopstroom.be is niet aansprakelijk voor schade die voortvloeit uit het gebruik van de website of de resultaten.</p>
        <p>Externe links vallen buiten onze controle.</p>
        <p>Vragen: <a href="mailto:info@hazier.be">info@hazier.be</a>.</p>
      </div>
    </PageWrapper>
  );
}
