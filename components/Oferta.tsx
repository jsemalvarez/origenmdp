"use client";

import { useEffect, useRef, useState } from "react";
import {
  HERRAMIENTAS,
  OFERTA,
  type GlifoHerramienta,
  type MarcaOferta,
} from "@/lib/content";
import Bytes from "./Bytes";
import css from "./Oferta.module.css";

/**
 * Qué se contrata: cuatro bandas, marca de un lado y texto del otro,
 * alternando.
 *
 * Las dos primeras llevan la misma textura que su región lleva en el
 * mapa —la vidriera sobre el ruido, los bloques asignados—, así esta
 * sección se lee como la traducción en criollo de lo que el visitante ya
 * vio arriba en vez de como un segundo mapa.
 *
 * Las otras dos rompen esa regla a propósito, y por el mismo motivo: el
 * mapa cuenta el proceso y acá se contrata otra cosa. La del bot es una
 * cara, porque lo que se contrata es algo que atiende y no un proceso
 * dibujado; una cara que te mira le gana a un carril corriendo. La del
 * anillo nombra las seis herramientas que quedan a cargo del equipo,
 * porque una capacitación que no dice qué se aprende no dice nada.
 *
 * Las cuatro hacen un solo gesto al llegar, el mismo del mapa: materia
 * sin asignar que se vuelve estructura. Después, las dos que describen
 * algo que corre —el sitio con sus datos, el bot que atiende— siguen
 * latiendo; las dos que describen algo entregado —el sistema armado, el
 * traspaso cerrado— se quedan quietas. La quietud también dice algo.
 */
