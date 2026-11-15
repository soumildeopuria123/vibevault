# VibeVault: travels, stories & memories

A travel journal, drawn in pen and ink: a serif hero over an ink-and-wash lake
landscape with drifting outline clouds and a hot air balloon, the latest
stories, four destinations, the numbers behind the vault, a wall of captioned
memories, and the reason the notebook exists. Extra pages:

- `/stories`: every story, filtered by region, with search.
- `/stories/:slug`: one trip, told properly, with related stories.
- `/about`: what the vault is for, the three habits, and how to send a story.
- A 404 page for anything else.

```sh
bun install
bun run dev        # http://localhost:5362
bun run typecheck && bun run build
```

## Where things live

| What | Where |
| --- | --- |
| Brand, navigation, stories, destinations, memories, about copy | `src/data.ts` |
| Illustrations (one map; swap paths for your own photography) | `src/lib/images.ts`, files in `public/images/` |
| Colours, type, radii, shadows, motion | `src/styles.css` (`@theme`) |
| Components | `src/components/` |
| Home page sections | `src/sections/` |
| Pages | `src/pages/` |
| Worker routes | `src/worker/index.ts` |

## Data and forms

- The newsletter address is kept in `localStorage` under keys prefixed
  `vibevault:`.
- `POST /api/subscribe` validates the address (422 with field errors, 400 for
  bad JSON). Connect it to your email provider or a D1 table to keep the
  addresses.
- `GET /api/health` returns `{ ok: true }`; any other `/api/*` is a JSON 404.

## Before you publish

- The journal, its writers and its stories are invented; the places are real.
  Replace them with your own, and with the copyright you hold on each photo.
- The illustrations in `public/images/` are generated placeholders. Replace
  each file (or its path in `src/lib/images.ts`) with your own artwork or
  photography. Fonts are Instrument Serif and Inter from Google Fonts.
