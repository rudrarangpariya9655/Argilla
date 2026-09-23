"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { STATS } from "@/lib/data/craft";
import { Eyebrow, Reveal } from "@/components/ui/Primitives";

/** Figures count up once, when the row first enters the viewport. */
export function Stats() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const values = gsap.utils.toArray<HTMLElement>("[data-stat-value]", root);

    if (prefersReducedMotion()) {
      values.forEach((el) => {
        el.textContent = el.dataset.statValue ?? "";
      });
      return;
    }

    const ctx = gsap.context(() => {
      values.forEach((el) => {
        const target = Number(el.dataset.statValue ?? 0);
        const counter = { value: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              value: target,
              duration: 1.9,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.value));
              },
            });
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="section-y bg-charcoal text-porcelain"
      aria-labelledby="stats-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow index="09" tone="light">
              By the numbers
            </Eyebrow>
            <h2
              id="stats-heading"
              data-anim="fade-up"
              className="display-lg max-w-xl text-porcelain"
            >
              Small works, long reach.
            </h2>
          </div>
          <p data-anim="fade-up" className="body-sm max-w-xs text-porcelain/45">
            Figures shown are placeholder demo data and are not audited
            business statistics.
          </p>
        </Reveal>

        <Reveal
          className="mt-16 grid gap-y-14 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-anim="fade-up"
              className="flex flex-col gap-3 border-t border-porcelain/15 pt-6 lg:pr-8"
            >
              <span className="display-xl flex items-baseline text-porcelain">
                <span data-stat-value={stat.value} className="tabular-nums">
                  0
                </span>
                <span className="text-terracotta">{stat.suffix}</span>
              </span>
              <span className="body-base text-porcelain/80">{stat.label}</span>
              <span className="label text-porcelain/35">{stat.note}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
