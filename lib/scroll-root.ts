/** Overflow values that make an element a nested scrollport. */
export const overflowYCreatesScrollport = (overflowY: string): boolean =>
  overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";

/** True when `el` is a nested overflow scroller rather than a document-flow box. */
export const isOverflowScroller = (el: HTMLElement): boolean =>
  overflowYCreatesScrollport(getComputedStyle(el).overflowY);

export const readScrollTop = (scroller: HTMLElement | Window): number =>
  scroller instanceof HTMLElement ? scroller.scrollTop : window.scrollY;

export const readDistanceToBottom = (
  scroller: HTMLElement | Window
): number => {
  if (scroller instanceof HTMLElement) {
    return scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
  }
  return (
    document.documentElement.scrollHeight - window.scrollY - window.innerHeight
  );
};

export const scrollToTop = (scroller: HTMLElement | Window): void => {
  if (scroller instanceof HTMLElement) {
    scroller.scrollTop = 0;
    return;
  }
  window.scrollTo(0, 0);
};
