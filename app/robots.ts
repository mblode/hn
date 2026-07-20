import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Allow crawling (so Google can see the sitewide noindex header and drop
  // the pages) but do not advertise a sitemap for a site we want deindexed.
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
