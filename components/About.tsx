"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/animations";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";

/** One word whose opacity is scrubbed by scroll progress. */
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.32em] inline-block">
      {children}
    </motion.span>
  );
}

const stats: { value: number; label: string; decimals?: number }[] = [
  { value: projects.length, label: "projects shipped" },
  { value: 1, label: "patent published" },
  { value: achievements.length, label: "hackathon finals" },
  { value: 8.17, label: "CGPA", decimals: 2 },
];

/**
 * Statement section: the paragraph starts dim and each word lights up as
 * you scroll through — the text reads itself with you.
 */
export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = site.description.split(" ");

  return (
    <section id="about" data-domain="ai" className="section-pad scroll-mt-24">
      <SectionHeading index="01" title="About" />

      <p
        ref={ref}
        className="display mt-10 max-w-4xl text-2xl font-medium leading-snug tracking-tight text-text sm:text-4xl sm:leading-snug"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, Math.min(1, (i + 1) / words.length)]}
          >
            {word}
          </Word>
        ))}
      </p>

      {/* stats */}
      <motion.dl
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={staggerContainer(0.1)}
        className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <CountUp
                to={s.value}
                decimals={s.decimals ?? 0}
                className="display text-4xl font-semibold text-ai sm:text-5xl"
              />
              <p className="mono mt-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
                {s.label}
              </p>
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
