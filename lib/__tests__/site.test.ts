import { describe, expect, it } from "vitest";

import { BASE_PATH, withBasePath } from "@/lib/site";

describe("withBasePath", () => {
  it("maps the root to the bare base path, matching location.pathname", () => {
    expect(withBasePath("/")).toBe(BASE_PATH);
  });

  it("keeps root query strings on the base path without a trailing slash", () => {
    expect(withBasePath("/?type=show")).toBe(`${BASE_PATH}?type=show`);
  });

  it("prefixes nested paths", () => {
    expect(withBasePath("/post/123")).toBe(`${BASE_PATH}/post/123`);
  });

  it("prefixes paths that carry query strings", () => {
    expect(withBasePath("/search?q=htmx")).toBe(`${BASE_PATH}/search?q=htmx`);
  });
});
