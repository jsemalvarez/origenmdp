import type { Metadata, Viewport } from "next";
import { MARCA, PORTADA } from "@/lib/content";

/**
 * Archivo y Chivo Mono, de Omnibus-Type (Buenos Aires). Archivo entra
 * con su eje de ancho (62%–125%): angosta hace los rótulos de región,
 * ancha y pesada hace el titular. Chivo Mono lleva cada dirección, cada
 * byte y cada medida.
 *
 * Van autoalojadas a propósito: next/font/google necesita alcanzar
 * fonts.gstatic.com al compilar, y donde no llega deja caer todo a Arial
 * sin fallar el build.
 */
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/chivo-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: `${MARCA.lockup} — Software a medida, automatización con IA y capacitación`,
  description: `${PORTADA.bajada} ${PORTADA.prueba}`,
};

export const viewport: Viewport = {
  themeColor: "#15131e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // La clase `js` se renderiza desde el servidor, no la agrega un script:
    // un script que toca el <html> antes de hidratar rompe la hidratación.
    // El caso sin JavaScript lo cubre el <noscript> de abajo, que devuelve
    // todo lo revelable a la vista. Así no hay mismatch, no hay parpadeo,
    // y la página se sigue leyendo con el JS apagado.
    <html lang="es-AR" className="js">
      <head>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>.revela{opacity:1!important;transform:none!important}" +
              ".marca-oferta{--alza:0!important}</style>",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
