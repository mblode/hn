"use client";

import { useEffect, useState } from "react";

const LOAD_MORE_MARGIN_PX = 600;

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  enabled?: boolean;
}

interface UseInfiniteScrollResult {
  /** Attach to the scrolling element (the one with `overflow-y-scroll`). */
  scrollRef: (node: HTMLElement | null) => void;
  /** Attach to an empty element rendered after the last list item. */
  sentinelRef: (node: HTMLElement | null) => void;
}

/**
 * Loads the next page as the bottom of a scroll container comes into range.
 *
 * The feed scrolls inside a `min-h-0 flex-1 overflow-y-scroll` element rather
 * than the document, which makes two things easy to get wrong:
 *
 * 1. An observer with the implicit (viewport) root has its `rootMargin`
 *    silently discarded, because the container's overflow clip is applied
 *    unexpanded. The sentinel then only registers at the exact scroll bottom.
 * 2. iOS Safari defers observer callbacks until a momentum scroll settles, and
 *    rubber-banding can carry the sentinel back out of range before one lands
 *    — so "exact bottom only" never fires at all on a fling.
 *
 * So: observe against the container as an explicit root, and back it with a
 * passive scroll check that reads live measurements.
 */
export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  enabled = true,
}: UseInfiniteScrollOptions): UseInfiniteScrollResult => {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [sentinelEl, setSentinelEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const active = enabled && hasNextPage && !isFetchingNextPage;
    if (!(active && scrollEl && sentinelEl)) {
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
      { root: scrollEl, rootMargin: `${LOAD_MORE_MARGIN_PX}px 0px` }
    );
    observer.observe(sentinelEl);

    const handleScroll = () => {
      const remaining =
        scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight;
      if (remaining < LOAD_MORE_MARGIN_PX) {
        loadMore();
      }
    };
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [
    enabled,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    scrollEl,
    sentinelEl,
  ]);

  return { scrollRef: setScrollEl, sentinelRef: setSentinelEl };
};
