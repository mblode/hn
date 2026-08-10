import type { Metadata } from "next";
import localFont from "next/font/local";

import { DevTools } from "@/components/dev-tools";
import { JsonLd } from "@/components/json-ld";
import { QueryProvider } from "@/components/query-provider";
import { siteGraph } from "@/lib/schema";
import {
  BASE_PATH,
  cardTitle,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";

import "./globals.css";

const glide = localFont({
  src: [
    { path: "./fonts/glide-variable.woff2", style: "normal" },
    { path: "./fonts/glide-variable-italic.woff2", style: "italic" },
  ],
  variable: "--font-glide",
  weight: "100 950",
  display: "swap",
});

const glideMono = localFont({
  src: "./fonts/glide-mono.woff2",
  variable: "--font-glide-mono",
  weight: "400",
  display: "swap",
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
  metadataBase: new URL(SITE_ORIGIN),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_AUTHOR,
    title: cardTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      { url: `${BASE_PATH}/opengraph-image.png`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: TWITTER_HANDLE,
    title: cardTitle,
    description: SITE_DESCRIPTION,
    images: [`${BASE_PATH}/opengraph-image.png`],
  },
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
  manifest: `${BASE_PATH}/manifest.json`,
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
