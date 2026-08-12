"use client";

import { useCallback, type ComponentProps, type Ref } from "react";

import { PullToRefreshIndicator } from "@/components/pull-to-refresh-indicator";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { cn } from "@/lib/utils";

interface ScrollMainProps extends Omit<ComponentProps<"main">, "ref"> {
  onRefresh?: () => void | Promise<void>;
  ref?: Ref<HTMLElement>;
}

const assignRef = <T,>(ref: Ref<T> | undefined, node: T | null) => {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref) {
    ref.current = node;
  }
};

const noop = () => undefined;

/**
 * The nested page scroller inside `SidebarInset`.
 *
 * Pull-to-refresh has to live here: the document never scrolls, so the
 * browser's native overscroll refresh cannot run.
 */
export const ScrollMain = ({
  onRefresh,
  className,
  children,
  ref,
  ...props
}: ScrollMainProps) => {
  const enabled = Boolean(onRefresh);
  const { scrollRef, indicatorRef, isRefreshing } = usePullToRefresh({
    enabled,
    onRefresh: onRefresh ?? noop,
  });

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      scrollRef(node);
      assignRef(ref, node);
    },
    [scrollRef, ref]
  );

  return (
    <main
      {...props}
      aria-busy={isRefreshing || undefined}
      className={cn(
        "min-h-0 flex-1 overflow-y-scroll overscroll-y-contain",
        className
      )}
      ref={setRefs}
    >
      {enabled ? (
        <PullToRefreshIndicator
          indicatorRef={indicatorRef}
          isRefreshing={isRefreshing}
        />
      ) : null}
      {children}
    </main>
  );
};
