/* ------------------------------------------------------------------ *
 * PENDIENTE DE DEFINIR — reemplazar antes de publicar.
 * ------------------------------------------------------------------ */

/** Número de WhatsApp en formato internacional, sin + ni espacios. */
export const WHATSAPP_NUMERO = "";

/* ------------------------------------------------------------------ */

/** URLs propias de cada unidad de negocio. Entregadas el 2026-09-18. */
export const URL_LINGUA_CAMPUS = "https://www.lingua-campus.com.ar/";
export const URL_PASEOS_CON_PEQUES = "https://www.paseosconpeques.com.ar";

/* El panel de monitoreo. Enlazable desde el 2026-09-18.
 *
 * Hasta esa fecha no se enlazaba, y el motivo está en PRODUCT.md: la
 * página lleva la marca, el teléfono y el mail de la empresa de
 * instalaciones eléctricas, así que enlazarla la nombra igual de fuerte
 * que escribir el nombre. El cliente confirmó que la empresa dio el ok.
 *
 * Lo que NO cambió y sigue mandando: la empresa no se nombra en esta
 * página y el prototipo no se presenta como cliente ni como caso de
 * éxito. No es cliente de Origen —un empleado pidió el prototipo para
 * proponérselo a su jefe— y la descripción de la unidad tiene que seguir
 * diciendo "una propuesta interna en una empresa de instalaciones
 * eléctricas", sin nombre. El permiso era para el enlace, no para el
 * relato. */
export const URL_MONITOREO = "https://telemetrias.vercel.app/";

/* ------------------------------------------------------------------ */

export const MARCA = {
  lockup: "Origen MdP — Costa Tech",
  origen: "Origen MdP",
  costa: "Costa Tech",
  ciudad: "Mar del Plata",
  mail: "info.origenmdp@gmail.com",
  respuesta: "Respondemos en menos de 24 horas.",
};

export const PORTADA = {
  titulo: "Automatizamos la parte de tu negocio que todavía se hace a mano.",
  bajada:
    "Software a medida, automatización con IA y capacitación para empresas de Mar del Plata.",
  /* La línea es del propio cliente y es mejor que cualquier reemplazo. */
  prueba:
    "Si Salesforce es demasiado grande y una planilla de Excel ya no alcanza, estamos exactamente en el medio que necesitás.",
};

export type ServicioId = "desarrollo" | "automatizacion" | "capacitacion";

export type Servicio = {
  id: ServicioId;
  n: string;
  nombre: string;
};

/**
 * Las tres regiones reservables del mapa, tal como se nombran al cotizar.
 *
 * El nombre y el número son los de la tarjeta de OFERTA, no los del mapa:
 * el que llega al formulario viene de leer la oferta y tiene que
 * reconocer lo que eligió. El mapa llama "Tu equipo a cargo" a la región
 * 04 porque ahí cuenta cómo trabajamos; acá se contrata, y se contrata
 * una capacitación.
 */
export const SERVICIOS: Servicio[] = [
  { id: "desarrollo", n: "02", nombre: "Sistema a medida" },
  { id: "automatizacion", n: "03", nombre: "Automatización con IA" },
  { id: "capacitacion", n: "04", nombre: "Capacitaciones" },
];

/**
 * La marca que acompaña a cada servicio en la sección. Las dos primeras
 * son las mismas texturas que la región del mapa usa para ese servicio,
 * así la oferta se lee como la traducción en criollo de lo que ya vio
 * arriba.
 *
 * Las otras dos rompen esa regla a propósito, y por el mismo motivo: el
 * mapa cuenta el proceso, y acá se contrata otra cosa. La del bot es una
 * cara, porque lo que se contrata es algo que atiende y no un proceso
 * dibujado. La del anillo nombra las seis herramientas que quedan a
 * cargo del equipo, porque una capacitación que no dice qué se aprende
 * no dice nada.
 */
export type MarcaOferta = "sitio" | "encastre" | "bot" | "anillo";

