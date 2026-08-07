import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { DevTools } from "@/components/dev-tools";
import { JsonLd } from "@/components/json-ld";
import { QueryProvider } from "@/components/query-provider";
import { siteGraph } from "@/lib/schema";
import { BASE_PATH, SITE_NAME, SITE_ORIGIN, SITE_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "HN is a fast, modern Hacker News client. Browse Top, New, Show HN, Ask HN, and jobs, read and reply to threads, and sign in to vote, comment, and submit.";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_ORIGIN),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      { url: `${BASE_PATH}/opengraph-image.png`, width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
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
  return (
    <html lang="en">
      <head>
        <link href={process.env.NEXT_PUBLIC_POSTHOG_HOST} rel="preconnect" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={siteGraph(SITE_DESCRIPTION)} />
        <QueryProvider>{children}</QueryProvider>
        <DevTools />
      </body>
    </html>
  );
}
