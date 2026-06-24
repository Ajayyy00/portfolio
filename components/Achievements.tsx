"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { achievements } from "@/data/achievements";
import { DOMAINS } from "@/lib/domains";
import { flipIn, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Achievements() {
  return (
    <section
      id="achievements"
      data-domain="systems"
      className="section-pad scroll-mt-24"
    >
      <SectionHeading
        title="Hackathons"
        subtitle="The weekends I gave up sleep for — and made it to the finals."
        accent="#8B5CF6"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.12)}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: 1000 }}
      >
        {achievements.map((a) => {
          const accent = DOMAINS[a.domain];
          return (
            <motion.div
              key={a.event}
              variants={flipIn}
              whileHover={{ y: -6 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 text-center"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent.hex}, transparent)`,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: `rgba(${accent.rgb}, 0.25)` }}
              />

              <div className="text-3xl">{a.icon}</div>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-text">
                {a.event}
              </h3>
              <p
                className="mono mt-1 text-xs font-medium"
                style={{ color: accent.hex }}
              >
                {a.result} · {a.year}
              </p>
              <span className="mono mt-4 inline-block rounded-full border border-border bg-bg/60 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-text-muted">
                {a.scope}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
