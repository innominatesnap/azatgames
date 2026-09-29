import { useEffect, useState } from 'react';
import { games, type Game, type GameKey } from './data';
import { Broadcast } from './directions/Broadcast';
import { Marquee } from './directions/Marquee';
import { ControlRoom } from './directions/ControlRoom';
import { Contact } from './pages/Contact';

/** Where every "Organizer early access" CTA points. */
export const EARLY_ACCESS_HREF = '/contact';

const DIRECTIONS = [
  { id: '1a', label: 'Broadcast', View: Broadcast },
  { id: '1b', label: 'Marquee', View: Marquee },
  { id: '1c', label: 'Control room', View: ControlRoom },
] as const;

type DirectionId = (typeof DIRECTIONS)[number]['id'];

/** Direction id from the URL hash, or null when the hash is an in-page anchor. */
function readHash(): DirectionId | null {
  const h = window.location.hash.replace('#', '');
  return DIRECTIONS.find((d) => d.id === h)?.id ?? null;
}

export interface DirectionProps {
  featured: Game;
  onPick: (key: GameKey) => void;
}

export function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/contact') return <Contact />;
  return <Home />;
}

function Home() {
  const [direction, setDirection] = useState<DirectionId>(() => readHash() ?? '1a');
  const [featKey, setFeatKey] = useState<GameKey>('poker');

  useEffect(() => {
    const onHash = () => {
      const next = readHash();
      if (next) {
        setDirection(next);
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const featured = games.find((g) => g.key === featKey) ?? games[0];
  const { View } = DIRECTIONS.find((d) => d.id === direction)!;

  return (
    <>
      <View featured={featured} onPick={setFeatKey} />
      <nav className="dir-switch" aria-label="Design direction">
        {DIRECTIONS.map((d) => (
          <a key={d.id} href={`#${d.id}`} className={d.id === direction ? 'is-on' : undefined} title={d.label}>
            <span className="dir-id">{d.id}</span>
            <span className="dir-label">{d.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
