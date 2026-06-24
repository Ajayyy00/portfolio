"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { slideInLeft, VIEWPORT } from "@/lib/animations";

export default function Patent() {
  return (
    <section id="patent" data-domain="security" className="section-pad scroll-mt-24">
      <SectionHeading
        kicker="// 04 — patent"
        title="Published Patents"
        subtitle="Intellectual property from my work in assistive technology."
        accent="#F59E0B"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={slideInLeft}
        className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-surface"
      >
        {/* gold left border + glow */}
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-security to-[#fbbf24]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-security/20 blur-[90px]"
        />

        <div className="relative p-7 pl-10 sm:p-10 sm:pl-14">
          <div className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-security">
              🏛️ Indian Patent
            </span>
            <span className="text-text-muted">· Published April 2025</span>
            <span className="text-text-muted">· No. 202341032601</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            SARS — Self-Assisted Reading and Scribing System
          </h3>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            An assistive examination device for students with learning
            disabilities (dyslexia, dysgraphia, dyscalculia) — integrating
            scribble-to-text, voice-to-text, text-to-speech and write-to-math to
            enable independent participation in standardized tests, replacing the
            need for a human scribe.
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
