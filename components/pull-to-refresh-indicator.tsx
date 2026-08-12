"use client";

import { Loader2 } from "lucide-react";
import type { Ref } from "react";

interface PullToRefreshIndicatorProps {
  indicatorRef: Ref<HTMLDivElement>;
  isRefreshing: boolean;
}

export const PullToRefreshIndicator = ({
  indicatorRef,
  isRefreshing,
}: PullToRefreshIndicatorProps) => (
  <div
    aria-hidden={!isRefreshing}
    className="flex items-center justify-center overflow-hidden"
    ref={indicatorRef}
    style={{ height: 0 }}
  >
    <Loader2 className="size-5 text-muted-foreground" data-ptr-icon />
    <span className="sr-only" role="status">
      {isRefreshing ? "Refreshing" : ""}
    </span>
  </div>
);
