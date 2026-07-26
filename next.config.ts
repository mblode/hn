import type { NextConfig } from "next";

import { BASE_PATH, SITE_URL } from "./lib/site";

const nextConfig: NextConfig = {
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
