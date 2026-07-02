"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { site } from "@/data/site";
import { useActiveSection } from "@/lib/useActiveSection";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "patent", label: "Patent" },
  { id: "achievements", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { id: activeId } = useActiveSection();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    // Hide when scrolling down past the hero; reveal on scroll up.
    if (latest > previous && latest > 240) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-110%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-colors duration-300 sm:px-5 ${
          scrolled
            ? "border-border bg-surface/90 backdrop-blur-sm"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#hero"
          aria-label="Back to top"
          className="group flex items-center p-1.5"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-ai transition-transform duration-300 group-hover:scale-125" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  activeId === link.id
                    ? "text-text"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-ai/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.resume}
          download
          className="mono rounded-full border border-border bg-ai/5 px-3.5 py-1.5 text-xs font-medium text-text transition-colors hover:border-ai/60 hover:text-ai"
        >
          Résumé
        </a>
      </nav>
    </motion.header>
  );
}
