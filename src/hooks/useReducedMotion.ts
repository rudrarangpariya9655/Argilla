"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/**
 * Reactive `prefers-reduced-motion` flag. Rendered as `false` on the server so
 * markup is deterministic, then corrected on the client's first render.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Non-reactive read, safe to call inside GSAP setup code. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}