/**
 * La oferta completa: cuatro servicios, sin metáfora. El mapa cuenta el
 * proceso; esta sección dice qué se contrata.
 *
 * Son cuatro y no seis a propósito: la 02, la 03 y la 04 son exactamente
 * las tres regiones reservables del mapa, con el mismo nombre y el mismo
 * número, y la 01 es el escalón de entrada para el que todavía no compra
 * un sistema. El sitio y la tienda son la misma compra —tu cara pública—
 * y el bot de WhatsApp es el caso más concreto de automatización con IA,
 * así que se nombra al arrancar su detalle en vez de ocupar una tarjeta.
 */
export const OFERTA: {
  n: string;
  nombre: string;
  detalle: string;
  marca: MarcaOferta;
}[] = [
  {
    n: "01",
    nombre: "Sitio web o tienda online",
    marca: "sitio",
    detalle:
      "Presencia digital clara y rápida, con e-commerce a medida si vendés. Sin costos de mantenimiento desproporcionados.",
  },
  {
    n: "02",
    nombre: "Sistema a medida",
    marca: "encastre",
    detalle:
      "Clientes, turnos, inventario. El código queda a tu nombre y pagás sólo por lo que realmente usás.",
  },
  {
    n: "03",
    nombre: "Automatización con IA",
    marca: "bot",
    detalle:
      "Bot de WhatsApp que atiende consultas y reservas las 24 horas. IA en tus procesos, con revisión humana donde importa.",
  },
  {
    n: "04",
    nombre: "Capacitaciones",
    marca: "anillo",
    detalle:
      "Tu equipo aprende a manejar las herramientas que usa todos los días, sin depender de nosotros.",
  },
];

/**
 * Las seis herramientas que la capacitación deja a cargo del equipo del
 * cliente, en el orden en que se traspasan.
 *
 * El orden es de afuera hacia adentro —lo que atiende al cliente
 * primero, lo que corre por debajo después— y una vez fijado manda: el
 * anillo las reparte en sentido horario desde las 12 siguiendo la
 * dirección, sin excepción, como el resto de la página.
 *
 * Las direcciones cuelgan de 0xC000, que es la región 04 del mapa —"Tu
 * equipo a cargo"—, así la marca vive en la misma dirección que la
 * región que la explica arriba.
 *
 * No son productos de terceros y no se nombra ninguna marca ajena: son
 * las piezas que Origen construye y después entrega. Nombrarlas es lo
 * que vuelve concreta una capacitación que, dicha en abstracto, no dice
 * qué se aprende.
 */
export type Herramienta = {
  direccion: string;
  nombre: string;
  glifo: GlifoHerramienta;
};

export type GlifoHerramienta =
  | "bot"
  | "sitio"
  | "informes"
  | "automatizaciones"
  | "ia"
  | "sistema";

export const HERRAMIENTAS: Herramienta[] = [
  { direccion: "0xC000", nombre: "Bot de WhatsApp", glifo: "bot" },
  { direccion: "0xC001", nombre: "Tu sitio", glifo: "sitio" },
  { direccion: "0xC002", nombre: "Informes", glifo: "informes" },
  { direccion: "0xC003", nombre: "Automatizaciones", glifo: "automatizaciones" },
  { direccion: "0xC004", nombre: "Uso de IA", glifo: "ia" },
  { direccion: "0xC005", nombre: "Tu sistema", glifo: "sistema" },
];

/**
 * Lo que el mercado ofrece y no resuelve. Copy del propio cliente.
 *
 * Sin renderizar desde el 2026-09-18. El bloque que las mostraba está
 * comentado al final de la sección 03 en components/Pagina.tsx, con el
 * motivo entero. Queda como dato vivo y no como comentario a propósito:
 * las dos frases son posicionamiento confirmado en PRODUCT.md y se
 * pueden seguir trabajando acá sin tocar el markup.
 */
export const CONTRA = [
  {
    problema: "Plataformas enormes y caras",
    detalle:
      "Herramientas diseñadas para grandes empresas, que para un negocio chico terminan siendo demasiado complejas y demasiado caras.",
  },
  {
    problema: "Freelancers sin continuidad",
    detalle:
      "Te hacen la página y desaparecen. Sin soporte, sin evolución, sin nadie que entienda tu negocio cuando algo falla o querés crecer.",
  },
];

