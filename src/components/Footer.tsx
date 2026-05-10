import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ocean-deeper border-t border-white/5 py-10 px-[6%]">
      <div className="max-w-[980px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div>
          <div className="font-serif text-lg font-bold text-white tracking-tight">
            Origen <span className="text-sea">MdP</span>
          </div>
          <div className="text-[11px] text-white/20 mt-1">Costa Tech · Mar del Plata, Argentina</div>
        </div>
        
        <div className="flex gap-6">
          <Link href="#" className="text-[13px] text-white/30 hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="text-[13px] text-white/30 hover:text-white transition-colors">LinkedIn</Link>
          <Link href="#contacto" className="text-[13px] text-white/30 hover:text-white transition-colors">Contacto</Link>
        </div>
        
        <div className="w-full md:w-auto text-[11px] text-white/10 pt-4 md:pt-0 border-t md:border-none border-white/5 text-center md:text-right">
          © 2025 Origen MdP. Desarrollado con orgullo en Mar del Plata.
        </div>
      </div>
    </footer>
  );
}
