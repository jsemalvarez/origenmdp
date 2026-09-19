"use client";

import { useState } from "react";
import { SERVICIOS, linkWhatsApp, type ServicioId } from "@/lib/content";
import Selector from "./Selector";
import css from "./Formulario.module.css";

type Estado =
  | { t: "quieto" }
  | { t: "enviando" }
  | { t: "enviado" }
  | { t: "error"; mensaje: string };

type Errores = Partial<Record<"nombre" | "contacto" | "mensaje", string>>;

export default function Formulario({
  servicio,
  onServicio,
}: {
  servicio: ServicioId;
  onServicio: (id: ServicioId) => void;
}) {
  const [estado, setEstado] = useState<Estado>({ t: "quieto" });
  const [errores, setErrores] = useState<Errores>({});

  const elegido = SERVICIOS.find((s) => s.id === servicio)!;
  const wa = linkWhatsApp(elegido.nombre);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const contacto = String(datos.get("contacto") ?? "").trim();
    const empresa = String(datos.get("empresa") ?? "").trim();
    const mensaje = String(datos.get("mensaje") ?? "").trim();

    const errs: Errores = {};
    if (!nombre) errs.nombre = "Falta tu nombre.";
    if (!contacto) {
      errs.contacto = "Falta un mail o un teléfono para responderte.";
    } else if (!/@/.test(contacto) && !/\d{6,}/.test(contacto)) {
      errs.contacto = "Poné un mail válido o un teléfono con característica.";
    }
    if (mensaje.length < 12) {
      errs.mensaje = "Contame en una o dos líneas qué necesitás resolver.";
    }
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    setEstado({ t: "enviando" });
    try {
      const r = await fetch("/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          contacto,
          empresa,
          mensaje,
          servicio: elegido.nombre,
        }),
      });
      if (!r.ok) {
        const cuerpo = await r.json().catch(() => ({}));
        setEstado({
          t: "error",
          mensaje:
            cuerpo?.mensaje ??
            "No pudimos enviar el pedido. Probá de nuevo en un momento.",
        });
        return;
      }
      setEstado({ t: "enviado" });
    } catch {
      setEstado({
        t: "error",
        mensaje:
          "No hay conexión con el servidor. Revisá tu internet o escribinos por WhatsApp.",
      });
    }
  }

  if (estado.t === "enviado") {
    return (
      <div className={css.recibido} role="status">
        <p className={css.recibidoMarca}>
          <span className={css.recibidoPunto} aria-hidden="true" />
          Región reservada
        </p>
        <p className={css.recibidoTexto}>
          Tu pedido de <strong>{elegido.nombre.toLowerCase()}</strong> quedó
          registrado. Te respondemos al contacto que dejaste.
        </p>
      </div>
    );
  }

  return (
    <form className={css.forma} onSubmit={enviar} noValidate>
      <fieldset className={css.campoServicio}>
        <legend className={css.leyendaCampo}>Región a reservar</legend>
        <Selector valor={servicio} onCambio={onServicio} />
      </fieldset>

      <div className={css.grilla}>
        <Campo
          id="nombre"
          etiqueta="Nombre"
          error={errores.nombre}
          autoComplete="name"
        />
        <Campo
          id="empresa"
          etiqueta="Empresa"
          opcional
          autoComplete="organization"
        />
        <Campo
          id="contacto"
          etiqueta="Mail o teléfono"
          error={errores.contacto}
          autoComplete="email"
          ancho
        />
      </div>

      <div className={css.campo} data-error={errores.mensaje ? "" : undefined}>
        <label className={css.etiqueta} htmlFor="mensaje">
          Qué necesitás resolver
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          className={css.area}
          placeholder="Ej.: tomamos turnos por WhatsApp y los pasamos a mano a una planilla."
          aria-describedby={errores.mensaje ? "mensaje-error" : undefined}
          aria-invalid={errores.mensaje ? true : undefined}
        />
        {errores.mensaje && (
          <p className={css.error} id="mensaje-error">
            {errores.mensaje}
          </p>
        )}
      </div>

      <div className={css.firma}>
        <p className={css.firmaTexto}>
          Te contestamos con una propuesta concreta y el alcance escrito, no con
          un folleto.
        </p>
        <button
          type="submit"
          className={css.enviar}
          disabled={estado.t === "enviando"}
        >
          {estado.t === "enviando" ? "Enviando…" : "Pedir cotización"}
        </button>
      </div>

      {estado.t === "error" && (
        <div className={css.fallo} role="alert">
          <p className={css.falloTexto}>{estado.mensaje}</p>
          {wa ? (
            <a className={css.falloEnlace} href={wa}>
              Escribinos por WhatsApp
            </a>
          ) : (
            <p className={css.falloPendiente}>
              WhatsApp pendiente de configurar (WHATSAPP_NUMERO).
            </p>
          )}
        </div>
      )}
    </form>
  );
}

function Campo({
  id,
  etiqueta,
  error,
  opcional,
  ancho,
  autoComplete,
}: {
  id: string;
  etiqueta: string;
  error?: string;
  opcional?: boolean;
  ancho?: boolean;
  autoComplete?: string;
}) {
  return (
    <div
      className={css.campo}
      data-error={error ? "" : undefined}
      data-ancho={ancho ? "" : undefined}
    >
      <label className={css.etiqueta} htmlFor={id}>
        {etiqueta}
        {opcional && <span className={css.opcional}>opcional</span>}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        className={css.entrada}
        autoComplete={autoComplete}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <p className={css.error} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
