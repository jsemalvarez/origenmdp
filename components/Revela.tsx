"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entra en vista una sola vez. Devuelve la ref y el estado.
 * Por defecto el contenido está presente y visible: la animación sólo
 * lo levanta, así que si el observer nunca corre no se pierde nada.
 *
 * La red de seguridad vive acá adentro y no en cada componente, y la
 * diferencia no es de prolijidad: es la que hace que las animaciones se
 * vean.
 *
 * Escrita afuera, la red era un temporizador que encendía todo a los 1,8
 * segundos de cargar la página. Para cuando el visitante bajaba hasta la
 * sección, la corrida ya había pasado hacía rato —fuera de pantalla, sin
 * nadie mirándola— y encontraba todo quieto y en su estado final. La
 * animación sólo se veía recargando parado justo ahí, que es exactamente
 * el síntoma que se reportó.
 *
 * Acá adentro la red conoce algo que el componente no puede saber: si el
 * observer contestó alguna vez. Un IntersectionObserver sano entrega una
 * primera lectura apenas se observa el elemento, aunque esté fuera de
 * pantalla y diga que no. Así que si contestó, el observer funciona y la
 * red no tiene nada que hacer; sólo salta cuando no contestó nunca —
 * paneles embebidos, vistas que no corren el ciclo de render—, que es el
 * único caso para el que fue escrita.
 */
export function useEnVista<T extends HTMLElement>(
  margen = "0px 0px -12% 0px",
  unaVez = true,
  red = 1800,
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let contesto = false;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        contesto = true;
        if (entrada.isIntersecting) {
          setVisible(true);
          if (unaVez) obs.disconnect();
        } else if (!unaVez) {
          setVisible(false);
        }
      },
      { rootMargin: margen, threshold: 0.01 },
    );
    obs.observe(el);

    /* La red no corre mientras la pestaña está oculta, y se rearma cuando
       vuelve. Un navegador no dibuja una pestaña de fondo, y sin dibujar
       no hay observer que conteste: con un temporizador suelto, abrir la
       página en una pestaña de atrás —ctrl+click, que es la mitad de las
       veces— dejaba todo encendido antes de que nadie la mirara, y al
       volver ya no quedaba nada por ver. Esperar a que esté a la vista
       para empezar a contar es lo que hace que la red cubra al observer
       muerto sin comerse la animación del observer sano. */
    let t = 0;
    const armar = () => {
      window.clearTimeout(t);
      if (document.visibilityState !== "visible") return;
      t = window.setTimeout(() => {
        if (!contesto) setVisible(true);
      }, red);
    };
    armar();
    document.addEventListener("visibilitychange", armar);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", armar);
      window.clearTimeout(t);
    };
  }, [margen, unaVez, red]);

  return { ref, visible };
}

/** Envoltorio de revelado suave, con retardo para escalonar. */
export default function Revela({
  children,
  retardo = 0,
  como: Como = "div",
  className,
}: {
  children: React.ReactNode;
  retardo?: number;
  como?: "div" | "p" | "li" | "section" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const { ref, visible } = useEnVista<HTMLDivElement>();
  return (
    <Como
      // @ts-expect-error — ref polimórfica sobre un set cerrado de tags
      ref={ref}
      className={`revela ${className ?? ""}`}
      data-visible={visible ? "" : undefined}
      style={{ ["--retardo" as string]: `${retardo}ms` }}
    >
      {children}
    </Como>
  );
}
