"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToTop } from "./SmoothScroll";

type TransitionApi = {
  /** Cover the screen, then navigate. Falls back to a plain push if reduced. */
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionApi>({ navigate: () => {} });

export const usePageTransition = () => useContext(TransitionContext);

const COVER_IN = 0.52;
const COVER_OUT = 0.72;

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  /** Tracks whether the overlay is currently covering the viewport. */
  const covering = useRef(false);
  const firstRender = useRef(true);
  /** Failsafe: uncovers the screen if a navigation never lands. */
  const bailout = useRef<number | null>(null);
  const [pending, setPending] = useState(false);

  const navigate = useCallback(
    (href: string) => {
      const overlay = overlayRef.current;

      if (!overlay || prefersReducedMotion()) {
        router.push(href);
        return;
      }

      // Guard against double-firing from an impatient second click.
      if (covering.current) return;
      covering.current = true;
      setPending(true);

      // If the route never changes — a blocked navigation, an unreachable
      // segment — clear the cover rather than trapping the visitor behind it.
      if (bailout.current) window.clearTimeout(bailout.current);
      bailout.current = window.setTimeout(() => {
        if (!covering.current) return;
        covering.current = false;
        setPending(false);
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: COVER_OUT,
          ease: "power3.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }),
        });
      }, 6000);

      gsap
        .timeline()
        .set(overlay, { display: "block", clipPath: "inset(100% 0% 0% 0%)" })
        .to(overlay, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: COVER_IN,
          ease: "power3.inOut",
        })
        .fromTo(
          labelRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          "-=0.2",
        );

      // The push is scheduled independently of the timeline. Tying navigation
      // to an animation callback means a throttled or stalled ticker (a
      // backgrounded tab, a device under load) would swallow the click
      // entirely; a plain timer always fires.
      window.setTimeout(() => router.push(href), COVER_IN * 1000);
    },
    [router],
  );

  // Reveal the incoming page once the new route has rendered.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    if (bailout.current) {
      window.clearTimeout(bailout.current);
      bailout.current = null;
    }
    scrollToTop(true);
    // Fresh layout for the incoming page before triggers are measured.
    ScrollTrigger.refresh();
    setPending(false);

    // Release the lock as soon as the new route is on screen, not when the
    // uncover animation ends: the next click must never depend on a tween
    // having finished.
    const wasCovering = covering.current;
    covering.current = false;
    if (!overlay || !wasCovering) return;

    const tl = gsap.timeline({
      onComplete: () => gsap.set(overlay, { display: "none" }),
    });

    tl.to(labelRef.current, { autoAlpha: 0, duration: 0.2 }).to(
      overlay,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: COVER_OUT,
        ease: "power3.inOut",
      },
      "-=0.1",
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  useEffect(
    () => () => {
      if (bailout.current) window.clearTimeout(bailout.current);
    },
    [],
  );

  const value = useMemo<TransitionApi>(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden={!pending}
        className="pointer-events-none fixed inset-0 z-[110] hidden bg-ink"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <span
          ref={labelRef}
          className="display-md absolute bottom-(--spacing-gutter) left-(--spacing-gutter) text-porcelain opacity-0"
        >
          Argilla
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
