"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { FINE_POINTER } from "@/hooks/useMediaQuery";

/**
 * Cursor states are declared in markup with `data-cursor`:
 *   data-cursor="link"  slight expansion over interactive text
 *   data-cursor="view"  labelled ring over product and project imagery
 *   data-cursor="drag"  labelled ring over draggable galleries
 * Touch and coarse-pointer devices never mount this.
 */
type CursorMode = "default" | "link" | "view" | "drag";

const LABELS: Record<CursorMode, string> = {
  default: "",
  link: "",
  view: "View",
  drag: "Drag",
};

const SIZES: Record<CursorMode, number> = {
  default: 10,
  link: 46,
  view: 92,
  drag: 92,
};

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;
    setEnabled(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    document.body.dataset.customCursor = "on";

    // Centre the cursor on the pointer via percentage offsets so GSAP's x/y
    // tweens below compose with it instead of overwriting a CSS transform.
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.32, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.32, ease: "power3" });

    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(dot, { x: event.clientX, y: event.clientY });
        gsap.to(dot, { autoAlpha: 1, duration: 0.25 });
      }
      xTo(event.clientX);
      yTo(event.clientY);

      const target = event.target as HTMLElement | null;
      const holder = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = (holder?.dataset.cursor as CursorMode | undefined) ?? null;

      if (next) {
        setMode(next);
        return;
      }

      // Anything clickable gets the subtle expansion by default.
      const interactive = target?.closest?.(
        'a, button, [role="button"], input, textarea, select, summary',
      );
      setMode(interactive ? "link" : "default");
    };

    const onLeave = () => {
      visible = false;
      gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
    };

    const onDown = () => gsap.to(dot, { scale: 0.82, duration: 0.18 });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      delete document.body.dataset.customCursor;
      gsap.killTweensOf(dot);
    };
  }, [enabled]);

  // Size and label transitions are driven from React state so the DOM stays
  // declarative; GSAP only owns position and press feedback.
  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot) return;

    gsap.to(dot, {
      width: SIZES[mode],
      height: SIZES[mode],
      backgroundColor:
        mode === "default"
          ? "var(--color-charcoal)"
          : "rgba(38, 33, 29, 0.12)",
      borderColor:
        mode === "default" ? "transparent" : "rgba(38, 33, 29, 0.55)",
      duration: 0.42,
      ease: "power3.out",
    });

    if (label) {
      gsap.to(label, {
        autoAlpha: LABELS[mode] ? 1 : 0,
        duration: 0.25,
      });
    }
  }, [enabled, mode]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[130] flex h-[10px] w-[10px] items-center justify-center rounded-full border border-transparent bg-charcoal opacity-0 backdrop-blur-[1px] will-change-transform"
    >
      <span
        ref={labelRef}
        className="label select-none text-[0.5625rem] text-charcoal opacity-0"
      >
        {LABELS[mode]}
      </span>
    </div>
  );
}