export default function Oferta() {
  return (
    <ol className={css.bandas}>
      {OFERTA.map((o, i) => (
        <li
          key={o.n}
          className={css.banda}
          /* La marca arranca a la izquierda y va alternando. Abajo de
             900px esto se ignora: en una sola columna un zigzag deja el
             orden de lectura al azar, así que la marca va siempre
             arriba del texto. */
          data-marca={i % 2 === 0 ? "izq" : "der"}
        >
          <Marca tipo={o.marca} indice={i} />
          <div className={css.texto}>
            <span className={css.n}>{o.n}</span>
            <h3 className={css.nombre}>{o.nombre}</h3>
            <p className={css.detalle}>{o.detalle}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ *
 * Llegada
 * ------------------------------------------------------------------ */

/**
 * Dos señales distintas y no una: `llego` se traba la primera vez que la
 * marca entra en cuadro y ya no vuelve —es lo que dispara la resolución,
 * y volver a verla no tiene por qué repetirla—; `enVista` sigue el ir y
 * venir del scroll y es lo que habilita el latido, para que nada corra
 * fuera de pantalla.
 */
function useLlegada<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [llego, setLlego] = useState(false);
  const [enVista, setEnVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLlego(true);
      setEnVista(true);
      return;
    }
    let entrego = false;
    const obs = new IntersectionObserver(
      ([e]) => {
        entrego = true;
        setEnVista(e.isIntersecting);
        if (e.isIntersecting) setLlego(true);
      },
      { rootMargin: "120px 0px -10% 0px", threshold: 0.01 },
    );
    obs.observe(el);

    /* Red de seguridad. Un observer sano entrega una primera lectura al
       observar, aunque sea "no está en pantalla", así que esto no se
       dispara nunca en un navegador normal. Cubre el caso en que no
       entrega nada —pasa en paneles embebidos y vistas que no corren el
       ciclo de render—, donde la marca se quedaría esperando su llegada
       para siempre. Mejor resuelta de más que escondida de menos. */
    const red = window.setTimeout(() => {
      if (entrego) return;
      setLlego(true);
      setEnVista(true);
    }, 1200);

    return () => {
      window.clearTimeout(red);
      obs.disconnect();
    };
  }, []);

  return { ref, llego, enVista };
}

/* ------------------------------------------------------------------ *
 * Marcas
 * ------------------------------------------------------------------ */

function Marca({ tipo, indice }: { tipo: MarcaOferta; indice: number }) {
  const { ref, llego, enVista } = useLlegada<HTMLDivElement>();
  const semilla = 31400 + indice * 617;

  /* Tres de las cuatro son textura y se esconden del árbol de
     accesibilidad, como el campo de bytes. La del anillo no: adentro
     lleva los nombres de las seis herramientas, que son lo que la banda
     tiene para decir. Una marca que nombra la oferta no es decoración. */
  const decorativa = tipo !== "anillo";

  return (
    <div
      ref={ref}
      className={`marca-oferta ${css.marca}`}
      data-llego={llego ? "" : undefined}
      data-vivo={enVista ? "" : undefined}
      aria-hidden={decorativa ? "true" : undefined}
    >
      {tipo === "sitio" && <MarcaSitio semilla={semilla} activo={enVista} />}
      {tipo === "encastre" && <MarcaEncastre vivo={enVista} />}
      {tipo === "bot" && <MarcaBot llego={llego} vivo={enVista} />}
      {tipo === "anillo" && <MarcaAnillo />}
    </div>
  );
}

/* ---- Sitio o tienda: la misma vidriera en tres anchos ---- */

/**
 * Las tres pantallas, declaradas una sola vez.
 *
 * Entre ellas no cambia el contenido: cambia en cuántas columnas cae la
 * grilla y qué llega a entrar. Escribir tres maquetas distintas sería
 * afirmar en el código lo contrario de lo que la banda afirma —un solo
 * trabajo, tres pantallas—, así que la maqueta es una y las diferencias
 * son cuatro números.
 *
 * Los anchos son los de verdad y van rotulados en mono abajo de cada
 * pantalla, porque en esta página un número es una medida o no está.
 */
const PANTALLAS = [
  {
    n: "escritorio",
    medida: "1440",
    columnas: 3,
    productos: 3,
    enlaces: 3,
    direccion: true,
    peso: true,
    bajada: true,
    grafico: true,
  },
  {
    n: "tablet",
    medida: "768",
    columnas: 2,
    productos: 2,
    enlaces: 2,
    direccion: false,
    peso: false,
    bajada: true,
    grafico: true,
  },
  {
    n: "telefono",
    medida: "390",
    columnas: 1,
    productos: 2,
    enlaces: 0,
    direccion: false,
    peso: false,
    bajada: false,
    grafico: false,
  },
] as const;

/**
 * El módulo con forma de gráfico que lleva la vidriera.
 *
 * Seis barras sin eje, sin cifras y sin tendencia: arranca en 64 y
 * termina en 58, así que no hay curva que suba ni resultado que
 * prometer. Es mobiliario de página, del mismo orden que la grilla de
 * productos —una tienda muestra datos—, y no una métrica. Las únicas
 * cifras dibujadas en esta marca son los tres anchos de abajo, que son
 * medidas.
 */
const BARRAS = [64, 46, 80, 52, 74, 58];

/**
 * Sitio web o tienda online: la misma vidriera en los tres anchos que
 * usa tu cliente.
 *
 * De las cuatro marcas ésta era la más floja. La 02 dice que las mismas
 * piezas arman otra cosa, la 03 te mira, la 04 nombra seis herramientas;
 * la 01 decía "existe una página" y no mostraba ninguna de las dos cosas
 * que su propio título promete. Ahora la vidriera está dibujada entera
 * —navegación, grilla de productos, precio, un Comprar— y está dibujada
 * tres veces, porque lo que se contrata no es una pantalla sino un
 * trabajo que tiene que servir en las tres.
 *
 * Los tres al piso y bajando, cada uno con su ancho: se lee como ficha
 * de medidas y no como foto de producto. Que la silueta del conjunto sea
 * una escalera sale de las medidas, no de una cifra elegida.
 *
 * El ruido queda sólo atrás del escritorio, que es la única superficie
 * donde todavía se lee: los datos del negocio siguen corriendo abajo de
 * la tienda después de que la tienda está hecha. Sigue siendo la marca
 * que más late.
 */
function MarcaSitio({ semilla, activo }: { semilla: number; activo: boolean }) {
  return (
    <div className={css.trio}>
      {PANTALLAS.map((p, i) => (
        <Pantalla
          key={p.n}
          {...p}
          columna={i + 1}
          /* El escritorio primero y el teléfono último: el mismo orden en
             que se arma un sitio, y el barrido de adentro de cada uno
             arranca donde lo dejó el anterior. */
          base={i * 220}
          semilla={semilla}
          activo={activo}
        />
      ))}
    </div>
  );
}

function Pantalla({
  n,
  medida,
  columnas,
  productos,
  enlaces,
  direccion,
  peso,
  bajada,
  grafico,
  columna,
  base,
  semilla,
  activo,
}: (typeof PANTALLAS)[number] & {
  columna: number;
  base: number;
  semilla: number;
  activo: boolean;
}) {
  /* Un solo reloj para toda la pantalla: cada pieza lleva el índice que
     le toca en el orden de lectura y su retardo sale de un calc() sobre
     --base, como el anillo de la 04. Dos relojes se desfasan; uno no
     puede. La grilla arranca más tarde donde hay bajada que donde no,
     que es lo que pasa al cargar una página más corta. */
  const iGrilla = bajada ? 3 : 2;
  const iPie = iGrilla + productos;
  const marca = (i: number) => ({ ["--i" as string]: `${i}` });

  return (
    <>
      <div
        className={`${css.pantalla} ${css[n]}`}
        style={{ gridColumn: columna, ["--base" as string]: `${base}ms` }}
      >
        <div className={css.barra}>
          {direccion ? (
            <span className={css.dir}>tu-negocio.com.ar</span>
          ) : (
            /* Donde la dirección no entra sin recortarse, no se recorta:
               se dibuja. Media palabra en mono a 5px no es una dirección,
               es basura tipográfica. */
            <span className={css.dirTic} />
          )}
        </div>
        <div className={css.lienzo}>
          {n === "escritorio" && (
            <div className={css.ruidoSitio}>
              <Bytes
                /* Nueve y no once: a once columnas la celda mide menos
                   que los dos dígitos que lleva adentro y el último par
                   se corta contra el marco. */
                columnas={9}
                filas={7}
                semilla={semilla}
                porTick={3}
                cadencia={140}
                activo={activo}
              />
            </div>
          )}
          <div
            className={css.pagina}
            style={{ ["--cols" as string]: `${columnas}` }}
          >
            <div className={css.nav} style={marca(0)}>
              <span className={css.lockup} />
              <span className={css.enlaces}>
                {Array.from({ length: enlaces }, (_, k) => (
                  <i key={k} className={css.enlace} />
                ))}
              </span>
              <span className={css.carrito} />
            </div>
            <span className={`${css.barrido} ${css.titular}`} style={marca(1)} />
            {bajada && (
              <span
                className={`${css.barrido} ${css.bajada}`}
                style={marca(2)}
              />
            )}
            <div className={css.grilla}>
              {Array.from({ length: productos }, (_, k) => (
                <span
                  key={k}
                  className={css.producto}
                  style={marca(iGrilla + k)}
                >
                  <span className={`${css.barrido} ${css.foto}`} />
                  <span className={css.precio}>
                    {peso && <i className={css.peso}>$</i>}
                    <i className={`${css.barrido} ${css.cifra}`} />
                  </span>
                </span>
              ))}
            </div>
            <div className={css.pie} style={marca(iPie)}>
              {grafico && (
                <span className={css.grafico}>
                  {BARRAS.map((h, k) => (
                    <i key={k} style={{ ["--h" as string]: `${h}%` }} />
                  ))}
                </span>
              )}
              <span className={`${css.barrido} ${css.comprar}`} />
            </div>
          </div>
        </div>
      </div>
      <span
        className={css.medida}
        style={{ gridColumn: columna, ["--base" as string]: `${base}ms` }}
      >
        {medida}
      </span>
    </>
  );
}

/* ---- Sistema a medida: las mismas piezas, otra cosa ---- */

/**
 * Cinco piezas que nunca se mueven. Sin un núcleo fijo no se lee un
 * objeto cambiando de forma, se leen nueve cubos barajándose.
 */
const NUCLEO: [number, number, number][] = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
];

/**
 * Tres siluetas distintas armadas con las mismas cuatro piezas sueltas:
 * una placa que se extiende a lo ancho, una torre que crece en alto, un
 * brazo que sube en diagonal. Ninguna pisa el núcleo.
 */
const FORMAS: [number, number, number][][] = [
  [
    [2, 0, 0],
    [2, 1, 0],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 0, 1],
    [0, 0, 2],
    [0, 1, 2],
  ],
  [
    [2, 0, 0],
    [1, 0, 1],
    [2, 0, 1],
    [2, 0, 2],
  ],
];

