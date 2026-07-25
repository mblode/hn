# Local Development Setup

How to set up, run, and work with this project locally. Non-obvious dependencies, environment config, common setup issues.

## Do not "fix" the repo-wide auto-format hook

`.claude/settings.json` registers a `PostToolUse` hook on `Write|Edit` that runs
`npx ultracite fix` with **no path argument**, so it formats the whole tree. This
looks like a bug and is not — it is verbatim what `ultracite init` generates for
Claude Code, and ultracite only passes a file list when the underlying linter is
biome, never for oxlint. Rewriting it to scope to the edited file just gets
clobbered the next time anyone runs `ultracite init`.

It is safe because oxfmt is fast (~150ms across ~100 files) and because a
formatter-clean tree makes it a no-op.

If it ever starts touching dozens of unrelated files, the tree has **drifted**
from the formatter — that is the actual fault. Fix the drift rather than the hook:

```bash
npx ultracite fix && git add -u && git commit -m "Bring the repo in line with the ultracite formatter"
```

Until that lands, `git status --short` after every edit and restore the collateral
before staging, or the real change is buried:

```bash
git status --short | awk '$1=="M" && $2!="<your/file>" {print $2}' | xargs -r git restore --
```

The `lefthook` pre-commit job is separately scoped (`npx ultracite fix
{staged_files}` with `stage_fixed: true`), so commits only ever format staged files.

## `type: module` silences the config warnings

`package.json` sets `"type": "module"`. Without it, every `lint`, `format`, and
`git commit` printed a `MODULE_TYPELESS_PACKAGE_JSON` warning for
`oxlint.config.ts` / `oxfmt.config.ts`. Safe here because the repo has no `.js` or
`.cjs` files — all configs are `.ts` or `.mjs`.

## Verifying the setup

`npx ultracite doctor` checks that oxlint/oxfmt are installed, that
`oxlint.config.ts` and `oxfmt.config.ts` extend the ultracite configs, and that no
conflicting formatters are present.
