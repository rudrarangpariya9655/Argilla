"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Shared instance so dialogs can lock scrolling. */
let lenisInstance: Lenis | null = null;
let scrollLocks = 0;

export function getLenis() {
  return lenisInstance;
}

export function lockScroll() {
  scrollLocks += 1;
  lenisInstance?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks) return;
  lenisInstance?.start();
  document.documentElement.classList.remove("scroll-locked");
}


/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and the
 * scroll position never disagree by a frame. Disabled entirely when the visitor
 * asks for reduced motion, which leaves native scrolling in place.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
      touchMultiplier: 1.6,
    });

    lenisInstance = lenis;
    if (scrollLocks) lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links inside the page should use the same easing as the wheel.
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.search !== window.location.search) return;
      const id = destination.hash;
      if (!id || id === "#") return;
      const target = document.getElementById(decodeURIComponent(id.slice(1)));
      if (!target) return;
      event.preventDefault();
      window.history.pushState(null, "", id);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      lenis.scrollTo(target, { offset: -80 });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  return null;
}
