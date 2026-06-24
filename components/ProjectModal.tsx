"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { DOMAINS } from "@/lib/domains";
import ArchitectureFlow from "./ArchitectureFlow";
import SeamArchitecture from "./SeamArchitecture";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-surface sm:rounded-2xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            {/* accent bar */}
            <div
              className="h-1.5 w-full rounded-t-2xl"
              style={{
                background: project.accent
                  ? `linear-gradient(90deg, ${DOMAINS[project.domain].hex}, ${DOMAINS[project.accent].hex})`
                  : DOMAINS[project.domain].hex,
              }}
            />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="mono text-xs font-medium uppercase tracking-wider"
                    style={{ color: DOMAINS[project.domain].hex }}
                  >
                    {project.tag}
                  </span>
                  <h3 className="mt-1.5 text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-full border border-border p-2 text-text-muted transition-colors hover:border-text-muted hover:text-text"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4l8 8"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="mono mt-5 inline-flex rounded-lg px-3 py-2 text-sm font-medium"
                style={{
                  color: DOMAINS[project.domain].hex,
                  backgroundColor: `rgba(${DOMAINS[project.domain].rgb}, 0.1)`,
                }}
              >
                {project.stat}
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-text-muted">
                {project.longDescription}
              </p>

              {project.architecture && (
                <div className="mt-7">
                  <p className="mono mb-4 text-xs uppercase tracking-wider text-text-muted">
                    Architecture · data flow
                  </p>
                  {project.id === "seam" ? (
                    <SeamArchitecture />
                  ) : (
                    <ArchitectureFlow
                      stages={project.architecture.stages}
                      note={project.architecture.note}
                    />
                  )}
                </div>
              )}

              <div className="mt-7">
                <p className="mono mb-2.5 text-xs uppercase tracking-wider text-text-muted">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="mono rounded-md border border-border bg-bg/60 px-2.5 py-1 text-xs text-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.github || project.demo) && (
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-ai px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-text-muted"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
