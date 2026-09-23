"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { BLUR, src } from "@/lib/images";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

const BACKDROP = {
  id: 29286722,
  alt: "Rows of handmade ceramic cups and bowls on rustic studio shelves",
};

/** Closing call to action over a slowly drifting ceramic backdrop. */
export function CallToAction() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { yPercent: -6, scale: 1.12 },
        {
          yPercent: 6,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-ink py-(--spacing-section) text-porcelain"
      aria-labelledby="cta-heading"
    >
      <div ref={mediaRef} className="absolute -inset-y-[6%] inset-x-0">
        <Image
          src={src(BACKDROP, 2000)}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={72}
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-ink/70"
      />

      <div className="shell relative z-10 flex flex-col gap-12">
        <AnimatedText
          as="h2"
          lines={["LET'S CREATE", "SOMETHING TIMELESS."]}
          className="display-xl max-w-5xl text-porcelain"
          lineClassName="whitespace-nowrap"
        />
        <span id="cta-heading" className="sr-only">
          Work with Argilla
        </span>

        <Reveal className="flex flex-col gap-10">
          <p data-anim="fade-up" className="body-lg max-w-lg text-porcelain/70">
            Send us a drawing, a mood board or a single question about a slip
            rating. We answer all three the same way.
          </p>

          <div
            data-anim="fade-up"
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/collections"
              variant="solid"
              className="border-transparent"
            >
              Explore collection
            </MagneticButton>
            <MagneticButton
              href="/contact?intent=sample"
              variant="outline"
              className="border-porcelain/35 text-porcelain"
            >
              Request a sample
            </MagneticButton>
            <MagneticButton
              href="/contact"
              variant="ghost"
              className="text-porcelain"
            >
              Contact us
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
