"use client";

/** easeInOutCubic — slow start, quick middle, gentle settle. */
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Glide the page to a section with a custom eased tween instead of the
 * browser's instant anchor jump. Distance-scaled duration keeps short hops
 * snappy and long hops smooth, and any manual wheel/touch/key input hands
 * control straight back to the user.
 */
export function smoothScrollTo(id: string, offset = 76) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const targetY = Math.max(
    0,
    el.getBoundingClientRect().top + window.scrollY - offset,
  );

  // Reflect the destination in the URL without triggering a jump.
  if (history.replaceState) history.replaceState(null, "", `#${id}`);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.scrollTo(0, targetY);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const duration = Math.min(1100, Math.max(450, Math.abs(distance) * 0.5));
  let start: number | null = null;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };
  const cleanup = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };
  // Let the user take back control mid-flight.
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  const step = (now: number) => {
    if (cancelled) return cleanup();
    if (start === null) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else cleanup();
  };
  requestAnimationFrame(step);
}
