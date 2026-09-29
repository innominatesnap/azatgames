# Azat Games — azat.games home

The azat.games landing page, built from the Claude Design handoff in [`design/`](design/Azat%20Games%20Showcase.dc.html).

Three design directions ship side by side so they can be compared live, switchable with the floating control (bottom right) or the URL hash:

| Hash  | Direction    | Idea |
|-------|--------------|------|
| `#1a` | Broadcast    | Full-bleed premiere with TV-display framing (default) |
| `#1b` | Marquee      | Split hero, stacked screens, channel tabs |
| `#1c` | Control room | Programme guide + monitor, operations-grade |

Each hero has a "game de jour" switcher (Poker / Letters / CryptoGram). The selection is kept when you change direction. In 1a the hero rotates to the next game every 15 seconds with a crossfade. Hovering the hero, or focusing it with the keyboard, pauses the rotation.

## Pages and integrations

- **`/contact`** is the organizer early-access request for Azat Poker. Requests are emailed to **contact@azat.games** via [FormSubmit](https://formsubmit.co). The first submission sends a one-time activation email to that inbox, and nothing is delivered until you click its "Activate Form" link. Every "Organizer early access" button links here. `vercel.json` rewrites routes to the SPA.
- **Sign in** links to `https://login.azat.games/login`. The page reads the shared `sb-azat-auth-token` cookie (Domain `.azat.games`) to detect an existing session. When one exists, the button becomes an account chip that opens the hub. See `src/lib/session.ts`.
  - The hub only accepts `redirect_to` for `*.azat.games` **subdomains**, so sign-in from the apex `azat.games` lands on the hub instead of returning here.

## Develop

```bash
npm install
npm run dev
```

`npm run build` type-checks and outputs a static site to `dist/`.

## Layout

- `src/data.ts` — games, roadmap, coming-soon list, organizer entities (all page copy)
- `src/directions/` — one component per direction
- `src/styles.css` — brand tokens and all styles, including the responsive breakpoints (1100px, 900px and 560px)
- `public/assets/` — product screenshots
