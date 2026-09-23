"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { BLUR, src, type Img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { HeroTheme } from "@/components/layout/NavTheme";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow: string;
  /** One entry per masked line of the page title. */
  title: string[];
  lead?: ReactNode;
  image?: Img;
  crumbs?: Crumb[];
  meta?: { label: string; value: string }[];
  /** `full` fills the viewport; `panel` is a shorter banner for inner pages. */
  height?: "full" | "panel";
};

/**
 * Shared page opener. Every route uses it, so the entrance rhythm across the
 * site is identical and each page still gets its own image and metadata strip.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  meta,
  height = "panel",
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dark = Boolean(image);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(mediaRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      // Scoped to this hero rather than the document, so a page with more than
      // one never has its other headers reset.
      gsap.set(root.querySelectorAll("[data-page-line], [data-page-fade]"), {
        autoAlpha: 1,
        yPercent: 0,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (mediaRef.current) {
        tl.fromTo(
          mediaRef.current,
          { clipPath: "inset(14% 8% 14% 8%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
          0,
        ).fromTo(
          imageRef.current,
          { scale: 1.2 },
          { scale: 1, duration: 1.7, ease: "expo.out" },
          0,
        );
      }

      tl.fromTo(
        "[data-page-line]",
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, stagger: 0.08 },
        0.2,
      ).fromTo(
        "[data-page-fade]",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07 },
        0.6,
      );

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 10,
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
      className={cn(
        "relative flex flex-col justify-end overflow-hidden",
        height === "full"
          ? "h-[100svh] min-h-[34rem]"
          : "min-h-[72svh] pt-40 sm:min-h-[80svh]",
        dark ? "bg-ink text-porcelain" : "bg-porcelain text-charcoal",
      )}
    >
      {dark ? <HeroTheme theme="dark" /> : null}

      {image ? (
        <>
          <div
            ref={mediaRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(14% 8% 14% 8%)" }}
          >
            <div ref={imageRef} className="absolute -inset-y-[6%] inset-x-0">
              <Image
                src={src(image, 2000)}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                quality={80}
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45"
            />
          </div>
        </>
      ) : null}

      <div className="shell relative z-10 flex flex-col gap-8 pb-14 pt-24 sm:pb-20">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" data-page-fade>
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "label",
                        dark ? "text-porcelain/30" : "text-umber/35",
                      )}
                    >
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <TransitionLink
                      href={crumb.href}
                      className={cn(
                        "label transition-colors",
                        dark
                          ? "text-porcelain/50 hover:text-porcelain"
                          : "text-umber/60 hover:text-charcoal",
                      )}
                    >
                      {crumb.label}
                    </TransitionLink>
                  ) : (
                    <span
                      aria-current="page"
                      className={cn(
                        "label",
                        dark ? "text-porcelain/80" : "text-charcoal",
                      )}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <span
          data-page-fade
          className={cn(
            "label flex items-center gap-3",
            dark ? "text-porcelain/50" : "text-umber/60",
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-current opacity-50"
          />
          {eyebrow}
        </span>

        <h1 className={cn(title.length > 1 ? "display-xl" : "display-lg")}>
          {title.map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden pb-[0.06em]"
              style={{ paddingLeft: i > 0 ? `${i * 4}vw` : undefined }}
            >
              <span data-page-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        {lead ? (
          <p
            data-page-fade
            className={cn(
              "body-lg max-w-xl",
              dark ? "text-porcelain/75" : "text-umber",
            )}
          >
            {lead}
          </p>
        ) : null}

        {meta?.length ? (
          <>
            <span
              data-page-fade
              className={cn(
                "h-px w-full",
                dark ? "bg-porcelain/15" : "bg-umber/15",
              )}
            />
            <dl className="flex flex-wrap gap-x-12 gap-y-5">
              {meta.map((item) => (
                <div
                  key={item.label}
                  data-page-fade
                  className="flex flex-col gap-1"
                >
                  <dt
                    className={cn(
                      "label",
                      dark ? "text-porcelain/40" : "text-umber/50",
                    )}
                  >
                    {item.label}
                  </dt>
                  <dd
                    className={cn(
                      "body-sm",
                      dark ? "text-porcelain/85" : "text-charcoal",
                    )}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </div>
    </section>
  );
}
