"use client";

import Image from "@/components/ui/MaterialImage";
import { useRef } from "react";
import { gsap, EASE, DURATION, TRAVEL } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { BLUR, src } from "@/lib/images";
import { HeroTheme } from "@/components/layout/NavTheme";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HERO_IMAGE = {
  id: 18486386,
  alt: "A potter's hands shaping the rim of a clay bowl on a spinning wheel",
};

const HEADLINE = ["SHAPED", "BY", "EARTH."] as const;

const DETAILS = [
  { label: "Material", value: "Full-body porcelain" },
  { label: "Collections", value: "Six material stories" },
  { label: "Perspective", value: "An independent brand concept" },
];

/**
 * Full-viewport opening with a short material reveal and immediate navigation.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [
            "[data-hero-line]",
            "[data-hero-fade]",
            "[data-hero-cta]",
            "[data-hero-detail]",
          ],
          { autoAlpha: 1, yPercent: 0, y: 0 },
        );
        gsap.set(mediaRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl
        // 1. The frame opens outward to full bleed.
        .fromTo(
          mediaRef.current,
          { clipPath: "inset(14% 9% 14% 9%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: EASE.expo },
        )
        // A restrained settle: enough to feel the image arrive, not enough to
        // read as a zoom.
        .fromTo(
          imageRef.current,
          { scale: 1.08 },
          { scale: 1, duration: 1.2, ease: EASE.expo },
          0,
        )
        // 2. Heading lines rise from their masks, one behind the next.
        .fromTo(
          "[data-hero-line]",
          { yPercent: 108 },
          { yPercent: 0, duration: DURATION.slow, stagger: 0.085 },
          0.3,
        )
        // 3. Supporting text.
        .fromTo(
          "[data-hero-fade]",
          { autoAlpha: 0, y: TRAVEL.md },
          { autoAlpha: 1, y: 0, duration: DURATION.base, stagger: 0.08 },
          0.35,
        )
        // 4. Call to action.
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: TRAVEL.sm },
          { autoAlpha: 1, y: 0, duration: DURATION.base },
          0.5,
        )
        // 5. Editorial details last, so the eye lands on them after the claim.
        .fromTo(
          "[data-hero-detail]",
          { autoAlpha: 0, y: TRAVEL.sm },
          { autoAlpha: 1, y: 0, duration: DURATION.fast, stagger: 0.07 },
          0.65,
        );

      // Larger screens retain the gentle exit; phones use a stable frame.
      if (window.matchMedia("(min-width: 768px)").matches) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-content]", {
          yPercent: -8,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      <HeroTheme theme="dark" />
      <div
        ref={mediaRef} data-motion-frame
        className="absolute inset-0"
      >
        <div ref={imageRef} data-motion-frame className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={src(HERO_IMAGE, 2400)}
            alt={HERO_IMAGE.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        </div>
        {/* Legibility scrims. The vertical one anchors the headline; the
            horizontal one only appears where the supporting copy sits, so the
            middle of the photograph stays clean. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-l from-ink/55 via-ink/10 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40"
        />
      </div>

      <div
        data-hero-content
        className="shell relative z-10 flex flex-col gap-8 pb-8 pt-32 sm:gap-10 sm:pb-12 lg:pt-40"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Three explicit lines so the stagger is identical at every width. */}
          <div className="flex min-w-0 flex-col gap-6">
          <p data-hero-fade className="label text-porcelain/85">Architectural ceramic surfaces</p>
          <h1 className="display-hero text-porcelain">
            {HEADLINE.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.04em]"
                style={{ paddingLeft: `${i * 5}vw` }}
              >
                <span
                  data-hero-line
                  className="block whitespace-nowrap"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          </div>

          <div className="flex max-w-sm flex-col gap-6 lg:pb-6">
            <p data-hero-fade className="body-lg text-porcelain/75">
              Ceramic surfaces for spaces with a sense of permanence.
              Six collections exploring the quiet character of clay.
            </p>
            <div data-hero-cta>
              <MagneticButton
                href="/collections"
                variant="outline"
                className="border-porcelain/50 text-porcelain hover:border-porcelain"
              >
                Explore the collection
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="rule bg-porcelain/15" />

        <div className="flex flex-wrap items-end justify-between gap-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {DETAILS.map((detail) => (
              <div key={detail.label} data-hero-detail className="flex flex-col gap-1">
                <dt className="label text-porcelain/70">{detail.label}</dt>
                <dd className="body-sm text-porcelain/85">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href="#introduction"
            data-hero-detail
            className="group flex min-h-11 items-center gap-3 text-porcelain/75 transition-colors hover:text-porcelain"
          >
            <span className="label">Scroll</span>
            <span
              aria-hidden="true"
              className="flex h-10 w-5 items-start justify-center rounded-full border border-current pt-1.5"
            >
              <span
                className="block h-1.5 w-px bg-current"
                style={{ animation: "argilla-scroll-hint 2.1s ease-in-out infinite" }}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
