const services = [
  {
    num: "01",
    icon: "💻",
    title: "Sitio web o landing page",
    desc: "Presencia digital clara, rápida y sin costos de mantenimiento desproporcionados."
  },
  {
    num: "02",
    icon: "🛒",
    title: "Tienda online",
    desc: "E-commerce a medida. Más simple y económico que las plataformas grandes."
  },
  {
    num: "03",
    icon: "💬",
    title: "Bot de WhatsApp",
    desc: "Automatizá consultas, reservas o información de tu negocio las 24 horas."
  },
  {
    num: "04",
    icon: "⚙️",
    title: "Sistema a medida",
    desc: "Gestión de clientes, turnos, inventario. Pagás solo por lo que realmente usás."
  },
  {
    num: "05",
    icon: "🤖",
    title: "Integración con IA",
    desc: "Sumá inteligencia artificial a tus procesos de forma práctica y accesible."
  },
  {
    num: "06",
    icon: "🎓",
    title: "Capacitaciones",
    desc: "Aprendé a usar las herramientas digitales actuales para tu propio negocio."
  }
];

export default function Services() {
  return (
    <section id="servicios" className="bg-ocean-dark py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea/80 font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          Qué podemos hacer por vos
        </p>
        
        <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-white tracking-tight mb-4">
          Soluciones <em>a tu medida</em>
        </h2>
        
        <p className="text-lg text-white/40 font-light max-w-[540px] leading-relaxed mb-14">
          Si Salesforce es demasiado grande y una planilla de Excel ya no alcanza, estamos exactamente en el medio que necesitás.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/10 rounded-xl overflow-hidden">
          {services.map((service, i) => (
            <div key={i} className="bg-ocean-dark p-7 hover:bg-ocean/25 transition-colors group">
              <div className="font-serif text-4xl font-bold text-white/5 leading-none mb-3.5 group-hover:text-sand/10 transition-colors">
                {service.num}
              </div>
              <div className="text-2xl mb-2.5">{service.icon}</div>
              <h3 className="text-[15px] font-medium text-white mb-2">{service.title}</h3>
              <p className="text-[13px] text-white/40 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
