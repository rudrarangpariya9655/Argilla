"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/** Shared instance so the preloader and menu can lock scrolling. */
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function lockScroll() {
  lenisInstance?.stop();
  document.documentElement.classList.add("lenis-stopped");
}

export function unlockScroll() {
  lenisInstance?.start();
  document.documentElement.classList.remove("lenis-stopped");
}

export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and the
 * scroll position never disagree by a frame. Disabled entirely when the visitor
 * asks for reduced motion, which leaves native scrolling in place.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links inside the page should use the same easing as the wheel.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
