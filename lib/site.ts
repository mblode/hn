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

/**
 * Prefix a root-relative path with the `basePath`.
 *
 * Use it anywhere Next does not: raw `<a href>`, `window.location`, the
 * History API, `fetch()`, and metadata URLs. Never on `<Link href>`, which
 * already gets the prefix and would end up with it twice.
 */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const SITE_NAME = "HN";
