import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The page body inside `SidebarInset`.
 *
 * Desktop: nested overflow scroller (the inset panel does not scroll the
 * document), with overscroll contained so the pinned chrome never bounces.
 *
 * Mobile: a plain document-flow box. The document is the scroller, which is
 * what gives iOS Safari its own gestures — status-bar tap-to-top, chrome
 * collapse, and pull-to-refresh. Nothing here listens for touches; refreshing
 * is the browser's job.
 */
export const ScrollMain = ({ className, ...props }: ComponentProps<"main">) => (
  <main
    className={cn(
      "md:min-h-0 md:flex-1 md:overflow-y-scroll md:overscroll-y-contain",
      className
    )}
    {...props}
  />
);
