"use client";

import { useRef } from "react";
import { gsap, EASE, DURATION } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, UnderlineLink } from "@/components/ui/Primitives";

const LINES = ["Born from earth.", "Shaped by hands.", "Made to last."];

const DRIFTING_VESSEL = {
  id: 7663201,
  alt: "A simple ceramic pot in soft beige tones against a matching backdrop",
};

/**
 * Oversized statement. Lines resolve one at a time against scroll progress
 * while a single vessel drifts slowly across the composition.
 */
export function Intro() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-intro-line]");

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { yPercent: 105, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: DURATION.slow,
            ease: EASE.out,
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.04,
          },
        );
      });

      // The vessel crosses the section slowly as the visitor scrolls.
      gsap.fromTo(
        "[data-intro-vessel]",
        { yPercent: 14, xPercent: -6, rotate: -3 },
        {
          yPercent: -14,
          xPercent: 6,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="introduction"
      className="section-y relative overflow-hidden bg-porcelain"
      aria-labelledby="intro-heading"
    >
      <div className="shell relative">
        <Reveal className="mb-16 flex flex-col gap-4 sm:mb-24">
          <Eyebrow index="01">The house</Eyebrow>
        </Reveal>

        <div className="relative">
          <h2
            id="intro-heading"
            className="display-xl relative z-10 text-charcoal"
          >
            {LINES.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.06em]"
                style={{ paddingLeft: `${i * 6}vw` }}
              >
                <span data-intro-line className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h2>

          <div
            data-intro-vessel
            aria-hidden="true"
            className="pointer-events-none absolute -right-[4vw] top-1/2 z-0 hidden w-[24vw] max-w-[22rem] -translate-y-1/2 will-change-transform md:block"
          >
            <RevealImage
              image={DRIFTING_VESSEL}
              sizes="(max-width: 768px) 0px, 24vw"
              className="aspect-[3/4]"
              width={900}
              quality={72}
            />
          </div>
        </div>

        <Reveal className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <p data-anim="fade-up" className="body-lg text-umber">
              We have made ceramics in the same works outside Modena since 1998.
              It began with three throwers and a single kiln, and it has stayed
              deliberately small: one site, one clay store, one set of hands on
              every recipe.
            </p>
            <p data-anim="fade-up" className="body-base text-umber/80">
              What we sell is not a finish applied to a substrate. It is a clay
              body, pressed under pressure and fired for nineteen hours, whose
              colour goes all the way through. That decision costs more and
              takes longer, and it is the reason our surfaces still look like
              themselves a decade after installation.
            </p>
            <div data-anim="fade-up">
              <UnderlineLink href="/about" className="label text-charcoal">
                Read our story
              </UnderlineLink>
            </div>
          </div>

          <div className="relative md:hidden lg:block">
            <RevealImage
              image={{
                id: 6104788,
                alt: "Close-up of a pale clay body showing its natural grain",
              }}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/3] w-full"
              parallax={10}
              width={1200}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
