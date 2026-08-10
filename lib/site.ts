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
 *
 * The zone root maps to bare `BASE_PATH` (no trailing slash) so results
 * compare equal to `location.pathname`, which is what the browser reports
 * at `blode.co/hn` — a trailing slash would break PostViewer's popstate
 * origin check and strand the post view after back navigation.
 */
export const asset = (path: string): string => {
  if (path === "/") {
    return BASE_PATH || "/";
  }
  if (path.startsWith("/?")) {
    return `${BASE_PATH}${path.slice(1)}`;
  }
  return `${BASE_PATH}${path}`;
};

export const SITE_NAME = "HN";

/**
 * What `og:site_name` says, on this zone and on every other blode.co path.
 *
 * Not the product. The 33 zones are one site, and the product name is already
 * in `og:title`, so this is the only slot in the card left to say who made the
 * thing: a share of a thread should read the story over *Matthew Blode*, not
 * the story over *HN*. `donebear.com` and `blode.md` are genuinely separate
 * sites and keep their own. Contract:
 * blode-co/apps/web/.claude/knowledge/zone-conventions.md, rule 9.
 */
export const SITE_AUTHOR = "Matthew Blode";

/**
 * Card titles carry the product, because `og:site_name` no longer does.
 *
 * `title.template` reaches `<title>` only — Next resolves the card title
 * through a separate mechanism — so the two have to be declared side by side
 * or an inner page's card silently stops naming HN.
 */
export const cardTitle = {
  default: SITE_NAME,
  template: `%s | ${SITE_NAME}`,
} as const;

/**
 * Character budget for a whole `<title>`, suffix included.
 *
 * Search results are truncated by pixel width rather than character count, so
 * this is the usual conservative stand-in, not a hard limit.
 */
const MAX_TITLE_LENGTH = 60;

/**
 * Fit a story title into the root layout's `%s | HN` template.
 *
 * The suffix is what makes a result identifiable in a list, so the story title
 * yields to it instead of the other way round. Cuts land on a word boundary
 * with an ellipsis; a title that already fits is returned untouched, including
 * a genuinely short one.
 */
export const fitTitle = (title: string): string => {
  const budget = MAX_TITLE_LENGTH - ` | ${SITE_NAME}`.length;
  if (title.length <= budget) {
    return title;
  }

  // One character of the budget goes to the ellipsis itself.
  const clipped = title.slice(0, budget - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  const head = lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped;

  return `${head.trimEnd()}…`;
};
