import { AZAT_AUTH_HUB, hubLoginUrl, useAzatUser } from '../lib/session';

/**
 * "Sign in" → login.azat.games, or — when the shared session cookie is present —
 * an account chip that opens the hub (where the user can see who they are and sign out).
 */
export function AccountButton({ className = 'btn-outline', upper = false }: { className?: string; upper?: boolean }) {
  const user = useAzatUser();
  const fmt = (s: string) => (upper ? s.toUpperCase() : s);

  if (!user) {
    return (
      <a href={hubLoginUrl()} className={className}>
        {fmt('Sign in')}
      </a>
    );
  }

  const label = user.name?.split(/\s+/)[0] ?? user.email?.split('@')[0] ?? 'Account';
  const initial = (user.name ?? user.email ?? 'A').charAt(0).toUpperCase();
  return (
    <a href={`${AZAT_AUTH_HUB}/`} className={`${className} account`} title={`Signed in${user.email ? ` as ${user.email}` : ''}`}>
      {user.avatarUrl ? (
        <img className="account-avatar" src={user.avatarUrl} alt="" referrerPolicy="no-referrer" />
      ) : (
        <span className="account-avatar" aria-hidden="true">
          {initial}
        </span>
      )}
      <span className="account-name">{fmt(label)}</span>
    </a>
  );
}
