import { describe, expect, it } from "vitest";

import { overflowYCreatesScrollport } from "@/lib/scroll-root";

describe("overflowYCreatesScrollport", () => {
  it("treats auto/scroll/overlay as nested scrollers", () => {
    expect(overflowYCreatesScrollport("auto")).toBe(true);
    expect(overflowYCreatesScrollport("scroll")).toBe(true);
    expect(overflowYCreatesScrollport("overlay")).toBe(true);
  });

  it("treats visible/hidden as document flow", () => {
    expect(overflowYCreatesScrollport("visible")).toBe(false);
    expect(overflowYCreatesScrollport("hidden")).toBe(false);
    expect(overflowYCreatesScrollport("clip")).toBe(false);
  });
});
