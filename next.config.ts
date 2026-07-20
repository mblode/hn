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
  // Keep this Hacker News client fully usable but out of Google's index: a
  // sitewide noindex stops the mirror ranking for HN queries it can't own.
  headers: async () => [
    {
      source: "/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    },
  ],
};

export default nextConfig;
