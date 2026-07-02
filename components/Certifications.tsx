"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeading from "./SectionHeading";
import { certifications, type Certification } from "@/data/certifications";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/animations";

/** Certification card with cursor-tracked 3D tilt + a shine that sweeps
 *  across the surface — hold the mouse over one and move around. */
function TiltCard({ c }: { c: Certification }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 220,
    damping: 18,
  });
  const shineX = useTransform(mx, (v) => v * 100);
  const shine = useMotionTemplate`linear-gradient(105deg, transparent 40%, rgba(240,234,224,0.08) ${shineX}%, transparent 60%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={
        reduced ? undefined : { rotateX, rotateY, transformPerspective: 800 }
      }
      className="group relative flex h-full flex-col rounded-3xl border border-border bg-surface/70 p-6 shadow-card transition-colors hover:border-[#4a3e30]"
    >
      <motion.div
        aria-hidden
        style={{ background: shine }}
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* issuer badge */}
      <div
        className="mono grid h-12 w-12 place-items-center rounded-2xl text-xs font-bold"
        style={{
          backgroundColor: `rgba(${hexToRgb(c.color)}, 0.15)`,
          color: c.color,
          border: `1px solid rgba(${hexToRgb(c.color)}, 0.3)`,
        }}
      >
        {c.badge}
      </div>

      <h3 className="display mt-5 text-lg font-semibold leading-snug text-text">
        {c.name}
      </h3>
      <p className="mt-2 text-sm text-text-muted">{c.issuer}</p>

      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="mono text-xs text-text-muted">{c.date}</span>
        {c.verify && (
          <a
            href={c.verify}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs font-medium text-fullstack hover:underline"
          >
            Verify ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      data-domain="fullstack"
      className="section-pad scroll-mt-24"
    >
      <SectionHeading
        index="07"
        title="Certifications"
        subtitle="Courses I actually finished, not just started and bookmarked."
        accent="#A9C39B"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.1)}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: 1200 }}
      >
        {certifications.map((c) => (
          <motion.div key={c.name} variants={fadeUp}>
            <TiltCard c={c} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
