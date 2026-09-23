"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BLUR, src, type Img } from "@/lib/images";
import { UnderlineLink } from "@/components/ui/Primitives";

type Slide = {
  name: string;
  category: string;
  material: string;
  year: string;
  href: string;
  image: Img;
};

const SLIDES: Slide[] = [
  {
    name: "Millstone Field",
    category: "Surface",
    material: "Full-body porcelain",
    year: "Earth / 2019",
    href: "/products/millstone-field",
    image: { id: 6104788, alt: "Millstone Field porcelain with a fine clay grain" },
  },
  {
    name: "Casa Fornace",
    category: "Project",
    material: "Extruded terracotta",
    year: "Modena / 2024",
    href: "/projects/casa-fornace",
    image: { id: 31483307, alt: "A square window set into a terracotta wall" },
  },
  {
    name: "Basalt Slab",
    category: "Surface",
    material: "Porcelain slab",
    year: "Stone / 2021",
    href: "/products/basalt-slab",
    image: { id: 7232667, alt: "Speckled stone-effect slab photographed close" },
  },
  {
    name: "Oatmeal Vessel",
    category: "Object",
    material: "Hand-thrown stoneware",
    year: "Artisan / 2024",
    href: "/products/oatmeal-vessel",
    image: { id: 6805522, alt: "Ceramic vessels in neutral tones on a shelf" },
  },
  {
    name: "Hotel Calcare",
    category: "Project",
    material: "Large-format porcelain",
    year: "Lisbon / 2023",
    href: "/projects/hotel-calcare",
    image: { id: 7587747, alt: "A sleek hotel bathroom with textured walls" },
  },
  {
    name: "Sienna Extrude",
    category: "Surface",
    material: "Extruded terracotta",
    year: "Terracotta / 2016",
    href: "/products/sienna-extrude",
    image: { id: 39485802, alt: "Stacked terracotta tiles showing tonal variation" },
  },
  {
    name: "Bianco Vena",
    category: "Surface",
    material: "Through-body porcelain",
    year: "Marble / 2022",
    href: "/products/bianco-vena",
    image: { id: 4709481, alt: "Marble-effect slab with fine grey veining" },
  },
];

/**
 * The one major horizontal moment on the site.
 *
 * Desktop turns vertical scroll into horizontal travel across a pinned stage.
 * The pin ends exactly when the track runs out, so the page never traps the
 * visitor. Below 1024px — and whenever reduced motion is requested — it is a
 * plain, swipeable overflow scroller with snap points.
 */
export function HorizontalShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Recomputed on every refresh so font loading and image sizing can't
        // leave the pin distance stale.
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Each image drifts inside its frame as the card crosses the stage.
        const cards = gsap.utils.toArray<HTMLElement>("[data-slide]", track);
        cards.forEach((card, i) => {
          const media = card.querySelector<HTMLElement>("[data-slide-media]");
          if (!media) return;
          gsap.fromTo(
            media,
            { xPercent: -8, scale: 1.14 },
            {
              xPercent: 8,
              scale: i % 2 === 0 ? 1.04 : 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        return () => {
          tween.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  // Pointer drag for the mobile/tablet scroller — touch gets it for free,
  // this makes a narrow desktop window behave the same way.
  useIsomorphicLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || isDesktop) return;

    let down = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      down = true;
      startX = event.clientX;
      startScroll = viewport.scrollLeft;
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      viewport.scrollLeft = startScroll - (event.clientX - startX);
    };
    const onUp = () => {
      down = false;
    };

    viewport.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      viewport.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDesktop]);

  // Images arriving late change the track width; refresh once they settle.
  useIsomorphicLayoutEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-charcoal py-(--spacing-section) text-porcelain lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0"
      aria-labelledby="showcase-heading"
    >
      <div className="shell flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between lg:pb-12">
        <div className="flex flex-col gap-5">
          <span className="label flex items-center gap-3 text-porcelain/45">
            <span className="tabular-nums opacity-70">03</span>
            Selected work
          </span>
          <h2 id="showcase-heading" className="display-lg text-porcelain">
            Explore the collection
          </h2>
        </div>
        <p className="body-base max-w-xs text-porcelain/55">
          Surfaces, objects and the buildings they ended up in.
          <span className="mt-2 block text-porcelain/35">
            {isDesktop ? "Keep scrolling" : "Swipe to browse"}
          </span>
        </p>
      </div>

      <div
        ref={viewportRef}
        data-cursor={isDesktop ? undefined : "drag"}
        className="no-scrollbar w-full overflow-x-auto overscroll-x-contain lg:overflow-visible"
        style={{ scrollSnapType: isDesktop ? undefined : "x mandatory" }}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-6 px-(--spacing-gutter) lg:gap-10"
        >
          {SLIDES.map((slide, i) => (
            <article
              key={slide.name}
              data-slide
              className="w-[78vw] shrink-0 sm:w-[54vw] md:w-[42vw] lg:w-[32vw] xl:w-[26vw]"
              style={{ scrollSnapAlign: isDesktop ? undefined : "center" }}
            >
              <UnderlineLink
                href={slide.href}
                className="group block !items-stretch"
              >
                <span
                  data-cursor="view"
                  className={`relative block overflow-hidden bg-ink ${
                    i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]"
                  } ${i % 3 === 2 ? "lg:mt-[6vh]" : ""}`}
                >
                  <Image
                    data-slide-media
                    src={src(slide.image, 1200)}
                    alt={slide.image.alt}
                    fill
                    sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 30vw"
                    quality={72}
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="scale-110 object-cover will-change-transform"
                  />
                </span>

                <span className="mt-5 flex items-start justify-between gap-5">
                  <span className="flex flex-col gap-1.5">
                    <span className="display-sm block text-porcelain">
                      {slide.name}
                    </span>
                    <span className="body-sm block text-porcelain/50">
                      {slide.material}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-2">
                    <span className="label text-porcelain/40">
                      {slide.category}
                    </span>
                    <span className="label text-porcelain/30">
                      {slide.year}
                    </span>
                  </span>
                </span>
              </UnderlineLink>
            </article>
          ))}

          {/* Closing panel so the track ends on a call to action. */}
          <article className="flex w-[70vw] shrink-0 items-center sm:w-[40vw] lg:w-[26vw]">
            <UnderlineLink
              href="/products"
              className="group flex flex-col gap-4 text-porcelain"
            >
              <span className="display-md block">View all surfaces</span>
              <ArrowRight
                aria-hidden="true"
                className="size-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
              />
            </UnderlineLink>
          </article>
        </div>
      </div>
    </section>
  );
}
