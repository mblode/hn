import type { Metadata } from "next";
import { Suspense } from "react";

import { FeedSkeleton } from "@/components/feed-skeleton";
import { PostViewer } from "@/components/post-viewer";
import { fetchFeed } from "@/lib/hn-live";

export const metadata: Metadata = {
  title: "Your personalized Hacker News feed",
  description:
    "Hacker News stories reordered from your reading habits, ranked on your device so your history never leaves the browser.",
};

export const revalidate = 60;

export default function ForYouPage() {
  return (
    <>
      <h1 className="sr-only">Your personalized Hacker News feed</h1>
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </>
  );
}

async function Feed() {
  const initial = await fetchFeed("news", 1);
  return (
    <PostViewer
      heading={null}
      initialCandidates={initial}
      originPath="/for-you"
    />
  );
}
