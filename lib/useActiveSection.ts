"use client";

import { useEffect, useState } from "react";
import type { Domain } from "./domains";

export interface ActiveSection {
  id: string;
  domain: Domain;
}

/**
 * Tracks which `<section data-domain>` is most prominent in the viewport.
 * Shared by the custom cursor (colour) and the navbar (active link).
 */
export function useActiveSection(): ActiveSection {
  const [active, setActive] = useState<ActiveSection>({
    id: "hero",
    domain: "ai",
  });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-domain]"),
    );
    if (sections.length === 0) return;

    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let bestEl: HTMLElement | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestEl = el as HTMLElement;
          }
        });

        if (bestEl) {
          const el: HTMLElement = bestEl;
          const domain = (el.dataset.domain as Domain) ?? "ai";
          setActive((prev) =>
            prev.id === el.id ? prev : { id: el.id, domain },
          );
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}
