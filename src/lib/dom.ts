/** Small browser helpers. Only call these from event handlers (never while rendering). */

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

/** Scrolls to an element and moves keyboard focus to it (the element needs tabIndex={-1}). */
export function focusAndScroll(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  scrollToId(id);
  element.focus({ preventScroll: true });
}
