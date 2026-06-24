"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * An inverting ring cursor. A single hollow white ring rendered with
 * mix-blend-difference, so it stays visible over any background (dark
 * sections, white cards, coloured chips). It eases toward the pointer,
 * scales up over interactive elements, and dips on click.
 * Only active on fine-pointer devices with motion enabled.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) {
      // Native cursor stays in these cases (CSS only hides it otherwise).
      document.body.classList.remove("custom-cursor-active");
      return;
    }
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(
        !!target?.closest(
          "a, button, input, textarea, select, [data-cursor='hover'], [role='button']",
        ),
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const scale = (hovering ? 1.85 : 1) * (down ? 0.85 : 1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border-[1.5px] border-white mix-blend-difference"
        style={{ width: 30, height: 30, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.4 }}
      />
    </motion.div>
  );
}
