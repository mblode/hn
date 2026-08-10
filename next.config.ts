import type { NextConfig } from "next";

import { BASE_PATH, SITE_URL } from "./lib/site";

const isDev = process.env.NODE_ENV === "development";

// The PostHog ingestion host, set per Vercel project to our reverse proxy
// (https://r.blode.co). posthog-js lazy-loads chunks such as the recorder from
// it, so it belongs in script-src as well as connect-src.
const posthogOrigin = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";

// Feeds, threads and search are fetched from the browser, so their origins are
// connect-src entries rather than server-only calls. Authenticated actions go
// through `/hn/api/hn`, which is same-origin and covered by 'self'.
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' covers Next's bootstrap and the JSON-LD block. Dev also
  // needs 'unsafe-eval' for React Refresh; production must not have it.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${posthogOrigin}`,
  `connect-src 'self' ${posthogOrigin} https://api.hackerwebapp.com https://hn.algolia.com`,
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  assetPrefix: BASE_PATH,
  basePath: BASE_PATH,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "radix-ui"],
    turbopackRustReactCompiler: true,
  },
  redirects: async () => [
    { source: "/news", destination: "/", permanent: true },
    // Retired subdomains. Both are attached to this project; the zone origin
    // (hn.zone.blode.co) deliberately has no rule here, since blode.co proxies
    // to it and redirecting would loop.
    ...["hackertok.blode.co", "hn.blode.co"].flatMap((host) => {
      const has = [{ type: "host" as const, value: host }];
      return [
        // `/:path*` also matches the root, but only via an empty capture that
        // would leave a trailing slash and cost a second hop.
        {
          basePath: false as const,
          destination: SITE_URL,
          has,
          permanent: true,
          source: "/",
        },
        {
          basePath: false as const,
          destination: `${SITE_URL}/:path*`,
          has,
          permanent: true,
          source: "/:path*",
        },
      ];
    }),
  ],
  headers: async () => {
    // Let the home feed index, but keep thread pages and personal utility
    // routes out of Google (they generated the junk HN-query impressions).
    const noindex = [{ key: "X-Robots-Tag", value: "noindex" }];

    // Every matching rule applies in array order and a later value wins per
    // header key, so the catch-all comes first and per-route rules after it.
    //
    // `/:path*`, not `/(.*)`. Next prefixes basePath onto the source, and
    // `/hn/(.*)` needs the separator, so it misses the zone root: the busiest
    // page on the site. `/:path*` matches `/hn` as well.
    return [
      { source: "/:path*", headers: securityHeaders },
      // The share card is fetched by other origins, so it opts out of the
      // same-origin CORP the catch-all sets.
      {
        source: "/opengraph-image.png",
        headers: [
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      {
        source: "/twitter-image.png",
        headers: [
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      { source: "/post/:id*", headers: noindex },
      { source: "/bookmarks", headers: noindex },
      { source: "/likes", headers: noindex },
      { source: "/for-you", headers: noindex },
      { source: "/search", headers: noindex },
    ];
  },
};

export default nextConfig;
