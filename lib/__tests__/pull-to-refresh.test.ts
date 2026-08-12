import { describe, expect, it } from "vitest";

import {
  dampenPull,
  MAX_PULL_DISTANCE,
  REFRESH_THRESHOLD,
  shouldRefresh,
} from "@/lib/pull-to-refresh";

describe("dampenPull", () => {
  it("ignores upward or zero movement", () => {
    expect(dampenPull(0)).toBe(0);
    expect(dampenPull(-40)).toBe(0);
  });

  it("reaches the refresh threshold at 160px of finger travel", () => {
    expect(dampenPull(160)).toBe(REFRESH_THRESHOLD);
  });

  it("caps the indicator so a long drag cannot grow without bound", () => {
    expect(dampenPull(10_000)).toBe(MAX_PULL_DISTANCE);
  });
});

describe("shouldRefresh", () => {
  it("fires at or past the threshold and not before", () => {
    expect(shouldRefresh(REFRESH_THRESHOLD - 1)).toBe(false);
    expect(shouldRefresh(REFRESH_THRESHOLD)).toBe(true);
    expect(shouldRefresh(REFRESH_THRESHOLD + 20)).toBe(true);
  });
});
