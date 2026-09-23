"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { CRAFT_STAGES } from "@/lib/data/craft";
import { BLUR, src } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Sticky craft narrative: the image column holds while the written stages pass
 * it. Each stage swaps the visible photograph, advances the step number and
 * pushes the progress indicator forward — clay becoming a finished surface.
 */
export function CraftProcess() {
  const rootRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-craft-step]");

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 62%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });

      if (reduced) return;

      // Progress rail fills across the whole sequence.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 55%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-porcelain py-(--spacing-section)"
      aria-labelledby="craft-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow index="04">The making</Eyebrow>
            <h2
              id="craft-heading"
              data-anim="fade-up"
              className="display-lg max-w-2xl text-charcoal"
            >
              From a hillside to a finished surface.
            </h2>
          </div>
          <p data-anim="fade-up" className="body-base max-w-xs text-umber">
            Five stages, nineteen hours in the kiln, and one decision repeated
            at every step: do not rush the material.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Sticky media column. */}
          <div className="hidden lg:block">
            <div className="sticky top-[14vh] flex gap-6">
              <div className="relative flex w-8 shrink-0 flex-col items-center pt-2">
                <span className="relative h-[52vh] w-px bg-umber/15">
                  <span
                    ref={progressRef}
                    className="absolute inset-0 origin-top scale-y-0 bg-terracotta"
                  />
                </span>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
                {CRAFT_STAGES.map((stage, i) => (
                  <Image
                    key={stage.index}
                    src={src(stage.image, 1200)}
                    alt={stage.image.alt}
                    fill
                    sizes="(max-width: 1024px) 0px, 42vw"
                    quality={80}
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className={cn(
                      "object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      active === i
                        ? "scale-100 opacity-100"
                        : "scale-[1.05] opacity-0",
                    )}
                  />
                ))}

                {/* The stage number rolls like an odometer: all five are
                    stacked in a masked column and the column is translated, so
                    the change is one transform rather than a text swap. A
                    gradient carries it over any photograph, where
                    mix-blend-difference disappeared on pale frames. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/55 to-transparent"
                />
                <span className="absolute left-6 top-6 flex items-baseline gap-3 text-porcelain">
                  <span className="relative block h-[1.05em] overflow-hidden">
                    <span
                      className="flex flex-col transition-transform duration-[760ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `translateY(-${active * 100}%)` }}
                    >
                      {CRAFT_STAGES.map((s) => (
                        <span
                          key={s.index}
                          className="display-md block leading-[1.05] tabular-nums"
                        >
                          {s.index}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="label opacity-70">
                    / {CRAFT_STAGES.length.toString().padStart(2, "0")}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Written stages. */}
          <ol className="flex flex-col">
            {CRAFT_STAGES.map((stage, i) => (
              <li
                key={stage.index}
                data-craft-step
                className="border-t border-umber/15 py-12 first:border-t-0 first:pt-0 lg:min-h-[52vh] lg:py-16"
              >
                <Reveal className="flex flex-col gap-5">
                  <div className="flex items-baseline gap-5">
                    <span
                      className={cn(
                        "label flex items-center gap-2.5 tabular-nums transition-colors duration-500",
                        active === i ? "text-terracotta" : "text-umber/40",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "block h-px origin-left bg-current transition-[width,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active === i ? "w-6 opacity-100" : "w-0 opacity-0",
                        )}
                      />
                      {stage.index}
                    </span>
                    <span className="label text-umber/50">
                      {stage.subtitle}
                    </span>
                  </div>

                  <h3 data-anim="fade-up" className="display-md text-charcoal">
                    {stage.title}
                  </h3>

                  {/* Image inline on smaller screens, where the sticky column is hidden. */}
                  <div
                    data-anim="mask"
                    className="relative aspect-[3/2] w-full overflow-hidden bg-sand lg:hidden"
                  >
                    <Image
                      src={src(stage.image, 1000)}
                      alt={stage.image.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 0px"
                      quality={72}
                      placeholder="blur"
                      blurDataURL={BLUR}
                      className="object-cover"
                    />
                  </div>

                  <p data-anim="fade-up" className="body-base max-w-lg text-umber">
                    {stage.body}
                  </p>

                  <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-2">
                    {stage.detail.map((d) => (
                      <div key={d.label} data-anim="fade" className="flex flex-col gap-1">
                        <dt className="label text-umber/45">{d.label}</dt>
                        <dd className="body-sm text-charcoal">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 flex">
          <div data-anim="fade-up">
            <MagneticButton href="/craft">Inside the works</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
