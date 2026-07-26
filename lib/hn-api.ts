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
  return response.json();
};
