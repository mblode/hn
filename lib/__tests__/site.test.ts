import { describe, expect, it } from "vitest";

import { asset, BASE_PATH } from "@/lib/site";

describe("asset", () => {
  it("maps the root to the bare base path, matching location.pathname", () => {
    expect(asset("/")).toBe(BASE_PATH);
  });

  it("keeps root query strings on the base path without a trailing slash", () => {
    expect(asset("/?type=show")).toBe(`${BASE_PATH}?type=show`);
  });

  it("prefixes nested paths", () => {
    expect(asset("/post/123")).toBe(`${BASE_PATH}/post/123`);
  });

  it("prefixes paths that carry query strings", () => {
    expect(asset("/search?q=htmx")).toBe(`${BASE_PATH}/search?q=htmx`);
  });
});
