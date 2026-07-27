import type { Metadata } from "next";

import { SearchResults } from "@/components/search-results";
import type { SearchSort } from "@/lib/hn-algolia";

export const metadata: Metadata = {
  title: "Search Hacker News stories",
  description:
    "Full-text search across Hacker News stories, sorted by relevance or date, with your recent searches kept on your device.",
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const sort: SearchSort = params.sort === "date" ? "date" : "relevance";

  return <SearchResults query={query} sort={sort} />;
}
