"use client";

import { useEffect, useState } from "react";

import { useOverflowScroller } from "@/hooks/use-overflow-scroller";
import { readDistanceToBottom } from "@/lib/scroll-root";

const LOAD_MORE_MARGIN_PX = 600;

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
}

interface UseInfiniteScrollResult {
  /** Attach to the page `<main>` (nested scroller on desktop, document flow on mobile). */
  scrollRef: (node: HTMLElement | null) => void;
  /** Attach to an empty element rendered after the last list item. */
  sentinelRef: (node: HTMLElement | null) => void;
}

/**
 * Loads the next page as the bottom of the active scroll root comes into range.
 *
 * Desktop: the feed scrolls inside a nested `overflow-y-scroll` main. An
 * observer with the implicit (viewport) root has its `rootMargin` silently
 * discarded, because the container's overflow clip is applied unexpanded —
 * plus iOS Safari defers observer callbacks until momentum settles. Observe
 * against the container as an explicit root, and back it with a passive
 * scroll check.
 *
 * Mobile: the document scrolls, so the observer uses the viewport (`root:
 * null`) and the scroll listener is on `window`. That is also what makes
 * tap-status-bar-to-top work.
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  enabled = true,
}: UseInfiniteScrollOptions): UseInfiniteScrollResult => {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [sentinelEl, setSentinelEl] = useState<HTMLElement | null>(null);
  const nested = useOverflowScroller(scrollEl);

  useEffect(() => {
    const active = enabled && hasNextPage && !isFetchingNextPage;
    if (!(active && scrollEl && sentinelEl) || nested === null) {
      return;
    }

    // The observer and the scroll listener can both fire before React re-renders
    // with `isFetchingNextPage`, so only the first one through wins.
    let requested = false;
    const loadMore = () => {
      if (requested) {
        return;
      }
      requested = true;
      fetchNextPage();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      {
        root: nested ? scrollEl : null,
        rootMargin: `${LOAD_MORE_MARGIN_PX}px 0px`,
      }
    );
    observer.observe(sentinelEl);

    const scroller: HTMLElement | Window = nested ? scrollEl : window;
    const handleScroll = () => {
      if (readDistanceToBottom(scroller) < LOAD_MORE_MARGIN_PX) {
        loadMore();
      }
    };
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, [
    enabled,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    nested,
    scrollEl,
    sentinelEl,
  ]);

  return { scrollRef: setScrollEl, sentinelRef: setSentinelEl };
};
