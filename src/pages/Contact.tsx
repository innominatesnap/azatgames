import { useState, type FormEvent } from 'react';
import { AccountButton } from '../components/AccountButton';
import { Wordmark } from '../components/Logo';
import { games } from '../data';
import { useAzatUser } from '../lib/session';

/**
 * Requests are emailed to contact@azat.games via FormSubmit (formsubmit.co).
 * The very first submission triggers a one-time activation email to that inbox;
 * nothing is delivered until the "Activate Form" link in it is clicked.
 */
const CONTACT_EMAIL = 'contact@azat.games';
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const SUBJECT = 'Organizer early access — Azat Poker (poker.azat.games)';
const MESSAGE_MAX = 500;

const poker = games.find((g) => g.key === 'poker')!;

/** Organizer early-access request for Azat Poker. */
export function Contact() {
  const user = useAzatUser();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [chars, setChars] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots get a success screen and no signal.
    if (String(data.get('company_alt') ?? '').trim()) {
      setStatus('sent');
      return;
    }

    const org = String(data.get('organization') ?? '').trim();
    const note = String(data.get('message') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email,
      organization: org || '—',
      message: note || '—',
      product: 'Azat Poker — https://poker.azat.games/',
      _subject: SUBJECT,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
    };

    setStatus('sending');
    setError(null);
    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      let parsed: { success?: boolean | string; message?: string } = {};
      try {
        parsed = await res.json();
      } catch {
        /* non-JSON response */
      }
      if (res.ok && String(parsed.success) === 'true') {
        setStatus('sent');
        form.reset();
        setChars(0);
      } else {
        setStatus('idle');
        setError(parsed.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('idle');
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="ct">
      <header className="ct-header">
        <div className="wrap ct-header-inner">
          <Wordmark />
          <div className="ct-header-right">
            <a href="/" className="ct-back">← Back to Azat Games</a>
            <AccountButton />
          </div>
        </div>
      </header>

      <main className="wrap ct-main">
        <section className="ct-intro">
          <div className="eyebrow c-amber">FOR TOURNAMENT ORGANIZERS</div>
          <h1 className="display-64">Get early access to Azat Poker</h1>
          <p className="ct-lede">
            Tell us about the events you run. We’ll set you up on{' '}
            <a href={poker.url}>{poker.host}</a> with registration, seating, blind clocks, TV displays and results for your
            room.
          </p>
          <ul className="ct-points">
            {poker.features.map((ft) => (
              <li key={ft.t}>
                <span className="ct-point-t">{ft.t}</span>
                <span className="ct-point-d">{ft.d}</span>
              </li>
            ))}
          </ul>
          <p className="ct-aside">
            Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> · We typically reply within 1–2 business days.
          </p>
        </section>

        <section className="ct-card" aria-live="polite">
          {status === 'sent' ? (
            <div className="ct-sent">
              <span className="ct-sent-mark" aria-hidden="true">✓</span>
              <h2 className="display-48">Request sent</h2>
              <p className="ct-lede">Thanks — we’ll be in touch about early access to Azat Poker.</p>
              <div className="ct-sent-actions">
                <a href={poker.url} className="btn-grad">Visit {poker.host} →</a>
                <a href="/" className="btn-outline">Back home</a>
              </div>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="company_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="ct-honeypot"
              />
              <div className="ct-row">
                <label className="ct-field">
                  <span>Name</span>
                  <input name="name" required autoComplete="name" placeholder="Your name" defaultValue={user?.name ?? ''} />
                </label>
                <label className="ct-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    defaultValue={user?.email ?? ''}
                  />
                </label>
              </div>
              <label className="ct-field">
                <span>
                  Organization or league <em>optional</em>
                </span>
                <input name="organization" autoComplete="organization" placeholder="e.g. Thursday Night Hold’em League" />
              </label>
              <label className="ct-field">
                <span>
                  About your events <em>optional</em>
                </span>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  placeholder="How often you run, typical field size, venues…"
                  onChange={(e) => setChars(e.target.value.length)}
                />
                <small className="ct-count">
                  {chars}/{MESSAGE_MAX}
                </small>
              </label>
              <div className="ct-subject">
                <span className="mono-11 c-muted">SUBJECT</span>
                <span>{SUBJECT}</span>
              </div>
              {error && <p className="ct-error">{error}</p>}
              <button type="submit" className="btn-grad btn-lg ct-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Request early access →'}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
