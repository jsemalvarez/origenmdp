import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center bg-ocean-dark overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Origen MdP Digital Background"
          fill
          className="object-cover object-right md:object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-dark via-ocean-dark/80 to-transparent" />
      </div>

      <div className="container mx-auto px-[6%] relative z-10 pt-20 pb-12">
        <div className="max-w-[980px]">
          <div className="flex items-center gap-[10px] text-[11px] tracking-[0.18em] uppercase text-sea font-medium mb-6 animate-fade-up">
            <span className="w-7 h-[1px] bg-sea" />
            Mar del Plata · Costa Tech
          </div>
          
          <h1 className="font-serif text-[clamp(40px,6vw,75px)] font-bold leading-[1.05] text-white tracking-[-2px] mb-6 max-w-[850px] animate-fade-up [animation-delay:0.1s]">
            Tecnología <em className="italic font-light lowercase">hecha</em> acá,<br />
            para negocios <em className="italic text-sand font-light">de acá.</em>
          </h1>
          
          <p className="text-lg text-white/60 max-w-[520px] leading-relaxed mb-10 font-light animate-fade-up [animation-delay:0.2s]">
            Desarrollamos productos digitales a medida para pequeñas empresas y emprendedores de Mar del Plata. Sin plataformas enormes. Sin costos innecesarios.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-20 animate-fade-up [animation-delay:0.3s]">
            <Link
              href="#lingua"
              className="bg-sand hover:bg-sand-dark text-ink hover:text-white px-8 py-[15px] rounded-sm text-[15px] font-medium transition-all transform hover:-translate-y-px"
            >
              Conocé Lingua Campus
            </Link>
            <Link
              href="#servicios"
              className="bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 hover:border-white/40 hover:text-white px-8 py-[15px] rounded-sm text-[15px] transition-all transform hover:-translate-y-px"
            >
              ¿Qué podemos hacer por vos?
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row gap-0 md:gap-12 animate-fade-up [animation-delay:0.4s] border-t border-white/5 pt-10">
            <div className="mb-6 md:mb-0">
              <div className="font-serif text-4xl font-bold text-white leading-none mb-2">3</div>
              <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">productos activos</div>
            </div>
            <div className="mb-6 md:mb-0">
              <div className="font-serif text-4xl font-bold text-white leading-none mb-2">12k</div>
              <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">seguidores en mdp</div>
            </div>
            <div>
              <div className="font-serif text-4xl font-bold text-white leading-none mb-2">2 años</div>
              <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">construyendo en la costa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
