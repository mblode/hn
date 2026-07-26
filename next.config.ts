import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/hn",
  basePath: "/hn",
  reactCompiler: true,
  // TypeScript 7 moved its compiler API; the standalone check-types script is
  // the authoritative type gate while Next's redundant inline check is skipped.
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "radix-ui"],
  },
  redirects: async () => [
    { source: "/news", destination: "/", permanent: true },
    ...["hackertok.blode.co", "hn.blode.co"].flatMap((host) => [
      {
        basePath: false as const,
        destination: "https://blode.co/hn",
        has: [{ type: "host" as const, value: host }],
        permanent: true,
        source: "/",
      },
      {
        basePath: false as const,
        destination: "https://blode.co/hn/:path*",
        has: [{ type: "host" as const, value: host }],
        permanent: true,
        source: "/:path*",
      },
    ]),
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
