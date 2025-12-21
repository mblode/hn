# Repository Guidelines

## Project Structure & Module Organization
- `src/main.tsx` bootstraps the React app and router.
- `src/components/` contains UI and route components, with shared pieces in `src/components/base/`, icons in `src/components/icons/`, and small primitives in `src/components/ui/`.
- `src/lib/` holds shared utilities (for example `src/lib/utils.ts`).
- `src/index.css` defines global Tailwind theme tokens and component styles.
- `public/` stores static assets such as favicons and the web manifest; `index.html` is the Vite HTML shell.

## Build, Test, and Development Commands
- `npm run dev` - start the Vite dev server with HMR.
- `npm run build` - typecheck (`tsc -b`) and produce a production build.
- `npm run preview` - serve the production build locally.
- `npm run lint` - run Biome checks.
- `npm run format` - apply Biome formatting and import organization.

## Coding Style & Naming Conventions
- TypeScript + React, formatted and linted by Biome (`biome.json`).
- Indentation is 2 spaces; Biome handles quotes, import order, and formatting.
- Use the `@/` alias for imports from `src/` (configured in `vite.config.ts`).
- File names are kebab-case (`comment-item.tsx`), component exports are PascalCase (`CommentItem`).

## Testing Guidelines
- No automated tests are configured yet. If you add tests, use `src/**/*.test.tsx` or `src/**/__tests__/` and add a script in `package.json`.
- Prefer covering data transforms and route behaviors first.

## Commit & Pull Request Guidelines
- Git history uses short, capitalized summaries (for example `Fix`, `Update deps`). Keep commits concise and descriptive (for example `Fix pagination parsing`).
- PRs should include: summary, testing performed, and screenshots for UI changes. Link related issues when applicable.

## Security & Content Notes
- HN content is rendered as HTML in a few places; keep it limited to trusted sources and avoid introducing new untrusted `dangerouslySetInnerHTML` usage.
