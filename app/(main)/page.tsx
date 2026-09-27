import type { Metadata } from "next";

import { NewsFeed } from "@/components/news-feed";
import { ZoneBreadcrumb } from "@/components/zone-breadcrumb";
import type { FeedType } from "@/hooks/use-news-feed";
import { deduplicateStories, fetchFeed } from "@/lib/hn-live";
import type { CandidateStory } from "@/lib/types";

export const metadata: Metadata = {
  title: { absolute: "HN: A Fast Hacker News Client" },
  description:
    "A fast, keyboard-friendly Hacker News client. Browse Top, New, Show HN, Ask HN, and jobs, read comment threads, and sign in to vote, comment, and submit.",
};

interface HomePageProps {
  searchParams: Promise<{ type?: string }>;
}

const VALID_TYPES = new Set<string>(["news", "newest", "show", "ask", "jobs"]);

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const type: FeedType = VALID_TYPES.has(params.type ?? "")
    ? (params.type as FeedType)
    : "news";
  let initialStories: CandidateStory[] = [];

  try {
    initialStories = deduplicateStories(await fetchFeed(type, 1));
  } catch {
    initialStories = [];
  }

  return (
    <>
      {/*
        Rule 4: the only prior edge back to blode.co was the footer credit in
        the sidebar, which sits under an infinite-scroll feed nobody reaches.
        Root page only, so /bookmarks, /for-you, /post/[id] and /search stay
        free of a second trail.
      */}
      <div className="border-border border-b bg-background px-4 py-1.5">
        <ZoneBreadcrumb product="HN" />
      </div>
      <NewsFeed initialStories={initialStories} type={type} />
    </>
  );
}
