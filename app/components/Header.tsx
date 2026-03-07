"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary-700/20 bg-primary-800/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white hover:text-accent-300 transition-colors"
        >
          <span className="text-accent-400 text-xl font-extrabold">GS</span>
          <span className="hidden sm:inline">Goedkoopstroom.be</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm text-primary-200">
          <Link href="/over" className="hover:text-white transition-colors">
            Over
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-primary-200 hover:text-white p-1"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M6 18L18 6" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="sm:hidden border-t border-primary-700/30 bg-primary-800/98 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-3 text-sm text-primary-200 gap-3">
            <Link href="/over" className="hover:text-white" onClick={() => setMenuOpen(false)}>Over</Link>
            <Link href="/privacy" className="hover:text-white" onClick={() => setMenuOpen(false)}>Privacy</Link>
            <Link href="/contact" className="hover:text-white" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
