import type { NextConfig } from "next";

import { BASE_PATH, SITE_URL } from "./lib/site";

const nextConfig: NextConfig = {
  /**
   * Keep the non-canonical hostnames out of the index.
   *
   * This app canonicalises to blode.co/hn, but it also answers on the
   * origin blode.co proxies to and on its *.vercel.app aliases. Those sit
   * inside the sc-domain:blode.co Search Console property, so left alone they
   * are a crawlable duplicate of the whole site.
   *
   * The discriminator is x-forwarded-host, NOT host: the multi-zone rewrite
   * proxies to the origin, so `host` is the origin for real blode.co traffic
   * too. x-forwarded-host keeps the hostname the client actually asked for,
   * which is blode.co when proxied. Matching on `host` would noindex the
   * live site.
   */
  headers() {
    return Promise.resolve([
      {
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        has: [
          {
            key: "x-forwarded-host",
            type: "header" as const,
            value: String.raw`.*\.zone\.blode\.co|.*\.vercel\.app`,
          },
        ],
        source: "/:path*",
      },
    ]);
  },
  assetPrefix: BASE_PATH,
  basePath: BASE_PATH,
  reactCompiler: true,
  // TypeScript 7 moved its compiler API; the standalone check-types script is
  // the authoritative type gate while Next's redundant inline check is skipped.
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "radix-ui"],
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
  // Let the home feed index, but keep thread pages and personal utility
  // routes out of Google (they generated the junk HN-query impressions).
  headers: async () => {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex" }];
    return [
      { source: "/post/:id*", headers: noindex },
      { source: "/bookmarks", headers: noindex },
      { source: "/likes", headers: noindex },
      { source: "/for-you", headers: noindex },
      { source: "/search", headers: noindex },
    ];
  },
};

export default nextConfig;
