/**
 * The trail back to the hub, rendered at the top of a zone's ROOT page.
 *
 * Copied verbatim from the reference in blode-co. Keep it dependency-free:
 * no `next/link`, no icon package, no local `cn()`.
 *
 * Three constraints, all load-bearing:
 *
 * 1. **Absolute `https://blode.co` hrefs.** A bare `href="/"` is not
 *    `basePath`-prefixed, so in a zone it resolves against this app's own
 *    origin and breaks on preview deployments.
 * 2. **Plain `<a>`, never `next/link`.** `next/link` would prefetch an RSC
 *    payload for a route this app does not own. These are also same-origin
 *    (a zone is blode.co behind a rewrite), so: same tab, and no
 *    `rel="noopener noreferrer"`, which only means something cross-origin.
 * 3. **The visible trail must match `BreadcrumbList` exactly.**
 */

const HOME = "https://blode.co";
const PROJECTS = `${HOME}/projects`;

const Separator = () => (
  <span aria-hidden className="select-none opacity-40">
    ›
  </span>
);

export const ZoneBreadcrumb = ({ product }: { product: string }) => (
  <nav aria-label="Breadcrumb" className="text-[13px] text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1.5">
      <li className="flex items-center gap-1.5">
        <a
          className="underline decoration-current/25 underline-offset-2 transition-colors hover:text-foreground hover:decoration-current"
          href={HOME}
          rel="author"
        >
          Matthew Blode
        </a>
        <Separator />
      </li>
      <li className="flex items-center gap-1.5">
        <a
          className="underline decoration-current/25 underline-offset-2 transition-colors hover:text-foreground hover:decoration-current"
          href={PROJECTS}
        >
          Projects
        </a>
        <Separator />
      </li>
      <li aria-current="page" className="text-foreground">
        {product}
      </li>
    </ol>
  </nav>
);
