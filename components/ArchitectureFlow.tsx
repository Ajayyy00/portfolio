"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { DOMAINS } from "@/lib/domains";
import type { ArchStage, ProjectArchitecture } from "@/data/projects";

const STEP = 0.5; // seconds between each stage in the glow wave

/** Animated "data flowing" dots on the rail between two stages. */
function FlowDots({ index, cycle }: { index: number; cycle: number }) {
  return (
    <div className="flex h-7 w-7 flex-col items-center justify-center gap-[3px]">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="h-1 w-1 rounded-full bg-text-muted"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: cycle - 0.8,
            delay: index * STEP + d * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ArchitectureFlow({
  stages,
  note,
}: ProjectArchitecture) {
  const cycle = stages.length * STEP;

  return (
    <div>
      <div>
        {stages.map((s: ArchStage, i) => {
          const c = DOMAINS[s.domain];
          return (
            <Fragment key={s.label}>
              <div className="flex items-start gap-3">
                <motion.span
                  className="mono grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-[10px] font-bold"
                  style={{ color: c.hex }}
                  animate={{
                    boxShadow: [
                      `0 0 0px 0px ${c.hex}00`,
                      `0 0 18px -4px ${c.hex}`,
                      `0 0 0px 0px ${c.hex}00`,
                    ],
                    borderColor: [
                      `rgba(${c.rgb}, 0.4)`,
                      c.hex,
                      `rgba(${c.rgb}, 0.4)`,
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: cycle - 1,
                    delay: i * STEP,
                    ease: "easeInOut",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                <div className="flex-1 pb-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h5 className="text-sm font-semibold text-text">{s.label}</h5>
                    {s.loop && (
                      <span className="mono rounded-full border border-border px-2 py-0.5 text-[9px] text-text-muted">
                        ↻ {s.loop}
                      </span>
                    )}
                  </div>
                  {s.sub && (
                    <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                      {s.sub}
                    </p>
                  )}
                  {s.parallel && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.parallel.map((p) => (
                        <span
                          key={p}
                          className="mono rounded-md border px-2 py-0.5 text-[10px]"
                          style={{
                            color: c.hex,
                            borderColor: `rgba(${c.rgb}, 0.3)`,
                            backgroundColor: `rgba(${c.rgb}, 0.06)`,
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {i < stages.length - 1 && <FlowDots index={i} cycle={cycle} />}
            </Fragment>
          );
        })}
      </div>

      {note && (
        <p className="mono mt-4 border-l-2 border-border pl-3 text-[11px] leading-relaxed text-text-muted">
          {note}
        </p>
      )}
    </div>
  );
}