const ESPERA = 3800;

/** Cuántas piezas van en naranja a la vez, de las nueve. */
const FOCOS = 3;

const RZ = (-40 * Math.PI) / 180;
const RX = (56 * Math.PI) / 180;

/** La cámara de la escena, en unidades de lado de cubo. */
function proyectar(X: number, Y: number, Z: number): [number, number] {
  return [
    X * Math.cos(RZ) - Y * Math.sin(RZ),
    (X * Math.sin(RZ) + Y * Math.cos(RZ)) * Math.cos(RX) - Z * Math.sin(RX),
  ];
}

/**
 * Las tres piezas que van en naranja, lo más separadas que la forma
 * permita.
 *
 * Mide sobre la silueta ya proyectada y no sobre la grilla, porque lo que
 * tiene que quedar separado es lo que se ve. Prueba los tríos posibles
 * —son 84 con nueve piezas, nada— y se queda con el que maximiza la
 * distancia mínima entre encendidos. Empezar por una pieza e ir tomando
 * la más lejana es más barato pero depende de cuál sea la primera: en la
 * torre, que es la forma más compacta, elegía un trío a 0,85 lados de
 * cubo existiendo uno a 1,41.
 *
 * La variante rota entre los mejores tríos, para que el reparto no sea
 * siempre el mismo.
 */
