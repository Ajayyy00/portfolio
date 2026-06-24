/** Domain-tagged accent system shared across the whole site. */

export type Domain = "ai" | "fullstack" | "security" | "systems";

export interface DomainStyle {
  /** Raw hex — used for the custom cursor, inline glows, SVG strokes. */
  hex: string;
  /** rgb triplet (no wrapper) for building rgba() with arbitrary alpha. */
  rgb: string;
  /** Human label. */
  label: string;
}

export const DOMAINS: Record<Domain, DomainStyle> = {
  ai: { hex: "#3B82F6", rgb: "59, 130, 246", label: "AI / ML" },
  fullstack: { hex: "#10B981", rgb: "16, 185, 129", label: "Full-Stack" },
  security: { hex: "#F59E0B", rgb: "245, 158, 11", label: "Security" },
  systems: { hex: "#8B5CF6", rgb: "139, 92, 246", label: "Systems / Hardware" },
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
