"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Page toolbar. Sticky on mobile document-scroll; a no-op in the desktop inset. */
export const PageHeader = ({
  className,
  ...props
}: ComponentProps<"header">) => (
  <header
    className={cn(
      "sticky top-0 z-10 flex shrink-0 items-center gap-2 border-border border-b bg-background px-4 py-2",
      className
    )}
    {...props}
  />
);
