"use client";

import { useEffect, useMemo, useRef } from "react";
import { byteAleatorio, campoInicial, sembrar } from "@/lib/mapa";
import css from "./Bytes.module.css";

/**
 * Campo de bytes sin asignar. Late solo desde que carga la página, sin
 * que el visitante toque nada: es el movimiento en reposo de la hoja.
 *
 * Las celdas se mutan por DOM directo, no por estado de React — son más
 * de cien y re-renderizarlas ocho veces por segundo sería absurdo. El
 * contenido inicial es determinista, así que no hay desajuste al hidratar.
 */
export default function Bytes({
  columnas = 16,
  filas = 7,
  semilla = 20260916,
  cadencia = 100,
  porTick = 6,
  activo = true,
  ajusta = false,
}: {
  columnas?: number;
  filas?: number;
  semilla?: number;
  cadencia?: number;
  porTick?: number;
  activo?: boolean;
  /** El campo se recorta al ancho disponible en vez de encimar bytes. */
  ajusta?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const total = columnas * filas;
  const inicial = useMemo(() => campoInicial(total, semilla), [total, semilla]);

  useEffect(() => {
    if (!activo) return;
    const cont = ref.current;
    if (!cont) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const celdas = Array.from(cont.children) as HTMLElement[];
    if (!celdas.length) return;

    /* La semilla de la mutación mezcla el reloj con la de la instancia.
       Sólo con el reloj, todos los campos de la página montan en el mismo
       milisegundo, arrancan con la misma secuencia y terminan mutando las
       mismas celdas con los mismos valores: al rato son el mismo campo
       repetido. Se ve apenas hay dos juntos —la matriz de la 04 tiene
       nueve—, y es exactamente lo contrario de lo que un campo sin
       asignar tiene que parecer. */
    const r = sembrar(
      (((Date.now() & 0xffff) | 1) ^ Math.imul(semilla >>> 0, 2654435761)) >>> 0,
    );
    let raf = 0;
    let ultimo = 0;
    let enPantalla = true;
    // Las celdas recién mutadas se apagan tres ticks después.
    const cola: HTMLElement[][] = [[], [], []];

    const obs =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([e]) => {
              enPantalla = e.isIntersecting;
            },
            { rootMargin: "120px" },
          )
        : null;
    obs?.observe(cont);

    const paso = (t: number) => {
      raf = requestAnimationFrame(paso);
      if (!enPantalla || t - ultimo < cadencia) return;
      ultimo = t;

      const apagar = cola.shift() ?? [];
      apagar.forEach((el) => el.removeAttribute("data-vivo"));

      const encendidas: HTMLElement[] = [];
      for (let i = 0; i < porTick; i++) {
        const el = celdas[Math.floor(r() * celdas.length)];
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
  }, [cadencia, porTick, activo, semilla]);

  return (
    <div
      ref={ref}
      className={css.campo}
      data-ajusta={ajusta ? "" : undefined}
      style={{ ["--columnas" as string]: columnas }}
      aria-hidden="true"
    >
      {inicial.map((b, i) => (
        <span key={i} className={css.celda}>
          {b}
        </span>
      ))}
    </div>
  );
}

/**
 * Flujo: carriles con nodos que corren solos. Los nodos marcados son los
 * que pasan por revisión humana, que es lo que la región promete.
 */
export function Flujo({
  carriles,
  activa,
}: {
  carriles: { pos: number; revisa: boolean }[][];
  activa?: boolean;
}) {
  return (
    <div className={css.flujo} aria-hidden="true">
      {carriles.map((carril, i) => (
        <div key={i} className={css.carril}>
          <span className={css.via} data-activa={activa ? "" : undefined} />
          {carril.map((n, j) => (
            <span
              key={j}
              className={css.nodo}
              data-revisa={n.revisa ? "" : undefined}
              data-activa={activa ? "" : undefined}
              style={{ left: `${n.pos}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Celdas: unidades de una grilla, las encendidas ya están a cargo. */
export function Celdas({
  celdas,
  columnas = 14,
  activa,
}: {
  celdas: boolean[];
  columnas?: number;
  activa?: boolean;
}) {
  return (
    <div
      className={css.celdas}
      style={{ ["--columnas" as string]: columnas }}
      aria-hidden="true"
    >
      {celdas.map((on, i) => (
        <span
          key={i}
          className={css.unidad}
          data-on={on ? "" : undefined}
          data-activa={activa ? "" : undefined}
        />
      ))}
    </div>
  );
}

/**
 * Bloques asignados: el mismo espacio, pero reservado. Ancho estable,
 * sin ruido. Es el contraste que hace legible la asignación.
 */
export function Bloques({
  filas,
  activa,
  reservada,
}: {
  filas: { ancho: number; hueco: number }[][];
  activa?: boolean;
  /**
   * El mismo bloque, hueco y punteado: la región está reservada pero no
   * llena. Es la notación de lo reservado en toda la página —el enlace
   * que no está, el hito que todavía no pasó—, con la misma geometría
   * que el bloque asignado para que se puedan comparar de un vistazo.
   */
  reservada?: boolean;
}) {
  return (
    <div className={css.bloques} aria-hidden="true">
      {filas.map((fila, i) => (
        <div key={i} className={css.filaBloque}>
          {fila.map((b, j) => (
            <span
              key={j}
              className={css.bloque}
              data-activa={activa ? "" : undefined}
              data-reservada={reservada ? "" : undefined}
              style={{
                width: `${b.ancho}%`,
                marginRight: `${b.hueco}%`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
