"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/data/certifications";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Certifications() {
  return (
    <section
      id="certifications"
      data-domain="fullstack"
      className="section-pad scroll-mt-24"
    >
      <SectionHeading
        title="Certifications"
        subtitle="Courses I actually finished, not just started and bookmarked."
        accent="#10B981"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.1)}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((c) => (
          <motion.div
            key={c.name}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-white/10"
          >
            {/* issuer logo placeholder */}
            <div
              className="mono grid h-12 w-12 place-items-center rounded-xl text-xs font-bold text-white"
              style={{
                backgroundColor: `rgba(${hexToRgb(c.color)}, 0.15)`,
                color: c.color,
                border: `1px solid rgba(${hexToRgb(c.color)}, 0.3)`,
              }}
            >
              {c.badge}
            </div>

            <h3 className="mt-5 text-base font-semibold leading-snug text-text">
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
