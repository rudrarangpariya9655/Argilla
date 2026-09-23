"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "./SmoothScroll";

/** Silhouette of a thrown vessel, drawn then filled as loading progresses. */
const VESSEL_PATH =
  "M100 14 C62 14 46 46 46 88 C46 122 26 142 26 174 C26 208 59 230 100 230 C141 230 174 208 174 174 C174 142 154 122 154 88 C154 46 138 14 100 14 Z";

type Props = {
  onDone: () => void;
  /** Evaluated on the client only, so the server render stays deterministic. */
  skip: () => boolean;
};

export function Preloader({ onDone, skip }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGRectElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);

  // Mount-only flag so the first client render matches the server output.
  useIsomorphicLayoutEffect(() => setMounted(true), []);

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;

    const root = rootRef.current;

    // Repeat visits in the same session, and anyone who asked for reduced
    // motion, go straight to the content — no overlay, no scroll lock.
    if (skip() || prefersReducedMotion() || !root) {
      setGone(true);
      onDone();
      return;
    }

    lockScroll();

    const ctx = gsap.context(() => {
      const finish = () => {
        setGone(true);
        unlockScroll();
        onDone();
      };

      const progress = { value: 0 };
      const outline = outlineRef.current;
      const length = outline?.getTotalLength() ?? 0;

      if (outline) {
        gsap.set(outline, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finish,
      });

      tl.set(root, { autoAlpha: 1 })
        // Vessel draws itself.
        .to(outline, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, 0)
        .from(metaRef.current, { autoAlpha: 0, duration: 0.6 }, 0.15)
        // Counter and clay fill rise together.
        .to(
          progress,
          {
            value: 100,
            duration: 1.75,
            ease: "power1.inOut",
            onUpdate: () => {
              const v = Math.round(progress.value);
              if (counterRef.current) {
                counterRef.current.textContent = String(v).padStart(3, "0");
              }
              if (fillRef.current) {
                // Rect is 244 tall in a 0–244 viewBox band; fill from the base.
                const h = (v / 100) * 244;
                fillRef.current.setAttribute("y", String(244 - h));
                fillRef.current.setAttribute("height", String(h));
              }
            },
          },
          0.1,
        )
        .to(barRef.current, { scaleX: 1, duration: 1.75, ease: "power1.inOut" }, 0.1)
        // Brand identity resolves as the vessel completes.
        .from(
          wordRef.current?.querySelectorAll("[data-letter]") ?? [],
          { autoAlpha: 0, yPercent: 60, duration: 0.6, stagger: 0.04 },
          1.15,
        )
        .to({}, { duration: 0.22 })
        // Cinematic exit: contents lift away, then the panel wipes up.
        .to(
          [metaRef.current, barRef.current?.parentElement ?? null],
          { autoAlpha: 0, duration: 0.35 },
          "exit",
        )
        .to(
          ".preloader-mark",
          { yPercent: -18, autoAlpha: 0, duration: 0.7, ease: "power3.inOut" },
          "exit",
        )
        .to(
          wordRef.current,
          { yPercent: -40, autoAlpha: 0, duration: 0.75, ease: "power3.inOut" },
          "exit+=0.06",
        )
        .to(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1,
            ease: "expo.inOut",
          },
          "exit+=0.18",
        );
    }, rootRef);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, [mounted, onDone, skip]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      data-preloader
      role="status"
      aria-live="polite"
      aria-label="Loading Argilla"
      className="fixed inset-0 z-[120] flex flex-col justify-between bg-ink px-(--spacing-gutter) py-8 text-porcelain opacity-0"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div ref={metaRef} className="flex items-baseline justify-between">
        <span className="label text-porcelain/50">Argilla Ceramica</span>
        <span className="label text-porcelain/50">Est. 1998</span>
      </div>

      <div className="preloader-mark flex flex-1 items-center justify-center">
        <svg
          viewBox="0 0 200 244"
          className="h-[38vh] max-h-[19rem] w-auto"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="argilla-vessel-clip">
              <path d={VESSEL_PATH} />
            </clipPath>
          </defs>
          <rect
            ref={fillRef}
            x="0"
            y="244"
            width="200"
            height="0"
            fill="var(--color-terracotta)"
            clipPath="url(#argilla-vessel-clip)"
            opacity="0.9"
          />
          <path
            ref={outlineRef}
            d={VESSEL_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-5">
        <div
          ref={wordRef}
          className="display-xl flex justify-center overflow-hidden leading-none"
          aria-hidden="true"
        >
          {"ARGILLA".split("").map((letter, i) => (
            <span key={`${letter}-${i}`} data-letter className="inline-block">
              {letter}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="label tabular-nums text-porcelain/70">
            <span ref={counterRef}>000</span>
            <span className="ml-1">%</span>
          </span>
          <span className="relative h-px flex-1 overflow-hidden bg-porcelain/20">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left scale-x-0 bg-porcelain"
            />
          </span>
          <span className="label text-porcelain/40">Loading</span>
        </div>
      </div>
    </div>
  );
}
