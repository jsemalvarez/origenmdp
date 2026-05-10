import Link from "next/link";

export default function Achievements() {
  return (
    <section id="logros">
      <div className="section-inner">
        <p className="eyebrow">Logros y reconocimientos</p>
        <h2>Construyendo desde <em>el día uno</em></h2>
        <p className="section-lead">Dos veces ganadores en hackathones organizados por instituciones de Mar del Plata. No como idea — con productos funcionando.</p>
        <div className="logros-grid">
          <div className="logro-card">
            <div className="logro-header">
              <div className="logro-trophy" style={{ background: 'var(--sand-light)', color: 'var(--sand-dark)' }}>🏆</div>
              <div className="logro-meta">
                <div className="logro-org" style={{ color: 'var(--ocean)' }}>ATICMA · Mar del Plata Entre Todos</div>
                <div className="logro-año">Noviembre 2017</div>
              </div>
            </div>
            <div className="logro-body">
              <div className="logro-nombre">MdP Data Fest</div>
              <p className="logro-desc">Hackathon de datos abiertos ciudadanos. Más de 40 desarrolladores, diseñadores y periodistas compitieron durante dos jornadas para transformar datos de Mar del Plata en herramientas accesibles para todos.</p>
              <div className="logro-proyecto" style={{ background: 'var(--ocean-light)' }}>
                <div>
                  <div className="logro-proyecto-nombre" style={{ color: 'var(--ocean-mid)' }}>🥇 Equipo "Los Simuladores" — 1er lugar</div>
                  <div className="logro-proyecto-sub" style={{ color: 'var(--ink-mid)' }}>API de datos abiertos + panel web + app Android basada en encuestas de percepción ciudadana</div>
                </div>
              </div>
            </div>
            <div className="logro-footer">
              <span className="logro-equipo">Equipo multidisciplinario · 4 integrantes</span>
              <Link href="https://www.aticma.org.ar/hackaton-mdp-data-fest/" target="_blank" className="logro-link">Ver nota →</Link>
            </div>
          </div>
          <div className="logro-card">
            <div className="logro-header">
              <div className="logro-trophy" style={{ background: 'var(--sea-light)', color: 'var(--sea-dark)' }}>🏆</div>
              <div className="logro-meta">
                <div className="logro-org" style={{ color: 'var(--sea-dark)' }}>Municipalidad de General Pueyrredon</div>
                <div className="logro-año">Noviembre 2022</div>
              </div>
            </div>
            <div className="logro-body">
              <div className="logro-nombre">Hackathon MGP 2022</div>
              <p className="logro-desc">Evento de innovación abierta organizado por el municipio con sede en el Palacio Municipal. 23 horas de desarrollo continuo, 120 inscriptos y 10 proyectos presentados. Tres aplicaciones ganadoras, una por eje temático.</p>
              <div className="logro-proyecto" style={{ background: 'var(--sea-light)' }}>
                <div>
                  <div className="logro-proyecto-nombre" style={{ color: 'var(--sea-dark)' }}>🥇 AppTacc — Eje Turismo</div>
                  <div className="logro-proyecto-sub" style={{ color: 'var(--ink-mid)' }}>Guía colaborativa de gastronomía sin gluten para la comunidad celíaca de Mar del Plata</div>
                </div>
              </div>
            </div>
            <div className="logro-footer">
              <span className="logro-equipo">Cubierto por Diario La Capital</span>
              <Link href="https://www.lacapitalmdp.com/tres-aplicaciones-fueron-las-grandes-ganadoras-del-hackathon-mgp/" target="_blank" className="logro-link">Ver nota →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
