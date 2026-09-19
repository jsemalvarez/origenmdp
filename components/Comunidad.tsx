"use client";

import { useCallback, useEffect, useState } from "react";
import {
  COMUNIDAD,
  COMUNIDAD_INTRO,
  dominio,
  type HitoComunidad,
} from "@/lib/content";
import Bytes from "./Bytes";
import Revela, { useEnVista } from "./Revela";
import css from "./Comunidad.module.css";

/* El id de cada ficha, derivado del título. Sirve para que la fila sepa a
   dónde llevarte y, de paso, para poder enlazar una entrada desde afuera. */
function idFicha(titulo: string) {
  return (
    "comunidad-" +
    titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/**
 * Trabajo de comunidad: una línea quieta y las fichas pasando al lado.
 *
 * Pasó por tres formas antes de ésta. Eran dos tarjetas gemelas —"dos
 * hackathones, dos primeros puestos"— que se leían como currículum y no
 * dejaban agregar nada. Después fue una línea de tiempo con el detalle
 * adentro de cada entrada: decía lo correcto, pero medía 1133px y era una
 * tira plana —cinco párrafos idénticos apilados, sin nada encendido—
 * porque en un registro de cosas terminadas no hay nada vivo que pintar.
 *
 * Acá el reparto cambia y eso arregla las dos cosas de una. La línea se
 * queda con un renglón por entrada —año, nodo, nombre— así que los nueve
 * años entran de un vistazo, que es el argumento. Todo lo demás se va a
 * una ficha que pasa al lado a medida que el visitante baja. Nada se lee
 * dos veces y aparece jerarquía: una lista chica, una pieza grande.
 *
 * Y recién ahí el naranja tiene derecho a existir acá. La regla de la
 * página es una sola región viva por vez, en naranja, en todos los lugares
 * donde aparece; sin estado activo no había nada que encender. El scroll
 * crea ese estado, así que el naranja no se agrega de adorno: lo pide el
 * sistema.
 *
 * El mecanismo es el de la sección 02 y a propósito: bloques que se
 * activan al cruzar la banda del medio de la ventana, columna pegajosa al
 * lado. El visitante ya aprendió a leer esa coreografía arriba; repetirla
 * es tener un sistema, no copiarse. Lo que cambia es el material —fichas
 * planas con su fuente, no una pila 3D con callouts.
 */
export default function Comunidad() {
  /* Orden ascendente, la única ley de ordenamiento de la página. Los
     tramos entran por su año de arranque, como en cualquier línea de
     tiempo con solapamientos, y lo reservado va último porque todavía no
     tiene año. Se ordena acá y no en el dato para que agregar una entrada
     en lib/content.ts no pueda romper el orden. */
  const asignados = COMUNIDAD.filter((h) => !h.reservado).sort(
    (a, b) => Number(a.anio ?? 9999) - Number(b.anio ?? 9999),
  );
  const reservados = COMUNIDAD.filter((h) => h.reservado);
  const orden = [...asignados, ...reservados];

  const [activa, setActiva] = useState(0);
  const entrar = useCallback((i: number) => setActiva(i), []);

  /* La red de seguridad para el observer muerto vive adentro del hook. Acá
     había un temporizador suelto que trazaba la línea a los 1,6 segundos
     de cargar la página: para cuando el visitante llegaba, ya estaba
     dibujada y no se veía dibujarse. Es el mismo defecto que tenían las
     bandas de arriba y se arregla en un solo lugar. */
  const { ref, visible: trazada } = useEnVista<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={css.escena}
      data-visible={trazada ? "" : undefined}
    >
      {/* Lo quieto: el encabezado y la línea. Se quedan centrados en la
          ventana mientras las fichas pasan al lado, igual que la pila de la
          02. El encabezado va acá adentro y no arriba del bloque porque el
          recorrido dura más de dos pantallas: si se fuera con el scroll, a
          mitad de camino quedarías leyendo años sueltos sin el marco que
          dice qué son. */}
      <div className={css.ladoLinea}>
        <div className={css.quieto}>
          <div className={css.intro}>
            <Revela como="h3" className={css.introTitulo}>
              {COMUNIDAD_INTRO.titulo}
            </Revela>
            <Revela como="p" className={css.introTexto} retardo={120}>
              {COMUNIDAD_INTRO.bajada}
            </Revela>
          </div>

          <ol className={css.hitos}>
            {asignados.map((h, i) => (
              <Fila
                key={h.titulo}
                hito={h}
                indice={i}
                activa={activa === i}
                onElegir={entrar}
              />
            ))}

            {/* El corte. Arriba de acá todo pasó y se puede chequear; abajo
                no hay nada todavía, y la página entera se apoya en esa
                diferencia. El rótulo es el que usa el mapa para una región
                que nadie reservó, porque es exactamente eso. */}
            <li className={css.hoy}>
              <span className={css.anio}>hoy</span>
              <span className={css.carril} aria-hidden="true" />
              <span className={css.corte}>Sin asignar</span>
            </li>

            {reservados.map((h, j) => (
              <Fila
                key={h.titulo}
                hito={h}
                indice={asignados.length + j}
                activa={activa === asignados.length + j}
                onElegir={entrar}
              />
            ))}

            {/* La línea no termina en la última entrada: sigue, y lo que
                sigue es materia sin asignar. Se desvanece hacia abajo
                porque cuanto más lejos, menos sabemos. */}
            <li className={css.cola} aria-hidden="true">
              <span className={css.anio} />
              <span className={css.carril} />
              <span className={css.bytes}>
                <Bytes
                  columnas={8}
                  filas={3}
                  semilla={70117}
                  porTick={2}
                  cadencia={190}
                  activo={trazada}
                />
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Lo que se mueve: las fichas. Son las que dan el recorrido, así que
          cada una se lleva su pantalla. La que cruza la banda del medio
          queda entera y las vecinas bajan de opacidad; dos bloques vecinos
          atenuándose *son* el cruce de fundidos, sin apilar nada ni medir
          scroll a mano. */}
      <div className={css.ladoFichas}>
        {orden.map((h, i) => (
          <Ficha
            key={h.titulo}
            hito={h}
            indice={i}
            activa={activa === i}
            onEntrar={entrar}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * La fila: un renglón, y nada más que un renglón.
 * ------------------------------------------------------------------ */

function Fila({
  hito,
  indice,
  activa,
  onElegir,
}: {
  hito: HitoComunidad;
  indice: number;
  activa: boolean;
  onElegir: (i: number) => void;
}) {
  /* Tres formas de nodo y ninguna decorativa: punto es un momento que pasó
     —un hackathon dura un fin de semana—, barra es un tramo que corrió y
     terminó, punteado es lo reservado. El estado en palabras —"sin uso
     desde 2020"— se fue a la ficha: en un renglón obligaría a un segundo
     renglón, y entonces ya no sería un renglón. */
  const forma = hito.reservado
    ? css.esReservado
    : hito.hasta
      ? css.esTramo
      : "";

  return (
    <li className={`${css.fila} ${forma}`} data-activa={activa ? "" : undefined}>
      {/* La fila también es un botón, y lleva hasta la ficha en vez de sólo
          encenderse. Encender sin mover dejaba la línea diciendo una cosa y
          la ficha mostrando otra —el observer volvía a ganar en el siguiente
          scroll—, y en teléfono, donde la línea va arriba de todas las
          fichas, tocar una fila no hacía absolutamente nada. Sin cromo
          dibujado: el estado activo ya se ve y el foco lo marca el anillo
          global de la página. */}
      <button
        type="button"
        className={css.filaBoton}
        onClick={() => {
          onElegir(indice);
          document
            .getElementById(idFicha(hito.titulo))
            ?.scrollIntoView({ block: "center" });
        }}
      >
        <span className={css.anio}>{hito.anio}</span>
        <span className={css.carril} aria-hidden="true" />
        <span className={css.nombre}>{hito.titulo}</span>
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * La ficha: todo lo que la fila no dice.
 * ------------------------------------------------------------------ */

function Ficha({
  hito,
  indice,
  activa,
  onEntrar,
}: {
  hito: HitoComunidad;
  indice: number;
  activa: boolean;
  onEntrar: (i: number) => void;
}) {
  /* La misma banda estrecha que usa la 02: la ficha se activa cuando su
     bloque cruza el medio de la ventana y no cuando asoma. Así hay siempre
     exactamente una activa y el cambio cae donde el ojo ya está mirando. */
  const { ref, visible } = useEnVista<HTMLDivElement>(
    "-42% 0px -42% 0px",
    false,
  );

  useEffect(() => {
    if (visible) onEntrar(indice);
  }, [visible, indice, onEntrar]);

  const rango = hito.hasta ? `${hito.anio}–${hito.hasta}` : hito.anio;

  return (
    <div
      ref={ref}
      id={idFicha(hito.titulo)}
      className={css.bloqueFicha}
      data-activa={activa ? "" : undefined}
    >
      <article className={css.ficha}>
        <p className={css.fichaMeta}>
          {rango && <span className={css.fichaAnio}>{rango}</span>}
          {hito.puesto && <span className={css.fichaPuesto}>{hito.puesto}</span>}
          {hito.estado && <span className={css.fichaEstado}>{hito.estado}</span>}
        </p>
        <h4 className={css.fichaTitulo}>{hito.titulo}</h4>
        {hito.organiza && <p className={css.fichaOrganiza}>{hito.organiza}</p>}
        {hito.cifras && (
          /* Las medidas del evento, en mono y separadas por el mismo punto
             medio que separa las direcciones del mapa. Son lo único de esta
             sección que un tercero puede contar por su cuenta. */
          <p className={css.fichaCifras}>{hito.cifras.join(" · ")}</p>
        )}
        <p className={css.fichaDetalle}>{hito.detalle}</p>
        {(hito.url || hito.fuente) && (
          <p className={css.fichaPie}>
            {/* El proyecto primero: entrar y verlo andar pesa más que
                leer que alguien lo contó. La dirección va cruda y en mono,
                como cualquier dirección de esta página. */}
            {hito.url && (
              <a className={css.fichaEnlace} href={hito.url}>
                {dominio(hito.url)}
              </a>
            )}
            {hito.fuente &&
              (hito.fuenteUrl ? (
                <a className={css.fichaEnlace} href={hito.fuenteUrl}>
                  Fuente: {hito.fuente}
                </a>
              ) : (
                /* Sin nota enlazable la fuente se nombra igual: que no se
                   pueda clickear no la vuelve menos verificable. */
                <span className={css.fichaFuente}>Fuente: {hito.fuente}</span>
              ))}
          </p>
        )}
      </article>
    </div>
  );
}