/**
 * Cómo está el mapa abajo de una unidad, región por región.
 *
 * `asignada` son bloques llenos: está construida y corriendo. `reservada`
 * va punteada —existe y funciona, pero no está en producción en ningún
 * lado—, la misma notación que usa la línea de comunidad para lo que
 * todavía no pasó. `libre` es ruido: esa región no la tomó nadie acá.
 *
 * 0x0000 no figura y no va a figurar nunca: por definición no se asigna
 * —es la parte que se sigue haciendo a mano— y corre igual abajo de las
 * tres unidades, que es exactamente lo que dice el título de la sección.
 *
 * Confirmado con el cliente el 2026-09-18, unidad por unidad. Es dato
 * sobre productos propios en la única sección que se apoya en que todo es
 * chequeable, así que no se completa por analogía ni por lo que parecería
 * razonable: una región que nadie confirmó se queda en `libre`.
 */
export type EstadoRegion = "asignada" | "reservada" | "libre";

export type Asignacion = Record<"0x4000" | "0x8000" | "0xC000", EstadoRegion>;

export type Unidad = {
  id: string;
  nombre: string;
  descripcion: string;
  /** Dato real y verificable. Nunca inventado. */
  dato: string;
  url: string;
  estado: string;
  /**
   * Cómo está el mapa abajo de esta unidad.
   *
   * SIN RENDERIZAR desde el 2026-09-18: la placa de cada banda pasó a ser
   * el lugar del logotipo y el mapa por unidad salió de la página. El dato
   * queda vivo y confirmado —no comentado— porque es lo único que volvía
   * chequeable el título de la sección, y el día que haya dónde mostrarlo
   * no hay que volver a preguntarlo. Mismo criterio que CONTRA.
   */
  asignacion: Asignacion;
  /**
   * El cliente no se nombra.
   *
   * Hasta el 2026-09-18 esto también quería decir "no se enlaza". El
   * enlace ya está permitido; lo que sigue reservado es el nombre, y eso
   * lo cuida la descripción de la unidad, no este campo.
   */
  reservado?: boolean;
};

/** Lo construido y en funcionamiento. Todo verificado con el cliente. */
export const UNIDADES: Unidad[] = [
  {
    id: "lingua-campus",
    nombre: "Lingua Campus",
    descripcion:
      "Sistema de gestión para institutos de idiomas, con práctica asistida por IA. Alumnos, cursos, progreso y reportes en un solo lugar.",
    dato: "Primer cliente en uso",
    url: URL_LINGUA_CAMPUS,
    estado: "En operación",
    /* La única con dos regiones tomadas, y las dos se tocan entre sí: la
       profesora carga en el sistema lo que se vio en el aula y la práctica
       con IA sale de ahí. 0xC000 queda libre porque nadie confirmó que el
       instituto lo maneje sin nosotros, y en esta sección lo que no se
       confirmó no se dibuja asignado. */
    asignacion: {
      "0x4000": "asignada",
      "0x8000": "asignada",
      "0xC000": "libre",
    },
  },
  {
    id: "paseos-con-peques",
    nombre: "Paseos con Peques",
    /* "Gratuita" y "abierta para cualquier familia" son el hecho de
       comunidad de esta unidad y faltaban: la tarjeta describía el producto
       y no decía para quién es ni a qué precio.

       "Sostenida con auspicios locales" dice que hay sponsors y no dice
       cuántos ni quiénes, que es todo lo que corresponde decir. Cuántos es
       un número que hoy juega en contra y que nadie preguntó; quiénes son
       terceros con marca propia, y uno de ellos es justamente el cliente de
       Lingua Campus, que en PRODUCT.md figura como real y sin nombrar. Si
       alguna vez se listan, se piden permisos primero. */
    descripcion:
      "Guía digital y gratuita de lugares y actividades para familias con chicos en Mar del Plata, con bot de WhatsApp y sitio propio. Abierta para cualquier familia, sostenida con auspicios locales.",
    dato: "16.000 seguidores",
    url: URL_PASEOS_CON_PEQUES,
    estado: "En operación",
    /* Una sola región, y es la que más gente usa de toda la página: el bot
       de WhatsApp que atiende. El sitio y la guía no son un sistema a
       medida y 0xC000 no aplica —la opera Origen, no hay entrega a un
       tercero—, así que las dos quedan en ruido. Una unidad en operación
       con una sola región tomada no es una unidad a medias: es lo que
       necesitaba. */
    asignacion: {
      "0x4000": "libre",
      "0x8000": "asignada",
      "0xC000": "libre",
    },
  },
  {
    id: "monitoreo",
    nombre: "Panel de monitoreo remoto",
    descripcion:
      "Telemetría para equipamiento eléctrico e industrial: tensión, corriente, temperatura y estado de tablero, reportados desde donde esté el equipo. Construido para una propuesta interna en una empresa de instalaciones eléctricas.",
    dato: "Prototipo funcionando",
    url: URL_MONITOREO,
    estado: "Prototipo",
    /* Punteada y no llena: el panel existe y anda, pero su propia página
       avisa que el monitoreo no está instalado en ningún lado. Dibujarlo
       con bloques llenos al lado de dos unidades que sí están corriendo
       sería la única mentira de la sección. La telemetría reporta y
       muestra; no dispara nada sola, así que 0x8000 queda en ruido. */
    asignacion: {
      "0x4000": "reservada",
      "0x8000": "libre",
      "0xC000": "libre",
    },
    reservado: true,
  },
];

