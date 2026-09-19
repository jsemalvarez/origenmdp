import { NextResponse } from "next/server";

/**
 * Pedido de cotización.
 *
 * PENDIENTE: el proveedor de mail todavía no está decidido. Está escrito
 * contra Resend porque no requiere infraestructura propia; cambiarlo es
 * reemplazar enviarPorResend() y nada más.
 *
 * Variables de entorno necesarias:
 *   RESEND_API_KEY     clave del proveedor
 *   COTIZACIONES_PARA  casilla que recibe los pedidos
 *   COTIZACIONES_DESDE remitente verificado en el dominio
 *
 * Sin RESEND_API_KEY la ruta responde 503 con un mensaje honesto y el
 * formulario ofrece WhatsApp. Nunca finge haber enviado nada.
 */

type Pedido = {
  nombre: string;
  contacto: string;
  empresa?: string;
  mensaje: string;
  servicio: string;
};

export async function POST(req: Request) {
  let cuerpo: Partial<Pedido>;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json(
      { mensaje: "No pudimos leer el pedido. Probá de nuevo." },
      { status: 400 },
    );
  }

  const nombre = (cuerpo.nombre ?? "").trim();
  const contacto = (cuerpo.contacto ?? "").trim();
  const empresa = (cuerpo.empresa ?? "").trim();
  const mensaje = (cuerpo.mensaje ?? "").trim();
  const servicio = (cuerpo.servicio ?? "").trim();

  if (!nombre || !contacto || mensaje.length < 12 || !servicio) {
    return NextResponse.json(
      { mensaje: "Faltan datos en el pedido." },
      { status: 422 },
    );
  }

  const clave = process.env.RESEND_API_KEY;
  const para = process.env.COTIZACIONES_PARA;
  const desde = process.env.COTIZACIONES_DESDE;

  if (!clave || !para || !desde) {
    return NextResponse.json(
      {
        mensaje:
          "El envío por mail todavía no está configurado en este servidor. Escribinos por WhatsApp y lo vemos ahora.",
        codigo: "sin_proveedor",
      },
      { status: 503 },
    );
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: desde,
        to: [para],
        reply_to: contacto.includes("@") ? contacto : undefined,
        subject: `Cotización · ${servicio} · ${empresa || nombre}`,
        text: [
          `Servicio: ${servicio}`,
          `Nombre: ${nombre}`,
          `Empresa: ${empresa || "—"}`,
          `Contacto: ${contacto}`,
          "",
          mensaje,
        ].join("\n"),
      }),
    });

    if (!r.ok) {
      return NextResponse.json(
        {
          mensaje:
            "El pedido no llegó a destino. Probá de nuevo o escribinos por WhatsApp.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        mensaje:
          "No pudimos conectar con el servicio de mail. Escribinos por WhatsApp y lo vemos ahora.",
      },
      { status: 502 },
    );
  }
}
