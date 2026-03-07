import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-300">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="text-accent-400 font-extrabold text-lg mb-2">
              Goedkoopstroom.be
            </div>
            <p className="text-sm text-primary-400">
              Dynamische stroomprijzen per uur. Bespaar op je energierekening door slim te verbruiken.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Navigatie
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/over" className="hover:text-white transition-colors">Over</Link>
              <Link href="/over-mij" className="hover:text-white transition-colors">Over de maker</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Juridisch
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-6 text-xs text-primary-500 text-center">
          <p>&copy; {new Date().getFullYear()} Goedkoopstroom.be &mdash; Prijzen zijn indicatief en exclusief belastingen, netkosten en leverancier-marge.</p>
        </div>
      </div>
    </footer>
  );
}
