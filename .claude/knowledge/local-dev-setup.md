# Local Development Setup

How to set up, run, and work with this project locally. Non-obvious dependencies, environment config, common setup issues.

## The auto-format hook reformats the entire repo on every edit

`.claude/settings.json` registers a `PostToolUse` hook on `Write|Edit` that runs
`npx ultracite fix` with **no file argument**, so it formats the whole working
tree — not just the file that changed. `HEAD` is not currently ultracite-clean
(import grouping, `netlify.toml` indentation), so a single one-line edit shows up
as ~40 modified files.

Always run `git status --short` after editing and restore everything outside your
change before staging:

```bash
git status --short | awk '$1=="M" && $2!="<your/file>" {print $2}' | xargs -r git restore --
```

Scoping the hook to the edited file (`npx ultracite fix "$CLAUDE_FILE_PATHS"`)
would fix this at the source. The `lefthook` pre-commit job is already correctly
scoped (`npx ultracite fix {staged_files}`), so only the Claude hook is at fault.

## Lint command names in CLAUDE.md are stale

`npm run lint` runs **oxlint**, not Biome. It prints a
`MODULE_TYPELESS_PACKAGE_JSON` warning about `oxlint.config.ts` on every run —
that is noise, not a failure. `npm run check-types` is the authoritative type
gate, because `next.config.ts` sets `typescript.ignoreBuildErrors: true`.
