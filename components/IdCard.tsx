"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/data/site";
import { DOMAINS } from "@/lib/domains";

/* deterministic pseudo-barcode (no Math.random → no hydration mismatch) */
const BARS = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1];

/**
 * Conference-style ID badge hanging from a pin. Grab it and throw it —
 * it swings back with pendulum physics. A small, tactile signature
 * interaction that costs nothing while idle.
 */
export default function IdCard() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-180, 180], [-18, 18]), {
    stiffness: 140,
    damping: 7,
    mass: 0.8,
  });

  return (
    <div className="relative mx-auto flex w-fit select-none flex-col items-center">
      {/* pin */}
      <span className="relative z-10 h-4 w-4 rounded-full border-2 border-ai bg-bg" />

      <motion.div
        drag={!reduced}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.5}
        style={{ x, rotate, transformOrigin: "50% -14px" }}
        whileDrag={{ cursor: "grabbing" }}
        className="-mt-1 flex cursor-grab flex-col items-center"
      >
        {/* strap */}
        <div className="h-14 w-6 bg-gradient-to-b from-ai/70 to-ai/30 [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" />
        {/* clasp */}
        <div className="-mt-px h-2.5 w-10 rounded-sm border border-border bg-raised" />

        {/* the card */}
        <div className="relative -mt-px w-72 overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-raised to-surface shadow-card-hover">
          {/* top strip in domain colors */}
          <div className="flex h-1.5">
            {(["ai", "fullstack", "security", "systems"] as const).map((k) => (
              <span
                key={k}
                className="flex-1"
                style={{ backgroundColor: DOMAINS[k].hex }}
              />
            ))}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <span className="display grid h-12 w-12 place-items-center rounded-full bg-ai/15 text-lg font-semibold text-ai">
                AC
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                portfolio · {new Date().getFullYear()}
              </span>
            </div>

            <h3 className="display mt-5 text-2xl font-semibold text-text">
              {site.name}
              <span className="text-ai">.</span>
            </h3>
            <p className="mono mt-1 text-xs text-text-muted">{site.role}</p>

            <dl className="mono mt-5 space-y-1.5 text-[11px]">
              <div className="flex justify-between gap-4">
                <dt className="uppercase tracking-wider text-text-muted">loc</dt>
                <dd className="text-text">{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="uppercase tracking-wider text-text-muted">edu</dt>
                <dd className="text-text">{site.institution}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="uppercase tracking-wider text-text-muted">cgpa</dt>
                <dd className="text-text">{site.cgpa}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="uppercase tracking-wider text-text-muted">status</dt>
                <dd className="text-fullstack">open to work</dd>
              </div>
            </dl>

            {/* barcode */}
            <div className="mt-6 flex h-8 items-stretch gap-[3px] opacity-60">
              {BARS.map((w, i) => (
                <span
                  key={i}
                  className="bg-text"
                  style={{ width: `${w}px` }}
                />
              ))}
              <span className="mono ml-3 self-end text-[9px] tracking-[0.3em] text-text-muted">
                AJAY-C-2027
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mono mt-5 text-[10px] uppercase tracking-[0.25em] text-text-muted/70">
        ↕ grab the badge
      </p>
    </div>
  );
}
