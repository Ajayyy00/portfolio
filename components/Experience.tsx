"use client";

import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      data-domain="fullstack"
      className="section-pad scroll-mt-24"
    >
      <SectionHeading
        index="04"
        kicker={`${String(experience.length).padStart(2, "0")} roles · in order`}
        title="Experience"
        accent="#A9C39B"
      />
      <Timeline />
    </section>
  );
}
