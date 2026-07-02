"use client";

import { motion } from "framer-motion";
import { staggerContainer, wordClip, fadeUp, VIEWPORT } from "@/lib/animations";

interface Props {
  /** Section index shown in the kicker line, e.g. "01". */
  index?: string;
  /** Optional extra kicker text after the index. */
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Accent hex for the index + rule. */
  accent?: string;
  align?: "left" | "center";
}

/** Section heading: an index + rule line draws in, then serif words
 *  clip up from a mask. */
export default function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  accent = "#E29D71",
  align = "left",
}: Props) {
  const words = title.split(" ");

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {/* index + growing rule */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fadeUp}
        className={`mb-6 flex items-center gap-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && (
          <span
            className="mono text-sm font-medium tracking-widest"
            style={{ color: accent }}
          >
            {index}
          </span>
        )}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block h-px w-16 origin-left sm:w-24"
          style={{ backgroundColor: accent, opacity: 0.6 }}
        />
        {kicker && (
          <span className="mono text-xs uppercase tracking-[0.2em] text-text-muted">
            {kicker}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.08)}
        className={`display flex flex-wrap gap-x-[0.28em] text-4xl font-semibold leading-[1.06] tracking-tight text-text sm:text-5xl md:text-6xl ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
            <motion.span variants={wordClip} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className={`mt-4 max-w-xl text-base leading-relaxed text-text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
