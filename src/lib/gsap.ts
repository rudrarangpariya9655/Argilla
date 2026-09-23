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

/** Shared easing curves so motion feels like one hand designed it. */
export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  soft: "power2.out",
} as const;

/** Default ScrollTrigger start for "element enters the viewport" reveals. */
export const ENTER = "top 82%";
