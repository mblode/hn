# HN

A fast, keyboard-friendly Hacker News client. Live at [blode.co/hn](https://blode.co/hn) (Vercel).

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix).

- **Data:** TanStack Query (`useInfiniteQuery` for every paginated feed)
- **Local state:** Dexie (IndexedDB) for reading history, likes, and bookmarks — never leaves the device
- **UI:** cmdk (command palette), react-hotkeys-hook (shortcuts), date-fns
- **HN auth:** cheerio + dompurify, server-side in `app/api/hn/*`

React Compiler is enabled (`babel-plugin-react-compiler`).

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve a production build
- `npm run lint` — oxlint
- `npm run lint:fix` — auto-fix lint issues
- `npm run format` — auto-format with oxfmt
- `npm run format:check` — check formatting without writing
- `npm run check` — ultracite check (lint + format, no writes)
- `npm run fix` — auto-fix lint/format via ultracite
- `npm run check-types` — TypeScript type checking
- `npm run knip` — find unused files, exports, and dependencies
- `npm run download-hn` — fetch HN data (`scripts/download-hn.ts`)
- `npm run process-candidates` — process candidate stories (`scripts/process-candidates.ts`)

Those two write NDJSON into `data/`, which is gitignored and reaches tens of
gigabytes locally. Nothing in the app reads it at runtime and a fresh clone has
none of it, so treat a missing `data/` as normal rather than as broken setup, and
never stage it.
- `npm run test` — run tests (Vitest)
- `npm run test:watch` — run tests in watch mode

`npm run check-types` is the authoritative type gate: `next.config.ts` sets
`typescript.ignoreBuildErrors: true`, so `npm run build` will not fail on type errors.

## Lint & Format

This project uses **Ultracite** — oxlint + oxfmt under the hood (not Biome). Run
`npm run fix` before committing, and `npx ultracite doctor` to verify the setup.

A `PostToolUse` hook in `.claude/settings.json` runs `npx ultracite fix` after every
`Write`/`Edit`. This is ultracite's own generated hook and is intentionally repo-wide
— leave it alone. It is a fast no-op as long as the tree stays formatter-clean; see
`.claude/knowledge/local-dev-setup.md` if you ever see it touch unrelated files.

## Available Context

Additional context is available in the files below. Consult the relevant file when working in a related area — see each description for scope.

- `.claude/knowledge/local-dev-setup.md` — Local Development Setup: How to set up, run, and work with this project locally. Non-obvious dependencies, environment config, common setup issues.
- `.claude/knowledge/architecture-boundaries.md` — Architecture & System Boundaries: Key architectural decisions, service boundaries, data flow, integration points, and why things are the way they are.
- `.claude/knowledge/testing-patterns.md` — Testing Patterns: Testing strategies, test infrastructure quirks, how to run/debug specific test suites, mocking conventions.
- `.claude/knowledge/deployment-release.md` — Deployment & Release: How code gets to production. Release processes, environment promotion, rollback procedures, gotchas.

## Conventions

- Use Next.js `<Image>` over `<img>`
- Use Server Components by default; add `"use client"` only when needed
- Use `ref` as a prop (React 19) — do not use `React.forwardRef`
- Prefer `unknown` over `any`
