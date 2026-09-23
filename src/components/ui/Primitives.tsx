"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, ENTER, EASE, DURATION } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { TransitionLink } from "./TransitionLink";

/**
 * The site's scroll-reveal system.
 *
 * A region is wrapped in `<Reveal>` and its descendants opt in with
 * `data-anim="..."`. One paused timeline is built per region and played by a
 * single ScrollTrigger, so a page with a hundred animated elements still has
 * only a handful of triggers. Every variant draws its duration and easing from
 * the shared tokens in `lib/gsap`, which is what keeps the whole site feeling
 * like one piece of motion design rather than a pile of separate effects.
 *
 * Variants:
 *   fade-up    rise and fade in (default)
 *   fade       opacity only
 *   mask       clip-path wipe upward, for imagery
 *   mask-left  clip-path wipe from the left, for wide plates and rules
 *   line       horizontal rule drawing itself
 *   rise       fade-up with a slight settle, for cards and framed media
 *
 * Any element may also carry `data-anim-delay="0.2"` to hold its own start.
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
        defaults: { duration: DURATION.base, ease: EASE.out },
      });

      targets.forEach((target, i) => {
        const kind = target.dataset.anim;
        const own = Number(target.dataset.animDelay ?? NaN);
        const at = Number.isFinite(own) ? own : i * stagger;

        switch (kind) {
          case "mask":
            tl.to(
              target,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: DURATION.reveal,
                ease: EASE.expo,
              },
              at,
            );
            break;
          case "mask-left":
            tl.to(
              target,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: DURATION.reveal,
                ease: EASE.expo,
              },
              at,
            );
            break;
          case "line":
            tl.to(
              target,
              { scaleX: 1, duration: DURATION.slow, ease: "power2.inOut" },
              at,
            );
            break;
          case "fade":
            tl.to(target, { autoAlpha: 1 }, at);
            break;
          case "rise":
            tl.to(
              target,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: DURATION.slow,
                ease: EASE.expo,
              },
              at,
            );
            break;
          default:
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

  // `py-2` is deliberate: an underline link is a line of small type, which
  // without padding gives a 13px tap target. The padding provides the vertical
  // rhythm in the lists these appear in, so no gap is lost.
  const cls = cn("group inline-flex items-center gap-1.5 py-2", className);

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
