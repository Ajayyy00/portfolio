"use client";

import SectionHeading from "./SectionHeading";
import Timeline from "./Timeline";

export default function Experience() {
  return (
    <section
      id="experience"
      data-domain="fullstack"
      className="section-pad scroll-mt-24"
    >
      <SectionHeading
        kicker="// 03 — journey"
        title="Experience"
        subtitle="From cross-platform ad-intelligence ML to campus-wide internal tooling."
        accent="#10B981"
      />
      <Timeline />
    </section>
  );
}
