"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, ENTER } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./TransitionLink";

/**
 * Wraps a region and reveals every `[data-anim]` descendant as it enters view.
 * Sections opt in by adding the attribute rather than each one wiring its own
 * ScrollTrigger, which keeps trigger count low and behaviour consistent.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  start = ENTER,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-anim]");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: "power3.out" },
      });

      targets.forEach((target, i) => {
        const kind = target.dataset.anim;
        const at = i * stagger;

        if (kind === "mask") {
          tl.to(target, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, at);
        } else if (kind === "line") {
          tl.to(target, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, at);
        } else if (kind === "fade") {
          tl.to(target, { autoAlpha: 1 }, at);
        } else {
          tl.to(target, { autoAlpha: 1, y: 0 }, at);
        }
      });

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => tl.play(),
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Small uppercase editorial label, optionally numbered. */
export function Eyebrow({
  children,
  index,
  className,
  tone = "muted",
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  tone?: "muted" | "light" | "accent";
}) {
  return (
    <span
      data-anim="fade"
      className={cn(
        "label flex items-center gap-3",
        tone === "muted" && "text-umber/70",
        tone === "light" && "text-porcelain/60",
        tone === "accent" && "text-terracotta",
        className,
      )}
    >
      {index ? (
        <span className="tabular-nums opacity-60">{index}</span>
      ) : (
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      )}
      {children}
    </span>
  );
}

/** Text link with an underline that wipes in from the left. */
export function UnderlineLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
        />
      </span>
      {external ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  const cls = cn("group inline-flex items-center gap-1.5", className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={cls}>
      {inner}
    </TransitionLink>
  );
}

/** Section heading block: eyebrow, display lines and optional support copy. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  tone = "dark",
  size = "display-lg",
  className,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  size?: "display-xl" | "display-lg" | "display-md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow index={index} tone={tone === "light" ? "light" : "muted"}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        data-anim="fade-up"
        className={cn(size, tone === "light" ? "text-porcelain" : "text-charcoal")}
      >
        {title}
      </h2>
      {lead ? (
        <p
          data-anim="fade-up"
          className={cn(
            "body-lg max-w-xl",
            tone === "light" ? "text-porcelain/70" : "text-umber",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Hairline rule that draws itself when scrolled into view. */
export function Rule({ className }: { className?: string }) {
  return (
    <span
      data-anim="line"
      className={cn("block h-px w-full bg-umber/20", className)}
    />
  );
}
