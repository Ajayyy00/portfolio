"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" data-domain="ai" className="scroll-mt-24">
      <div className="section-pad pb-0 sm:pb-0">
        <SectionHeading
          index="03"
          kicker={`${String(projects.length).padStart(2, "0")} builds · click a card`}
          title="Featured Projects"
        />
      </div>

      {/* sticky stacking deck */}
      <div ref={deckRef} className="mx-auto w-full max-w-6xl px-5 pt-10 sm:px-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            deckProgress={scrollYProgress}
            onExpand={setOpen}
          />
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
