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
 * Prefix an app-relative URL for raw browser APIs (`history.pushState`,
 * `location.href`, plain `<a href>`) that Next.js does not rewrite.
 *
 * The zone root maps to bare `BASE_PATH` (no trailing slash) so results
 * compare equal to `location.pathname`, which is what the browser reports
 * at `blode.co/hn`.
 */
export const withBasePath = (path: string): string => {
  if (path === "/") {
    return BASE_PATH || "/";
  }
  if (path.startsWith("/?")) {
    return `${BASE_PATH}${path.slice(1)}`;
  }
  return `${BASE_PATH}${path}`;
};
