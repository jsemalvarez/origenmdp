"use client";

import { useMemo } from "react";
import {
  REGIONES,
  bloquesAsignados,
  celdasAsignadas,
  direccionFila,
  flujoAsignado,
} from "@/lib/mapa";
import Bytes, { Bloques, Celdas, Flujo } from "./Bytes";
import css from "./Mapa.module.css";

/**
 * La pila de regiones en isométrica.
 *
 * La rotación vive en el contenedor y cada capa sólo se corre en Z: así
 * el ángulo es uno solo para todo el conjunto y las capas conservan su
 * paralelismo. Las llamadas NO van dentro del espacio 3D —quedarían
 * deformadas e ilegibles—; van en una capa 2D encima, unidas a su capa
 * por una línea de llamada.
 */
export default function Mapa({
  activa,
  onActivar,
}: {
  activa: number;
  onActivar?: (i: number) => void;
}) {
  const bloques = useMemo(
    () => REGIONES.map((_, i) => bloquesAsignados(5, 7000 + i * 131)),
    [],
  );
  const flujos = useMemo(
    () => REGIONES.map((_, i) => flujoAsignado(4, 3100 + i * 71)),
    [],
  );
  const celdas = useMemo(
    () => REGIONES.map((_, i) => celdasAsignadas(42, 5500 + i * 53)),
    [],
  );

  return (
    <div className={css.escena}>
      {/* --ultima viaja al CSS: abajo el mazo se apila al revés del
          índice, y para eso la capa necesita saber cuántas hay. */}
      <div
        className={css.pila}
        style={{ ["--ultima" as string]: REGIONES.length - 1 }}
      >
        {REGIONES.map((r, i) => {
          const asignada = i <= activa;
          const esActiva = i === activa;
          return (
            <div
              key={r.n}
              className={css.capa}
              data-activa={esActiva ? "" : undefined}
              data-asignada={asignada ? "" : undefined}
              data-libre={r.libre ? "" : undefined}
              style={{ ["--indice" as string]: i }}
            >
              <div className={css.plano}>
                <div className={css.cabeceraCapa}>
                  <span className={css.direccionCapa}>{r.direccion}</span>
                  <span className={css.nombreCapa}>{r.nombre}</span>
                </div>
                {/* Ruido y estructura conviven en la misma caja y se
                    cruzan al asignarse: eso es lo que hace que el mapa
                    se resuelva en pantalla en vez de saltar de un
                    componente a otro. La región 01 nunca se asigna —
                    es la operación hecha a mano, y sigue siendo ruido. */}
                {/* Cada región tiene su propia textura: ruido sin asignar,
                    bloques reservados, carriles de proceso, unidades a
                    cargo. El ruido está debajo en todas y se va cuando la
                    región se asigna: ahí es donde se ve la resolución. */}
                <div className={css.contenidoCapa}>
                  <div
                    className={css.ruido}
                    data-fuera={!r.libre && asignada ? "" : undefined}
                  >
                    <Bytes
                      columnas={11}
                      filas={r.libre ? 5 : 3}
                      semilla={20260916 + i * 37}
                      porTick={r.libre ? 7 : 3}
                      activo={r.libre || !asignada}
                    />
                  </div>
                  {!r.libre && (
                    <div
                      className={css.estructura}
                      data-dentro={asignada ? "" : undefined}
                    >
                      {r.patron === "bloques" && (
                        <Bloques filas={bloques[i]} activa={asignada} />
                      )}
                      {r.patron === "flujo" && (
                        <Flujo carriles={flujos[i]} activa={asignada} />
                      )}
                      {r.patron === "celdas" && (
                        <Celdas celdas={celdas[i]} activa={asignada} />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Las llamadas viven DENTRO de la capa, en el espacio 3D:
                  el ancla se apoya sobre el plano y viaja con él. El
                  contenido se contrarrota para quedar derecho en pantalla,
                  así el texto se lee plano pero la línea nace en el borde
                  de la capa que nombra, no en el aire. */}
              {esActiva && (
                <div className={css.anclajes} aria-hidden="true">
                  {r.llamadas.map((l, j) => (
                    <div
                      key={l}
                      className={css.ancla}
                      data-lado={j % 2 === 0 ? "izq" : "der"}
                      style={{ ["--retardo" as string]: `${160 + j * 120}ms` }}
                    >
                      <div className={css.contra}>
                        <span className={css.puntoLlamada} />
                        <span className={css.lineaLlamada} />
                        <span className={css.textoLlamada}>{l}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {onActivar && (
                <button
                  type="button"
                  className={css.zona}
                  onClick={() => onActivar(i)}
                  aria-label={`Ver la región ${r.n}: ${r.nombre}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Los rótulos también viven en el árbol de accesibilidad, fuera
          del 3D, donde un lector de pantalla los encuentra en orden. */}
      <ul className="sr-only">
        {REGIONES[activa]?.llamadas.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Versión plana para teléfono: la misma lectura de arriba hacia abajo,
 * sin isometría, con la canaleta de direcciones al costado.
 */
export function MapaPlano({
  compacto = false,
  semilla = 4100,
  etiqueta,
}: {
  compacto?: boolean;
  semilla?: number;
  etiqueta?: string;
}) {
  const bloques = useMemo(
    () => REGIONES.map((_, i) => bloquesAsignados(compacto ? 2 : 4, semilla + i * 97)),
    [compacto, semilla],
  );

  return (
    <div className={css.plana} data-compacto={compacto ? "" : undefined}>
      {etiqueta && <p className={css.etiquetaPlana}>{etiqueta}</p>}
      <ol className={css.filasPlanas}>
        {REGIONES.map((r, i) => (
          <li key={r.n} className={css.filaPlana} data-libre={r.libre ? "" : undefined}>
            <span className={css.gutter}>
              <span className={css.direccionPlana}>
                {compacto ? r.direccion : direccionFila(r.direccion.slice(2), 0)}
              </span>
            </span>
            <span className={css.cuerpoPlano}>
              <span className={css.nombrePlano}>{r.nombre}</span>
              <span className={css.barraPlana}>
                {r.libre ? (
                  <Bytes
                    columnas={compacto ? 10 : 14}
                    filas={compacto ? 2 : 3}
                    semilla={semilla + 500 + i}
                    porTick={compacto ? 2 : 4}
                  />
                ) : (
                  <Bloques filas={bloques[i]} activa />
                )}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
