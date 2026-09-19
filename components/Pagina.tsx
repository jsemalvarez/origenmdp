"use client";

import { useEffect, useRef, useState } from "react";
import {
  MARCA,
  PORTADA,
  SECCIONES,
  SERVICIOS,
  linkWhatsApp,
  type ServicioId,
} from "@/lib/content";
import { REGIONES } from "@/lib/mapa";
import Mapa, { MapaPlano } from "./Mapa";
import Oferta from "./Oferta";
import Construido from "./Construido";
import Comunidad from "./Comunidad";
import Banda from "./Banda";
import Revela, { useEnVista } from "./Revela";
import Formulario from "./Formulario";
import css from "./Pagina.module.css";

/**
 * Avance de la pila: va de 0 a 4 con el scroll de la sección y dice
 * cuántas capas ya subieron. En 0 la pila está armada abajo; en 4 está
 * armada arriba. Se escribe como variable CSS, así el navegador compone
 * las capas sin re-renderizar React en cada cuadro.
 */
const CAPAS = REGIONES.length;

function useAvance(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--avance", String(CAPAS));
      return;
    }

    let raf = 0;
    let pendiente = false;

    const medir = () => {
      pendiente = false;
      const r = el.getBoundingClientRect();
      const alto = window.innerHeight;
      // Un bloque de texto por capa: la capa sube mientras su bloque
      // cruza la ventana, y se queda arriba cuando terminó de cruzar.
      const porCapa = r.height / CAPAS;
      const crudo = (alto * 0.62 - r.top) / porCapa;
      const v = Math.max(0, Math.min(CAPAS, crudo));
      el.style.setProperty("--avance", v.toFixed(3));
    };

    const alScroll = () => {
      if (pendiente) return;
      pendiente = true;
      raf = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, [ref]);
}

