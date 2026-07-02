"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeading from "./SectionHeading";
import { achievements } from "@/data/achievements";
import { DOMAINS, type Domain } from "@/lib/domains";
import { flipIn, staggerContainer, VIEWPORT } from "@/lib/animations";

function Card({
  a,
  i,
  big = false,
}: {
  a: (typeof achievements)[number];
  i: number;
  big?: boolean;
}) {
  const accent = DOMAINS[a.domain as Domain];
  const tilt = big ? (i % 2 === 0 ? -1.6 : 1.6) : 0;

  return (
    <motion.div
      initial={false}
      style={{ rotate: tilt }}
      whileHover={{ rotate: 0, y: -12, transition: { type: "spring", stiffness: 260, damping: 18 } }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-8 text-left shadow-card transition-colors duration-300 hover:border-[#4a3e30] ${
        big
          ? "flex h-[50vh] min-h-[330px] w-[76vw] max-w-[440px] shrink-0 flex-col justify-between"
          : ""
      }`}
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
        className="pointer-events-none absolute -right-10 -top-20 h-60 w-60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(closest-side, rgba(${accent.rgb}, 0.18), transparent 72%)`,
        }}
      />
      {/* ghost year */}
      <span
        aria-hidden
        className="display pointer-events-none absolute -bottom-5 right-3 select-none text-[5.5rem] font-semibold italic leading-none text-text/[0.05]"
      >
        {a.year}
      </span>

      <div>
        <motion.div
          className="inline-block text-4xl"
          whileHover={{ rotate: [0, -14, 12, 0], transition: { duration: 0.5 } }}
        >
          {a.icon}
        </motion.div>
        <h3 className="display mt-5 text-xl font-semibold leading-snug text-text sm:text-2xl">
          {a.event}
        </h3>
      </div>

      <div className={big ? "" : "mt-4"}>
        <p className="mono mt-2 text-sm font-medium" style={{ color: accent.hex }}>
          {a.result} · {a.year}
        </p>
        <span className="mono mt-4 inline-block rounded-full border border-border bg-bg/60 px-3 py-1 text-[10.5px] uppercase tracking-wider text-text-muted">
          {a.scope}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Hackathons ride sideways: the section pins and the cards translate
 * horizontally as you keep scrolling. The travel distance is measured,
 * so the last card always lands fully in view. Cards hang at alternating
 * tilts and snap straight when you grab one with the cursor.
 */
export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const overflow =
        trackRef.current.scrollWidth - window.innerWidth;
      setTravel(Math.max(0, overflow + 48)); // + right breathing room
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(
    scrollYProgress,
    [0.12, 0.9],
    [0, reduced ? 0 : -travel],
  );
  const rideProgress = useSpring(
    useTransform(scrollYProgress, [0.12, 0.9], [0, 1]),
    { stiffness: 120, damping: 30 },
  );

  return (
    <section id="achievements" data-domain="systems" className="scroll-mt-24">
      {/* Desktop: pinned horizontal ride */}
      <div ref={ref} className="relative hidden h-[280vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                index="06"
                title="Hackathons"
                subtitle="The weekends I gave up sleep for — and made it to the finals."
                accent="#BCA7DA"
              />
              {/* ride progress */}
              <div className="mb-2 flex items-center gap-3">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  ride
                </span>
                <div className="h-[3px] w-36 overflow-hidden rounded-full bg-border">
                  <motion.div
                    style={{ scaleX: rideProgress }}
                    className="h-full w-full origin-left rounded-full bg-systems"
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x, willChange: "transform" }}
            className="mt-12 flex items-center gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pr-12"
          >
            {achievements.map((a, i) => (
              <Card key={a.event} a={a} i={i} big />
            ))}
            {/* end card */}
            <div className="flex h-[50vh] min-h-[330px] w-[76vw] max-w-[440px] shrink-0 items-center justify-center rounded-3xl border border-dashed border-border">
              <p className="display px-8 text-center text-2xl italic text-text-muted">
                the next one is loading…
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: simple grid */}
      <div className="section-pad md:hidden">
        <SectionHeading
          index="06"
          title="Hackathons"
          subtitle="The weekends I gave up sleep for — and made it to the finals."
          accent="#BCA7DA"
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={staggerContainer(0.12)}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {achievements.map((a, i) => (
            <motion.div key={a.event} variants={flipIn}>
              <Card a={a} i={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
