"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ENTER, EASE, DURATION } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { BLUR, src, type Img } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
  image: Img;
  className?: string;
  imgClassName?: string;
  sizes: string;
  priority?: boolean;
  /** Vertical drift in pixels across the scroll range. 0 disables parallax. */
  parallax?: number;
  /** Upstream fetch width; keep in step with the rendered size. */
  width?: number;
  quality?: number;
  /** Disable the clip-path entrance (for images revealed by a parent timeline). */
  noReveal?: boolean;
};

/**
 * An image that wipes into view behind a clip-path mask and then drifts at a
 * slightly different rate to the page. The mask and the drift are both
 * transform/clip-path only, so nothing triggers layout.
 */
export function RevealImage({
  image,
  className,
  imgClassName,
  sizes,
  priority = false,
  parallax = 0,
  width = 1600,
  quality = 80,
  noReveal = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (!noReveal) {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DURATION.reveal,
            ease: EASE.expo,
            scrollTrigger: { trigger: wrap, start: ENTER, once: true },
          },
        );

        // A restrained settle rather than a zoom: the image should look as
        // though it arrived, not as though it moved.
        gsap.fromTo(
          inner,
          { scale: 1.07 },
          {
            scale: 1,
            duration: 1.7,
            ease: EASE.expo,
            scrollTrigger: { trigger: wrap, start: ENTER, once: true },
          },
        );
      }

      if (parallax !== 0) {
        // Parallax is a scrub-driven transform on a large decoded image: cheap
        // on a desktop GPU, the most expensive thing on the page on a phone.
        // Tablets get half the travel, phones none.
        mm.add(
          {
            wide: "(min-width: 1024px)",
            mid: "(min-width: 640px) and (max-width: 1023.98px)",
          },
          (context) => {
            const { wide } = context.conditions as { wide: boolean };
            const travel = wide ? parallax : parallax * 0.5;
            gsap.fromTo(
              inner,
              { yPercent: -travel / 2 },
              {
                yPercent: travel / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: wrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          },
        );
      }
    }, wrapRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [parallax, noReveal]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden bg-sand", className)}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        // Extra bleed so parallax never exposes an edge.
        style={parallax !== 0 ? { top: "-8%", bottom: "-8%" } : undefined}
      >
        <Image
          src={src(image, width)}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={BLUR}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
