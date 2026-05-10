import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="bg-white py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          Quién está detrás
        </p>

        <div className="grid md:grid-cols-[auto_1fr] gap-14 items-center">
          <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-[3px] border-ocean-light flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/founder.png"
              alt="Fundador de Origen MdP"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold text-ink tracking-tight mb-1">Jose Maria Alvarez</h2>
            <div className="text-[12px] font-medium text-sea tracking-widest uppercase mb-6">Fundador · Origen MdP</div>

            <p className="text-[15px] text-ink-mid font-light leading-relaxed">
              Desarrollador marplatense con más de dos años construyendo productos digitales para familias, comercios y educación en Mar del Plata. Detrás de Paseos con Peques, Chuli Tienda y Lingua Campus.<br /><br />
              Creo en la tecnología accesible: herramientas simples que resuelven problemas reales, sin costos desproporcionados ni complejidad innecesaria. Hablo con vos directamente — sin intermediarios ni equipos de ventas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
