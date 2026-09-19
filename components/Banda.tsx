"use client";

import { useEffect, useMemo, useRef } from "react";
import { byteAleatorio, campoInicial, sembrar } from "@/lib/mapa";
import css from "./Banda.module.css";

/**
 * Banda de resolución: ocupa todo el ancho y es baja.
 *
 * No es ruido parejo. El campo se resuelve de izquierda a derecha: en el
 * borde izquierdo cada celda muta todo el tiempo, y hacia la derecha la
 * mutación se va apagando hasta quedar quieta y alineada en bloques. Es
 * la tesis del producto en una sola franja — lo que entra desordenado
 * sale estructurado — y late sola desde que carga.
 *
 * Las celdas se mutan por DOM directo: son cientos y re-renderizarlas
 * por estado sería absurdo. El contenido inicial es determinista, así
 * que no hay desajuste al hidratar.
 */
export default function Banda({
  filas = 9,
  columnas = 96,
  cadencia = 90,
  porTick = 14,
}: {
  filas?: number;
  columnas?: number;
  cadencia?: number;
  porTick?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const total = filas * columnas;
  const inicial = useMemo(() => campoInicial(total, 424242), [total]);

  useEffect(() => {
    const cont = ref.current;
    if (!cont) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const celdas = Array.from(cont.children) as HTMLElement[];
    if (!celdas.length) return;

    const r = sembrar((Date.now() & 0xffff) | 3);
    let raf = 0;
    let ultimo = 0;
    let enPantalla = true;
    const cola: HTMLElement[][] = [[], [], []];

    const obs =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([e]) => {
              enPantalla = e.isIntersecting;
            },
            { rootMargin: "140px" },
          )
        : null;
    obs?.observe(cont);

    const paso = (t: number) => {
      raf = requestAnimationFrame(paso);
      if (!enPantalla || t - ultimo < cadencia) return;
      ultimo = t;

      (cola.shift() ?? []).forEach((el) => el.removeAttribute("data-vivo"));

      const encendidas: HTMLElement[] = [];
      for (let i = 0; i < porTick; i++) {
        // Sesgo cuadrático hacia la izquierda: cuanto más a la derecha,
        // menos probable que una celda cambie.
        const u = r();
        const col = Math.floor(u * u * columnas);
        const fila = Math.floor(r() * filas);
        const el = celdas[fila * columnas + col];
        if (!el) continue;
        el.textContent = byteAleatorio(r);
        el.setAttribute("data-vivo", "");
        encendidas.push(el);
      }
      cola.push(encendidas);
    };

    raf = requestAnimationFrame(paso);
    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [cadencia, porTick, columnas, filas]);

  return (
    <div className={css.banda} aria-hidden="true">
      <div
        ref={ref}
        className={css.campo}
        style={{ ["--columnas" as string]: columnas }}
      >
        {inicial.map((b, i) => {
          const col = i % columnas;
          // La estructura crece hacia la derecha; el ruido se apaga.
          const p = col / (columnas - 1);
          return (
            <span
              key={i}
              className={css.celda}
              data-zona={p > 0.72 ? "orden" : p > 0.4 ? "media" : "ruido"}
            >
              {b}
            </span>
          );
        })}
      </div>
    </div>
  );
}