function focos(
  piezas: [number, number, number][],
  variante: number,
  cuantas: number,
): Set<number> {
  const c = piezas.map(([X, Y, Z]) => proyectar(X + 0.5, Y + 0.5, Z + 0.5));
  const dist = (i: number, j: number) =>
    Math.hypot(c[i][0] - c[j][0], c[i][1] - c[j][1]);

  const trios: { idx: number[]; sep: number }[] = [];
  const armar = (desde: number, acc: number[]) => {
    if (acc.length === cuantas) {
      let sep = Infinity;
      for (let a = 0; a < acc.length; a++) {
        for (let b = a + 1; b < acc.length; b++) {
          sep = Math.min(sep, dist(acc[a], acc[b]));
        }
      }
      trios.push({ idx: acc, sep });
      return;
    }
    for (let i = desde; i < piezas.length; i++) armar(i + 1, [...acc, i]);
  };
  armar(0, []);

  trios.sort((a, b) => b.sep - a.sep);
  return new Set(trios[variante % trios.length].idx);
}

/**
 * Centro de la caja envolvente proyectada de una forma.
 *
 * Se centra cada forma, no el promedio de las tres: la torre es mucho
 * más alta que la placa, y con un corrimiento fijo se subía por encima
 * del filete que cierra la banda y se metía en la sección de arriba. Al
 * viajar con la misma transición que los cubos, el conjunto se reencuadra
 * mientras se rearma en vez de saltar.
 *
 * Es la caja envolvente y no el centroide de las piezas: el centroide de
 * unos puntos no cae en el medio de la silueta que proyectan.
 */
