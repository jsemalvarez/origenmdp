"use client";

import { useMemo } from "react";
import { UNIDADES, dominio, iniciales, type Unidad } from "@/lib/content";
import Bytes from "./Bytes";
import { useEnVista } from "./Revela";
import css from "./Construido.module.css";

/**
 * Lo construido: una banda por producto propio, con su placa montada
 * encima de la ficha.
 *
 * Pasó por tres formas antes de ésta. Eran tres tarjetas en grilla, cada
 * una con el mismo mapa idéntico abajo —el elemento más grande de la
 * tarjeta y el que menos decía—. Después fue una matriz, con las unidades
 * como columnas de un solo mapa: decía la verdad y se comparaba de un
 * vistazo, pero era una hoja de especificaciones, y a cada producto le
 * tocaba una columna y no un escenario. Después cada unidad se llevó su
 * banda, con el mapa de esa unidad dibujado grande en la placa.
 *
 * Acá la placa deja de ser el mapa y pasa a ser el lugar del logotipo,
 * que es lo que va a ocupar ese cuadrado cuando los archivos existan.
 * Mientras tanto lleva las iniciales y nada más: un hueco con la forma de
 * una marca, no un dibujo que la reemplace.
 *
 * Lo que el mapa por unidad hacía —volver chequeable el título de la
 * sección, mostrando que Lingua tiene dos regiones tomadas, Paseos una y
 * el prototipo ninguna todavía— sale de la página con él. El dato sigue
 * vivo y confirmado en lib/content.ts para el día que haya dónde
 * mostrarlo.
 *
 * Lo que queda del mapa acá son las cintas de bytes que enmarcan cada
 * ficha arriba y abajo: la materia de 0x0000, la región que nadie reservó,
 * corriendo sin parar por encima y por debajo de cada producto nuestro.
 * No prueba nada —el mapa sí lo hacía— pero no miente, y es literalmente
 * lo que dice el encabezado.
 */
export default function Construido() {
  return (
    <ol className={css.bandas}>
      {UNIDADES.map((u) => (
        <Banda key={u.id} unidad={u} />
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ *
 * La banda: una unidad, su placa y su ficha.
 * ------------------------------------------------------------------ */

function Banda({ unidad }: { unidad: Unidad }) {
  /* Llega cuando la banda está de verdad en pantalla y no cuando asoma.
     La red de seguridad para el observer muerto vive adentro del hook: un
     temporizador suelto acá encendía la banda a los 1,8 segundos de
     cargar la página, mucho antes de que nadie bajara hasta ella, y la
     entrada pasaba fuera de pantalla. */
  const { ref, visible: llegada } = useEnVista<HTMLLIElement>(
    "0px 0px -18% 0px",
  );

  /* Una semilla por unidad: los campos son deterministas, así que el
     servidor y el cliente pintan lo mismo, y dos cintas vecinas nunca
     arrancan con los mismos bytes. */
  const semilla = useMemo(() => {
    let h = 2166136261;
    for (let i = 0; i < unidad.id.length; i++) {
      h ^= unidad.id.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }, [unidad.id]);

  return (
    <li ref={ref} className={css.banda} data-llegada={llegada ? "" : undefined}>
      {/* La ficha va primero en el DOM aunque se dibuje a la derecha: con
          la placa adelante, un lector de pantalla escucha unas iniciales
          antes de enterarse de qué producto son. La posición la da la
          grilla, no el orden. */}
      <article className={css.tarjeta}>
        <Cinta semilla={semilla ^ 0x9e3779b9} />

        <div className={css.texto}>
          <h3 className={css.nombre}>{unidad.nombre}</h3>
          <p className={css.meta}>
            <span className={css.estado}>{unidad.estado}</span>
            <span className={css.dato}>{unidad.dato}</span>
          </p>
          <p className={css.desc}>{unidad.descripcion}</p>
          {pieUnidad(unidad)}
        </div>

        <Cinta semilla={semilla ^ 0x85ebca6b} />
      </article>

      {/* El lugar del logotipo. Las iniciales están fuera del árbol de
          accesibilidad: el nombre entero ya lo dice el encabezado de la
          ficha, y "L C" leído en voz alta no agrega nada. */}
      <div className={css.placa}>
        <span className={css.iniciales} aria-hidden="true">
          {iniciales(unidad.nombre)}
        </span>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * La cinta: bytes sin asignar corriendo al borde de la ficha.
 * ------------------------------------------------------------------ */

function Cinta({ semilla }: { semilla: number }) {
  return (
    <div className={css.cinta}>
      <Bytes
        ajusta
        columnas={26}
        filas={2}
        semilla={semilla}
        porTick={2}
        cadencia={200}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * El pie de una unidad.
 * ------------------------------------------------------------------ */

/**
 * Un enlace sólo donde hay uno.
 *
 * Antes las tres unidades cerraban con un cartel punteado —dos "enlace y
 * captura pendientes" y un "cliente y enlace reservados"— y tres carteles
 * de falta en fila dejan de señalar un hueco para decir que no hay nada.
 * Es la misma regla que cumple la línea de comunidad, escrita en
 * DESIGN.md, y esta sección era el único lugar que la rompía.
 *
 * El enlace se mira antes que `reservado` y no al revés. Desde el
 * 2026-09-18 las tres unidades tienen dirección publicable, incluido el
 * prototipo; lo que sigue reservado en esa unidad es el nombre de la
 * empresa, y eso lo cuida su descripción, no este pie. La rama del cartel
 * queda para una unidad futura que no tenga a dónde mandar.
 */
function pieUnidad(u: Unidad) {
  if (u.url) {
    /* La dirección cruda y en mono, no un "Ver el sitio". Es la convención
       de la página para una dirección, y sobre todo es la que usa el
       registro de comunidad que va pegado abajo en esta misma sección:
       con las dos a la vista, dos tratamientos distintos para "entrá y
       miralo" se leen como dos cosas distintas. De paso, una dirección se
       puede leer y dictar; un botón no. */
    return (
      <a className={css.enlace} href={u.url}>
        {dominio(u.url)}
      </a>
    );
  }
  if (u.reservado) {
    return <span className={css.reservado}>Cliente y enlace reservados</span>;
  }
  return null;
}
