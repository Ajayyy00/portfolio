"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/data/skills";
import { DOMAINS } from "@/lib/domains";
import { fadeUpSm, scaleIn, staggerContainer, VIEWPORT } from "@/lib/animations";

export default function Skills() {
  return (
    <section id="skills" data-domain="ai" className="section-pad scroll-mt-24">
      <SectionHeading
        index="02"
        kicker={`${skillGroups.length} domains`}
        title="Skills & Tooling"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.12)}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
          {skillGroups.map((group, i) => {
            const accent = DOMAINS[group.domain];
            return (
              <motion.div
                key={group.title}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-6 shadow-card transition-colors duration-300 hover:border-[#4a3e30]"
              >
                {/* corner glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(closest-side, rgba(${accent.rgb}, 0.16), transparent 72%)`,
                  }}
                />

                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accent.hex }}
                  />
                  <h3 className="display text-xl font-semibold text-text">
                    {group.title}
                  </h3>
                  <span
                    className="display ml-auto text-lg italic opacity-70"
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
                      className="mono cursor-default rounded-full border border-border bg-bg/60 px-3 py-1 text-xs text-text-muted transition-colors duration-200 hover:text-text"
                      style={{ borderColor: `rgba(${accent.rgb}, 0.18)` }}
                      whileHover={{
                        y: -2,
                        color: accent.hex,
                        borderColor: accent.hex,
                      }}
                      whileTap={{ scale: 0.92, color: accent.hex }}
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
