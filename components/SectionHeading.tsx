"use client";

import { motion } from "framer-motion";
import { staggerContainer, wordClip, fadeUp, VIEWPORT } from "@/lib/animations";

interface Props {
  /** Mono eyebrow label, e.g. "// 02 — projects". */
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Accent hex for the kicker + index. */
  accent?: string;
  align?: "left" | "center";
}

/** Section heading whose words clip up from a mask on scroll-in. */
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  accent = "#3B82F6",
  align = "left",
}: Props) {
  const words = title.split(" ");

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {kicker && (
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeUp}
          className="mono mb-4 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {kicker}
        </motion.p>
      )}

      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.08)}
        className={`flex flex-wrap gap-x-[0.28em] text-3xl font-bold leading-[1.05] tracking-tight text-text sm:text-4xl md:text-5xl ${
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
