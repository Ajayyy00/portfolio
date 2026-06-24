"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Contribution } from "@/data/experience";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function SDCContributions({
  contributions,
}: {
  contributions: Contribution[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mono inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3.5 py-2 text-xs font-medium text-text transition-colors hover:border-fullstack/50 hover:text-fullstack"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-base leading-none">
          +
        </motion.span>
        {open ? "Hide contributions" : `View ${contributions.length} contributions`}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="contrib"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="show"
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              {contributions.map((c) => (
                <motion.div
                  key={c.title}
                  variants={fadeUp}
                  className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-fullstack/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-semibold text-text">{c.title}</h4>
                    {c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono shrink-0 rounded-md border border-fullstack/40 bg-fullstack/10 px-2 py-0.5 text-[10.5px] font-medium text-fullstack transition-colors hover:bg-fullstack/20"
                      >
                        ↗ Live
                      </a>
                    ) : (
                      <span className="mono shrink-0 rounded-md border border-border bg-bg/60 px-2 py-0.5 text-[10.5px] text-text-muted">
                        Internal Tool
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                    {c.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.stack.map((tech) => (
                      <span
                        key={tech}
                        className="mono rounded border border-border bg-bg/50 px-1.5 py-0.5 text-[10px] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
