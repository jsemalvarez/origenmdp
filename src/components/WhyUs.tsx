export default function WhyUs() {
  return (
    <section id="porque" className="bg-off-white py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          Por qué elegirnos
        </p>
        
        <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-ink tracking-tight mb-4">
          No somos lo mismo <em>que ya conocés</em>
        </h2>
        
        <p className="text-lg text-ink-mid font-light max-w-[540px] leading-relaxed mb-12">
          El mercado ofrece alternativas que no resuelven el problema completo. Nosotros sí.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-ocean/10 rounded-xl p-8 hover:border-ocean hover:-translate-y-1 transition-all">
            <div className="text-[10px] tracking-widest uppercase text-ink-light font-medium mb-3">Problema común</div>
            <h3 className="text-[15px] font-bold text-ink mb-3">Plataformas enormes y caras</h3>
            <p className="text-[13px] text-ink-mid font-light leading-relaxed">
              Herramientas diseñadas para grandes empresas que terminan siendo demasiado complejas y costosas para un emprendimiento o negocio chico.
            </p>
          </div>
          
          <div className="bg-white border-l-[3px] border-sea rounded-xl p-8 hover:-translate-y-1 transition-all shadow-sm">
            <div className="text-[10px] tracking-widest uppercase text-sea font-bold mb-3">Nuestra respuesta</div>
            <h3 className="text-[15px] font-bold text-ink mb-3">Simple, a tu medida y local</h3>
            <p className="text-[13px] text-ink-mid font-light leading-relaxed">
              Construimos exactamente lo que necesitás, ni más ni menos. Y lo hacemos desde Mar del Plata, conociendo la realidad del mercado local.
            </p>
          </div>
          
          <div className="bg-white border border-ocean/10 rounded-xl p-8 hover:border-ocean hover:-translate-y-1 transition-all">
            <div className="text-[10px] tracking-widest uppercase text-ink-light font-medium mb-3">Otro problema común</div>
            <h3 className="text-[15px] font-bold text-ink mb-3">Freelancers sin continuidad</h3>
            <p className="text-[13px] text-ink-mid font-light leading-relaxed">
              Te hacen la página y desaparecen. Sin soporte, sin evolución, sin nadie que entienda tu negocio cuando algo falla o querés crecer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
