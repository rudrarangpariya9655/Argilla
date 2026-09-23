"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins. Importing this module anywhere in
 * the client bundle guarantees ScrollTrigger exists before any component tries
 * to build a timeline.
 */
let registered = false;

if (typeof window !== "undefined" && !registered) {
  registered = true;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

/**
 * Shared motion tokens.
 *
 * Every animation on the site draws its easing, duration and travel distance
 * from here. Sections differ in what they animate, never in how it feels — that
 * consistency is most of what reads as "designed" rather than "animated".
 */
export const EASE = {
  /** Default entrance: fast start, long settle. */
  out: "power3.out",
  /** Symmetrical, for things that cover and uncover. */
  inOut: "power3.inOut",
  /** Longest tail, for large masks and full-bleed imagery. */
  expo: "expo.out",
  /** Gentle, for small supporting elements. */
  soft: "power2.out",
} as const;

export const DURATION = {
  /** Micro-feedback: chips, small labels. */
  fast: 0.5,
  /** Standard entrance for text and small blocks. */
  base: 0.9,
  /** Headings and cards. */
  slow: 1.15,
  /** Image masks and full-bleed reveals. */
  reveal: 1.4,
} as const;

/** Vertical travel for entrance animations, in pixels. */
export const TRAVEL = {
  sm: 16,
  md: 28,
  lg: 44,
} as const;

/** Default ScrollTrigger start for "element enters the viewport" reveals. */
export const ENTER = "top 82%";

/** Slightly later start, used by grids that sit low in a section. */
export const ENTER_LATE = "top 90%";

/**
 * The CSS equivalent of `EASE.out`, for hover and state transitions that are
 * better handled by CSS than by a tween.
 */
export const CSS_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
