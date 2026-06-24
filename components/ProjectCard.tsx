"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { DOMAINS } from "@/lib/domains";
import { EASE_OUT } from "@/lib/animations";

interface Props {
  project: Project;
  index: number;
  onExpand: (p: Project) => void;
}

const ProjectCard = forwardRef<HTMLElement, Props>(function ProjectCard(
  { project, index, onExpand },
  ref,
) {
  const accent = DOMAINS[project.domain];

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_OUT, delay: index * 0.06 },
      }}
      exit={{ opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.3 } }}
      onClick={() => onExpand(project)}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: `0 20px 50px -16px rgba(${accent.rgb}, 0.45)`,
        transition: { type: "spring", stiffness: 280, damping: 24 },
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface/60"
      data-cursor="hover"
    >
      {/* top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: project.accent
            ? `linear-gradient(90deg, ${accent.hex}, ${DOMAINS[project.accent].hex})`
            : accent.hex,
        }}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* tag + expand */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className="mono rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider"
            style={{
              color: accent.hex,
              backgroundColor: `rgba(${accent.rgb}, 0.1)`,
            }}
          >
            {project.tag}
          </span>
          <motion.span
            className="mono text-[11px] text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            initial={false}
          >
            Expand →
          </motion.span>
        </div>

        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {project.description}
        </p>

        {/* stat chip */}
        <div
          className="mono mt-4 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
          style={{
            color: accent.hex,
            backgroundColor: `rgba(${accent.rgb}, 0.08)`,
            border: `1px solid rgba(${accent.rgb}, 0.2)`,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent.hex }}
          />
          {project.stat}
        </div>

        {/* stack pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="mono rounded border border-border bg-bg/50 px-2 py-0.5 text-[10.5px] text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="mono rounded px-2 py-0.5 text-[10.5px] text-text-muted">
              +{project.stack.length - 6}
            </span>
          )}
        </div>

        {/* footer buttons */}
        <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mono inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-text-muted hover:text-text"
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
              className="mono inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-text-muted hover:text-text"
            >
              Demo ↗
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand(project);
            }}
            className="mono ml-auto text-xs font-medium transition-colors"
            style={{ color: accent.hex }}
          >
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
});

export default ProjectCard;
