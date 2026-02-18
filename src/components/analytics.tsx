import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = "G-NDQ1TJ27CB";

function loadGtag() {
  if (window.gtag) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (import.meta.env.PROD) {
      loadGtag();
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.PROD) {
      window.gtag?.("event", "page_view", {
        page_location: `${window.location.origin}${pathname}${search}`,
        page_title: document.title,
      });
    }
  }, [pathname, search]);

  return null;
};
