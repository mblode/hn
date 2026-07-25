# Testing Patterns

Testing strategies, test infrastructure quirks, how to run/debug specific test suites, mocking conventions.

## Vitest covers pure `lib/` logic only

All six suites live in `lib/__tests__/`. There is no jsdom environment, no
React Testing Library, and no component tests. Do not add a jsdom test for
layout- or scroll-dependent behaviour: jsdom has no layout engine and no
`IntersectionObserver`, so such a test asserts the mock, not the bug.

## Verifying scroll/layout behaviour needs a real browser over CDP

The Claude browser extension is often not connected. Chrome can be driven
directly instead — no Playwright or Puppeteer is installed, but Node 24's global
`WebSocket` is enough to speak CDP:

1. `spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", "--remote-debugging-port=9333", "--user-data-dir=<tmp>", "about:blank"])`
2. Poll `http://127.0.0.1:9333/json/list` for the `page` target, open its
   `webSocketDebuggerUrl`, then `Runtime.enable` / `Page.enable` /
   `Network.enable` and drive with `Runtime.evaluate`.
3. `Emulation.setDeviceMetricsOverride` + `Emulation.setTouchEmulationEnabled`
   for a mobile viewport.

Useful assertions for the infinite feed: read
`main.scrollHeight - main.scrollTop - main.clientHeight` for distance-to-bottom,
count `main div.mx-auto` children for loaded rows, and watch
`Network.requestWillBeSent` for `hackerwebapp`/`algolia` URLs to confirm one page
is fetched per approach rather than a runaway loop.

`safaridriver` exists on macOS (real WebKit) but hangs unless "Allow Remote
Automation" has been enabled manually in Safari's Develop menu — it is not
usable unattended.