/**
 * Trabajo de comunidad: lo que se construyó sin que lo pague un cliente.
 *
 * Era `PREMIOS` y eran dos hackathones. Se abre el 2026-09-18 porque los
 * premios solos se leían como currículum y porque el par cerrado no
 * dejaba agregar nada: entran también proyectos propios de comunidad, y
 * lo que está anunciado y todavía no existe.
 *
 * Regla de la lista, y no es negociable: todo lo que está acá o pasó y se
 * puede chequear, o lleva `reservado` y cae del lado sin asignar de la
 * línea. No hay tercera categoría.
 */
export type HitoComunidad = {
  /** El año en que arrancó. `null` mientras no esté confirmado. */
  anio: string | null;
  /**
   * El año en que terminó, cuando el hito duró y no fue un momento.
   * Con `hasta` el nodo deja de ser un punto y se dibuja como barra:
   * un hackathon dura un fin de semana, un sistema en producción dura
   * años, y la línea tiene que poder decir la diferencia.
   */
  hasta?: string;
  titulo: string;
  /** Quién convocó, donde hay una institución que nombrar. */
  organiza?: string;
  /** El resultado que dio un tercero. */
  puesto?: string;
  /** Medidas del evento, en mono. Todas contables por cualquiera. */
  cifras?: string[];
  detalle: string;
  /** Quién lo contó, con nombre legible. */
  fuente?: string;
  /** La nota, para poder chequearlo de verdad y no de palabra. */
  fuenteUrl?: string;
  /** El proyecto, donde todavía se puede entrar y verlo andar. */
  url?: string;
  /** El estado presente, cuando no es simplemente "cerrado". */
  estado?: string;
  /** Todavía no existe: cae del lado sin asignar. */
  reservado?: boolean;
};

/**
 * El encabezado del registro de comunidad. Vive acá y no en el componente
 * porque es copy, y toda la copy de esta página vive en un solo archivo.
 */
export const COMUNIDAD_INTRO = {
  titulo: "Nada de esto lo pidió un cliente",
  bajada:
    "Para gente de Mar del Plata, desde 2015. Algunos siguen en pie y otros pararon; están los dos, con el año en que arrancaron y el que dejaron de andar.",
};

