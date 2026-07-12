import { Suspense } from "react";

import { CollectionView } from "@/components/collection-view";

export const metadata = { title: "Likes — HN" };

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
