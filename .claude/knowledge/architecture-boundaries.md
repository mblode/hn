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

## Pull-to-refresh is custom, on the active scroll root

Native browser PTR reloads the whole document. We suppress that with
`overscroll-behavior-y: none` on `html`/`body` and refetch in-app instead.

`components/scroll-main.tsx` attaches `hooks/use-pull-to-refresh.ts` to the
nested main on desktop and to `window` on mobile. The gesture
`preventDefault`s a downward touch only while the active scroller is at the
top.

## Feed data comes from two unrelated HN APIs

- `lib/hn-live.ts` → `api.hackerwebapp.com/{news,newest,show,ask,jobs}?page=N`,
  1-indexed pages, 30 items each, returns `[]` past the last page (which is what
  terminates `getNextPageParam`). Pages can overlap as HN reranks, hence
  `deduplicateStories`.
- `lib/hn-algolia.ts` → Algolia search, **0-indexed** pages with `nbPages`.

The two paginate differently; `useNewsFeed` and `useSearch` therefore have
different `initialPageParam` and `getNextPageParam` shapes on purpose.
