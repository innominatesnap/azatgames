import { useState, type CSSProperties } from 'react';
import { EARLY_ACCESS_HREF, type DirectionProps } from '../App';
import { AccountButton } from '../components/AccountButton';
import { Wordmark } from '../components/Logo';
import { comingSoon, entities, games, roadmap, SHOW_COMING_SOON } from '../data';

/** How long each game stays on air before the hero rotates to the next. */
const ROTATE_MS = 15_000;

/** 1a Broadcast — full-bleed premiere with TV-display framing. */
export function Broadcast({ featured: f, onPick }: DirectionProps) {
  const [paused, setPaused] = useState(false);

  // The active tab's progress bar is a 15s CSS animation; when it finishes we
  // advance. Hover/focus on the hero pauses the bar, and so the rotation.
  const advance = () => {
    const i = games.findIndex((g) => g.key === f.key);
    onPick(games[(i + 1) % games.length].key);
  };

  return (
    <div className="bc">
      <header
        className={`bc-hero${paused ? ' is-paused' : ''}`}
        style={{ '--rotate-ms': `${ROTATE_MS}ms` } as CSSProperties}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
        // Keyboard focus pauses too; taps and clicks shouldn't freeze the rotation.
        onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
      >
        {games.map((g) => (
          <img
            key={g.key}
            className={`bc-hero-img${g.key === f.key ? ' is-on' : ''}`}
            src={g.shots[0]}
            alt=""
            style={{ objectPosition: g.heroPos }}
          />
        ))}
        <div className="bc-hero-shade-x" />
        <div className="bc-hero-shade-y" />
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />

        <div className="wrap bc-nav">
          <Wordmark />
          <nav className="bc-links">
            <a href="#bc-games">Games</a>
            <a href="#bc-roadmap">Roadmap</a>
            <a href="#bc-organizers">Organizers</a>
            <a href="#bc-organizers">Azat Tech</a>
          </nav>
          <AccountButton />
        </div>

        <div className="wrap bc-hero-body">
          {/* All slides share one grid cell, so the hero keeps the height of the tallest. */}
          <div className="bc-slides" aria-live="polite">
            {games.map((g) => {
              const on = g.key === f.key;
              const Title = on ? 'h1' : 'div';
              return (
                <div key={g.key} className={`bc-hero-copy bc-slide${on ? ' is-on' : ''}`} aria-hidden={!on} inert={!on}>
                  <div className="bc-kicker">
                    <span className="live-pill">
                      <span className="dot" />
                      NOW PREMIERING
                    </span>
                    <span className="c-amber">{g.name.toUpperCase()}</span>
                  </div>
                  <Title className="bc-title">{g.tagline}</Title>
                  <p className="bc-lede">{g.lede}</p>
                  <div className="bc-ctas">
                    <a href={g.url} className="btn-grad btn-lg">
                      {g.cta} <span aria-hidden="true">→</span>
                    </a>
                    <span className="bc-host">{g.host}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wrap">
          <div className="bc-tabs" role="tablist" aria-label="Featured game">
            {games.map((g) => {
              const on = g.key === f.key;
              return (
                <button key={g.key} type="button" role="tab" aria-selected={on} className={`bc-tab${on ? ' is-on' : ''}`} onClick={() => onPick(g.key)}>
                  <img src={g.shots[0]} alt="" />
                  <span className="bc-tab-text">
                    <span className="bc-tab-label">
                      {g.num} · {on ? 'ON AIR' : 'VIEW'}
                    </span>
                    <span className="bc-tab-name">{g.name}</span>
                  </span>
                  {on && <span key={g.key} className="bc-tab-progress" onAnimationEnd={advance} />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section id="bc-games">
        <div className="wrap bc-section-head">
          <div className="eyebrow c-cyan">PORTFOLIO · SHIPPING NOW</div>
          <h2 className="display-64">Three games live. Built on one platform.</h2>
        </div>
        {games.map((g) => (
          <div key={g.key} className="bc-row">
            <div className="wrap bc-row-inner">
              <div className="bc-row-copy">
                <div className="bc-row-meta">
                  <span className="c-amber">{g.num}</span>
                  <span className="c-muted">{g.kind.toUpperCase()}</span>
                </div>
                <h3 className="display-56">{g.name}</h3>
                <p className="bc-row-lede">{g.lede}</p>
                <div className="bc-features">
                  {g.features.map((ft) => (
                    <div key={ft.t} className="bc-feature">
                      <span className="bc-feature-t">{ft.t}</span>
                      <span className="bc-feature-d">{ft.d}</span>
                    </div>
                  ))}
                </div>
                <div className="bc-row-ctas">
                  <a href={g.url} className="btn-ghost-cyan">{g.cta} →</a>
                  <span className="mono-13 c-muted">{g.host}</span>
                </div>
              </div>
              <div className="bc-shots">
                <img className="bc-shot-main" src={g.shots[0]} alt={`${g.name} screenshot`} loading="lazy" />
                <img src={g.shots[1]} alt="" loading="lazy" />
                <img src={g.shots[2]} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="bc-roadmap" className="bc-library">
        <div className="wrap bc-library-inner">
          <div className="bc-library-head">
            <div className="stack-12">
              <div className="eyebrow c-cyan">GAME LIBRARY · ROADMAP</div>
              <h2 className="display-64">What ships next</h2>
            </div>
            <p className="bc-library-note">Original online games, faithful digital versions of classics, and results keeping for games played in person.</p>
          </div>
          <div className="bc-timeline">
            {roadmap.map((r) => (
              <div key={r.name} className="bc-milestone">
                <span className="bc-milestone-dot" />
                <span className="bc-milestone-when">{r.when}</span>
                <span className="bc-milestone-name">{r.name}</span>
                <span className="bc-milestone-detail">{r.detail}</span>
              </div>
            ))}
          </div>
          {SHOW_COMING_SOON && (
            <div className="bc-soon">
              <div className="eyebrow-sm c-muted">RESULTS KEEPING FOR IN-PERSON PLAY · COMING SOON</div>
              <div className="bc-soon-grid">
                {comingSoon.map((s) => (
                  <div key={s} className="bc-soon-item">
                    <span>{s}</span>
                    <span className="soon-tag">SOON</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="bc-organizers" className="bc-org">
        <div className="wrap bc-org-inner">
          <div className="bc-org-copy">
            <div className="eyebrow c-amber">FOR TOURNAMENT ORGANIZERS</div>
            <h2 className="display-56 lh-098">One source of record for every event you run.</h2>
            <p className="bc-row-lede">
              Players, rule sets, judges, venues, teams, leagues and organizations in one system — from a high-school chess bracket to a national free-to-play poker circuit.
            </p>
            <p className="bc-org-quote">Screens are where people find a game. Tables, courts and league nights are where they keep showing up.</p>
            <div>
              <a href={EARLY_ACCESS_HREF} className="btn-grad">Organizer early access</a>
            </div>
          </div>
          <div className="bc-entities">
            {entities.map((e) => (
              <div key={e.t} className="bc-entity">
                <span className="mono-12 c-cyan">{e.n}</span>
                <div className="bc-entity-text">
                  <span className="bc-entity-t">{e.t}</span>
                  <span className="bc-entity-d">{e.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bc-footer">
        <div className="wrap bc-footer-inner">
          <span className="bc-footer-brand">AZAT GAMES</span>
          <div className="bc-footer-links">
            {games.map((g) => (
              <a key={g.key} href={g.url}>{g.host}</a>
            ))}
          </div>
          <span>An Azat Tech platform</span>
        </div>
      </footer>
    </div>
  );
}
