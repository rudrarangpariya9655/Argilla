"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { FINE_POINTER } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./TransitionLink";

/**
 * Attaches a magnetic pull to any element. The wrapper moves toward the pointer
 * and the inner label trails it slightly, which is what makes it feel physical
 * rather than merely animated.
 */
function useMagnetic(
  wrapRef: React.RefObject<HTMLElement | null>,
  innerRef: React.RefObject<HTMLElement | null>,
  strength = 0.34,
) {
  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const ixTo = gsap.quickTo(inner, "x", { duration: 0.75, ease: "elastic.out(1, 0.4)" });
    const iyTo = gsap.quickTo(inner, "y", { duration: 0.75, ease: "elastic.out(1, 0.4)" });

    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.4);
      iyTo(dy * strength * 0.4);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      ixTo(0);
      iyTo(0);
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf([wrap, inner]);
    };
  }, [strength, wrapRef, innerRef]);
}

type Variant = "solid" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  solid: "border-charcoal text-porcelain",
  outline: "border-charcoal/30 text-charcoal hover:border-charcoal",
  ghost: "border-transparent text-charcoal",
};

const FILLS: Record<Variant, string> = {
  solid: "bg-terracotta",
  outline: "bg-charcoal",
  ghost: "bg-charcoal/5",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Renders the animated arrow after the label. */
  arrow?: boolean;
  strength?: number;
};

/**
 * The brand button: magnetic on hover, with a fill that wipes up from the base
 * and an arrow that steps forward. Renders as a link or a button as needed.
 */
export function MagneticButton({
  children,
  variant = "outline",
  className,
  arrow = true,
  strength,
  ...rest
}: BaseProps &
  (
    | ({ href: string } & Omit<React.ComponentProps<typeof TransitionLink>, "href" | "children">)
    | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "children">)
  )) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  useMagnetic(wrapRef, innerRef, strength);

  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100",
          FILLS[variant],
          variant === "solid" && "scale-y-100 group-hover:scale-y-0",
        )}
      />
      <span
        ref={innerRef}
        className={cn(
          "relative z-10 flex items-center gap-3 transition-colors duration-400",
          variant !== "solid" &&
            "group-hover:text-porcelain group-focus-visible:text-porcelain",
          variant === "solid" && "group-hover:text-charcoal",
        )}
      >
        <span className="label">{children}</span>
        {arrow ? (
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
          />
        ) : null}
      </span>
    </>
  );

  const shared = cn(
    "group relative inline-flex items-center overflow-hidden border px-7 py-4 will-change-transform",
    VARIANTS[variant],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as { href: string };
    return (
      <div ref={wrapRef} className="inline-block will-change-transform">
        <TransitionLink href={href} className={shared} {...linkRest}>
          {content}
        </TransitionLink>
      </div>
    );
  }

  const buttonRest = rest as React.ComponentProps<"button">;
  return (
    <div ref={wrapRef} className="inline-block will-change-transform">
      <button type="button" className={shared} {...buttonRest}>
        {content}
      </button>
    </div>
  );
}

/** A lighter magnetic treatment for nav items and icon buttons. */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  useMagnetic(wrapRef, innerRef, strength);

  return (
    <div ref={wrapRef} className={cn("inline-block will-change-transform", className)}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </div>
  );
}
