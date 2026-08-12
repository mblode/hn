# Architecture & System Boundaries

Key architectural decisions, service boundaries, data flow, integration points, and why things are the way they are.

## Pages scroll in a nested container, never the document

`app/(main)/layout.tsx` pins `SidebarInset` to `h-dvh ... overflow-hidden`, and
each page renders its own `<main className="min-h-0 flex-1 overflow-y-scroll">`.
The document itself never scrolls.

Anything scroll-dependent must target that `main` element, not the window:

- **`IntersectionObserver` must be given an explicit `root`.** With the implicit
  (viewport) root, the browser still clips the target by `main`'s overflow box,
  but it applies that clip *unexpanded* — so `rootMargin` is silently discarded
  and a sentinel only registers at the exact scroll bottom. This is what broke
  infinite scroll on iOS Safari: WebKit defers observer callbacks until a
  momentum scroll settles, and rubber-banding carries the sentinel back out of
  range before one is delivered, so an exact-bottom-only trigger never fires.
- `window.scrollY` / `scroll` listeners on `window` will never fire.

`hooks/use-infinite-scroll.ts` encapsulates this: explicit `root`, a 600px
`rootMargin`, plus a passive `scroll` listener on the container as an iOS
fallback. Both `news-feed.tsx` and `search-results.tsx` use it — do not hand-roll
a second observer.

## Pull-to-refresh is custom, on the same nested scroller

Native browser pull-to-refresh (Safari, Chrome Android) only runs when the
**document** overscrolls. Because `SidebarInset` is `overflow-hidden` and the
page scroller is nested, that never happens — and if it did, it would reload
the whole app rather than refetch the feed.

`components/scroll-main.tsx` owns the nested `<main>` and attaches
`hooks/use-pull-to-refresh.ts` to it. The gesture `preventDefault`s a downward
touch only while `scrollTop === 0`, so it does not fight infinite scroll.
`overscroll-behavior-y: contain` on that scroller (and `none` on `body`) stops
scroll chaining from reaching the document.

Do not "fix" PTR by letting `window` scroll. That would re-break iOS infinite
scroll as described above.

## Feed data comes from two unrelated HN APIs

- `lib/hn-live.ts` → `api.hackerwebapp.com/{news,newest,show,ask,jobs}?page=N`,
  1-indexed pages, 30 items each, returns `[]` past the last page (which is what
  terminates `getNextPageParam`). Pages can overlap as HN reranks, hence
  `deduplicateStories`.
- `lib/hn-algolia.ts` → Algolia search, **0-indexed** pages with `nbPages`.

The two paginate differently; `useNewsFeed` and `useSearch` therefore have
different `initialPageParam` and `getNextPageParam` shapes on purpose.
