import { BASE_PATH } from "@/lib/site";

const linkClass =
  "inline-flex min-w-0 items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground";

/*
 * blode.co and blode.co/projects are this same origin behind a rewrite, so both
 * are internal links: same tab, and no rel="noopener noreferrer", which only
 * means something cross-origin. The projects link is the edge back to the hub,
 * without which this zone is a dead end for crawlers and readers.
 *
 * A real footer element, not a bare anchor: this is the only site-level credit
 * block, so it is the contentinfo landmark. See
 * blode-co/apps/web/.claude/knowledge/zone-conventions.md.
 */
export function CraftedBy() {
  return (
    <footer className="flex min-w-0 flex-col items-start gap-0.5">
      <a className={linkClass} href="https://blode.co" rel="author">
        {/* Decorative, so alt is empty: the link's own text already says
            "Matthew Blode", and naming the avatar too would make the link's
            accessible name read it twice. This comment sits above the ignore
            directive rather than below it — the directive applies to the next
            line, so anything in between detaches it and the rule fires again. */}
        {/* biome-ignore lint/performance/noImgElement: self-hosted 20px avatar, plain img avoids next/image overhead */}
        <img
          alt=""
          className="shrink-0 rounded-full"
          height={16}
          loading="lazy"
          src={`${BASE_PATH}/avatar-sm.png`}
          width={16}
        />
        <span className="truncate">Crafted by Matthew Blode</span>
      </a>
    </footer>
  );
}
