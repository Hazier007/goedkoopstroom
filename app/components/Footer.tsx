import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="mt-10 pb-10 text-center text-gray-500">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm mb-3">
          <Link href="/" className="text-orange-700 hover:text-orange-900 underline">
            Home
          </Link>
          <Link href="/over-mij" className="text-orange-700 hover:text-orange-900 underline">
            Over de maker
          </Link>
          <a href="mailto:info@hazier.be" className="text-orange-700 hover:text-orange-900 underline">
            Contact
          </a>
        </div>
        <p>{new Date().getFullYear()} Goedkoopstroom.be — Dynamische stroomprijzen per uur</p>
        <p className="text-sm mt-2">Prijzen zijn indicatief en exclusief belastingen, netkosten en leverancier-marge.</p>
      </div>
    </footer>
  );
}
