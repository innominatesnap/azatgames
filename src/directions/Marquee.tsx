import { EARLY_ACCESS_HREF, type DirectionProps } from '../App';
import { AccountButton } from '../components/AccountButton';
import { Wordmark } from '../components/Logo';
import { comingSoon, entities, games, roadmap, SHOW_COMING_SOON } from '../data';

/** 1b Marquee — split hero, stacked screens, channel tabs. */
export function Marquee({ featured: f, onPick }: DirectionProps) {
  return (
    <div className="mq">
      <header className="mq-header">
        <div className="wrap mq-header-inner">
          <Wordmark />
          <div className="mq-pills" role="tablist" aria-label="Featured game">
            {games.map((g) => {
              const on = g.key === f.key;
              return (
                <button key={g.key} type="button" role="tab" aria-selected={on} className={`mq-pill${on ? ' is-on' : ''}`} onClick={() => onPick(g.key)}>
                  {g.short}
                </button>
              );
            })}
          </div>
          <AccountButton />
        </div>
      </header>

      <section className="wrap mq-hero">
        <div className="mq-hero-copy">
          <div className="eyebrow c-cyan">GAME DE JOUR — {f.kind.toUpperCase()}</div>
          <div className="stack-6">
            <div className="mq-name">{f.name}</div>
            <h1 key={f.key} className="mq-title fade-in">{f.tagline}</h1>
          </div>
          <p className="mq-lede">{f.lede}</p>
          <div className="mq-ctas">
            <a href={f.url} className="btn-grad btn-md">{f.cta} →</a>
            <span className="mono-13 c-muted">{f.host}</span>
          </div>
        </div>
        <div key={f.key} className="mq-stack fade-in">
          <img className="mq-s2" src={f.shots[2]} alt="" />
          <img className="mq-s1" src={f.shots[1]} alt="" />
          <img className="mq-s0" src={f.shots[0]} alt={`${f.name} screenshot`} style={{ objectPosition: f.heroPos }} />
        </div>
      </section>

      <section className="mq-section">
        <div className="wrap stack-28">
          <h2 className="display-52">The portfolio</h2>
          <div className="mq-cards">
            {games.map((g) => (
              <article key={g.key} className="mq-card">
                <img src={g.shots[0]} alt={`${g.name} screenshot`} loading="lazy" style={{ objectPosition: g.heroPos }} />
                <div className="mq-card-body">
                  <div className="mq-card-meta">
                    <span className="c-amber">{g.num}</span>
                    <span className="c-cyan">LIVE</span>
                  </div>
                  <h3 className="mq-card-name">{g.name}</h3>
                  <p className="mq-card-text">{g.short1}</p>
                  <ul className="mq-card-features">
                    {g.features.map((ft) => (
                      <li key={ft.t}>
                        <span className="c-cyan">—</span>
                        {ft.t}
                      </li>
                    ))}
                  </ul>
                  <a href={g.url} className="mq-card-link">{g.cta} →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mq-section">
        <div className="wrap mq-roadmap">
          <div className="stack-14">
            <h2 className="display-52">Coming to the library</h2>
            <p className="mq-roadmap-note">New titles on a published schedule, plus results keeping for games played in person.</p>
            {SHOW_COMING_SOON && (
              <div className="mq-chips">
                {comingSoon.map((s) => (
                  <span key={s} className="mq-chip">{s}</span>
                ))}
              </div>
            )}
          </div>
          <div className="mq-roadmap-list">
            {roadmap.map((r) => (
              <div key={r.name} className="mq-roadmap-row">
                <span className="mq-when">{r.when}</span>
                <div className="stack-4">
                  <span className="mq-roadmap-name">{r.name}</span>
                  <span className="mq-roadmap-detail">{r.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="mq-org">
          <div className="mq-org-head">
            <div className="stack-12 mq-org-copy">
              <div className="eyebrow c-amber">ORGANIZER PLATFORM</div>
              <h2 className="display-48">Run a season, not a spreadsheet.</h2>
              <p className="mq-org-quote">When people log off, they look for a table. We keep score there too.</p>
            </div>
            <a href={EARLY_ACCESS_HREF} className="btn-grad nowrap">Organizer early access</a>
          </div>
          <div className="mq-entities">
            {entities.map((e, i) => (
              <div key={e.t} className="mq-entity">
                <span className="mq-entity-chip">{e.t}</span>
                {i < entities.length - 1 && <span className="mq-sep">/</span>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
