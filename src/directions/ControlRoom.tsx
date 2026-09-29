import type { DirectionProps } from '../App';
import { AccountButton } from '../components/AccountButton';
import { LogoMark } from '../components/Logo';
import { comingSoon, entities, games, roadmap, SHOW_COMING_SOON } from '../data';

/** 1c Control room — programme guide + monitor, operations-grade. */
export function ControlRoom({ featured: f, onPick }: DirectionProps) {
  return (
    <div className="cr">
      <header className="cr-header">
        <div className="wrap cr-header-inner">
          <a href="#" className="cr-brand" aria-label="Azat Games home">
            <LogoMark size={24} />
            <span className="c-amber fw-700">AZAT</span>
            <span className="c-cyan">GAMES</span>
            <span className="c-muted cr-brand-sub">· COMPETITIVE GAMING PLATFORM</span>
          </a>
          <nav className="cr-links">
            <a href="#cr-games">GAMES</a>
            <a href="#cr-games">ROADMAP</a>
            <a href="#cr-ops">ORGANIZERS</a>
            <AccountButton className="cr-signin" upper />
          </nav>
        </div>
      </header>

      <section className="cr-stage">
        <div className="wrap cr-stage-inner">
          <aside className="cr-guide">
            <div className="cr-guide-head">PROGRAMME</div>
            <div role="tablist" aria-label="Featured game">
              {games.map((g) => {
                const on = g.key === f.key;
                return (
                  <button key={g.key} type="button" role="tab" aria-selected={on} className={`cr-channel${on ? ' is-on' : ''}`} onClick={() => onPick(g.key)}>
                    <span className="cr-channel-meta">
                      <span className="c-muted">CH {g.num}</span>
                      <span className="cr-channel-state">{on ? 'ON AIR' : 'VIEW'}</span>
                    </span>
                    <span className="cr-channel-name">{g.name}</span>
                    <span className="cr-channel-kind">{g.kind}</span>
                  </button>
                );
              })}
            </div>
            <div className="cr-guide-head cr-guide-next">UP NEXT</div>
            {roadmap.map((r) => (
              <div key={r.name} className="cr-next">
                <span>{r.name}</span>
                <span className="mono-12 c-amber">{r.when}</span>
              </div>
            ))}
          </aside>

          <div className="cr-main">
            <div className="cr-monitor">
              <img key={f.key} className="fade-in" src={f.shots[0]} alt={`${f.name} screenshot`} style={{ objectPosition: f.heroPos }} />
              <div className="cr-onair">
                <span className="dot" />
                ON AIR
              </div>
              <div className="cr-monitor-host">{f.host}</div>
              <span className="cr-corner tl" />
              <span className="cr-corner br" />
            </div>
            <div className="cr-feature">
              <div className="stack-12">
                <div className="eyebrow-sm c-amber">FEATURED · {f.name.toUpperCase()}</div>
                <h1 key={f.key} className="cr-title fade-in">{f.tagline}</h1>
              </div>
              <div className="stack-18">
                <p className="cr-lede">{f.lede}</p>
                <div>
                  <a href={f.url} className="btn-grad btn-md">{f.cta} →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cr-games" className="cr-section">
        <div className="wrap cr-specs">
          <div className="eyebrow c-cyan">PORTFOLIO · SPEC SHEETS</div>
          {games.map((g) => (
            <div key={g.key} className="cr-spec">
              <div className="stack-8">
                <span className="mono-12 c-amber ls-16">CH {g.num} · LIVE</span>
                <h3 className="cr-spec-name">{g.name}</h3>
                <a href={g.url} className="mono-13">{g.host} ↗</a>
              </div>
              <div className="cr-spec-table">
                {g.features.map((ft) => (
                  <div key={ft.t} className="cr-spec-row">
                    <span className="cr-spec-t">{ft.t}</span>
                    <span className="cr-spec-d">{ft.d}</span>
                  </div>
                ))}
              </div>
              <div className="cr-spec-shots">
                <img src={g.shots[1]} alt="" loading="lazy" />
                <img src={g.shots[2]} alt="" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {SHOW_COMING_SOON && (
        <section className="wrap cr-standby">
          <div className="eyebrow c-muted">IN-PERSON RESULTS KEEPING · STANDBY</div>
          <div className="cr-standby-grid">
            {comingSoon.map((s) => (
              <div key={s} className="cr-standby-item">
                <span className="soon-tag">SOON</span>
                <span className="cr-standby-name">{s}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="cr-ops" className="cr-ops">
        <div className="wrap cr-ops-inner">
          <div className="stack-14">
            <div className="eyebrow c-amber">TOURNAMENT OPERATIONS</div>
            <h2 className="display-48">Every source, one console.</h2>
            <p className="cr-ops-quote">Online brings people together. In-person play keeps them together.</p>
          </div>
          <div className="cr-console">
            {entities.map((e) => (
              <div key={e.t} className="cr-console-cell">
                <span className="mono-11 c-cyan">{e.n}</span>
                <span className="cr-console-t">{e.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
