import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  variant?: "feed" | "item";
  rows?: number;
  showPageHeader?: boolean;
  commentRows?: number;
}

const FEED_PAGE_SIZE = 30;
const DEFAULT_COMMENT_ROWS = 6;

interface FeedSkeletonProps {
  rows: number;
  showPageHeader?: boolean;
}

const FeedSkeleton = ({ rows, showPageHeader }: FeedSkeletonProps) => {
  return (
    <div className="border border-transparent bg-card shadow-xl sm:rounded-lg sm:border-border">
      {showPageHeader && (
        <div className="relative overflow-hidden border-border border-b p-5 text-center text-foreground">
          <Skeleton className="mx-auto h-5 w-20" />
        </div>
      )}

      {Array.from({ length: rows }).map((_, index) => (
        <div
          className="relative flex flex-wrap overflow-hidden border-border border-b px-4"
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loader with fixed order
          key={`feed-${index}`}
        >
          <div className="flex flex-row items-center pt-3 pb-1 text-sm">
            <Skeleton className="h-5 w-24" />
            <span className="px-1" />
            <Skeleton className="h-5 w-16" />
            <span className="px-1" />
            <Skeleton className="h-5 w-12" />
          </div>

          <h3 className="w-full text-base">
            <div className="list-title">
              <Skeleton className="h-6 w-11/12" />
            </div>
          </h3>

          <div className="flex w-full flex-row items-center pt-1 pb-3 text-muted-foreground text-sm">
            <Skeleton className="h-5 w-12" />
            <span className="px-2" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      ))}

      <div className="relative flex items-center justify-center overflow-hidden px-4 py-4 sm:px-5 sm:py-6">
        <div className="mx-1">
          <Skeleton className="h-10 w-20" />
        </div>
        <div>
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  );
};

interface ItemSkeletonProps {
  commentRows: number;
}

const ItemSkeleton = ({ commentRows }: ItemSkeletonProps) => {
  return (
    <div className="wrap">
      <div className="mb-4 block border-border border-b pb-4">
        <div className="block w-full pb-2 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        <div className="block pb-2 text-foreground text-xl leading-[1.2]">
          <Skeleton className="h-6 w-4/5" />
        </div>

        <div className="content">
          <Skeleton className="mb-2 h-6 w-full" />
          <Skeleton className="mb-2 h-6 w-5/6" />
          <Skeleton className="h-6 w-3/5" />
        </div>
      </div>

      <div className="mb-5 text-base text-foreground">
        <Skeleton className="h-6 w-40" />
      </div>

      <ul className="m-0 p-0">
        {Array.from({ length: commentRows }).map((_, index) => (
          <li
            className="comment-wrap"
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loader with fixed order
            key={`comment-${index}`}
          >
            <div className="comment">
              <div className="comment-toggle">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>

              <div className="content">
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Loading = ({
  variant = "feed",
  rows = FEED_PAGE_SIZE,
  showPageHeader = false,
  commentRows = DEFAULT_COMMENT_ROWS,
}: Props) => {
  return variant === "item" ? (
    <ItemSkeleton commentRows={commentRows} />
  ) : (
    <FeedSkeleton rows={rows} showPageHeader={showPageHeader} />
  );
};
