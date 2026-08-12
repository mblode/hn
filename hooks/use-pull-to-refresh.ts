"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { useOverflowScroller } from "@/hooks/use-overflow-scroller";
import {
  dampenPull,
  INDICATOR_HEIGHT,
  shouldRefresh,
} from "@/lib/pull-to-refresh";
import { readScrollTop } from "@/lib/scroll-root";

interface UsePullToRefreshOptions {
  onRefresh: () => void | Promise<void>;
  enabled?: boolean;
}

interface UsePullToRefreshResult {
  /** Attach to the page `<main>`. */
  scrollRef: (node: HTMLElement | null) => void;
  /** Attach to the indicator element rendered as the scroller's first child. */
  indicatorRef: RefObject<HTMLDivElement | null>;
  isRefreshing: boolean;
}

const RELEASE_TRANSITION = "height 180ms ease-out";

const applyIndicator = (
  el: HTMLDivElement | null,
  height: number,
  spinning: boolean,
  withTransition: boolean
) => {
  if (!el) {
    return;
  }
  el.style.transition = withTransition ? RELEASE_TRANSITION : "none";
  el.style.height = `${height}px`;
  const icon = el.querySelector<HTMLElement>("[data-ptr-icon]");
  if (!icon) {
    return;
  }
  if (spinning) {
    icon.style.transform = "";
    icon.classList.add("animate-spin");
  } else {
    icon.classList.remove("animate-spin");
    icon.style.transform = height > 0 ? `rotate(${height * 2.5}deg)` : "";
  }
};

/**
 * Custom pull-to-refresh on the active scroll root.
 *
 * Native Safari PTR reloads the document. We suppress that with
 * `overscroll-behavior-y: none` and refetch in-app instead.
 *
 * Desktop listens on the nested overflow main. Mobile listens on `window`
 * because the document is the scroller (so status-bar tap-to-top works).
 */
export const usePullToRefresh = ({
  onRefresh,
  enabled = true,
}: UsePullToRefreshOptions): UsePullToRefreshResult => {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const nested = useOverflowScroller(scrollEl);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const onRefreshRef = useRef(onRefresh);
  const pullingRef = useRef(false);
  const startYRef = useRef(0);
  const distanceRef = useRef(0);
  const refreshingRef = useRef(false);

  onRefreshRef.current = onRefresh;

  useEffect(() => {
    if (!(enabled && scrollEl) || nested === null) {
      return;
    }

    const scroller: HTMLElement | Window = nested ? scrollEl : window;
    const indicator = () => indicatorRef.current;

    const onMove = (event: Event) => {
      if (
        !(event instanceof TouchEvent) ||
        !pullingRef.current ||
        refreshingRef.current
      ) {
        return;
      }
      const dy = event.touches[0].clientY - startYRef.current;
      if (dy <= 0 || readScrollTop(scroller) > 0) {
        if (distanceRef.current !== 0) {
          distanceRef.current = 0;
          applyIndicator(indicator(), 0, false, false);
        }
        if (dy <= 0) {
          pullingRef.current = false;
        }
        return;
      }
      event.preventDefault();
      const damped = dampenPull(dy);
      distanceRef.current = damped;
      applyIndicator(indicator(), damped, shouldRefresh(damped), false);
    };

    const detachMove = () => {
      scroller.removeEventListener("touchmove", onMove);
    };

    const onStart = (event: Event) => {
      if (
        !(event instanceof TouchEvent) ||
        refreshingRef.current ||
        event.touches.length !== 1
      ) {
        return;
      }
      if (readScrollTop(scroller) > 0) {
        pullingRef.current = false;
        return;
      }
      pullingRef.current = true;
      startYRef.current = event.touches[0].clientY;
      distanceRef.current = 0;
      scroller.addEventListener("touchmove", onMove, { passive: false });
    };

    const finishRefresh = () => {
      applyIndicator(indicator(), 0, false, true);
      refreshingRef.current = false;
      setIsRefreshing(false);
      distanceRef.current = 0;
    };

    const onEnd = () => {
      detachMove();
      if (!pullingRef.current) {
        return;
      }
      pullingRef.current = false;
      const distance = distanceRef.current;
      if (!shouldRefresh(distance) || refreshingRef.current) {
        applyIndicator(indicator(), 0, false, true);
        distanceRef.current = 0;
        return;
      }
      refreshingRef.current = true;
      setIsRefreshing(true);
      applyIndicator(indicator(), INDICATOR_HEIGHT, true, true);
      void Promise.resolve(onRefreshRef.current()).finally(finishRefresh);
    };

    scroller.addEventListener("touchstart", onStart, { passive: true });
    scroller.addEventListener("touchend", onEnd);
    scroller.addEventListener("touchcancel", onEnd);

    return () => {
      detachMove();
      scroller.removeEventListener("touchstart", onStart);
      scroller.removeEventListener("touchend", onEnd);
      scroller.removeEventListener("touchcancel", onEnd);
    };
  }, [enabled, nested, scrollEl]);

  return { scrollRef: setScrollEl, indicatorRef, isRefreshing };
};
