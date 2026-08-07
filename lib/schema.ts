import { SITE_NAME, SITE_ORIGIN, SITE_URL } from "@/lib/site";

/**
 * Stable `@id` anchors, so this zone's nodes resolve into one graph instead of
 * several disconnected snippets.
 *
 * The Person, Organization and WebSite ids belong to blode.co and are only ever
 * referenced, never redefined here. blode.co/hn is a path on blode.co behind a
 * rewrite, not a site of its own: redefining them would publish a second
 * Matthew Blode and a second website on one domain. Contract:
 * blode-co/apps/web/.claude/knowledge/zone-conventions.md
 */
export const schemaId = {
  breadcrumb: `${SITE_URL}/#breadcrumb`,
  organization: `${SITE_ORIGIN}/#organization`,
  person: `${SITE_ORIGIN}/#person`,
  webPage: `${SITE_URL}/#webpage`,
  website: `${SITE_ORIGIN}/#website`,
} as const;

export const siteGraph = (description: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    /*
     * A WebPage, not a WebApplication. WebApplication is a SoftwareApplication
     * subtype, which validators hold to Google's Software App rich result: that
     * requires aggregateRating or review, and the only ratings available here
     * would be ones we wrote about our own tool, which Google's review policy
     * forbids.
     */
    {
      "@id": schemaId.webPage,
      "@type": "WebPage",
      author: { "@id": schemaId.person },
      breadcrumb: { "@id": schemaId.breadcrumb },
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": schemaId.website },
      keywords: ["Hacker News", "News reader", "Client-side"],
      name: SITE_NAME,
      offers: {
        "@type": "Offer",
        category: "Free",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": schemaId.organization },
      url: SITE_URL,
    },
    {
      "@id": schemaId.breadcrumb,
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          item: `${SITE_ORIGIN}/`,
          name: "Home",
          position: 1,
        },
        {
          "@type": "ListItem",
          item: `${SITE_ORIGIN}/projects`,
          name: "Projects",
          position: 2,
        },
        {
          "@type": "ListItem",
          item: SITE_URL,
          name: "HackerTok",
          position: 3,
        },
      ],
    },
  ],
});