function centro(piezas: [number, number, number][]): [number, number] {
  let x0 = Infinity,
    x1 = -Infinity,
    y0 = Infinity,
    y1 = -Infinity;
  for (const [X, Y, Z] of piezas) {
    for (const dx of [0, 1]) {
      for (const dy of [0, 1]) {
        for (const dz of [0, 1]) {
          const [x, y] = proyectar(X + dx, Y + dy, Z + dz);
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
  }
  return [(x0 + x1) / 2, (y0 + y1) / 2];
}

/**
 * Sistema a medida: un encastre de cubos iguales que se rearma solo.
 *
 * El argumento de la región es que con las mismas piezas se construye lo
 * que tu operación necesita, y eso no se muestra con un objeto quieto:
 * hay que armar más de una cosa. Por eso ésta es la única marca de la
 * sección que tiene motivo para repetirse en loop.
 *
 * El cubo no lleva ningún efecto: sus tres caras son los tres tonos que
 * el sistema ya usa para profundidad —tinta-capa arriba, tinta-alta y
 * tinta-honda en los lados— y las aristas son el mismo filete de 1px que
 * divide toda la página. El volumen sale de los tokens.
 */
function MarcaEncastre({ vivo }: { vivo: boolean }) {
  const [forma, setForma] = useState(0);

  useEffect(() => {
    if (!vivo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(
      () => setForma((f) => (f + 1) % FORMAS.length),
      ESPERA,
    );
    return () => clearInterval(t);
  }, [vivo]);

  const piezas = [...NUCLEO, ...FORMAS[forma]];
  const [cx, cy] = centro(piezas);
  const foco = focos(piezas, forma, FOCOS);

  return (
    <div className={css.encastre}>
      <div
        className={css.campo}
        style={{
          ["--cx" as string]: -cx,
          ["--cy" as string]: -cy,
        }}
      >
        {piezas.map(([x, y, z], i) => (
          <div
            key={i}
            className={css.cubo}
            data-foco={foco.has(i) ? "" : undefined}
            style={{
              ["--x" as string]: x,
              ["--y" as string]: y,
              ["--z" as string]: z,
              /* Las cinco del núcleo entran primero y las cuatro sueltas
                 después, escalonadas: así la llegada arma el objeto en
                 vez de encenderlo entero. */
              ["--retardo" as string]: `${140 + i * 85}ms`,
            }}
          >
            <span className={css.cara} data-cara="sup" />
            <span className={css.cara} data-cara="izq" />
            <span className={css.cara} data-cara="der" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Automatización con IA: la cara que te sigue ---- */

/**
 * Dónde caen los ojos adentro de la cabeza, en fracciones de su caja.
 * Espejan al visor del CSS: son el punto desde el que cada ojo mide su
 * propio ángulo, así que si el visor se mueve, estos dos se mueven con
 * él.
 */
const OJO_X = 0.175;
const OJO_Y = 0.41;

/**
 * Distancia en píxeles a la que la mirada ya está al tope. Corta a
 * propósito: el bot no espera a que le pases por encima para mirarte.
 * Adentro de ese radio la deflexión cede, y eso además le saca el
 * temblor al ojo cuando el puntero le pasa justo por el centro, que es
 * donde la dirección se da vuelta de un cuadro al otro.
 */
const ALCANCE = 220;

/**
 * Constante de tiempo de la inercia de la mirada, en ms. Es la
 * diferencia entre un espejo y algo que decide mirarte: sin esto el ojo
 * copia al mouse cuadro a cuadro y deja de leerse como una cara.
 */
const TAU = 105;

/** Sin que el mouse se mueva este rato, el bot vuelve a la ronda. */
const ABURRIMIENTO = 4600;

/** Barras de la boca. */
const BOCA = 9;

/**
 * Automatización con IA: una cara que te sigue.
 *
 * Es la única marca de las cuatro que reacciona, y es a propósito: lo
 * que se contrata acá es un bot que atiende, o sea algo que está del
 * otro lado cuando el cliente escribe. Un proceso dibujado corriendo
 * solo no dice eso; una cara que te encuentra cuando movés el mouse,
 * sí. Acá el argumento es la interacción y no el dibujo.
 *
 * La cabeza está hecha con el material de la página y nada más: panel
 * tinta-alta sobre filete de 1px, visor tinta-honda hundido, dos
 * pupilas de hueso, una boca de barras y una antena de 1px con la luz
 * de estado en el único naranja de la marca. Cero radio, como todo acá:
 * es un bot, no un dibujito.
 *
 * El seguimiento va en tres capas y cada una a su velocidad —cabeza
 * lenta, rostro medio, pupilas rápidas—. Ese desfasaje es lo que hace
 * que la cabeza parezca girar en vez de deslizarse, y es el truco de la
 * referencia que trajo el cliente. Cada ojo mide su propio ángulo, así
 * que cuando el puntero se mete en la banda los dos convergen solos,
 * sin que nadie lo programe.
 *
 * Sin mouse —en el celular, o antes de que el visitante lo mueva— el
 * bot hace la ronda: mira a un punto, lo sostiene, mira a otro. La
 * marca late desde que carga igual que las otras tres, y con
 * prefers-reduced-motion se queda despierta y mirando de frente.
 */
function MarcaBot({ llego, vivo }: { llego: boolean; vivo: boolean }) {
  const raiz = useRef<HTMLDivElement>(null);
  const cabeza = useRef<HTMLDivElement>(null);
  const visor = useRef<HTMLDivElement>(null);
  const ojos = useRef<Array<HTMLSpanElement | null>>([null, null]);

  /* El lazo no se rearma cuando la marca entra y sale de pantalla: se
     entera por acá y deja de trabajar. Rearmarlo devolvería la mirada al
     centro cada vez que el visitante pasa de largo. */
  const enVista = useRef(vivo);
  useEffect(() => {
    enVista.current = vivo;
  }, [vivo]);

  useEffect(() => {
    if (!llego) return;
    const cont = raiz.current;
    const cab = cabeza.current;
    if (!cont || !cab) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Tres vectores, siempre en el mismo orden: la cabeza, el ojo
       izquierdo, el derecho. La cabeza mide desde el medio de la línea
       de ojos; cada ojo, desde el suyo. */
    const anclas = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    const destino = anclas.map(() => ({ x: 0, y: 0 }));
    const mirada = anclas.map(() => ({ x: 0, y: 0 }));

    /* Se mide el contenedor, que nunca se transforma, y la cabeza se
       ubica por su posición de maquetado. Medirla con
       getBoundingClientRect sería medirla con el desplazamiento de la
       propia mirada adentro: perseguirse la cola. */
    const medir = () => {
      const c = cont.getBoundingClientRect();
      const x = c.left + cab.offsetLeft;
      const y = c.top + cab.offsetTop + cab.offsetHeight * OJO_Y;
      const w = cab.offsetWidth;
      anclas[0] = { x: x + w / 2, y };
      anclas[1] = { x: x + w * (0.5 - OJO_X), y };
      anclas[2] = { x: x + w * (0.5 + OJO_X), y };
    };

    let puntero: { x: number; y: number } | null = null;
    let ultimoMov = 0;
    let remedir = true;

    const alMover = (e: PointerEvent) => {
      /* El toque no cuenta: en un celular el puntero aparece donde el
         dedo tocó, se queda ahí, y el bot se clava mirando un punto
         muerto. Sin mouse, ronda. */
      if (e.pointerType === "touch") return;
      puntero = { x: e.clientX, y: e.clientY };
      ultimoMov = performance.now();
      remedir = true;
    };
    /* El mouse se fue de la ventana: no hay a quién mirar. */
    const alSalir = () => {
      puntero = null;
    };
    /* La hoja se mueve y el mouse no, pero la cabeza sí: hay que volver
       a medir o la mirada queda apuntando a donde el bot ya no está. */
    const alCorrer = () => {
      remedir = true;
    };

    /* La ronda: mira a un punto, lo sostiene, mira a otro. Un seno sería
       un metrónomo; esto parece que busca algo. Una de cada cuatro es de
       frente, porque el descanso es lo que hace que el resto se lea como
       buscar. */
    const ronda = { x: 0, y: 0 };
    let hasta = 0;
    const otraRonda = (t: number) => {
      hasta = t + 1400 + Math.random() * 1900;
      if (Math.random() < 0.26) {
        ronda.x = 0;
        ronda.y = 0;
        return;
      }
      ronda.x = (Math.random() * 2 - 1) * 0.92;
      ronda.y = (Math.random() * 2 - 1) * 0.5;
    };

    let raf = 0;
    let previo = 0;

    const paso = (t: number) => {
      raf = requestAnimationFrame(paso);
      const dt = previo ? Math.min(80, t - previo) : 16;
      previo = t;
      if (!enVista.current) return;

      if (puntero && t - ultimoMov < ABURRIMIENTO) {
        if (remedir) {
          medir();
          remedir = false;
        }
        for (let i = 0; i < 3; i++) {
          const dx = puntero.x - anclas[i].x;
          const dy = puntero.y - anclas[i].y;
          const d = Math.hypot(dx, dy) || 1;
          const k = Math.min(1, d / ALCANCE);
          destino[i].x = (dx / d) * k;
          destino[i].y = (dy / d) * k;
        }
      } else {
        if (t > hasta) otraRonda(t);
        for (let i = 0; i < 3; i++) {
          destino[i].x = ronda.x;
          destino[i].y = ronda.y;
        }
      }

      /* El suavizado va por tiempo y no por cuadro: a 120 Hz la mirada
         tiene que tardar lo mismo que a 60. */
      const a = 1 - Math.exp(-dt / TAU);
      let anda = false;
      for (let i = 0; i < 3; i++) {
        const ex = destino[i].x - mirada[i].x;
        const ey = destino[i].y - mirada[i].y;
        if (Math.abs(ex) > 0.0008 || Math.abs(ey) > 0.0008) anda = true;
        mirada[i].x += ex * a;
        mirada[i].y += ey * a;
      }
      if (!anda) return;

      /* Dos variables para las capas de la cabeza y dos por ojo. El
         reparto lo hace el CSS: acá no se sabe cuánto viaja cada cosa. */
      cont.style.setProperty("--gx", mirada[0].x.toFixed(3));
      cont.style.setProperty("--gy", mirada[0].y.toFixed(3));
      for (let i = 0; i < 2; i++) {
        const ojo = ojos.current[i];
        if (!ojo) continue;
        ojo.style.setProperty("--px", mirada[i + 1].x.toFixed(3));
        ojo.style.setProperty("--py", mirada[i + 1].y.toFixed(3));
      }
    };

    /* Primero abre los ojos, después te encuentra. Enganchar la mirada
       mientras la pupila todavía está entrando junta los dos momentos en
       uno solo y se pierde el mejor: el bot despertándose. */
    const arranque = window.setTimeout(() => {
      raf = requestAnimationFrame(paso);
    }, 620);

    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("scroll", alCorrer, { passive: true });
    window.addEventListener("resize", alCorrer);
    document.addEventListener("mouseleave", alSalir);

    return () => {
      window.clearTimeout(arranque);
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("scroll", alCorrer);
      window.removeEventListener("resize", alCorrer);
      document.removeEventListener("mouseleave", alSalir);
    };
  }, [llego]);

  /* El parpadeo va por su cuenta, a intervalos irregulares y sin gastar
     un cuadro de animación: es un atributo que se prende 130 ms. */
  useEffect(() => {
    if (!llego) return;
    const v = visor.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let baja = 0;
    let sube = 0;
    const programar = () => {
      baja = window.setTimeout(
        () => {
          if (enVista.current) {
            v.setAttribute("data-parpadea", "");
            sube = window.setTimeout(
              () => v.removeAttribute("data-parpadea"),
              130,
            );
          }
          programar();
        },
        2600 + Math.random() * 4200,
      );
    };
    programar();

    return () => {
      window.clearTimeout(baja);
      window.clearTimeout(sube);
    };
  }, [llego]);

  return (
    <div ref={raiz} className={css.bot}>
      <div ref={cabeza} className={css.cabeza}>
        <span className={css.antena} />
        <span className={css.lampara} />
        <div className={css.rostro}>
          <div ref={visor} className={css.visor}>
            {[0, 1].map((i) => (
              <span
                key={i}
                className={css.ojo}
                ref={(el) => {
                  ojos.current[i] = el;
                }}
              >
                <span className={css.pupila} />
              </span>
            ))}
            <span className={css.parpado} />
          </div>
          <div className={css.boca}>
            {Array.from({ length: BOCA }, (_, i) => (
              <span
                key={i}
                className={css.diente}
                style={{ ["--i" as string]: i }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Capacitaciones: el anillo de traspaso ---- */

/**
 * Los glifos de las seis herramientas: catorce por catorce, trazo de
 * 1px, sin relleno y sin una sola curva. Están dibujados con el mismo
 * material que el resto de la página —la caja y el filete— y no salen de
 * ninguna librería: un ícono de stock acá diría "tecnología en general",
 * que es justo lo que esta sección no quiere decir.
 */
const GLIFOS: Record<GlifoHerramienta, React.ReactNode> = {
  /* El bot atiende: un panel con su cola. */
  bot: (
    <>
      <rect x="1.5" y="2.5" width="11" height="7" />
      <path d="M4 9.5v3l3-3" />
    </>
  ),
  /* El sitio: un viewport con su barra, el mismo de la marca 01. */
  sitio: (
    <>
      <rect x="1.5" y="2.5" width="11" height="9" />
      <path d="M1.5 5.5h11" />
    </>
  ),
  /* Los informes: barras sobre una base. */
  informes: <path d="M1.5 12.5h11M4 12.5V8M7 12.5V3.5M10 12.5V6" />,
  /* La automatización: dos bloques y el paso de uno al otro. */
  automatizaciones: (
    <>
      <rect x="1" y="4.5" width="4" height="5" />
      <rect x="9" y="4.5" width="4" height="5" />
      <path d="M5 7h4M7.4 5.6 8.8 7l-1.4 1.4" />
    </>
  ),
  /* La IA: un chip con sus patas. */
  ia: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <path d="M5.5 3.5v-2M8.5 3.5v-2M5.5 12.5v-2M8.5 12.5v-2M3.5 5.5h-2M3.5 8.5h-2M10.5 5.5h2M10.5 8.5h2" />
    </>
  ),
  /* El sistema: cuatro bloques asignados, el eco del encastre de la 02. */
  sistema: (
    <>
      <rect x="1.5" y="1.5" width="4.5" height="4.5" />
      <rect x="8" y="1.5" width="4.5" height="4.5" />
      <rect x="1.5" y="8" width="4.5" height="4.5" />
      <rect x="8" y="8" width="4.5" height="4.5" />
    </>
  ),
};

/**
 * La caja del anillo, en las mismas unidades que el viewBox. Es la
 * proporción de la marca —5:4— así que el SVG calza sin sobrantes.
 *
 * El hexágono es más alto que ancho a propósito: comprimido en X, los
 * cuatro nodos de los costados se corren hacia adentro y dejan lugar a
 * su nombre, que es lo único que esta marca tiene para decir. Un
 * hexágono regular en una caja apaisada empuja los nombres fuera del
 * cuadro.
 *
 * La compresión tiene un piso, y lo fija el centro: el nodo mide lo
 * mismo a cualquier escala mientras la figura se achica con la caja, así
 * que en un teléfono se come una parte mucho mayor del interior. Con rx
 * más chico el panel del centro termina contra los nodos de los
 * costados. 96 es lo más angosto que entra sin que se toquen.
 */
const ANILLO = { ancho: 440, alto: 352, rx: 96, ry: 112 };

/**
 * Los tiempos del anillo no están acá: viven en el CSS, que es donde
 * está la animación, y de ahí salen los retardos de cada pieza con
 * calc(). Acá sólo viaja el índice. Tenerlos en los dos lados era
 * tenerlos en ninguno: el día que uno se toca, el otro queda desfasado
 * sin que nada avise.
 */

/** El vértice de la herramienta i, en sentido horario desde las 12. */
function vertice(i: number, total: number): [number, number] {
  const t = ((-90 + (360 / total) * i) * Math.PI) / 180;
  return [
    ANILLO.ancho / 2 + Math.cos(t) * ANILLO.rx,
    ANILLO.alto / 2 + Math.sin(t) * ANILLO.ry,
  ];
}

const VERTICES = HERRAMIENTAS.map((_, i) => vertice(i, HERRAMIENTAS.length));

/** Del sistema de coordenadas del viewBox al porcentaje de la caja. */
const porc = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

/**
 * Capacitaciones: el anillo de traspaso.
 *
 * Seis herramientas en las puntas de un hexágono, en orden de dirección
 * desde las 12, que pasan de violeta —las opera Origen— a hueso —las
 * opera tu equipo—, de a una y en sentido horario.
 *
 * Son dos movimientos y no uno. Primero el traspaso, que corre una sola
 * vez al llegar y no vuelve: el color de fondo de cada herramienta queda
 * en hueso para siempre, porque una entrega que se deshace para volver a
 * hacerse no sería una entrega. Después la ronda, que no se detiene
 * nunca: una luz naranja que sigue dando vueltas por el anillo ya
 * entregado, de nodo a arista a nodo, sin devolver nada.
 *
 * La diferencia importa y es la única forma de que el anillo lata sin
 * mentir: lo que late es la operación corriendo en manos de tu equipo,
 * no el traspaso rehaciéndose.
 *
 * La geometría va en SVG y la tipografía en HTML, cada una en lo suyo:
 * el hexágono escala con la caja sin perder el pelo de 1px, y los
 * nombres conservan su cuerpo y su tracking en vez de achicarse con el
 * dibujo hasta volverse ilegibles en un teléfono.
 */
function MarcaAnillo() {
  /* Dónde cae el nombre de cada herramienta. Arriba y abajo va centrado
     sobre su nodo, donde tiene todo el ancho de la caja; a los costados
     se aparta hacia afuera y sólo cuenta con el margen que sobra. Por
     eso las dos herramientas de nombre más largo son las que caen a las
     12 y a las 6: el reparto sigue la dirección, y la dirección se
     asignó sabiendo cuánto mide cada nombre. */
  const lado = (i: number, x: number) =>
    i === 0
      ? "arriba"
      : i === HERRAMIENTAS.length / 2
        ? "abajo"
        : x > ANILLO.ancho / 2
          ? "der"
          : "izq";

  const sitio = (i: number) => ({
    left: porc(VERTICES[i][0], ANILLO.ancho),
    top: porc(VERTICES[i][1], ANILLO.alto),
    ["--i" as string]: i,
  });

  return (
    <div
      className={css.anillo}
      /* Cuántas piezas da la vuelta: con esto el CSS reparte la ronda
         sin que nadie tenga que repetir el seis. */
      style={{ ["--piezas" as string]: HERRAMIENTAS.length }}
    >
      {/* El dibujo es textura y se esconde; los nombres, abajo, no. */}
      <div className={css.dibujo} aria-hidden="true">
        <svg
          className={css.trama}
          viewBox={`0 0 ${ANILLO.ancho} ${ANILLO.alto}`}
          focusable="false"
        >
          {VERTICES.map(([x1, y1], i) => {
            const [x2, y2] = VERTICES[(i + 1) % VERTICES.length];
            return (
              <line
                key={i}
                className={css.arista}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                /* El filete es de 1px en toda la página y acá también: la
                   arista no engorda cuando el SVG se agranda. */
                vectorEffect="non-scaling-stroke"
                /* La arista va medio paso detrás de su nodo, tanto en el
                   traspaso como en la ronda: el frente avanza de nodo a
                   arista a nodo, en vez de parpadear por bloques. */
                style={{ ["--i" as string]: i }}
              />
            );
          })}
        </svg>

        {HERRAMIENTAS.map((h, i) => (
          <span key={h.direccion} className={css.nodo} style={sitio(i)}>
            <svg viewBox="0 0 14 14" focusable="false">
              {GLIFOS[h.glifo]}
            </svg>
          </span>
        ))}
      </div>

      <ul className={css.nombres}>
        {HERRAMIENTAS.map((h, i) => (
          <li
            key={h.direccion}
            className={css.herramienta}
            data-lado={lado(i, VERTICES[i][0])}
            style={sitio(i)}
          >
            {h.nombre}
          </li>
        ))}
      </ul>

      {/* Quién queda a cargo, en la misma dirección que la región 04 del
          mapa. Es el único naranja que sobrevive al traspaso, y es una
          dirección: una medida de máquina, no un acento decorativo. */}
      {/* Los espacios entre spans no son de maquetado: la grilla los
          ignora, pero sin ellos el lector de pantalla lee las tres
          líneas pegadas en una sola palabra. */}
      <p className={css.centro}>
        <span className={css.centroDir}>0xC000</span>{" "}
        <span className={css.centroQuien}>Tu equipo</span>{" "}
        <span className={css.centroRotulo}>a cargo</span>
      </p>
    </div>
  );
}
