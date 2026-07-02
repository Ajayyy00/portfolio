"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { fadeUp, staggerContainer, EASE_OUT } from "@/lib/animations";
import { site, heroTypewriter } from "@/data/site";
import Magnetic from "./Magnetic";
import IdCard from "./IdCard";

/* ---------- per-letter reveal for the giant name ---------- */

const letterVar: Variants = {
  hidden: { y: "112%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

function BigLetters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden px-[0.02em] pb-[0.14em] align-bottom"
        >
          <motion.span
            variants={letterVar}
            whileHover={{
              y: -14,
              color: "#E29D71",
              transition: { type: "spring", stiffness: 400, damping: 11 },
            }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ---------- typewriter ---------- */

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

/* ---------- hero ---------- */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /* Cursor spotlight over the dotted grid */
  const spotX = useMotionValue(-600);
  const spotY = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${spotX}px ${spotY}px, rgba(226, 157, 113, 0.09), transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    spotX.set(e.clientX - r.left);
    spotY.set(e.clientY - r.top);
  };

  /* Parallax exit */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yExit = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      data-domain="ai"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* cursor spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0"
      />

      <motion.div
        style={{ y: yExit, opacity: fade }}
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.14, 2.0)}
        className="section-pad grid w-full items-center gap-12 lg:grid-cols-[1fr_auto]"
      >
        <div>
        <motion.p
          variants={fadeUp}
          className="mono mb-6 flex items-center gap-3 text-sm text-text-muted"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-fullstack" />
          {site.location} · open to work
        </motion.p>

        {/* THE name — fills the viewport width */}
        <motion.h1
          variants={staggerContainer(0.055)}
          className="display select-none text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.98] tracking-tight text-text"
        >
          <BigLetters text="Ajay C" />
          <motion.span
            variants={letterVar}
            className="inline-block text-ai"
          >
            .
          </motion.span>
        </motion.h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-xl leading-relaxed text-text sm:text-2xl"
            >
              {site.role} — I like problems that{" "}
              <em className="display text-security">actually</em> have to
              work.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-4 min-h-[28px] text-sm sm:text-base"
            >
              <span className="text-text-muted">{"> "}</span>
              <Typewriter phrases={heroTypewriter} />
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ai px-7 py-3.5 text-sm font-semibold text-bg shadow-glow-ai transition-[box-shadow,transform] duration-300 hover:shadow-card-hover active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-ai to-security opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">See the work</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={site.resume}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-7 py-3.5 text-sm font-semibold text-text transition-[color,border-color,transform] duration-300 hover:border-ai/50 hover:text-ai active:scale-95"
              >
                Résumé
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
        </div>

        {/* visitor badge — grab it; the barcode downloads the résumé */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease: EASE_OUT }}
          className="flex justify-center pb-6 lg:block lg:pb-0"
        >
          <IdCard />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-text-muted/50 p-1.5">
          <motion.span
            animate={{ y: [0, 12], opacity: [1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn" }}
            className="h-1.5 w-1.5 rounded-full bg-ai"
          />
        </span>
      </motion.a>
    </section>
  );
}
