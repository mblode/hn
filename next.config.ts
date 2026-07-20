import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // TypeScript 7 moved its compiler API; the standalone check-types script is
  // the authoritative type gate while Next's redundant inline check is skipped.
  typescript: { ignoreBuildErrors: true },
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "radix-ui"],
  },
  redirects: async () => [
    { source: "/news", destination: "/", permanent: true },
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
