"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, EASE } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { TEXTURES } from "@/lib/data/craft";
import { BLUR, src } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * "Find Your Surface" — a tactile sampler. Hovering or focusing a swatch brings
 * it forward and writes its detail into the panel; keyboard users get the same
 * result because the swatches are real buttons in a tablist.
 */
export function TextureSelector() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const texture = TEXTURES[active];

  // The panel re-reads on every change. Animating the new copy in — rather
  // than swapping it — is what separates a configurator from a radio group.
  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-texture-swap]",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: EASE.out,
          stagger: 0.06,
          overwrite: "auto",
        },
      );

      // The index counts rather than cuts.
      const counter = counterRef.current;
      if (counter) {
        const from = Number(counter.dataset.shown ?? 1);
        const to = active + 1;
        const proxy = { value: from };
        gsap.to(proxy, {
          value: to,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: () => {
            counter.textContent = String(Math.round(proxy.value)).padStart(2, "0");
          },
          onComplete: () => {
            counter.dataset.shown = String(to);
          },
        });
      }
    }, panelRef);

    return () => ctx.revert();
  }, [active]);

  return (
    <section className="section-y bg-ivory" aria-labelledby="textures-heading">
      <div className="shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow index="07">Finishes</Eyebrow>
            <h2
              id="textures-heading"
              data-anim="fade-up"
              className="display-lg max-w-xl text-charcoal"
            >
              Find your surface.
            </h2>
          </div>
          <p data-anim="fade-up" className="body-base max-w-xs text-umber">
            Five finishes, each with its own slip rating and format range.
            Samples go out in 100mm squares.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Swatch rail. */}
          <div
            role="tablist"
            aria-label="Ceramic finishes"
            aria-orientation="horizontal"
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            {TEXTURES.map((item, i) => {
              const selected = active === i;
              return (
                <button
                  key={item.name}
                  role="tab"
                  id={`texture-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="texture-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                      event.preventDefault();
                      const next = (i + 1) % TEXTURES.length;
                      setActive(next);
                      document.getElementById(`texture-tab-${next}`)?.focus();
                    }
                    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                      event.preventDefault();
                      const prev = (i - 1 + TEXTURES.length) % TEXTURES.length;
                      setActive(prev);
                      document.getElementById(`texture-tab-${prev}`)?.focus();
                    }
                  }}
                  className={cn(
                    "group relative overflow-hidden text-left transition-[flex-grow,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "h-28 w-full sm:h-[52vh] sm:max-h-[30rem]",
                    selected ? "sm:flex-[2.4]" : "sm:flex-[1]",
                  )}
                >
                  <Image
                    src={src(item.image, 800)}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 640px) 92vw, 22vw"
                    quality={72}
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className={cn(
                      "object-cover transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      selected
                        ? "scale-100 saturate-100"
                        : "scale-105 saturate-[0.55]",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 transition-colors duration-700",
                      selected ? "bg-ink/10" : "bg-ink/45",
                    )}
                  />
                  <span
                    className={cn(
                      "label absolute bottom-4 left-4 z-10 transition-colors duration-500",
                      selected ? "text-porcelain" : "text-porcelain/70",
                    )}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel. */}
          <div
            ref={panelRef}
            role="tabpanel"
            id="texture-panel"
            aria-labelledby={`texture-tab-${active}`}
            className="flex flex-col justify-between gap-8 border-t border-umber/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <div className="flex flex-col gap-5">
              <span className="label text-terracotta tabular-nums">
                <span ref={counterRef} data-shown="1">
                  01
                </span>{" "}
                / {String(TEXTURES.length).padStart(2, "0")}
              </span>
              {/* Fixed minimum heights keep the panel from resizing as the
                  copy changes, so nothing below it jumps. */}
              <h3
                data-texture-swap
                className="display-md min-h-[1.1em] text-charcoal"
              >
                {texture.name}
              </h3>
              <p
                data-texture-swap
                className="body-base min-h-[5.25rem] max-w-md text-umber"
              >
                {texture.description}
              </p>
            </div>

            <dl className="grid gap-6 sm:grid-cols-2">
              <div data-texture-swap className="flex flex-col gap-2">
                <dt className="label text-umber/50">Slip rating</dt>
                <dd className="body-base text-charcoal">{texture.finish}</dd>
              </div>
              <div data-texture-swap className="flex flex-col gap-2">
                <dt className="label text-umber/50">Available sizes</dt>
                <dd className="body-base min-h-[5.25rem] text-charcoal">
                  {texture.sizes.map((size) => (
                    <span key={size} className="block">
                      {size} mm
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <MagneticButton href="/contact?intent=sample">
              Request this sample
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
