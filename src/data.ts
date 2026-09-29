export type GameKey = 'poker' | 'letters' | 'cryptogram';

export interface Feature {
  t: string;
  d: string;
}

export interface Game {
  key: GameKey;
  num: string;
  name: string;
  short: string;
  kind: string;
  url: string;
  host: string;
  tagline: string;
  cta: string;
  /** CSS object-position for the hero screenshot */
  heroPos: string;
  lede: string;
  short1: string;
  /** [hero, secondary, tertiary] screenshots */
  shots: [string, string, string];
  features: Feature[];
}

export const games: Game[] = [
  {
    key: 'poker',
    num: '01',
    name: 'Azat Poker',
    short: 'Poker',
    kind: 'Tournament operations',
    url: 'https://poker.azat.games',
    host: 'poker.azat.games',
    tagline: 'Run the room.',
    cta: 'Launch Azat Poker',
    heroPos: 'center',
    lede: 'Registration, seating, blind clocks, TV displays and final results in one console for the tournament director, from a home game to a regional circuit.',
    short1: 'The tournament director’s console: clock, seating, TV displays and results.',
    shots: ['/assets/poker-tv-running.png', '/assets/poker-tv-seating.png', '/assets/poker-tv-champion.png'],
    features: [
      { t: 'Blind clock', d: 'Levels, breaks and pause state, readable from across the room.' },
      { t: 'TV displays', d: 'Check-in, seating, running clock and champion screens.' },
      { t: 'Seating & balancing', d: 'Table draws and moves pushed straight to the floor.' },
      { t: 'Results upload', d: 'Final standings posted to league tables in one step.' },
    ],
  },
  {
    key: 'letters',
    num: '02',
    name: 'Azat Letters',
    short: 'Letters',
    kind: 'Daily word game',
    url: 'https://letters.azat.games',
    host: 'letters.azat.games',
    tagline: 'One word. The whole house.',
    cta: 'Play Azat Letters',
    heroPos: 'center 30%',
    lede: 'An invite-only daily letters game for households. Easy and Hard modes each keep their own keyword and streak, with monthly tracking and head-to-head stats.',
    short1: 'Invite-only household daily letters game with streaks and monthly standings.',
    shots: ['/assets/letters-board.png', '/assets/letters-stats.png', '/assets/letters-monthly.png'],
    features: [
      { t: 'Easy & Hard modes', d: 'Separate keywords and streaks; Hard keeps hits in their column.' },
      { t: 'Household invites', d: 'Private groups — family, office, neighbors.' },
      { t: 'Monthly tracking', d: 'Standings reset each month for a fresh race.' },
      { t: 'Stats', d: 'Guess distribution and head-to-head results.' },
    ],
  },
  {
    key: 'cryptogram',
    num: '03',
    name: 'CryptoGram Messenger',
    short: 'CryptoGram',
    kind: 'Puzzle messenger',
    url: 'https://cryptogram.azat.games',
    host: 'cryptogram.azat.games',
    tagline: 'Crack the code. Send one back.',
    cta: 'Play CryptoGram',
    heroPos: 'center 20%',
    lede: 'Decode number-coded quotes against the clock, then turn your own message into a cryptogram and send it to a friend to solve.',
    short1: 'Decode daily number-coded quotes, then send cryptograms to friends.',
    shots: ['/assets/cryptogram-home.png', '/assets/cryptogram-daily.png', '/assets/cryptogram-timed.png'],
    features: [
      { t: 'Daily quote', d: 'A new public-domain line every day.' },
      { t: 'Timed solves', d: 'Par times and a clock for competitive play.' },
      { t: 'Send to friends', d: 'Compose a message; it arrives as a puzzle.' },
      { t: 'Hints & stars', d: 'Hints cost stars; a clean solve inside par earns 3.' },
    ],
  },
];

export const roadmap = [
  { when: 'Q4 2026', name: 'Chess', detail: 'Online play plus over-the-board results for school and club events.' },
  { when: 'Q4 2026', name: 'Card games', detail: 'Cribbage, Hearts, Spades, Euchre, Canasta, Golf.' },
  { when: 'Q2 2027', name: 'Treasure Hunt', detail: 'Original location-based hunts for teams and neighborhoods.' },
  { when: 'Q4 2027', name: 'TCGs', detail: 'Trading card game events, pairings and standings.' },
];

export const comingSoon = ['Board games', 'Pool', 'Volleyball', 'Basketball', 'Football', 'Cornhole', 'Darts', 'Soccer', 'eSports'];

export const entities = [
  ['Organizations', 'Associations, circuits, clubs'],
  ['Leagues', 'Seasons and standings'],
  ['Teams', 'Rosters and captains'],
  ['Players', 'One profile across games'],
  ['Venues', 'Rooms, courts, bars'],
  ['Judges', 'Officials and TDs'],
  ['Rule sets', 'Versioned per event'],
  ['Results', 'Collected from every source'],
].map(([t, d], i) => ({ t, d, n: String(i + 1).padStart(2, '0') }));

/** Toggle for the "coming soon" in-person results strip (was the `showComingSoon` design prop). */
export const SHOW_COMING_SOON = true;
