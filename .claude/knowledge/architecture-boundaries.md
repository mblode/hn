# Architecture & System Boundaries

Key architectural decisions, service boundaries, data flow, integration points, and why things are the way they are.

## Desktop scrolls a nested inset; mobile scrolls the document

`Sidebar` `variant="inset"` is a rounded panel on `md+`. That panel is pinned
(`SidebarInset` is `md:h-[calc(100dvh-16px)] md:overflow-hidden`) and each page
renders a nested `<main>` with `md:overflow-y-scroll`. The document does not
scroll on desktop.

On mobile the sidebar is a Sheet, not an inset, so there is no panel to pin.
`SidebarInset` is `min-h-dvh` with no overflow clip, `ScrollMain` is a normal
flow box, and the **document** is the scroller. That is what makes iOS Safari's
status-bar tap-to-top work — WebKit only sends that gesture to the document,
never to a nested overflow box. Linear's *native* iOS app gets the same
behavior from `UIScrollView`; Linear's *web* app keeps a nested scroller and
drops the gesture.

Anything scroll-dependent must follow the active root:

- **Desktop:** `IntersectionObserver` needs an explicit `root` (the nested
  main). With the implicit viewport root, the container's overflow clip is
  applied unexpanded, `rootMargin` is discarded, and a sentinel only registers
  at the exact scroll bottom. iOS Safari defers observer callbacks until
  momentum settles, so an exact-bottom-only trigger never fires on a fling.
- **Mobile:** observe against the viewport (`root: null`) and listen to
  `window` `scroll`. `window.scrollY` is live here.
- `hooks/use-overflow-scroller.ts` picks the root from the main's computed
  `overflow-y` (and the `md` breakpoint).

`hooks/use-infinite-scroll.ts` encapsulates this. Both `news-feed.tsx` and
`search-results.tsx` use it — do not hand-roll a second observer.

Do not "fix" desktop by letting `window` scroll. That would break the inset
chrome. Do not "fix" mobile by pinning `h-dvh overflow-hidden` — that is what
killed status-bar tap and Safari's collapsing chrome.

## Pull-to-refresh belongs to iOS Safari, not to us

There is no pull-to-refresh code in this app. On mobile the document is the
scroller (above), so the gesture is the browser's: Safari rubber-bands, shows
its own spinner, and reloads. Same physics, same threshold, and same feel as
every other iOS app — which a JS reimplementation never quite matches.

The one thing that can take that away is `overscroll-behavior-y` on `html` or
`body`. It is therefore scoped to `md+` in `app/globals.css`, where the
document does not scroll anyway and an overscroll chained up to it would only
bounce pinned chrome. **Do not hoist that rule out of the media query** — an
unscoped `overscroll-behavior-y: none` kills native PTR on mobile, which is
what previously forced a hand-rolled `touchmove` gesture with a spinner element
of its own.

Two corollaries:

- Nested scrollers keep `md:overscroll-y-contain`, never a mobile-wide
  equivalent.
- Nothing calls `preventDefault()` on a `touchmove` at the top of the page.

A refresh is a document reload, so nothing needs a React `refresh()` that
resets an infinite query to page one; `useNewsFeed` and `useSearch` do not
expose one.

## Feed data comes from two unrelated HN APIs

- `lib/hn-live.ts` → `api.hackerwebapp.com/{news,newest,show,ask,jobs}?page=N`,
  1-indexed pages, 30 items each, returns `[]` past the last page (which is what
  terminates `getNextPageParam`). Pages can overlap as HN reranks, hence
  `deduplicateStories`.
- `lib/hn-algolia.ts` → Algolia search, **0-indexed** pages with `nbPages`.

The two paginate differently; `useNewsFeed` and `useSearch` therefore have
different `initialPageParam` and `getNextPageParam` shapes on purpose.
