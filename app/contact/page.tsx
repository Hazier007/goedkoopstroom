import type { Metadata } from 'next';
import PageWrapper from '../components/PageWrapper';

export const metadata: Metadata = {
  title: 'Contact | Goedkoopstroom.be',
};

export default function Page() {
  return (
    <PageWrapper>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Contact</h1>
      <p className="text-sm text-gray-400 mb-6">We horen graag van je!</p>

      <div className="prose prose-gray max-w-none prose-a:text-primary-600">
        <p>Vragen, feedback of een foutje gevonden? Mail ons gerust.</p>
        <a
          href="mailto:info@hazier.be"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors no-underline mt-2"
        >
          ✉️ info@hazier.be
        </a>
      </div>
    </PageWrapper>
  );
}