export const COMUNIDAD: HitoComunidad[] = [
  {
    anio: "2017",
    titulo: "MdP Data Fest",
    organiza: "ATICMA · Mar del Plata Entre Todos",
    puesto: "1er puesto",
    /* Las dos salen de la nota que está enlazada abajo: cualquiera puede
       contarlas. Igual que en la del 2022, son lo único de la entrada que
       no depende de que nos crean. */
    cifras: ["+40 participantes", "11 proyectos"],
    detalle:
      "Hackathon de datos abiertos ciudadanos. API pública, panel web de carga y app Android sobre encuestas de percepción ciudadana.",
    fuente: "aticma.org.ar",
    fuenteUrl: "https://www.aticma.org.ar/hackaton-mdp-data-fest/",
  },
  {
    anio: "2022",
    titulo: "Hackathon MGP 2022",
    organiza: "Municipalidad de General Pueyrredon",
    puesto: "1er puesto · eje Turismo",
    /* Estaban en PRODUCT.md y no estaban en la página. Son lo único de
       esta sección que un tercero puede contar por su cuenta, así que se
       muestran en mono y no enterradas en el párrafo. */
    cifras: ["23 h", "120 inscriptos", "10 proyectos"],
    detalle:
      "AppTacc: guía colaborativa de gastronomía sin gluten para la comunidad celíaca de Mar del Plata. Ya estaba funcionando al momento de la premiación.",
    fuente: "Diario La Capital",
    fuenteUrl:
      "https://www.lacapitalmdp.com/tres-aplicaciones-fueron-las-grandes-ganadoras-del-hackathon-mgp/",
  },
  {
    /* El más viejo de la lista y el que mejor contesta la pregunta con
       la que llega el visitante: cinco años sosteniendo algo, con una
       reescritura entera en el medio, es lo contrario exacto de "te
       hacen la página y desaparecen". Va como tramo y no como punto
       porque duró: la barra arranca en 2015 y termina en 2020, y que
       termine ahí es parte de lo que se está diciendo. */
    anio: "2015",
    hasta: "2020",
    titulo: "Gestión Atlantis",
    estado: "Sin uso desde 2020",
    /* Sin repetir los años: ya los lleva la canaleta arriba y abajo de la
       barra. Con el año adentro de cada cifra los puntos separadores se
       confundían entre sí y la fila se leía como una sola cadena. */
    cifras: ["PHP", "Node y React desde 2019", "5 años en uso"],
    /* Los nueve años de dirigente van acá y no en la bajada porque acá
       explican algo: son la razón por la que este proyecto traccionó y
       otros no. No lo escribió un programador para un grupo scout, lo
       escribió alguien del movimiento que sufría el problema. Va en voz
       de empresa y sin primera persona del singular, como pide
       PRODUCT.md: la página no habla como una persona.

       PENDIENTE: revisar qué resolvía de verdad. Acá está lo que se dijo
       en la conversación y nada más; no se le agregó una lista de
       funcionalidades que nadie confirmó. */
    detalle:
      "Sistema de gestión para grupos scouts, escrito desde adentro del movimiento: nueve años de dirigente antes de la primera línea de código. La primera versión fue en PHP; en 2019 se reescribió entera con Node y React. Corrió hasta la pandemia y no se retomó.",
  },
  {
    /* El antecedente que le da apoyo al juego reservado del final: el tema
       no apareció ayer, ya se había empezado a construir en 2019. Van
       seguidos en la línea a propósito, aunque uno esté del lado asignado
       y el otro no. */
    anio: "2019",
    hasta: "2020",
    titulo: "Descubrí MdP",
    estado: "Frenado en 2020",
    /* descubrimdp.web.app sigue arriba, pero lo que hay del otro lado es
       una portada que dice "pronto podrás recorrer Mar del Plata" y lo
       viene diciendo desde 2020. Enlazarla desde una entrada que ya avisa
       que el proyecto frenó manda al visitante a un cartel de "pronto" de
       seis años, que es exactamente la impresión que esta sección existe
       para desarmar. Vuelve el día que del otro lado haya algo que se
       pueda usar. */
    detalle:
      "App de turismo para reconocer los lugares históricos de la ciudad. Arrancó en 2019 y se frenó con la pandemia.",
  },
  {
    /* La entrada más nueva y la única que sigue en pie, así que es la que
       contesta si esto sigue vivo. Queda como punto y no como barra porque
       no terminó: está arriba y funcionando.

       El estado dice "casi sin uso" y no "en línea" a propósito. Las dos
       cosas son ciertas, pero rotularlo "en línea" a secas haría creer que
       tiene gente adentro, y eso sería mentir por omisión en la única
       sección de la página que se sostiene en que todo es chequeable.

       El porqué va en el texto y sin adornarlo: el juego terminó sumando
       su propio chat. Dicho pelado, el lector saca solo la conclusión de
       que el hueco estaba y alguien lo vio antes; escribirla nosotros
       sería venderla, y acá no se vende nada. */
    anio: "2023",
    titulo: "PokeChat",
    estado: "Casi sin uso",
    url: "https://pogo-mdp-chat.web.app/",
    detalle:
      "Chat para los jugadores de Pokémon Go de Mar del Plata, que el juego no traía. Sigue en línea y casi sin uso: el juego terminó sumando el suyo.",
  },
  {
    /* Anunciado y sin construir. Va con `reservado`, o sea del lado sin
       asignar de la línea y con la notación punteada: es lo único de toda
       la página que promete algo en vez de mostrarlo, y tiene que quedar
       imposible de confundir con lo entregado. Si se demora, esto es lo
       primero que se saca. */
    anio: null,
    titulo: "Juego de historia de Mar del Plata",
    estado: "Reservado",
    reservado: true,
    detalle:
      "Un juego para que los chicos aprendan la historia de la ciudad: alguien viaja al pasado para impedir hechos que sí ocurrieron, y hay que ir atrás a corregirlo para que el presente siga siendo el que conocemos.",
  },
];

