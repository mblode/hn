# Deployment & Release

How code gets to production. Release processes, environment promotion, rollback
procedures, gotchas.

## This app is a multi-zone child of blode.co, not a standalone site

The canonical URL is `https://blode.co/hn`. The `blode` repo
(`apps/web/lib/zones.ts`) registers an `hn` zone and rewrites `/hn` and
`/hn/:path*` to `https://hn.zone.blode.co/hn`. That origin is a dedicated
hostname CNAMEd to *this* Vercel project (`prj_jijzCMRpIXFxtSbKrEty5WKdKIEt`).

Consequences to keep in mind:

- `next.config.ts` sets `basePath`/`assetPrefix` to `/hn`. **Both sides must
  agree.** If the zone is registered on blode.co but this app is deployed
  without `basePath`, the parent proxies to `hn.zone.blode.co/hn`, the child
  serves from `/`, and `blode.co/hn` 404s. That was the cause of the
  July 2026 outage.
- `hn.blode.co` and `hackertok.blode.co` are attached to this project and 308 to
  `blode.co/hn` via host-matched `redirects()` in `next.config.ts`. Never point
  the parent's zone `origin` at those hosts — the redirect would loop. The zone
  origin must stay `hn.zone.blode.co`, which has no host rule.
- `basePath` does **not** rewrite `fetch()` URLs, raw `<img src>`, or absolute
  URLs in metadata. `lib/site.ts` holds the single source of truth
  (`BASE_PATH`, `SITE_ORIGIN`, `SITE_URL`) and `next.config.ts` imports it, so
  `basePath` cannot drift from the metadata URLs. New client calls go through
  `APP_API_BASE` in `lib/hn-api.ts`; new asset references prefix with
  `BASE_PATH`. `app/manifest.json` is static JSON and is the one place the
  prefix is still written out literally.

Verify a deploy with all three layers, not just one:

```sh
curl -sI -o /dev/null -w '%{http_code}\n' https://blode.co/hn        # 200 via parent proxy
curl -sI -o /dev/null -w '%{http_code}\n' https://hn.zone.blode.co/hn # 200 at the origin
curl -sI -o /dev/null -w '%{redirect_url}\n' https://hn.blode.co/     # -> blode.co/hn
```

A 200 on `hn.zone.blode.co/` with a 404 on `hn.zone.blode.co/hn` is the
signature of a missing/reverted `basePath`.

## Netlify still builds from this repo

`netlify.toml` + `netlify-site/_redirects` serve the legacy
`hn.matthewblode.com` domain as a redirect-only static site. It does not build
the app. Vercel ignores `netlify.toml`.
