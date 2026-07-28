import { afterEach, describe, expect, it, vi } from "vitest";

import { deduplicateStories, fetchFeed } from "@/lib/hn-live";

const makeApiStory = (overrides: Record<string, unknown> = {}) => ({
  id: 123,
  title: "Test Story",
  points: 42,
  user: "testuser",
  time: 1_700_000_000,
  type: "story",
  url: "https://example.com",
  comments_count: 5,
  ...overrides,
});

describe("fetchFeed", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("maps API stories to CandidateStory", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      Response.json([makeApiStory()])
    );

    const result = await fetchFeed("news", 1);

    expect(result).toEqual([
      {
        id: 123,
        title: "Test Story",
        url: "https://example.com",
        by: "testuser",
        time: 1_700_000_000,
        score: 42,
        descendants: 5,
      },
    ]);
  });

  it("returns empty on non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 500 })
    );

    expect(await fetchFeed("news", 1)).toEqual([]);
  });

  it("returns empty when the fetch rejects (e.g. a dropped mobile request)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new TypeError("Load failed")
    );

    // A rejected fetch must resolve to [] rather than surface as an unhandled
    // rejection to the background/pagination prefetch callers.
    await expect(fetchFeed("news", 2)).resolves.toEqual([]);
  });

  it("returns empty when the response body is not valid JSON", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("not json", { status: 200 })
    );

    await expect(fetchFeed("news", 1)).resolves.toEqual([]);
  });
});

describe("deduplicateStories", () => {
  it("drops later duplicates by id, keeping order", () => {
    const a = makeApiStoryCandidate(1);
    const b = makeApiStoryCandidate(2);
    const aDup = makeApiStoryCandidate(1);

    expect(deduplicateStories([a, b, aDup])).toEqual([a, b]);
  });
});

const makeApiStoryCandidate = (id: number) => ({
  id,
  title: `Story ${id}`,
  url: null,
  by: "testuser",
  time: 1_700_000_000,
  score: 0,
  descendants: 0,
});
