"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectFilter,
} from "@/data/projects";

export default function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectFilter>("All");
  const [open, setOpen] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" data-domain="ai" className="section-pad scroll-mt-24">
      <SectionHeading
        title="Featured Projects"
        subtitle="Seven things I've built — AI systems, security tooling, full-stack platforms, even a VR trainer. Click a card if you want the full story."
      />

      {/* Filter tabs */}
      <LayoutGroup>
        <div className="mt-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-text-muted hover:text-text"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-ai/50 bg-ai/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {f}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Grid */}
      <motion.div
        layout
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onExpand={setOpen}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
