import { Suspense } from "react";

import { CollectionView } from "@/components/collection-view";

// Bare, not "Likes | HN": the layout's template adds the suffix, and
// hand-rolling it too served <title>Likes | HN | HN</title>.
export const metadata = { title: "Likes" };

export default function LikesPage() {
  return (
    <Suspense>
      <CollectionView
        emptyMessage="No liked posts yet. Press L to like a story."
        title="Likes"
        type="like"
      />
    </Suspense>
  );
}
