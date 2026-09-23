"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { PRIMARY_NAV, SECONDARY_NAV, SITE } from "@/lib/data/site";
import { BLUR, src, type Img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { UnderlineLink } from "@/components/ui/Primitives";
import { lockScroll, unlockScroll } from "./SmoothScroll";

/** One ceramic image per navigation item, swapped on hover. */
const MENU_IMAGES: Record<string, Img> = {
  "/collections": {
    id: 6805522,
    alt: "A curated group of ceramic vases in neutral tones",
  },
  "/products": {
    id: 6945266,
    alt: "A minimalist stoneware bowl on a concrete surface",
  },
  "/projects": {
    id: 7587747,
    alt: "A sleek bathroom with textured ceramic walls",
  },
  "/craft": {
    id: 20362429,
    alt: "Hands shaping a clay vessel on a pottery wheel",
  },
  "/about": {
    id: 36731542,
    alt: "A craftsman in a studio surrounded by handmade ceramics",
  },
  "/journal": {
    id: 17885652,
    alt: "Sunlight falling across a minimal clay-toned wall",
  },
  "/contact": {
    id: 29286722,
    alt: "Rows of handmade ceramic cups on rustic studio shelves",
  },
};

const DEFAULT_IMAGE = MENU_IMAGES["/craft"];

export function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Img>(DEFAULT_IMAGE);
  const [mounted, setMounted] = useState(false);
  // Menu imagery is heavy and most visitors never open the menu, so it is not
  // requested until the first open. Adjusting the flag during render (rather
  // than in an effect) means the images mount in the same commit as the open.
  const [everOpened, setEverOpened] = useState(open);
  if (open && !everOpened) setEverOpened(true);

  useIsomorphicLayoutEffect(() => setMounted(true), []);

  // Open / close choreography.
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !mounted) return;

    const reduced = prefersReducedMotion();
    const items = root.querySelectorAll<HTMLElement>("[data-menu-item]");
    const details = root.querySelectorAll<HTMLElement>("[data-menu-detail]");
    const media = root.querySelector<HTMLElement>("[data-menu-media]");

    const ctx = gsap.context(() => {
      if (open) {
        if (reduced) {
          gsap.set(root, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set([items, details, media], { autoAlpha: 1, yPercent: 0 });
          return;
        }

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .set(root, { autoAlpha: 1 })
          .fromTo(
            root,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" },
          )
          .fromTo(
            items,
            { yPercent: 118, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.055 },
            "-=0.42",
          )
          .fromTo(
            details,
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 },
            "-=0.55",
          )
          .fromTo(
            media,
            { autoAlpha: 0, scale: 1.12 },
            { autoAlpha: 1, scale: 1, duration: 1.1 },
            "-=0.85",
          );
      } else {
        if (reduced) {
          gsap.set(root, { autoAlpha: 0 });
          return;
        }
        gsap
          .timeline()
          .to(items, { yPercent: -60, autoAlpha: 0, duration: 0.32, stagger: 0.02 })
          .to([details, media], { autoAlpha: 0, duration: 0.25 }, 0)
          .to(
            root,
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 0.6,
              ease: "expo.inOut",
            },
            0.1,
          )
          .set(root, { autoAlpha: 0 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [open, mounted]);

  // Scroll lock, focus handling and Escape.
  useEffect(() => {
    if (!open) return;

    lockScroll();
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Focus the dialog itself rather than the first link: the links are still
    // `visibility: hidden` while their entrance tween is queued, so focusing
    // them on a timer silently fails.
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Trap focus inside the panel while it is open.
      const focusables = [
        ...(panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ].filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      id="argilla-menu"
      // Inert to assistive tech and keyboard users while closed.
      {...(!open ? { inert: true as const } : {})}
      aria-hidden={!open}
      className="fixed inset-0 z-[105] overflow-hidden bg-ink text-porcelain opacity-0"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        className="shell flex h-full flex-col justify-between pb-10 pt-28 outline-none sm:pt-32"
      >
        <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <nav aria-label="Menu">
            <ul>
              {PRIMARY_NAV.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <TransitionLink
                    href={item.href}
                    data-menu-item
                    onClick={onClose}
                    onMouseEnter={() =>
                      setActive(MENU_IMAGES[item.href] ?? DEFAULT_IMAGE)
                    }
                    onFocus={() =>
                      setActive(MENU_IMAGES[item.href] ?? DEFAULT_IMAGE)
                    }
                    className="group flex items-baseline gap-5 py-1.5 sm:gap-8"
                  >
                    <span className="label w-6 shrink-0 text-porcelain/35 tabular-nums transition-colors group-hover:text-terracotta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "display-xl block leading-[0.95] transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        "group-hover:translate-x-3 group-hover:text-clay group-focus-visible:translate-x-3",
                      )}
                    >
                      {item.label}
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div
            data-menu-media
            className="relative hidden aspect-[4/5] w-full max-w-md justify-self-end overflow-hidden bg-charcoal lg:block"
          >
            {/* Once opened, all frames stay mounted and cross-fade on hover. */}
            {(everOpened ? Object.values(MENU_IMAGES) : []).map((img) => (
              <Image
                key={img.id}
                src={src(img, 900)}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1024px) 0px, 420px"
                quality={72}
                placeholder="blur"
                blurDataURL={BLUR}
                className={cn(
                  "object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  active.id === img.id ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6">
              <span className="label text-porcelain/70">{active.alt}</span>
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-porcelain/12 pt-8 md:flex-row md:items-end md:justify-between">
          <div data-menu-detail className="-my-2 flex flex-wrap gap-x-8">
            {SECONDARY_NAV.map((item) => (
              <UnderlineLink
                key={item.href}
                href={item.href}
                className="label text-porcelain/60 transition-colors hover:text-porcelain"
              >
                {item.label}
              </UnderlineLink>
            ))}
          </div>

          <div data-menu-detail className="-my-2 flex flex-wrap gap-x-8">
            {SITE.social.map((social) => (
              <UnderlineLink
                key={social.label}
                href={social.href}
                external
                className="label text-porcelain/60 transition-colors hover:text-porcelain"
              >
                {social.label}
              </UnderlineLink>
            ))}
          </div>

          <p data-menu-detail className="label max-w-xs text-porcelain/40">
            {SITE.contact.studio}
          </p>
        </div>
      </div>
    </div>
  );
}