export default function Pagina() {
  const [activa, setActiva] = useState(0);
  const [servicio, setServicio] = useState<ServicioId>("desarrollo");
  const seccionRegiones = useRef<HTMLElement>(null);
  useAvance(seccionRegiones);
  const wa = linkWhatsApp(
    SERVICIOS.find((s) => s.id === servicio)?.nombre,
  );

  return (
    <div className={css.pagina}>
      <header className={css.barra}>
        <a className={css.lockup} href="#cotizar">
          <span className={css.lockupParte}>{MARCA.origen}</span>{" "}
          <span className={css.lockupParte} aria-hidden="true">
            —
          </span>{" "}
          <span className={css.lockupParte}>{MARCA.costa}</span>
        </a>
        <nav className={css.nav} aria-label="Secciones">
          {SECCIONES.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              <span className={css.navN}>{s.n}</span>
              <span className={css.navNombre}>{s.nombre}</span>
            </a>
          ))}
        </nav>
        {wa && (
          <a className={css.barraWa} href={wa}>
            WhatsApp
          </a>
        )}
      </header>

      <main>
        {/* ---------------- 01 · EL MAPA ---------------- */}
        <section className={css.portada} id="mapa">
          <div className={css.portadaTexto}>
            <Revela como="h1" className={css.titular}>
              {PORTADA.titulo}
            </Revela>
            <Revela como="p" className={css.bajada} retardo={120}>
              {PORTADA.bajada}
            </Revela>
            <Revela className={css.pruebaCaja} retardo={220}>
              <p className={css.prueba}>{PORTADA.prueba}</p>
            </Revela>

            <Revela className={css.indice} retardo={320}>
              <ol className={css.indiceLista}>
                {REGIONES.map((r, i) => (
                  <li key={r.n}>
                    <button
                      type="button"
                      className={css.indiceFila}
                      data-activa={i === activa ? "" : undefined}
                      onClick={() => setActiva(i)}
                      aria-current={i === activa ? "true" : undefined}
                    >
                      <span className={css.indicePunto} aria-hidden="true" />
                      <span className={css.indiceN}>{r.n}</span>
                      <span className={css.indiceNombre}>{r.nombre}</span>
                      <span className={css.indiceDir}>{r.direccion}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </Revela>

            <Revela className={css.acciones} retardo={420}>
              <a className={css.accionPrimaria} href="#cotizar">
                Pedir cotización
              </a>
              <a className={css.accionSecundaria} href="#regiones">
                Ver cómo funciona
              </a>
            </Revela>
          </div>

        </section>

        {/* Banda de resolución: todo el ancho, baja, viva desde que carga. */}
        <Banda />

        {/* ---------------- 02 · LAS REGIONES ---------------- */}
        <section
          className={css.regiones}
          id="regiones"
          ref={seccionRegiones}
        >
          <div className={css.regionesTexto}>
            {REGIONES.map((r, i) => (
              <BloqueRegion
                key={r.n}
                region={r}
                indice={i}
                onEntrar={setActiva}
                activa={i === activa}
              />
            ))}
          </div>
          <div className={css.regionesMapa}>
            <div className={css.pegajoso}>
              <Mapa activa={activa} onActivar={setActiva} />
              <p className={css.pieMapa}>
                <span className={css.pieDir}>{REGIONES[activa].direccion}</span>
                <span>{REGIONES[activa].nombre}</span>
              </p>
            </div>
          </div>

          {/* En teléfono no hay pila 3D ni columna fija: el mismo mapa se
              lee plano, con la canaleta de direcciones al costado. */}
          <div className={css.mapaAngosto}>
            <MapaPlano etiqueta="Mapa de tu operación" />
          </div>
        </section>

        {/* ---------------- 03 · QUÉ CONTRATÁS ---------------- */}
        <section className={css.oferta} id="oferta">
          <div className={css.encabezado}>
            <Revela como="h2" className={css.tituloSeccion}>
              Qué se contrata, sin metáfora
            </Revela>
            <Revela como="p" className={css.textoSeccion} retardo={120}>
              El mapa de arriba cuenta cómo trabajamos. Esto es lo que se pide
              y lo que se factura.
            </Revela>
          </div>

          <Oferta />

          {/* ---- "Lo que ya conocés": guardado, sin renderizar ----
           *
           * Dos tarjetas que nombraban lo que el mercado ofrece y no
           * resuelve: plataformas enormes y caras, y freelancers sin
           * continuidad. Sale de la página el 2026-09-18 por decisión del
           * usuario, que quiere el argumento pero todavía no encontró la
           * forma.
           *
           * Lo que se saca es el tratamiento y no el contenido. Las dos
           * frases son posicionamiento confirmado en PRODUCT.md —salen del
           * copy del propio cliente, y la segunda es exactamente el
           * escepticismo con el que llega el visitante primario—, así que
           * no se borran ni se reescriben sin él.
           *
           * El texto sigue vivo y editable como dato en CONTRA
           * (lib/content.ts) y los estilos siguen en .contra* de
           * Pagina.module.css. Para devolverlo a la página alcanza con
           * descomentar este bloque y volver a poner CONTRA en el import
           * de arriba: nada más se tocó.
           *
           * Hipótesis para cuando se retome, no veredicto: acá abajo las
           * tarjetas dicen de quién no somos justo después de que las
           * cuatro marcas mostraron qué somos, y en ese orden el contraste
           * no suma —se leen como dos cajas de texto colgadas del final de
           * la sección—. El mismo argumento probablemente rinda antes, y
           * dicho de una sola vez en lugar de en dos tarjetas gemelas.
           *
          <div className={css.contra}>
            {CONTRA.map((c, i) => (
              <Revela key={c.problema} retardo={i * 140} className={css.contraItem}>
                <p className={css.contraRotulo}>Lo que ya conocés</p>
                <h3 className={css.contraProblema}>{c.problema}</h3>
                <p className={css.contraDetalle}>{c.detalle}</p>
              </Revela>
            ))}
          </div>
          */}
        </section>

        {/* ---------------- 04 · LO CONSTRUIDO ---------------- */}
        <section className={css.propios} id="propios">
          {/* El encabezado y las bandas viajan juntos, centrados y sobre la
              misma medida. Centrar sólo las bandas dejaba el título contra
              el borde izquierdo y la composición al medio, que es peor que
              cualquiera de las dos cosas sola. El registro de comunidad
              queda afuera: va a todo el ancho por diseño. */}
          <div className={css.bloqueUnidades}>
            <div className={css.encabezado}>
              <Revela como="h2" className={css.tituloSeccion}>
                El mismo mapa corre abajo de lo nuestro
              </Revela>
              <Revela como="p" className={css.textoSeccion} retardo={120}>
                No son maquetas. Son productos que {MARCA.origen} construyó,
                con las mismas cuatro regiones que te acabamos de mostrar.
              </Revela>
            </div>

            <Construido />
          </div>

          {/* Acá queda sólo el filete que lo separa de las unidades. El
              encabezado se mudó adentro del componente: tiene que quedarse
              quieto junto con la línea mientras las fichas pasan al lado, y
              eso se arma desde adentro de la escena. */}
          <div className={css.comunidad}>
            <Comunidad />
          </div>
        </section>

        {/* ---------------- 04 · COTIZAR ---------------- */}
        <section className={css.cotizar} id="cotizar">
          <div className={css.encabezado}>
            <Revela como="h2" className={css.tituloSeccion}>
              Decinos qué región querés reservar
            </Revela>
            <Revela como="p" className={css.textoSeccion} retardo={120}>
              Contanos qué necesitás resolver. Te respondemos con una propuesta
              concreta, no con un folleto.
            </Revela>
          </div>
          <div className={css.cajaFormulario}>
            <Formulario servicio={servicio} onServicio={setServicio} />
          </div>
        </section>
      </main>

      <footer className={css.pie}>
        <p className={css.pieLockup}>
          <span className={css.lockupParte}>{MARCA.origen}</span>{" "}
          <span className={css.lockupParte} aria-hidden="true">
            —
          </span>{" "}
          <span className={css.lockupParte}>{MARCA.costa}</span>
        </p>
        <p className={css.pieLinea}>
          {MARCA.ciudad}, Buenos Aires · Software a medida · Automatización con
          IA · Capacitación
        </p>
        <p className={css.piePendiente}>
          Logotipo pendiente: la marca se compone en Archivo hasta que el
          archivo original esté disponible.
        </p>
      </footer>
    </div>
  );
}

/**
 * Un bloque de texto por región. Cuando entra en vista reclama la capa
 * correspondiente en la pila: eso es lo que hace que el mapa se explique
 * solo mientras se baja.
 */
function BloqueRegion({
  region,
  indice,
  onEntrar,
  activa,
}: {
  region: (typeof REGIONES)[number];
  indice: number;
  onEntrar: (i: number) => void;
  activa: boolean;
}) {
  const { ref, visible } = useEnVista<HTMLDivElement>("-42% 0px -42% 0px", false);
  const [abierta, setAbierta] = useState(false);
  const visto = useRef(false);

  useEffect(() => {
    if (visible && !visto.current) {
      visto.current = true;
      onEntrar(indice);
    }
    if (visible) onEntrar(indice);
  }, [visible, indice, onEntrar]);

  return (
    <div
      ref={ref}
      className={css.bloqueRegion}
      data-activa={activa ? "" : undefined}
    >
      <p className={css.bloqueMeta}>
        <span className={css.bloqueN}>{region.n}</span>
        <span className={css.bloqueDir}>{region.direccion}</span>
      </p>
      {/* La promesa primero: lo que gana el negocio, antes del detalle. */}
      <h2 className={css.bloqueTitulo}>{region.promesa}</h2>
      <p className={css.bloqueNombre}>{region.nombre}</p>
      <p className={css.bloqueDetalle}>{region.detalle}</p>
      <ul className={css.bloqueLista}>
        {region.entrega.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <button
        type="button"
        className={css.latenteBoton}
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
      >
        {abierta ? "Ocultar el detalle" : "Ver qué hay debajo"}
      </button>
      {abierta && <p className={css.latenteTexto}>{region.latente}</p>}
    </div>
  );
}
