/**
 * Canonical location of this app.
 *
 * It ships as a multi-zone child of blode.co: the parent proxies `/hn/*` to
 * this project, and `next.config.ts` sets a matching `basePath`. The two must
 * agree or `blode.co/hn` 404s, so keep the prefix here rather than inline.
 *
 * `basePath` covers `<Link>` and router URLs. It does not touch `fetch()`,
 * `<img src>`, static JSON, or absolute URLs in metadata — those import from
 * this module instead.
 */
export const SITE_ORIGIN = "https://blode.co";
export const BASE_PATH = "/hn";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
