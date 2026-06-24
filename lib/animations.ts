import type { Variants, Transition } from "framer-motion";

/**
 * Reusable Framer Motion variants & transitions.
 * Every animation in the site composes from these so the motion language
 * stays consistent. All animations use transform/opacity only (GPU-friendly).
 */

type Bezier = [number, number, number, number];

export const EASE_OUT: Bezier = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

export const SPRING: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.9,
};

/** Fade up — the workhorse entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/** Fade up, gentler — for chips and small items. */
export const fadeUpSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

/** Scale up — used for project cards entering the viewport. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/** Slide in from the left with spring physics — patent banner. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: SPRING,
  },
};

/** 3D flip-in — achievement badges. */
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateY: -75, y: 20 },
  show: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Generic stagger container. Override `staggerChildren` via custom prop. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.05,
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Word-clip reveal for section headings: each word slides up from a mask. */
export const wordClip: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Default viewport config — fire once, a touch before fully in view. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" };
