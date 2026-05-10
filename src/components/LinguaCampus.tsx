import Link from "next/link";

export default function LinguaCampus() {
  return (
    <section id="lingua" className="bg-off-white py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          Producto principal
        </p>
        
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-[5px] bg-sea-light text-sea-dark rounded-full text-[11px] font-medium uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 bg-sea rounded-full" />
              EdTech · IA
            </span>
            
            <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-ink tracking-tight mb-4">
              Lingua <em>Campus</em>
            </h2>
            
            <p className="text-base text-ink-mid font-light leading-relaxed mb-7">
              Sistema de gestión para institutos de idiomas con práctica asistida por inteligencia artificial. Más simple y económico que las plataformas grandes, pensado para la realidad de los institutos locales.
            </p>
            
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mb-8">
              {[
                "Gestión de alumnos y cursos",
                "Playground con IA integrada",
                "Seguimiento de progreso",
                "Acceso desde cualquier dispositivo",
                "Reportes para docentes",
                "Precio accesible"
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-2 text-sm text-ink-mid leading-tight">
                  <span className="w-1.5 h-1.5 bg-sea rounded-full mt-1.5 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                href="#contacto"
                className="bg-sea hover:bg-sea-dark text-white px-6 py-[13px] rounded-sm text-sm font-medium transition-colors"
              >
                Solicitar demo
              </Link>
              <Link
                href="https://lingua-campus.vercel.app/"
                target="_blank"
                className="border-2 border-sea text-sea-dark hover:bg-sea-light px-6 py-[12px] rounded-sm text-sm font-medium transition-colors"
              >
                Ver proyecto
              </Link>
            </div>
          </div>
          
          <div className="bg-ocean-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-ocean-mid p-5 flex items-center gap-3 border-b border-white/10">
              <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center text-lg">
                🎓
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-tight">Lingua Campus</h3>
                <p className="text-[12px] text-white/40">Panel del instituto</p>
              </div>
            </div>
            
            <div className="py-1">
              {[
                { icon: "👥", label: "Gestión de alumnos", sub: "Alta, seguimiento y progreso", badge: "Activo", badgeType: "active", pi: "pi-ocean" },
                { icon: "📚", label: "Cursos y niveles", sub: "Organización curricular", badge: "Activo", badgeType: "active", pi: "pi-sea" },
                { icon: "🤖", label: "Playground con IA", sub: "Práctica asistida e interactiva", badge: "Nuevo", badgeType: "new", pi: "pi-sea" },
                { icon: "📊", label: "Reportes y métricas", sub: "Rendimiento en tiempo real", badge: "Activo", badgeType: "active", pi: "pi-sand" },
                { icon: "💬", label: "Comunicación interna", sub: "Docentes, alumnos y dirección", badge: "Activo", badgeType: "active", pi: "pi-ocean" }
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 last:border-none hover:bg-white/[0.03] transition-colors">
                  <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm flex-shrink-0 ${
                    row.pi === "pi-ocean" ? "bg-[#0b6e8c]/40" : row.pi === "pi-sea" ? "bg-[#27ae8a]/30" : "bg-[#f2c94c]/20"
                  }`}>
                    {row.icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white/85">{row.label}</div>
                    <div className="text-[11px] text-white/30">{row.sub}</div>
                  </div>
                  <div className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    row.badgeType === "active" ? "bg-sea/20 text-sea-light" : "bg-sand/20 text-sand"
                  }`}>
                    {row.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
