import { Suspense } from "react";

import { CollectionView } from "@/components/collection-view";

// Bare, not "Bookmarks | HN": the layout's template adds the suffix, and
// hand-rolling it too served <title>Bookmarks | HN | HN</title>.
export const metadata = { title: "Bookmarks" };

export default function BookmarksPage() {
  return (
    <Suspense>
      <CollectionView
        emptyMessage="No bookmarked posts yet. Press B to bookmark a story."
        title="Bookmarks"
        type="bookmark"
      />
    </Suspense>
  );
}
