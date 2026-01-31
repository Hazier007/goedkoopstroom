'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur border-b border-orange-100 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900 text-lg">
          ⚡ Goedkoopstroom.be
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-700 hover:text-orange-700">Home</Link>
          <Link href="/over-mij" className="text-gray-700 hover:text-orange-700">Over de maker</Link>
          <a href="mailto:info@hazier.be" className="text-gray-700 hover:text-orange-700">Contact</a>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
            <Link onClick={() => setOpen(false)} href="/" className="text-gray-700 hover:text-orange-700">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} href="/over-mij" className="text-gray-700 hover:text-orange-700">
              Over de maker
            </Link>
            <a href="mailto:info@hazier.be" className="text-gray-700 hover:text-orange-700">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