export const SECCIONES = [
  { id: "mapa", n: "01", nombre: "El mapa" },
  { id: "regiones", n: "02", nombre: "Las regiones" },
  { id: "oferta", n: "03", nombre: "Qué contratás" },
  { id: "propios", n: "04", nombre: "Lo construido" },
  { id: "cotizar", n: "05", nombre: "Cotizar" },
];

/* Palabras que no cuentan para las iniciales: no son parte del nombre,
   son las bisagras que lo arman. */
const BISAGRAS = new Set([
  "de",
  "del",
  "con",
  "y",
  "la",
  "el",
  "los",
  "las",
  "en",
  "a",
  "para",
]);

/**
 * Las iniciales de una unidad, mientras no exista su logotipo.
 *
 * Se derivan del nombre en vez de cargarse a mano: agregar una unidad no
 * tiene que obligar a acordarse de escribirlas, y si el nombre cambia las
 * iniciales cambian con él. Dos letras y no tres —"Panel de monitoreo
 * remoto" daría PMR— porque lo que va a ocupar ese lugar es una marca, y
 * el hueco tiene que tener la forma de una marca.
 */
export function iniciales(nombre: string): string {
  return nombre
    .split(/\s+/)
    .filter((p) => p && !BISAGRAS.has(p.toLowerCase()))
    .map((p) => p[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

/**
 * La dirección pelada, sin protocolo ni www ni barra final. En esta página
 * una dirección se muestra como se dicta por teléfono.
 *
 * Vive acá y no en un componente porque la usan dos: las unidades propias
 * y el registro de comunidad. Es la misma convención en los dos lugares y
 * tiene que seguir siéndolo —quedan uno abajo del otro en la misma
 * sección—, así que también es una sola función.
 */
export function dominio(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export function mensajeWhatsApp(servicio?: string): string {
  // El nombre cae en medio de la oración, así que baja la inicial. Sólo
  // la inicial: bajarlo entero dejaba "automatización con ia".
  const enOracion = servicio
    ? servicio.charAt(0).toLowerCase() + servicio.slice(1)
    : "";
  const base = enOracion
    ? `Hola, quiero cotizar ${enOracion} para mi empresa.`
    : "Hola, quiero cotizar un servicio para mi empresa.";
  return encodeURIComponent(base);
}

export function linkWhatsApp(servicio?: string): string | null {
  if (!WHATSAPP_NUMERO) return null;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeWhatsApp(servicio)}`;
}
