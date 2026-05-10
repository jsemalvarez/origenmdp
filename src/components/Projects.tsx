import Link from "next/link";

const projects = [
  {
    title: "Paseos con Peques",
    desc: "Guía digital de lugares y actividades para familias con niños en Mar del Plata. Comunidad activa con 12.000 seguidores en Instagram, bot de WhatsApp y sitio web propio.",
    icon: "🗺️",
    iconBg: "var(--ocean-light)",
    iconColor: "var(--ocean)",
    tags: [
      { label: "12k seguidores", bg: "var(--ocean-light)", color: "var(--ocean-mid)" },
      { label: "Bot WhatsApp", bg: "var(--ocean-light)", color: "var(--ocean-mid)" },
      { label: "2 años activo", bg: "var(--ocean-light)", color: "var(--ocean-mid)" }
    ],
    link: "https://www.paseosconpeques.com.ar/"
  },
  {
    title: "Chuli Tienda",
    desc: "E-commerce diseñado y construido en casa para vender productos propios. Prueba concreta de que podemos hacer tiendas online funcionales, atractivas y económicas.",
    icon: "🛍️",
    iconBg: "var(--sand-light)",
    iconColor: "var(--sand-dark)",
    tags: [
      { label: "E-commerce", bg: "var(--sand-light)", color: "var(--sand-dark)" },
      { label: "Diseño propio", bg: "var(--sand-light)", color: "var(--sand-dark)" },
      { label: "100% a medida", bg: "var(--sand-light)", color: "var(--sand-dark)" }
    ],
    link: "https://chuli-tienda.vercel.app/"
  }
];

export default function Projects() {
  return (
    <section id="productos" className="bg-white py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          También construimos esto
        </p>
        
        <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-ink tracking-tight mb-4">
          Proyectos con <em>vida propia</em>
        </h2>
        
        <p className="text-lg text-ink-mid font-light max-w-[540px] leading-relaxed mb-12">
          Cada producto nació de una necesidad real en Mar del Plata. Son nuestra prueba de concepto y nuestro portfolio.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="group border border-ocean/10 rounded-xl p-8 bg-white hover:border-ocean hover:-translate-y-1 transition-all flex flex-col">
              <div 
                className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl mb-5 transition-colors"
                style={{ backgroundColor: project.iconBg, color: project.iconColor }}
              >
                {project.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink mb-3 tracking-tight">{project.title}</h3>
              <p className="text-sm text-ink-mid font-light leading-relaxed mb-6 flex-1">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="text-[11px] px-3 py-1 rounded-full font-medium"
                    style={{ backgroundColor: tag.bg, color: tag.color }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              
              <Link href={project.link} target="_blank" className="text-[13px] font-medium text-ocean inline-flex items-center gap-1 hover:gap-2 transition-all">
                Ver proyecto <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
