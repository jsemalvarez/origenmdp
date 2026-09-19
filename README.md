# Origen MdP — Costa Tech

Sitio de marca y portfolio de Origen MdP — Costa Tech, empresa de IT de
Mar del Plata. Presenta tres servicios —desarrollo a medida, consultoría
de automatización con IA y capacitación— y las unidades de negocio
propias. El objetivo de la página es que el visitante pida una
cotización.

La página se estructura como un **mapa de memoria**: las regiones se
reservan en orden de dirección ascendente, empezando por lo que hoy no
está asignado (la operación hecha a mano) y siguiendo por cada servicio.

## Stack

- Next.js 15 (App Router) + React 19, TypeScript en modo `strict`
- CSS Modules y variables CSS — sin framework de estilos
- Tipografías autoalojadas vía `@fontsource-variable`: Archivo y Chivo
  Mono, de Omnibus-Type. Van autoalojadas a propósito, porque
  `next/font/google` necesita salida a `fonts.gstatic.com` al compilar.

## Desarrollo

```bash
npm install
npm run dev
```

La app queda en http://localhost:3000.

```bash
npm run build   # build de producción: tipos, lint y prerender
npm run lint
```

## Estructura

```
app/            rutas del App Router, estilos globales, API
  api/cotizar/  ruta que recibe los pedidos de cotización
components/     componentes de la página, cada uno con su CSS Module
lib/content.ts  todo el texto y los datos de la página
lib/mapa.ts     las regiones del mapa de memoria
```

Todo el texto vive en `lib/content.ts`: para cambiar una palabra de la
página no hace falta tocar un componente.

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

| Variable | Para qué |
| --- | --- |
| `RESEND_API_KEY` | Clave del proveedor de mail |
| `COTIZACIONES_PARA` | Casilla que recibe los pedidos |
| `COTIZACIONES_DESDE` | Remitente verificado en el dominio |

Sin esas variables, `POST /api/cotizar` responde 503 con un mensaje
honesto y el formulario ofrece WhatsApp como alternativa. Nunca finge
haber enviado nada.

## Pendientes antes de publicar

- **`WHATSAPP_NUMERO`** en `lib/content.ts` está vacío. Mientras lo esté,
  el formulario muestra el cartel "WhatsApp pendiente de configurar".
- **Proveedor de mail** sin definir. El código está escrito contra
  Resend porque no requiere infraestructura propia; cambiarlo es
  reemplazar el `fetch` de `app/api/cotizar/route.ts` y nada más.

## Documentación

- [`PRODUCT.md`](PRODUCT.md) — a quién le habla la página, qué ofrece y
  por qué está decidida así.
- [`DESIGN.md`](DESIGN.md) — el sistema de diseño: color, tipografía,
  espaciado, movimiento y las reglas que sostienen la página.
