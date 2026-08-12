import { extractDomain } from "@/lib/ranking";
import { asset } from "@/lib/site";
import type { CandidateStory } from "@/lib/types";
import { formatCount, relativeTime } from "@/lib/utils";

import { Dot } from "./dot";

// Both branches render the same headline; they differ only in where it points.
const TITLE_CLASS =
  "block cursor-pointer text-pretty pt-0.5 leading-snug hover:underline";

interface StoryListItemProps {
  story: CandidateStory;
  onSelect: () => void;
  children?: React.ReactNode;
}

export const StoryListItem = ({
  story,
  onSelect,
  children,
}: StoryListItemProps) => {
  const domain = extractDomain(story.url) ?? null;
  const timeAgo = relativeTime(story.time);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!(e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div className="mx-4 flex items-start gap-3 border-border border-b py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-1 text-muted-foreground text-xs">
          {domain && (
            <>
              <a
                className="transition-colors hover:text-foreground hover:underline"
                href={story.url ?? undefined}
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                {domain}
              </a>
              <Dot />
            </>
          )}
          {story.by && (
            <>
              <a
                className="username transition-colors hover:text-foreground hover:underline"
                href={`https://news.ycombinator.com/user?id=${story.by}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {story.by}
              </a>
              <Dot />
            </>
          )}
          <span suppressHydrationWarning>{timeAgo}</span>
        </div>
        {story.url ? (
          <a
            className={TITLE_CLASS}
            href={story.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {story.title}
          </a>
        ) : (
          <a
            className={TITLE_CLASS}
            href={asset(`/post/${story.id}`)}
            onClick={handleClick}
            // Thread pages are noindex by design, so there is nothing for a
            // crawler to gain by walking one URL per story off every feed.
            rel="nofollow"
          >
            {story.title}
          </a>
        )}
        {(story.score > 0 || story.descendants > 0) && (
          <a
            className="flex cursor-pointer items-center gap-x-3 pt-1 text-muted-foreground text-xs transition-colors hover:text-foreground hover:underline"
            href={asset(`/post/${story.id}`)}
            onClick={handleClick}
            rel="nofollow"
          >
            {story.score > 0 && (
              <span>{`${formatCount(story.score)} likes`}</span>
            )}
            {story.descendants > 0 && (
              <span>{`${formatCount(story.descendants)} comments`}</span>
            )}
          </a>
        )}
      </div>
      {children}
    </div>
  );
};
