import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostViewer } from "@/components/post-viewer";
import { fetchItem } from "@/lib/hn-api";
import { fetchFeed } from "@/lib/hn-live";
import { asset, BASE_PATH, SITE_NAME } from "@/lib/site";
import type { CandidateStory } from "@/lib/types";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

const HTTP_URL = /^https?:\/\//;

const toCandidateStory = (item: {
  id: number;
  title: string;
  url: string;
  user: string;
  time: number;
  points: number;
  comments_count: number;
}): CandidateStory => ({
  id: item.id,
  title: item.title,
  url: item.url && HTTP_URL.test(item.url) ? item.url : null,
  by: item.user,
  time: item.time,
  score: item.points ?? 0,
  descendants: item.comments_count,
});

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = Number.parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return {};
  }
  const item = await fetchItem(numId);
  if (!item) {
    return {};
  }
  return {
    title: item.title,
    robots: { index: false },
    // A child `openGraph` replaces the layout's rather than merging into it, so
    // siteName, type and the image have to be restated or every post loses its
    // share preview.
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: item.title,
      url: asset(`/post/${id}`),
      images: [
        { url: `${BASE_PATH}/opengraph-image.png`, width: 1200, height: 630 },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const numId = Number.parseInt(id, 10);
  if (Number.isNaN(numId)) {
    notFound();
  }

  const [item, feedStories] = await Promise.all([
    fetchItem(numId),
    fetchFeed("news", 1),
  ]);
  if (!item) {
    notFound();
  }

  const candidate = toCandidateStory(item);
  const rest = feedStories.filter((s) => s.id !== numId);
  return (
    <PostViewer
      initialCandidates={[candidate, ...rest]}
      originPath="/"
      pinnedId={numId}
    />
  );
}
