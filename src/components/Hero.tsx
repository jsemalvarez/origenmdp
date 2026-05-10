import Link from "next/link";

export default function Hero() {
  return (
    <section id="inicio" className="bg-[#041e28] px-[6%] pt-24 pb-20 relative overflow-hidden">
      <div className="hero-grid" />
      <div className="absolute -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(11,110,140,0.22)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute -bottom-[150px] -left-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(39,174,138,0.1)_0%,transparent_65%)] pointer-events-none" />
      
      <div className="max-w-[980px] mx-auto relative z-10">
        <div className="flex items-center gap-[10px] text-[11px] tracking-[0.18em] uppercase text-sea font-medium mb-6 animate-fade-up [animation-delay:0.05s]">
          <span className="w-7 h-[1px] bg-sea" />
          Mar del Plata · Costa Tech
        </div>
        
        <h1 className="font-serif text-[clamp(40px,6vw,70px)] font-bold leading-[1.05] text-white tracking-[-2px] mb-6 max-w-[820px] animate-fade-up [animation-delay:0.15s]">
          Tecnología hecha acá,<br />
          para negocios <em className="italic text-sand font-light">de acá.</em>
        </h1>
        
        <p className="text-lg text-white/50 max-w-[520px] leading-relaxed mb-10 font-light animate-fade-up [animation-delay:0.25s]">
          Desarrollamos productos digitales a medida para pequeñas empresas y emprendedores de Mar del Plata. Sin plataformas enormes. Sin costos innecesarios.
        </p>
        
        <div className="flex flex-wrap gap-3 mb-16 animate-fade-up [animation-delay:0.35s]">
          <Link
            href="#lingua"
            className="bg-sand hover:bg-sand-dark text-ink hover:text-white px-7 py-[14px] rounded-sm text-[15px] font-medium transition-all transform hover:-translate-y-px"
          >
            Conocé Lingua Campus
          </Link>
          <Link
            href="#servicios"
            className="border border-white/20 text-white/70 hover:border-white/45 hover:text-white px-7 py-[13px] rounded-sm text-[15px] transition-all transform hover:-translate-y-px"
          >
            ¿Qué podemos hacer por vos?
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-0 animate-fade-up [animation-delay:0.45s]">
          <div className="py-5 pr-8 md:border-r border-white/10">
            <div className="font-serif text-3xl font-bold text-white leading-none mb-1">3</div>
            <div className="text-[11px] text-white/30 tracking-wider uppercase">productos activos</div>
          </div>
          <div className="py-5 px-0 md:px-8 md:border-r border-white/10">
            <div className="font-serif text-3xl font-bold text-white leading-none mb-1">12k</div>
            <div className="text-[11px] text-white/30 tracking-wider uppercase">seguidores en MdP</div>
          </div>
          <div className="py-5 px-0 md:pl-8">
            <div className="font-serif text-3xl font-bold text-white leading-none mb-1">2 años</div>
            <div className="text-[11px] text-white/30 tracking-wider uppercase">construyendo en la costa</div>
          </div>
        </div>
      </div>
    </section>
  );
}
