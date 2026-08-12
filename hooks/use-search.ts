"use client";

import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

import {
  type SearchResult,
  type SearchSort,
  searchStories,
} from "@/lib/hn-algolia";
import type { CandidateStory } from "@/lib/types";

interface UseSearchOptions {
  query: string;
  sort?: SearchSort;
  enabled?: boolean;
}

interface UseSearchResult {
  results: CandidateStory[];
  totalHits: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refresh: () => Promise<void>;
}

export const useSearch = ({
  query,
  sort = "relevance",
  enabled = true,
}: UseSearchOptions): UseSearchResult => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["hn-search", query, sort],
      queryFn: ({ pageParam = 0 }) =>
        searchStories({ query, sort, page: pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 < lastPage.nbPages ? lastPage.page + 1 : undefined,
      initialPageParam: 0,
      enabled: enabled && query.length > 0,
    });

  const results = data?.pages.flatMap((p) => p.hits) ?? [];
  const totalHits = data?.pages[0]?.nbHits ?? 0;

  const refresh = useCallback(async () => {
    const queryKey = ["hn-search", query, sort] as const;
    queryClient.setQueryData<InfiniteData<SearchResult, number>>(
      queryKey,
      (current) => {
        if (!current) {
          return current;
        }
        return {
          pages: current.pages.slice(0, 1),
          pageParams: current.pageParams.slice(0, 1),
        };
      }
    );
    await queryClient.invalidateQueries({ queryKey });
  }, [queryClient, query, sort]);

  return {
    results,
    totalHits,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
    refresh,
  };
};
