"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { slideInLeft, VIEWPORT } from "@/lib/animations";

export default function Patent() {
  return (
    <section id="patent" data-domain="security" className="section-pad scroll-mt-24">
      <SectionHeading
        index="05"
        kicker="indian patent office · 2025"
        title="Published Patents"
        accent="#E4C57E"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={slideInLeft}
        className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-surface shadow-card"
      >
        {/* honey left border + glow */}
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-security to-ai" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 h-[22rem] w-[22rem] -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(228, 197, 126, 0.13), transparent 72%)",
          }}
        />

        <div className="relative p-7 pl-10 sm:p-10 sm:pl-14">
          <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-security">
              🏛️ Indian Patent
            </span>
            <span className="text-text-muted">· Published April 2025</span>
            <span className="text-text-muted">· No. 202341032601</span>
          </div>

          <h3 className="display mt-4 text-2xl font-semibold text-text sm:text-3xl">
            SARS — Self-Assisted Reading and Scribing System
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            Students with dyslexia, dysgraphia or dyscalculia usually need a
            human scribe to sit exams. I built a device that reads handwriting,
            voice and math notation directly, so a student can write, speak or
            sketch an answer and take the exam on their own terms — no scribe
            required.
          </p>

          <div className="mono mt-5 flex flex-wrap gap-2">
            {["Assistive Tech", "Accessibility", "Patent Filed"].map((t) => (
              <span
                key={t}
                className="rounded-md border border-security/30 bg-security/10 px-2.5 py-1 text-[11px] text-security"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
