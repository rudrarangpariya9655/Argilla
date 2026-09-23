"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

const LINES = [
  "WE DON'T JUST",
  "MAKE CERAMICS.",
  "WE SHAPE",
  "SURFACES.",
];

/**
 * Full-screen typographic statement. Lines resolve against scroll progress and
 * the background warms from porcelain to clay across the section — a restrained
 * transformation rather than a colour show.
 */
export function BrandStatement() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-statement-line]");

      gsap.fromTo(
        lines,
        { yPercent: 100, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "power3.out",
          stagger: 0.5,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        root,
        { backgroundColor: "var(--color-porcelain)" },
        {
          backgroundColor: "var(--color-clay)",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="flex min-h-[100svh] items-center bg-porcelain py-(--spacing-section)"
      aria-labelledby="statement-heading"
    >
      <div className="shell">
        <h2
          id="statement-heading"
          className="display-xl text-charcoal"
        >
          {LINES.map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden pb-[0.06em]"
              style={{ paddingLeft: i % 2 === 1 ? "6vw" : undefined }}
            >
              <span
                data-statement-line
                className="block whitespace-nowrap will-change-transform"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
