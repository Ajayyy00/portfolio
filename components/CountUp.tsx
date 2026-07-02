"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

/** Number that counts up from 0 when it scrolls into view. */
export default function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  className = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, mv, to, duration]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}
