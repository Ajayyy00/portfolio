"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/data/skills";
import { DOMAINS } from "@/lib/domains";
import { fadeUp, fadeUpSm, scaleIn, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Skills() {
  return (
    <section id="skills" data-domain="ai" className="section-pad scroll-mt-24">
      <SectionHeading
        kicker="// 01 — stack"
        title="Skills & Tooling"
        subtitle="What I actually reach for when I'm building — not just a list of buzzwords from a job description."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.12)}
        className="mt-12 grid gap-5 sm:grid-cols-2"
      >
        {skillGroups.map((group, i) => {
          const accent = DOMAINS[group.domain];
          return (
            <motion.div
              key={group.title}
              variants={scaleIn}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-white/10"
            >
              {/* corner glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: `rgba(${accent.rgb}, 0.18)` }}
              />

              <div className="mb-5 flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accent.hex }}
                />
                <h3 className="text-lg font-semibold text-text">
                  {group.title}
                </h3>
                <span
                  className="mono ml-auto text-xs"
                  style={{ color: accent.hex }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <motion.ul
                variants={staggerContainer(0.04)}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={fadeUpSm}
                    className="mono cursor-default rounded-md border border-border bg-bg/60 px-2.5 py-1 text-xs text-text-muted transition-colors duration-200 hover:text-text"
                    style={{ borderColor: `rgba(${accent.rgb}, 0.18)` }}
                    whileHover={{
                      y: -2,
                      color: accent.hex,
                      borderColor: accent.hex,
                    }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
