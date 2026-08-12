"use client";

import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

import { deduplicateStories, fetchFeed } from "@/lib/hn-live";
import type { CandidateStory } from "@/lib/types";

export type FeedType = "news" | "newest" | "show" | "ask" | "jobs";

interface UseNewsFeedOptions {
  type: FeedType;
  initialStories?: CandidateStory[];
}

interface UseNewsFeedResult {
  stories: CandidateStory[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refresh: () => Promise<void>;
}

export const useNewsFeed = ({
  type,
  initialStories,
}: UseNewsFeedOptions): UseNewsFeedResult => {
  const queryClient = useQueryClient();
  const hasInitialStories = (initialStories?.length ?? 0) > 0;
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery<CandidateStory[], Error>({
      queryKey: ["hn-feed", type],
      queryFn: ({ pageParam = 1 }) => fetchFeed(type, Number(pageParam)),
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        (lastPage?.length ?? 0) > 0 ? Number(lastPageParam) + 1 : undefined,
      initialPageParam: 1,
      initialData: hasInitialStories
        ? {
            pages: [initialStories as CandidateStory[]],
            pageParams: [1],
          }
        : undefined,
    });

  const stories = deduplicateStories(data?.pages.flat() ?? []);

  const refresh = useCallback(async () => {
    const queryKey = ["hn-feed", type] as const;
    queryClient.setQueryData<InfiniteData<CandidateStory[], number>>(
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
  }, [queryClient, type]);

  return {
    stories,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
    refresh,
  };
};
