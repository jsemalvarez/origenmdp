"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");

    setTimeout(() => {
      setStatus("idle");
      formRef.current?.reset();
    }, 4000);
  };

  return (
    <section id="contacto" className="bg-ocean-deeper py-20 px-[6%]">
      <div className="max-w-[980px] mx-auto">
        <p className="flex items-center gap-[10px] text-[11px] tracking-[0.16em] uppercase text-sea/70 font-medium mb-4">
          <span className="w-5 h-[1px] bg-sea" />
          Contacto
        </p>

        <h2 className="font-serif text-[clamp(28px,4vw,46px)] font-bold leading-[1.1] text-white tracking-tight mb-12">
          ¿Tenés un proyecto <em>en mente?</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-base text-white/45 font-light leading-relaxed mb-9">
              Contame qué necesitás. Sea un sitio web, una tienda, un sistema, o simplemente una consulta — te respondo en menos de 24 horas.
            </p>

            <div className="space-y-4 mb-9">
              <div className="flex items-center gap-3 text-sm text-white/55">
                <div className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center text-base">📍</div>
                Mar del Plata, Buenos Aires, Argentina
              </div>
              <div className="flex items-center gap-3 text-sm text-white/55">
                <div className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center text-base">✉️</div>
                info.origenmdp@gmail.com
              </div>
              <div className="flex items-center gap-3 text-sm text-white/55">
                <div className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center text-base">📱</div>
                +54 9 223 · · · · · ·
              </div>
            </div>

            <Link
              href="https://wa.me/549223XXXXXXX"
              target="_blank"
              className="inline-flex items-center gap-2 bg-sea hover:bg-sea-dark text-white px-7 py-3.5 rounded-sm text-[15px] font-medium transition-colors"
            >
              💬 Escribime por WhatsApp
            </Link>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="bg-white/5 border border-white/10 rounded-sm p-3 text-sm text-white outline-none focus:border-sea transition-colors w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  placeholder="tu@mail.com"
                  className="bg-white/5 border border-white/10 rounded-sm p-3 text-sm text-white outline-none focus:border-sea transition-colors w-full"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">¿En qué puedo ayudarte?</label>
              <div className="relative">
                <select className="bg-white/5 border border-white/10 rounded-sm p-3 text-sm text-white outline-none focus:border-sea transition-colors w-full appearance-none">
                  <option value="" className="bg-ocean-dark">Seleccioná un tema</option>
                  <option className="bg-ocean-dark">Lingua Campus — quiero una demo</option>
                  <option className="bg-ocean-dark">Sitio web o landing page</option>
                  <option className="bg-ocean-dark">Tienda online</option>
                  <option className="bg-ocean-dark">Bot de WhatsApp</option>
                  <option className="bg-ocean-dark">Sistema a medida</option>
                  <option className="bg-ocean-dark">Capacitación</option>
                  <option className="bg-ocean-dark">Otra consulta</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/30">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-white/30 uppercase tracking-wider">Mensaje</label>
              <textarea
                placeholder="Contame un poco sobre tu proyecto..."
                rows={4}
                className="bg-white/5 border border-white/10 rounded-sm p-3 text-sm text-white outline-none focus:border-sea transition-colors w-full resize-y min-h-[110px]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "success"}
              className={`px-7 py-3.5 rounded-sm text-[15px] font-medium transition-all mt-2 ${status === "success"
                  ? "bg-sea text-white"
                  : "bg-sand hover:bg-sand-dark text-ink hover:text-white"
                }`}
            >
              {status === "success" ? "✓ Mensaje enviado — te contacto pronto" : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
