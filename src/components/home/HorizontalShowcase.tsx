"use client";

import Image from "@/components/ui/MaterialImage";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BLUR, src, type Img } from "@/lib/images";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

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

/** A native gallery at every breakpoint; normal page scrolling stays predictable. */
export function HorizontalShowcase() {
  const viewport = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ start: true, end: false });
  const update = () => {
    const el = viewport.current;
    if (el) setPosition({ start: el.scrollLeft < 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 });
  };
  useIsomorphicLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const move = (direction: number) => viewport.current?.scrollBy({
    left: direction * viewport.current.clientWidth * 0.75,
    behavior: reduced ? "auto" : "smooth",
  });
  return (
    <section className="section-y overflow-hidden bg-charcoal text-porcelain" aria-labelledby="showcase-heading">
      <div className="shell flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <span className="label text-porcelain/75">03 / Selected work</span>
          <h2 id="showcase-heading" className="display-lg max-w-xl">Material, in context.</h2>
          <p className="body-base max-w-md text-porcelain/75">Surfaces, objects and the spaces they inspire.</p>
        </div>
        <div className="flex items-center gap-3">
          <span id="showcase-hint" className="caption mr-3 text-porcelain/70">Swipe or use the arrows</span>
          <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous selected work" aria-controls="selected-work-strip" className="flex size-12 items-center justify-center border border-porcelain/35 transition-colors duration-200 hover:bg-porcelain/10 disabled:cursor-default"><ArrowLeft className="size-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next selected work" aria-controls="selected-work-strip" className="flex size-12 items-center justify-center border border-porcelain/35 transition-colors duration-200 hover:bg-porcelain/10 disabled:cursor-default"><ArrowRight className="size-5" aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={viewport} id="selected-work-strip" role="region" aria-label="Selected work gallery" aria-describedby="showcase-hint" tabIndex={0} onScroll={update} className="catalogue-strip no-scrollbar overflow-x-auto overscroll-x-contain">
        <div className="flex w-max gap-6 px-(--spacing-gutter) lg:gap-10">
          {SLIDES.map((slide, i) => (
            <article key={slide.name} className={cn("w-[78vw] shrink-0 sm:w-[45vw] lg:w-[min(28vw,23rem)]", i % 2 === 1 && "lg:mt-12")}>
              <TransitionLink href={slide.href} className="group block">
                <span className="relative block aspect-[4/5] overflow-hidden bg-ink">
                  <Image src={src(slide.image, 1200)} alt={slide.image.alt} fill sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 368px" quality={72} placeholder="blur" blurDataURL={BLUR} className="object-cover transition-transform duration-500 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]" />
                </span>
                <span className="mt-5 flex flex-col gap-3">
                  <span className="label text-porcelain/65">{slide.category} / {slide.year}</span>
                  <span className="display-sm text-porcelain">{slide.name}</span>
                  <span className="body-sm text-porcelain/75">{slide.material}</span>
                </span>
              </TransitionLink>
            </article>
          ))}
          <article className="flex w-[65vw] shrink-0 items-center sm:w-[35vw] lg:w-72">
            <TransitionLink href="/products" className="group flex flex-col gap-5 py-6"><span className="display-md">View all surfaces</span><ArrowRight aria-hidden="true" className="size-8 transition-transform duration-250 group-hover:translate-x-2" /></TransitionLink>
          </article>
        </div>
      </div>
    </section>
  );
}
