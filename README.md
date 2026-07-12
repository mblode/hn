# HN

Hacker News as a fast, swipeable feed: browse top stories, Show HN, Ask HN, and jobs, ranked by how you actually read.

Live at **[hn.blode.co](https://hn.blode.co)**.

## Features

- **Swipeable feed:** move through stories one at a time with swipe gestures or the keyboard, instead of scanning a dense list.
- **Ranked by your reading habits:** dwell time, opens, and votes feed an on-device model (time decay, topic and domain affinity, diversity spacing) that reorders the feed toward what you read.
- **Private by default:** your reading history and ranking live in the browser (IndexedDB) and never leave the device.
- **Every HN feed:** top news, newest, Show HN, Ask HN, and jobs, switchable in one tap.
- **Read and reply inline:** open comment threads without leaving the feed.
- **Sign in with your HN account:** upvote, comment, and submit directly from the app.
- **Search:** full-text story search (Algolia HN) with recent-search history.
- **Command palette and shortcuts:** `Cmd/Ctrl+K` for the palette, single keys for navigation, `?` for the shortcut list.

## Getting started

```bash
git clone https://github.com/mblode/hn.git
cd hn
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The feed, ranking, search, and comments all work with no configuration: story data comes from public Hacker News APIs.

## Signing in to HN

Upvoting, commenting, and submitting require signing in with a Hacker News account. The app proxies HN and stores your session in a cookie encrypted server-side, so it needs one secret:

```bash
# 32-byte key as 64 hex characters
echo "HN_SESSION_SECRET=$(openssl rand -hex 32)" >> .env.local
```

Restart the dev server after setting it. Without it, the app runs fine read-only; only authenticated actions are disabled.

## Data pipeline

The personalized ranking draws on a candidate corpus (`lib/candidates.json`) distilled from the full Hacker News archive. Both files are committed, so you only need this to refresh the corpus:

```bash
npm run download-hn         # pull the HN archive from BigQuery into data/*.ndjson
npm run process-candidates  # distill the top stories into lib/candidates.json
```

`download-hn` queries the public `bigquery-public-data.hacker_news` dataset and needs Google Cloud credentials (`gcloud auth application-default login`) plus a billing-enabled project. `process-candidates` is offline: it reads `data/` and keeps stories above a score threshold.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm test` | Run the Vitest suite (`npm run test:watch` to watch) |
| `npm run check` | Lint and format check (Ultracite: Oxlint + Oxfmt) |
| `npm run fix` | Auto-fix lint and formatting |
| `npm run check-types` | Type-check with `tsc --noEmit` |
| `npm run knip` | Report unused files, exports, and dependencies |

## Tech

Next.js 16 (App Router, React Compiler) and React 19, Tailwind CSS 4, TanStack Query for data fetching, Dexie for local IndexedDB storage, and Radix UI + cmdk for the interface. Requires Node.js 24+.

---

Crafted by [<img src="https://matthewblode.com/avatar-circle.png" width="20" align="top" />](https://matthewblode.com) [Matthew Blode](https://matthewblode.com)
