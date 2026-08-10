import type { Metadata } from "next";
import localFont from "next/font/local";

import { DevTools } from "@/components/dev-tools";
import { JsonLd } from "@/components/json-ld";
import { QueryProvider } from "@/components/query-provider";
import { siteGraph } from "@/lib/schema";
import {
  cardTitle,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";

import "./globals.css";

// Both fall back to Tailwind's own stacks, because `--font-sans` and `--font-mono`
// point at these. Without one, next/font's generated face takes over, and it is
// metric-matched to Arial — passable for the sans, proportional for the mono.
// The lists have to be inline: the font loader only accepts written literals.
const glide = localFont({
  src: [
    { path: "./fonts/glide-variable.woff2", style: "normal" },
    { path: "./fonts/glide-variable-italic.woff2", style: "italic" },
  ],
  variable: "--font-glide",
  weight: "100 950",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

const glideMono = localFont({
  src: "./fonts/glide-mono.woff2",
  variable: "--font-glide-mono",
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "Liberation Mono",
    "Courier New",
    "monospace",
  ],
});

const SITE_DESCRIPTION =
  "HN is a fast, modern Hacker News client. Browse Top, New, Show HN, Ask HN, and jobs, read and reply to threads, and sign in to vote, comment, and submit.";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Person-level attribution otherwise lives only in the footer and the
  // JSON-LD, neither of which a meta reader looks at.
  authors: [{ name: SITE_AUTHOR, url: SITE_ORIGIN }],
  creator: SITE_AUTHOR,
  // The zone URL, not the bare origin (Rule 11). Only correct because the card
  // is a generated `opengraph-image.tsx` route: Next does not prefix those with
  // `basePath`, so `metadataBase` supplies the prefix exactly once. Against the
  // static PNG this replaced, the two would have stacked into `/hn/hn/…`.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  // No `images` here: `app/opengraph-image.tsx` is the card. Next reuses it for
  // `twitter:image` too when there is no `twitter-image` file.
  openGraph: {
    type: "website",
    siteName: SITE_AUTHOR,
    title: cardTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: TWITTER_HANDLE,
    title: cardTitle,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
  // Path without `/hn`: `metadataBase` already carries the zone, and Next joins
  // rather than replaces, so spelling the prefix here would double it.
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "HN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
   * The font variables go on <html>, not <body>: Tailwind's preflight sets the
   * page family on the html element, so a variable scoped to body is invisible
   * to it and every face silently falls back to the system sans.
   */
  return (
    <html className={`${glide.variable} ${glideMono.variable}`} lang="en">
      <head>
        <link href={process.env.NEXT_PUBLIC_POSTHOG_HOST} rel="preconnect" />
      </head>
      <body className="antialiased">
        <JsonLd data={siteGraph(SITE_DESCRIPTION)} />
        <QueryProvider>{children}</QueryProvider>
        <DevTools />
      </body>
    </html>
  );
}
