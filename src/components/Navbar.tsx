"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] bg-[rgba(4,30,40,0.95)] backdrop-blur-md border-b border-white/10 px-[6%] flex items-center justify-between h-16">
      <Link href="#inicio" className="font-serif text-xl font-bold text-white tracking-tight">
        Origen <span className="text-sea">MdP</span>
      </Link>

      <ul className="hidden md:flex gap-7 list-none">
        <li>
          <Link href="#lingua" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Lingua Campus
          </Link>
        </li>
        <li>
          <Link href="#productos" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Proyectos
          </Link>
        </li>
        <li>
          <Link href="#servicios" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Servicios
          </Link>
        </li>
        <li>
          <Link href="#nosotros" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Nosotros
          </Link>
        </li>
        <li>
          <Link href="#contacto" className="text-[13px] text-white/50 hover:text-white transition-colors">
            Contacto
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex items-center gap-6">
        <Link href="/login" className="text-[13px] text-white/50 hover:text-white transition-colors">
          Login
        </Link>
        <Link
          href="#contacto"
          className="bg-sand hover:bg-sand-dark text-ink hover:text-white text-[13px] font-medium px-5 py-[9px] rounded-sm transition-all"
        >
          Hablemos
        </Link>
      </div>

      <button
        className="md:hidden text-white/70 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-ocean-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden animate-fade-up">
          <Link href="#lingua" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">Lingua Campus</Link>
          <Link href="#productos" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">Proyectos</Link>
          <Link href="#servicios" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">Servicios</Link>
          <Link href="#nosotros" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">Nosotros</Link>
          <Link href="#contacto" onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">Contacto</Link>
          <Link
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="bg-sand text-ink px-4 py-2 rounded-sm text-center font-medium"
          >
            Hablemos
          </Link>
        </div>
      )}
    </nav>
  );
}
