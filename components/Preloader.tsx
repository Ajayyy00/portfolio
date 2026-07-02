"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const NAME = "AJAY C";

/**
 * Intro curtain: the name types itself in giant serif while a counter
 * runs 0→100, then the whole panel lifts away like a stage curtain.
 * Runs once per visit; skipped entirely under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      setShow(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, { duration: 1.6, ease: "easeInOut" });
    const t = setTimeout(() => setShow(false), 2000);
    return () => {
      controls.stop();
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [progress]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
          aria-hidden
        >
          <div className="flex overflow-hidden">
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="display text-6xl font-semibold tracking-tight text-text sm:text-8xl"
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="display text-6xl font-semibold text-ai sm:text-8xl"
            >
              .
            </motion.span>
          </div>

          <motion.span className="mono absolute bottom-8 right-8 text-5xl font-medium text-text/20 sm:text-7xl">
            {counter}
          </motion.span>

          {/* thin progress line along the bottom */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-ai"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
