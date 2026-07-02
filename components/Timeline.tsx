"use client";

import { useRef } from "react";
import { motion, useScroll, type Variants } from "framer-motion";
import { experience } from "@/data/experience";
import SDCContributions from "./SDCContributions";
import { EASE_OUT, VIEWPORT } from "@/lib/animations";

/** Entries alternate: slide in from the left, then the right. */
const slideFrom = (dir: 1 | -1): Variants => ({
  hidden: { opacity: 0, x: 44 * dir },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
});

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.35", "end 0.7"],
  });

  return (
    <div ref={ref} className="relative mt-12 pl-10 sm:pl-12">
      {/* Animated vertical line */}
      <svg
        aria-hidden
        className="absolute left-[7px] top-1 h-full w-[2px] sm:left-[11px]"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <line x1="1" y1="0" x2="1" y2="100" stroke="#362D23" strokeWidth="2" />
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="100"
          stroke="url(#tl-grad)"
          strokeWidth="2"
          style={{ pathLength: scrollYProgress }}
        />
        <defs>
          <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E29D71" />
            <stop offset="1" stopColor="#A9C39B" />
          </linearGradient>
        </defs>
      </svg>

      <div className="space-y-12">
        {experience.map((entry, i) => (
          <div key={entry.id} className="relative">
            {/* node with a soft radar ping */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-ai bg-bg sm:-left-[42px]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ai" />
              <motion.span
                aria-hidden
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 2.4, opacity: [0, 0.5, 0] }}
                viewport={VIEWPORT}
                transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-ai"
              />
            </motion.span>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={slideFrom(i % 2 === 0 ? -1 : 1)}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="display text-xl font-semibold text-text">
                  {entry.company}
                  <span className="font-sans text-base font-normal text-text-muted">
                    {" "}
                    · {entry.role}
                  </span>
                </h3>
                <span className="mono text-xs text-text-muted">{entry.period}</span>
              </div>

              {entry.meta && (
                <p className="mono mt-0.5 text-xs text-text-muted">{entry.meta}</p>
              )}

              <ul className="mt-3 space-y-2">
                {entry.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ai/60" />
                    {b}
                  </li>
                ))}
              </ul>

              {entry.contributions && (
                <SDCContributions contributions={entry.contributions} />
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
