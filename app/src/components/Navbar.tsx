"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, Film, User, BookmarkPlus, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-cl-border"
      style={{ background: "rgba(20,24,28,0.95)", backdropFilter: "blur(8px)" }}
    >
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Film size={22} className="text-cl-green" />
          <span className="text-white font-bold text-lg tracking-tight">
            Cine<span className="text-cl-green">Log</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <div className="hidden md:flex items-center gap-5 text-sm text-cl-slate flex-1">
          <Link href="/films"       className="hover:text-white transition-colors">Films</Link>
          <Link href="/films?sort=trending" className="hover:text-white transition-colors">Tendances</Link>
        </div>

        {/* Barre de recherche */}
        <div className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cl-slate/60" />
            <input
              type="search"
              placeholder="Chercher un film…"
              className="cl-input pl-8 text-xs h-8"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
          <Link href="/auth/login"
            className="text-sm text-cl-slate hover:text-white transition-colors">
            Connexion
          </Link>
          <Link href="/auth/register" className="cl-btn text-xs py-1.5 px-3">
            S&apos;inscrire
          </Link>
          <Link href="/profile/cinephile_max" title="Mon profil">
            <User size={18} className="text-cl-slate hover:text-white transition-colors" />
          </Link>
          <BookmarkPlus size={18} className="text-cl-slate hover:text-white transition-colors cursor-pointer" />
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden ml-auto text-cl-slate"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-cl-border bg-cl-bg px-4 py-4 flex flex-col gap-3 text-sm text-cl-slate">
          <Link href="/films"               onClick={() => setMenuOpen(false)}>Films</Link>
          <Link href="/films?sort=trending" onClick={() => setMenuOpen(false)}>Tendances</Link>
          <hr className="border-cl-border" />
          <Link href="/auth/login"    onClick={() => setMenuOpen(false)}>Connexion</Link>
          <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="cl-btn text-center">
            S&apos;inscrire
          </Link>
        </div>
      )}
    </header>
  );
}
