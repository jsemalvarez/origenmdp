"use client";

import { useRef } from "react";
import { SERVICIOS, type ServicioId } from "@/lib/content";
import css from "./Selector.module.css";

/**
 * Elegir la región a reservar. Es el mismo vocabulario del mapa: número,
 * dirección y nombre, con el punto que se enciende igual que en el índice.
 */
export default function Selector({
  valor,
  onCambio,
}: {
  valor: ServicioId;
  onCambio: (id: ServicioId) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onTecla(e: React.KeyboardEvent, i: number) {
    const mapa: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    const paso = mapa[e.key];
    if (!paso) return;
    e.preventDefault();
    const siguiente = (i + paso + SERVICIOS.length) % SERVICIOS.length;
    onCambio(SERVICIOS[siguiente].id);
    refs.current[siguiente]?.focus();
  }

  return (
    <div role="radiogroup" aria-label="Región a reservar" className={css.grupo}>
      {SERVICIOS.map((s, i) => {
        const activo = s.id === valor;
        return (
          <button
            key={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={activo}
            tabIndex={activo ? 0 : -1}
            className={css.opcion}
            data-activo={activo ? "" : undefined}
            onClick={() => onCambio(s.id)}
            onKeyDown={(e) => onTecla(e, i)}
          >
            <span className={css.punto} aria-hidden="true" />
            <span className={css.n}>{s.n}</span>
            <span className={css.nombre}>{s.nombre}</span>
          </button>
        );
      })}
    </div>
  );
}
