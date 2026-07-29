import type { MetadataRoute } from "next";

import { BASE_PATH, SITE_URL } from "@/lib/site";

/**
 * Kept in step with the `X-Robots-Tag: noindex` headers in `next.config.ts`.
 * Those routes are meant to stay out of the index, but `noindex` still costs a
 * fetch per URL, and `/post/` is one URL per HN story. Disallow them so the
 * crawl never reaches them in the first place.
 *
 * Paths carry `BASE_PATH`: robots.txt paths resolve from the domain root and
 * this app is served under `/hn` on blode.co (and under the same prefix on its
 * own origin, since `basePath` applies there too). Next prefixes the robots.txt
 * route itself but not the rules inside it.
 */
const NOINDEX_PATHS = ["/post/", "/bookmarks", "/likes", "/for-you", "/search"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: NOINDEX_PATHS.map((path) => `${BASE_PATH}${path}`),
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
