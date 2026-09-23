"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BLUR, src } from "@/lib/images";
import type { Collection } from "@/lib/data/collections";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Props = {
  collection: Collection;
  index: number;
  className?: string;
  /** Controls the image aspect so a row can be deliberately uneven. */
  ratio?: "tall" | "wide" | "square";
  sizes?: string;
  priority?: boolean;
};

const RATIOS = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function CollectionCard({
  collection,
  index,
  className,
  ratio = "tall",
  sizes = "(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 34vw",
  priority = false,
}: Props) {
  return (
    <article data-anim="fade-up" className={cn("group", className)}>
      <TransitionLink
        href={`/collections/${collection.slug}`}
        data-cursor="view"
        className="block"
        aria-label={`${collection.name} collection — ${collection.productCount} surfaces`}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-sand",
            RATIOS[ratio],
          )}
        >
          <Image
            src={src(collection.cover, 1400)}
            alt={collection.cover.alt}
            fill
            sizes={sizes}
            quality={80}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          {/* Mask sweeps across on hover. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ink/25 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
          />
          <span className="label absolute left-5 top-5 text-porcelain/80 mix-blend-difference tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-start justify-between gap-6 pt-5">
          <div className="flex flex-col gap-2">
            <h3 className="display-sm text-charcoal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
              {collection.name}
            </h3>
            <p className="body-sm max-w-xs text-umber/85">
              {collection.strapline}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span className="label text-umber/55 tabular-nums">
              {collection.productCount} surfaces
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
