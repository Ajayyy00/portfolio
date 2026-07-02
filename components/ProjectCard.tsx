"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/data/projects";
import { DOMAINS } from "@/lib/domains";

interface Props {
  project: Project;
  index: number;
  total: number;
  /** Scroll progress of the whole deck, used to scale settled cards. */
  deckProgress: MotionValue<number>;
  onExpand: (p: Project) => void;
}

/**
 * One card in the sticky deck. Each card pins near the top of the viewport;
 * as the next one slides over it, the settled card scales down and dims —
 * the classic "stacking cards" scroll effect.
 */
export default function ProjectCard({
  project,
  index,
  total,
  deckProgress,
  onExpand,
}: Props) {
  const accent = DOMAINS[project.domain];
  const accent2 = project.accent ? DOMAINS[project.accent] : accent;
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  /* Entry animation for this card as it scrolls into view */
  const { scrollYProgress: entry } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const enterScale = useTransform(entry, [0, 1], [0.96, 1]);

  /* Once settled, shrink + dim as the rest of the deck scrolls by */
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const settleStart = (index + 1) / total;
  const settledScale = useTransform(
    deckProgress,
    [settleStart, 1],
    [1, targetScale],
  );
  const settledDim = useTransform(
    deckProgress,
    [settleStart, 1],
    [0, (total - 1 - index) * 0.14],
  );
  const scale = useTransform(
    [enterScale, settledScale],
    ([a, b]: number[]) => Math.min(a, b),
  );

  /* Cursor glare */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glareX = useTransform(mx, (v) => v * 100);
  const glareY = useTransform(my, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(640px circle at ${glareX}% ${glareY}%, rgba(240, 234, 224, 0.07), transparent 65%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className="sm:sticky sm:top-0 sm:flex sm:h-screen sm:items-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        onClick={() => onExpand(project)}
        onMouseMove={onMouseMove}
        style={
          reduced
            ? undefined
            : ({
                scale,
                willChange: "transform",
                "--stack-top": `calc(4vh + ${index * 14}px)`,
              } as React.CSSProperties)
        }
        className="group relative mb-8 w-full origin-top cursor-pointer overflow-hidden rounded-3xl border border-border bg-raised shadow-card-hover sm:mb-0 sm:top-[var(--stack-top)]"
      >
        {/* dim veil as the card settles under the stack */}
        <motion.div
          aria-hidden
          style={{ opacity: reduced ? 0 : settledDim }}
          className="pointer-events-none absolute inset-0 z-20 bg-bg"
        />
        {/* glare */}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(closest-side, rgba(${accent.rgb}, 0.13), rgba(${accent2.rgb}, 0.05) 55%, transparent 75%)`,
          }}
        />
        {/* giant ghost number */}
        <span
          aria-hidden
          className="display pointer-events-none absolute -top-6 right-4 select-none text-[8rem] font-semibold italic leading-none text-text/[0.05] sm:text-[13rem]"
        >
          {num}
        </span>

        <div className="relative flex flex-col gap-6 p-7 sm:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono text-xs text-text-muted">
              {num} / {String(total).padStart(2, "0")}
            </span>
            <span
              className="mono rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider"
              style={{
                color: accent.hex,
                backgroundColor: `rgba(${accent.rgb}, 0.1)`,
              }}
            >
              {project.tag}
            </span>
          </div>

          <h3 className="display max-w-3xl text-3xl font-semibold leading-tight text-text sm:text-5xl">
            {project.title}
          </h3>

          <p className="max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
            {project.description}
          </p>

          {/* stat chip */}
          <div
            className="mono inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:text-sm"
            style={{
              color: accent.hex,
              backgroundColor: `rgba(${accent.rgb}, 0.08)`,
              border: `1px solid rgba(${accent.rgb}, 0.22)`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent.hex }}
            />
            {project.stat}
          </div>

          {/* stack pills */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="mono rounded-full border border-border bg-bg/50 px-3 py-1 text-[11px] text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* footer */}
          <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-border/70 pt-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mono inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-text-muted hover:text-text"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mono inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-text-muted hover:text-text"
              >
                Demo ↗
              </a>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand(project);
              }}
              className="mono ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-transform duration-200 hover:translate-x-0.5"
              style={{
                color: accent.hex,
                backgroundColor: `rgba(${accent.rgb}, 0.1)`,
              }}
            >
              Architecture & story →
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
