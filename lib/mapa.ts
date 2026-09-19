/**
 * Mapa de memoria de una operación.
 *
 * Las regiones se ordenan por dirección ascendente y ese orden es el
 * orden real de entrega: primero está lo que hoy no está asignado —la
 * operación hecha a mano— y después cada región que se va reservando.
 *
 * El campo de bytes se genera con un PRNG sembrado para que el servidor
 * y el cliente rindan exactamente lo mismo. La mutación arranca recién
 * después de montar, así no hay desajuste de hidratación.
 */

export type Region = {
  n: string;
  direccion: string;
  nombre: string;
  /** Lo que gana el negocio. Va primero, antes que cualquier detalle. */
  promesa: string;
  detalle: string;
  /** Rótulos con línea de llamada sobre la capa. */
  llamadas: string[];
  entrega: string[];
  /** Segunda lectura: aparece al interactuar, no al scrollear. */
  latente: string;
  /** Servicio asociado, si la región es un servicio. */
  servicio?: "desarrollo" | "automatizacion" | "capacitacion";
  /** Sin asignar: la región que late sola. */
  libre?: boolean;
  /** Textura propia de la capa: cada región se ve distinta por dentro. */
  patron: "bytes" | "bloques" | "flujo" | "celdas";
};

export const REGIONES: Region[] = [
  {
    n: "01",
    direccion: "0x0000",
    nombre: "Sin asignar",
    promesa: "Lo que hoy hace tu gente a mano.",
    detalle:
      "Turnos por WhatsApp, presupuestos que se rehacen igual cada vez, stock en una planilla y los mismos datos cargados en tres lugares. Nada de eso está reservado: ocupa horas y no deja registro.",
    llamadas: ["Sin estructura", "Sin registro"],
    entrega: [
      "Turnos que se toman por WhatsApp",
      "Presupuestos que se rehacen igual cada vez",
      "Stock que vive en una planilla",
      "Los mismos datos en tres lugares distintos",
    ],
    latente:
      "Nada de esto se automatiza sin relevarlo antes: primero miramos cómo trabajan hoy.",
    libre: true,
    patron: "bytes",
  },
  {
    n: "02",
    direccion: "0x4000",
    nombre: "Sistema a medida",
    promesa: "Tu operación deja de vivir en planillas.",
    detalle:
      "Software que hace exactamente lo que tu operación necesita. Ni un módulo de más, ni una licencia por usuario que no usás.",
    llamadas: ["Código en tus manos", "Sin licencias por usuario"],
    entrega: [
      "Relevamiento de la operación tal como funciona hoy",
      "Sistema propio, con el código en tus manos",
      "Migración de lo que ya tenés cargado",
    ],
    latente: "El repositorio queda a tu nombre desde el primer commit.",
    servicio: "desarrollo",
    patron: "bloques",
  },
  {
    n: "03",
    direccion: "0x8000",
    nombre: "Automatización con IA",
    promesa: "Lo repetitivo deja de pasar por una persona.",
    detalle:
      "Vos revisás y decidís; el sistema ejecuta el resto. Cada cosa que hace queda registrada y se puede auditar.",
    llamadas: ["Revisión humana", "Registro auditable"],
    entrega: [
      "Mapa de las tareas que se repiten todas las semanas",
      "Automatizaciones con revisión humana donde importa",
      "Registro de todo lo que el sistema hizo solo",
    ],
    latente: "Las decisiones sensibles nunca se automatizan sin confirmación.",
    servicio: "automatizacion",
    patron: "flujo",
  },
  {
    n: "04",
    direccion: "0xC000",
    nombre: "Tu equipo a cargo",
    promesa: "El sistema queda en manos de los que lo usan.",
    detalle:
      "Te entregamos el sistema y la gente que lo sabe manejar. El objetivo declarado es que no dependas de nosotros.",
    llamadas: ["Una persona a cargo", "Material propio"],
    entrega: [
      "Formación sobre el sistema que usan todos los días",
      "Material propio, en el vocabulario de tu negocio",
      "Una persona de tu equipo que queda a cargo",
    ],
    latente: "La capacitación entra en la entrega, no se cotiza aparte.",
    servicio: "capacitacion",
    patron: "celdas",
  },
];

/* ------------------------------------------------------------------ *
 * Campo de bytes
 * ------------------------------------------------------------------ */

const HEX = "0123456789ABCDEF";

/** PRNG sembrado (mulberry32): mismo resultado en servidor y cliente. */
export function sembrar(semilla: number): () => number {
  let a = semilla >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function byteAleatorio(r: () => number): string {
  return HEX[Math.floor(r() * 16)] + HEX[Math.floor(r() * 16)];
}

/** Campo inicial determinista. */
export function campoInicial(celdas: number, semilla = 20260916): string[] {
  const r = sembrar(semilla);
  return Array.from({ length: celdas }, () => byteAleatorio(r));
}

/**
 * Bloques asignados: anchos que simulan estructuras reservadas en vez
 * de ruido. Cada región asignada rinde su propio patrón estable.
 */
export function bloquesAsignados(
  filas: number,
  semilla: number,
): { ancho: number; hueco: number }[][] {
  const r = sembrar(semilla);
  return Array.from({ length: filas }, () => {
    const n = 2 + Math.floor(r() * 2);
    return Array.from({ length: n }, () => ({
      ancho: 14 + Math.floor(r() * 46),
      hueco: 3 + Math.floor(r() * 9),
    }));
  });
}

/**
 * Flujo: un proceso que corre solo. Carriles con nodos, algunos con
 * desvío de revisión humana — que es exactamente lo que dice la región.
 */
export function flujoAsignado(
  carriles: number,
  semilla: number,
): { pos: number; revisa: boolean }[][] {
  const r = sembrar(semilla);
  return Array.from({ length: carriles }, () => {
    const n = 3 + Math.floor(r() * 3);
    let x = 6 + r() * 10;
    return Array.from({ length: n }, () => {
      x += 12 + r() * 20;
      return { pos: Math.min(94, x), revisa: r() > 0.72 };
    });
  });
}

/** Celdas: una grilla de unidades, algunas ya a cargo. */
export function celdasAsignadas(
  total: number,
  semilla: number,
): boolean[] {
  const r = sembrar(semilla);
  return Array.from({ length: total }, () => r() > 0.42);
}

export function direccionFila(base: string, fila: number): string {
  const n = parseInt(base, 16) + fila * 0x10;
  return "0x" + n.toString(16).toUpperCase().padStart(4, "0");
}
