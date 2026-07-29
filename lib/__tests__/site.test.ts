import { describe, expect, it } from "vitest";

import { asset, BASE_PATH, fitTitle, SITE_NAME } from "@/lib/site";

const rendered = (title: string) => `${fitTitle(title)} | ${SITE_NAME}`;

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

describe("fitTitle", () => {
  it("leaves a short title alone", () => {
    expect(fitTitle("Toolcraft")).toBe("Toolcraft");
  });

  it("keeps the whole rendered title inside the budget", () => {
    const long =
      "Show HN: I built a self-hosted alternative to every SaaS tool I pay for";

    expect(rendered(long).length).toBeLessThanOrEqual(60);
  });

  it("cuts on a word boundary rather than mid-word", () => {
    const long =
      "Show HN: I built a self-hosted alternative to every SaaS tool I pay for";

    expect(fitTitle(long)).toBe(
      "Show HN: I built a self-hosted alternative to every…"
    );
  });

  it("hard-cuts a single word that cannot be broken on a space", () => {
    const wall = "x".repeat(80);

    expect(rendered(wall).length).toBeLessThanOrEqual(60);
    expect(fitTitle(wall).endsWith("…")).toBe(true);
  });
});
