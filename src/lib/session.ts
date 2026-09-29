/**
 * Read-only view of the shared Azat Auth session.
 *
 * login.azat.games (and Poker / Letters / CryptoGram) store the Supabase session in the
 * `sb-azat-auth-token` cookie on Domain=.azat.games — a single cookie, or `.0`, `.1`, …
 * chunks when it is over 3000 URL-encoded chars. This site only reads it to decide
 * between "Sign in" and the signed-in account chip; the hub owns sign-in and sign-out.
 */
import { useEffect, useState } from 'react';

export const AZAT_AUTH_HUB = 'https://login.azat.games';
const STORAGE_KEY = 'sb-azat-auth-token';

export interface AzatUser {
  email?: string;
  name?: string;
  avatarUrl?: string;
}

function readCookieMap(cookieHeader: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const part of cookieHeader ? cookieHeader.split('; ') : []) {
    const eq = part.indexOf('=');
    if (eq > 0) map.set(part.slice(0, eq), part.slice(eq + 1));
  }
  return map;
}

function readStoredValue(cookieHeader: string): string | null {
  const map = readCookieMap(cookieHeader);
  const single = map.get(STORAGE_KEY);
  if (single != null) return decodeURIComponent(single);
  let encoded = '';
  for (let i = 0; map.has(`${STORAGE_KEY}.${i}`); i++) encoded += map.get(`${STORAGE_KEY}.${i}`);
  return encoded ? decodeURIComponent(encoded) : null;
}

function decodeSession(raw: string): unknown {
  // @supabase/ssr-style values are prefixed "base64-"; the hub's cookieStorage writes plain JSON.
  if (raw.startsWith('base64-')) {
    const b64 = raw.slice(7).replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    raw = new TextDecoder().decode(bytes);
  }
  return JSON.parse(raw);
}

interface StoredSession {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  user?: { email?: string; user_metadata?: Record<string, unknown> };
}

/** The signed-in user, or null when there is no usable session cookie. */
export function readAzatUser(cookieHeader: string = document.cookie): AzatUser | null {
  let session: StoredSession;
  try {
    const raw = readStoredValue(cookieHeader);
    if (!raw) return null;
    const parsed = decodeSession(raw) as StoredSession & { currentSession?: StoredSession };
    session = parsed.currentSession ?? parsed;
  } catch {
    return null;
  }
  // A refresh token means the apps can renew the session even if the access token lapsed.
  const live = !!session.access_token && (session.expires_at ?? 0) * 1000 > Date.now();
  if (!live && !session.refresh_token) return null;

  const meta = session.user?.user_metadata ?? {};
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
  return {
    email: str(session.user?.email),
    name: str(meta.display_name) ?? str(meta.full_name) ?? str(meta.name),
    avatarUrl: str(meta.avatar_url) ?? str(meta.picture),
  };
}

/**
 * Hub login URL. The hub only honors redirect_to for https://*.azat.games subdomains
 * (not the apex), so other origins get a plain /login and land on the hub afterwards.
 */
export function hubLoginUrl(returnTo: string = window.location.href): string {
  const url = new URL('/login', AZAT_AUTH_HUB);
  try {
    const back = new URL(returnTo);
    const host = back.hostname.toLowerCase().replace(/\.$/, '');
    if (back.protocol === 'https:' && host.endsWith('.azat.games') && !host.includes('..')) {
      url.searchParams.set('redirect_to', back.toString());
    }
  } catch {
    /* no return URL */
  }
  return url.toString();
}

/** Current Azat user; re-checked when the tab regains focus (e.g. after signing in elsewhere). */
export function useAzatUser(): AzatUser | null {
  const [user, setUser] = useState<AzatUser | null>(() => readAzatUser());
  useEffect(() => {
    const refresh = () => setUser(readAzatUser());
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return user;
}
