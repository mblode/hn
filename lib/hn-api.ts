import { BASE_PATH } from "@/lib/site";
import type { HNItem } from "@/lib/types";

const HN_API_BASE = "https://api.hackerwebapp.com";

/** This app's own route handlers, as seen from the browser. */
export const APP_API_BASE = `${BASE_PATH}/api/hn`;

export const fetchItem = async (id: number): Promise<HNItem | null> => {
  const response = await fetch(`${HN_API_BASE}/item/${id}`);
  if (!response.ok) {
    return null;
  }
  // An ok response is not evidence the item exists: for a missing id the
  // upstream answers 200 with `{"error":"Item <id> not found"}` rather than a
  // status. Returned as-is, that body is truthy, so every `if (!item)` guard
  // downstream passed and the post page rendered an empty shell with a 200 —
  // a soft 404 over every integer. A real item always carries a numeric id;
  // the error body carries only `error`.
  const item: HNItem | null = await response.json();
  return typeof item?.id === "number" ? item : null;
};
