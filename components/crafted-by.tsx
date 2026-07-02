export function CraftedBy() {
  return (
    <a
      className="inline-flex min-w-0 items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
      href="https://matthewblode.com"
      rel="author noopener"
      target="_blank"
    >
      {/* biome-ignore lint/performance/noImgElement: external avatar, intentional plain img */}
      <img
        alt="Matthew Blode"
        className="shrink-0 rounded-full"
        height={16}
        loading="lazy"
        src="https://matthewblode.com/avatar-sm.png"
        width={16}
      />
      <span className="truncate">Crafted by Matthew Blode</span>
    </a>
  );
}
