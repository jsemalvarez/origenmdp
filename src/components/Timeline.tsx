import Link from "next/link";

export default function Timeline() {
  return (
    <section id="galardones">
      <div className="section-inner">
        <p className="eyebrow">Trayectoria</p>
        <h2>Una historia de <em>hacer</em></h2>
        <p className="section-lead">Desde 2017, participando activamente en el ecosistema tech de Mar del Plata.</p>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-año">2017</div>
            <div className="timeline-card">
              <div className="timeline-evento">ATICMA · Mar del Plata Entre Todos</div>
              <div className="timeline-titulo">🏆 1er lugar — MdP Data Fest</div>
              <p className="timeline-desc">Primer hackathon de datos abiertos en Mar del Plata. El equipo desarrolló una API pública con datos de encuestas de percepción ciudadana, un panel web para carga de datos en formato abierto y una app Android para que los ciudadanos comparen su opinión con el resto de la población.</p>
              <div className="timeline-badges">
                <span className="tbadge tbadge-sea">Datos Abiertos</span>
                <span className="tbadge tbadge-sand">1er Lugar</span>
                <span className="tbadge tbadge-gray">Impacto ciudadano</span>
              </div>
              <div className="timeline-source">📰 Fuente: <Link href="https://www.aticma.org.ar/hackaton-mdp-data-fest/" target="_blank">ATICMA.org.ar →</Link></div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-año">2022</div>
            <div className="timeline-card">
              <div className="timeline-evento">Municipalidad de General Pueyrredon · ATICMA · UNMdP</div>
              <div className="timeline-titulo">🏆 1er lugar — Hackathon MGP 2022</div>
              <p className="timeline-desc">AppTacc: guía colaborativa y gratuita de gastronomía sin gluten en Mar del Plata, pensada por y para la comunidad celíaca. Al momento de la premiación ya se encontraba funcionando — algo que el municipio destacó como "un doble éxito".</p>
              <div className="timeline-badges">
                <span className="tbadge tbadge-sea">Eje Turismo</span>
                <span className="tbadge tbadge-sand">1er Lugar</span>
                <span className="tbadge tbadge-gray">Impacto social</span>
              </div>
              <div className="timeline-source">📰 Cubierto por: <Link href="https://www.lacapitalmdp.com/tres-aplicaciones-fueron-las-grandes-ganadoras-del-hackathon-mgp/" target="_blank">Diario La Capital →</Link></div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-año">2023 — hoy</div>
            <div className="timeline-card">
              <div className="timeline-evento">Origen MdP · Costa Tech</div>
              <div className="timeline-titulo">🚀 Tres productos activos en Mar del Plata</div>
              <p className="timeline-desc">Paseos con Peques (12k seguidores), Chuli Tienda y Lingua Campus — el sistema de gestión para institutos de idiomas con IA que ya tiene su primer cliente y el mayor potencial de crecimiento.</p>
              <div className="timeline-badges">
                <span className="tbadge tbadge-sea">En curso</span>
                <span className="tbadge tbadge-gray">3 productos</span>
                <span className="tbadge tbadge-gray">EdTech · IA · Comunidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
