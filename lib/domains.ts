/** Domain-tagged accent system shared across the whole site.
 *  Warm-tuned palette: copper / sage / honey / lavender on espresso. */

export type Domain = "ai" | "fullstack" | "security" | "systems";

export interface DomainStyle {
  /** Raw hex — used for inline glows, SVG strokes. */
  hex: string;
  /** rgb triplet (no wrapper) for building rgba() with arbitrary alpha. */
  rgb: string;
  /** Human label. */
  label: string;
}

export const DOMAINS: Record<Domain, DomainStyle> = {
  ai: { hex: "#E29D71", rgb: "226, 157, 113", label: "AI / ML" },
  fullstack: { hex: "#A9C39B", rgb: "169, 195, 155", label: "Full-Stack" },
  security: { hex: "#E4C57E", rgb: "228, 197, 126", label: "Security" },
  systems: { hex: "#BCA7DA", rgb: "188, 167, 218", label: "Systems / Hardware" },
};

export const domainHex = (d: Domain) => DOMAINS[d].hex;
export const domainRgb = (d: Domain) => DOMAINS[d].rgb;

/** Tailwind text-color class per domain (statically listed so JIT keeps them). */
export const domainText: Record<Domain, string> = {
  ai: "text-ai",
  fullstack: "text-fullstack",
  security: "text-security",
  systems: "text-systems",
};
