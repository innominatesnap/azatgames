export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#060916" />
      <rect x="4.5" y="4.5" width="10" height="10" rx="2" fill="#131a36" stroke="#5c6690" strokeWidth="1.2" />
      <rect x="17.5" y="4.5" width="10" height="10" rx="2" fill="#4f7cff" />
      <rect x="4.5" y="17.5" width="10" height="10" rx="2" fill="#131a36" stroke="#5c6690" strokeWidth="1.2" />
      <rect x="17.5" y="17.5" width="10" height="10" rx="2" fill="#131a36" stroke="#22d3ee" strokeWidth="1.2" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <a href="#" className="brand" aria-label="Azat Games home">
      <LogoMark />
      <span className="brand-word">
        AZAT <span className="c-cyan">GAMES</span>
      </span>
    </a>
  );
}
