"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import {
  dampenPull,
  INDICATOR_HEIGHT,
  shouldRefresh,
} from "@/lib/pull-to-refresh";

interface UsePullToRefreshOptions {
  onRefresh: () => void | Promise<void>;
  enabled?: boolean;
}

interface UsePullToRefreshResult {
  /** Attach to the nested overflow scroller (the same node as infinite scroll). */
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
 * Custom pull-to-refresh for a nested overflow scroller.
 *
 * Native browser PTR only runs when the document itself overscrolls. This app
 * pins `SidebarInset` to the viewport and scrolls inside `<main>`, so the
 * gesture has to be implemented on that element.
 */
export const usePullToRefresh = ({
  onRefresh,
  enabled = true,
}: UsePullToRefreshOptions): UsePullToRefreshResult => {
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const onRefreshRef = useRef(onRefresh);
  const pullingRef = useRef(false);
  const startYRef = useRef(0);
  const distanceRef = useRef(0);
  const refreshingRef = useRef(false);

  onRefreshRef.current = onRefresh;

  useEffect(() => {
    if (!(enabled && scrollEl)) {
      return;
    }

    const indicator = () => indicatorRef.current;

    const onStart = (event: TouchEvent) => {
      if (refreshingRef.current || event.touches.length !== 1) {
        return;
      }
      if (scrollEl.scrollTop > 0) {
        pullingRef.current = false;
        return;
      }
      pullingRef.current = true;
      startYRef.current = event.touches[0].clientY;
      distanceRef.current = 0;
    };

    const onMove = (event: TouchEvent) => {
      if (!pullingRef.current || refreshingRef.current) {
        return;
      }
      const dy = event.touches[0].clientY - startYRef.current;
      if (dy <= 0 || scrollEl.scrollTop > 0) {
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

    const finishRefresh = () => {
      applyIndicator(indicator(), 0, false, true);
      refreshingRef.current = false;
      setIsRefreshing(false);
      distanceRef.current = 0;
    };

    const onEnd = () => {
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

    scrollEl.addEventListener("touchstart", onStart, { passive: true });
    scrollEl.addEventListener("touchmove", onMove, { passive: false });
    scrollEl.addEventListener("touchend", onEnd);
    scrollEl.addEventListener("touchcancel", onEnd);

    return () => {
      scrollEl.removeEventListener("touchstart", onStart);
      scrollEl.removeEventListener("touchmove", onMove);
      scrollEl.removeEventListener("touchend", onEnd);
      scrollEl.removeEventListener("touchcancel", onEnd);
    };
  }, [enabled, scrollEl]);

  return { scrollRef: setScrollEl, indicatorRef, isRefreshing };
};
