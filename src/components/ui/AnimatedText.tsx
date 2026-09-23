"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, ENTER } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  /** Each entry becomes one masked line. */
  lines: ReadonlyArray<ReactNode>;
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Seconds to wait before the first line rises. */
  delay?: number;
  /** Play immediately instead of waiting for the element to scroll into view. */
  immediate?: boolean;
  /** When false, the animation is held until the flag flips (used by the hero). */
  play?: boolean;
};

/**
 * Masked line reveal: each line sits in an `overflow-hidden` wrapper and rises
 * into place. Splitting by line rather than by character keeps screen readers
 * and text selection intact.
 */
export function AnimatedText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  play = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || !play) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-line-inner]");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 108, autoAlpha: 0 });

      const tween = gsap.to(targets, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.09,
        delay,
        paused: !immediate,
      });

      if (immediate) return;

      ScrollTrigger.create({
        trigger: el,
        start: ENTER,
        once: true,
        onEnter: () => tween.play(),
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, immediate, play]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span
            data-line-inner
            className={cn("block will-change-transform", lineClassName)}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Word-by-word reveal tied to scroll progress — used for the oversized
 * introduction statement where the copy should resolve as the visitor moves.
 */
export function ScrollRevealText({
  text,
  as: Tag = "p",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0.12 },
        {
          autoAlpha: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 58%",
            scrub: 0.6,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word className="inline-block">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
