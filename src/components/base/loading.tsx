import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  variant?: "feed" | "item";
  rows?: number;
  showPageHeader?: boolean;
  commentRows?: number;
};

const FEED_PAGE_SIZE = 30;
const DEFAULT_COMMENT_ROWS = 6;

type FeedSkeletonProps = {
  rows: number;
  showPageHeader?: boolean;
};

const FeedSkeleton = ({ rows, showPageHeader }: FeedSkeletonProps) => {
  return (
    <div className="bg-card shadow-xl border border-transparent sm:border-border sm:rounded-lg">
      {showPageHeader && (
        <div className="relative p-5 overflow-hidden text-center border-b text-foreground border-border">
          <Skeleton className="h-5 w-20 mx-auto" />
        </div>
      )}

      {Array.from({ length: rows }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loader with fixed order
          key={`feed-${index}`}
          className="relative flex flex-wrap px-4 overflow-hidden border-b border-border"
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

          <div className="flex flex-row items-center w-full pt-1 pb-3 text-sm text-muted-foreground">
            <Skeleton className="h-5 w-12" />
            <span className="px-2" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      ))}

      <div className="relative flex items-center justify-center px-4 py-4 overflow-hidden sm:px-5 sm:py-6">
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

type ItemSkeletonProps = {
  commentRows: number;
};

const ItemSkeleton = ({ commentRows }: ItemSkeletonProps) => {
  return (
    <div className="wrap">
      <div className="block pb-4 mb-4 border-b border-border">
        <div className="block w-full pb-2 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>

        <div className="block pb-2 text-xl leading-[1.2] text-foreground">
          <Skeleton className="h-6 w-4/5" />
        </div>

        <div className="content">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-5/6 mb-2" />
          <Skeleton className="h-6 w-3/5" />
        </div>
      </div>

      <div className="mb-5 text-base text-foreground">
        <Skeleton className="h-6 w-40" />
      </div>

      <ul className="p-0 m-0">
        {Array.from({ length: commentRows }).map((_, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loader with fixed order
            key={`comment-${index}`}
            className="comment-wrap"
          >
            <div className="comment">
              <div className="comment-toggle">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>

              <div className="content">
                <Skeleton className="h-6 w-full mb-2" />
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
