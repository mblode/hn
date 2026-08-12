"use client";

import { useEffect, useState } from "react";

import { isOverflowScroller } from "@/lib/scroll-root";

/**
 * Whether `el` is a nested overflow scroller (desktop inset) or just a box in
 * the document (mobile). `null` until measured so callers do not bind window
 * listeners on desktop during the first paint.
 */
export const useOverflowScroller = (el: HTMLElement | null): boolean | null => {
  const [nested, setNested] = useState<boolean | null>(null);

  useEffect(() => {
    if (!el) {
      setNested(null);
      return;
    }

    const sync = () => setNested(isOverflowScroller(el));
    sync();

    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [el]);

  return nested;
};
