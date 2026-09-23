"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

/** Hairline reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[102] h-px bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-terracotta/70"
      />
    </div>
  );
}
