import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostViewer } from "@/components/post-viewer";
import { fetchItem } from "@/lib/hn-api";
import { fetchFeed } from "@/lib/hn-live";
import { asset, BASE_PATH, fitTitle, SITE_NAME } from "@/lib/site";
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
    // Trimmed to fit the layout's `%s | HN` template. The suffix stays: it is
    // what identifies the result, and the story title is the expendable half.
    title: fitTitle(item.title),
    // No `robots` here on purpose. Thread pages stay `noindex`, but the signal
    // comes from the `X-Robots-Tag` header in `next.config.ts`, which also
    // covers the non-HTML responses under this route. Emitting both had every
    // post reported as a duplicate directive.
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
    <>
      {/*
        Rendered here rather than left to PostViewer's own `heading`, which
        returns a skeleton until it is ready on the client — so the served HTML
        had no h1 at all. The post's title is the right heading for the page
        anyway; PostViewer's generic "HN" was never it.
      */}
      <h1 className="sr-only">{item.title}</h1>
      <PostViewer
        heading={null}
        initialCandidates={[candidate, ...rest]}
        originPath="/"
        pinnedId={numId}
      />
    </>
  );
}
