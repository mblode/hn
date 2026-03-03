import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_location: `${window.location.origin}${pathname}${search}`,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};
