# HN

Hacker News stories in a TikTok-style swipeable UI.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Recharts, React Hook Form + Zod.

React Compiler is enabled (`babel-plugin-react-compiler`).

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — Biome check
- `npm run lint:fix` — auto-fix lint issues
- `npm run format` — auto-format with Biome
- `npm run format:check` — check formatting without writing
- `npm run check-types` — TypeScript type checking
- `npm run fix` — auto-fix lint/format via Ultracite
- `npm run download-hn` — fetch HN data (`scripts/download-hn.ts`)
- `npm run process-candidates` — process candidate stories (`scripts/process-candidates.ts`)
- `npm run test` — run tests (Vitest)
- `npm run test:watch` — run tests in watch mode

## Lint & Format

This project uses **Ultracite** (Biome under the hood). Run `npm run fix` before committing.

## Available Context

Additional context is available in the files below. Consult the relevant file when working in a related area — see each description for scope.

- `knowledge/local-dev-setup.md` — Local Development Setup: How to set up, run, and work with this project locally. Non-obvious dependencies, environment config, common setup issues.
- `knowledge/architecture-boundaries.md` — Architecture & System Boundaries: Key architectural decisions, service boundaries, data flow, integration points, and why things are the way they are.
- `knowledge/testing-patterns.md` — Testing Patterns: Testing strategies, test infrastructure quirks, how to run/debug specific test suites, mocking conventions.

## Conventions

- Use Next.js `<Image>` over `<img>`
- Use Server Components by default; add `"use client"` only when needed
- Use `ref` as a prop (React 19) — do not use `React.forwardRef`
- Prefer `unknown` over `any`
