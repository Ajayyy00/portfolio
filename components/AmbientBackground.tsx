"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

/**
 * Warm ambient backdrop covering the entire site: static radial glows,
 * the dotted grid, and a cursor spotlight that follows the mouse on every
 * page — one fixed layer, no clipping at section boundaries, no blur
 * filters, near-zero per-frame cost.
 */
export default function AmbientBackground() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${x}px ${y}px, rgba(226, 157, 113, 0.08), transparent 70%)`;

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* warm glows */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(58vw 52vh at 12% 6%, rgba(226, 157, 113, 0.055), transparent 62%)",
            "radial-gradient(52vw 55vh at 90% 92%, rgba(188, 167, 218, 0.05), transparent 62%)",
            "radial-gradient(46vw 44vh at 55% 45%, rgba(228, 197, 126, 0.03), transparent 66%)",
          ].join(", "),
        }}
      />
      {/* dotted grid — same texture everywhere */}
      <div className="grid-backdrop absolute inset-0" />
      {/* cursor spotlight — follows the mouse across the whole site */}
      <motion.div style={{ background: spotlight }} className="absolute inset-0" />
    </div>
  );
}
