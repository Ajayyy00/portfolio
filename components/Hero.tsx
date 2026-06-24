"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, EASE_OUT } from "@/lib/animations";
import { site, heroTypewriter } from "@/data/site";
import SkillConstellation from "./SkillConstellation";

function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      t = setTimeout(
        () =>
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          ),
        deleting ? 28 : 45,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return (
    <span className="mono text-ai">
      {text}
      <span className="ml-0.5 inline-block h-[1.05em] w-[8px] translate-y-[2px] animate-blink bg-ai align-middle" />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      data-domain="ai"
      className="grid-backdrop relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-ai/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-systems/10 blur-[150px]"
      />

      <div className="section-pad grid w-full items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-10">
        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.15, 0.1)}
        >
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
            <span className="inline-block h-10 w-[3px] rounded-full bg-ai" />
            <span className="mono text-sm text-text-muted">
              {site.location}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Ajay C
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-xl font-medium text-text sm:text-2xl"
          >
            {site.role}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 min-h-[28px] text-sm sm:text-base"
          >
            <span className="text-text-muted">{"> "}</span>
            <Typewriter phrases={heroTypewriter} />
          </motion.div>

          {/* Credential chips */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <span className="mono rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-text">
              CGPA {site.cgpa} · {site.institution}
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-ai px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-ai to-[#6366f1] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-10">View Projects</span>
              <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href={site.resume}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-text-muted"
            >
              Download Résumé
              <span aria-hidden>↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — skill constellation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
        >
          <SkillConstellation />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mono text-[11px] uppercase tracking-[0.3em] text-text-muted"
        >
          scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
