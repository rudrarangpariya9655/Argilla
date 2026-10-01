"use client";

import Image from "@/components/ui/MaterialImage";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { BLUR, src } from "@/lib/images";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Props = {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Suppresses the extra spec rows in tighter grids. */
  compact?: boolean;
};

export function ProductCard({
  product,
  className,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw",
  priority = false,
  compact = false,
}: Props) {
  const [exploring, setExploring] = useState(false);
  return (
    <article data-anim="rise" className={cn("group", className)}>
      <TransitionLink
        href={`/products/${product.slug}`}
        data-cursor="view"
        className="block"
        onPointerEnter={() => setExploring(true)}
        onFocus={() => setExploring(true)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={src(product.cover, 1200)}
            alt={product.cover.alt}
            fill
            sizes={sizes}
            quality={80}
            fetchPriority={priority ? "high" : undefined}
            placeholder="blur"
            blurDataURL={BLUR}
            className="card-primary object-cover transition-transform duration-[480ms]"
          />
          {/* Alternate frame revealed on hover. */}
          {exploring && <Image
            src={src(product.alt, 1200)}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            quality={80}
            loading="lazy"
            className="card-alternate scale-[1.045] object-cover opacity-0 transition-[opacity,transform] duration-[480ms]"
          />}

          {/* Detail strip slides up from the base of the frame on hover. It is
              hidden entirely where there is no hover, because a strip that can
              never be summoned is just an obstruction — touch devices get the
              same two facts as plain text under the title instead. */}
          <div className="card-spec pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-porcelain/95 px-5 py-4 transition-transform duration-[250ms] group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:hidden">
            <dl className="flex flex-wrap gap-x-8 gap-y-2">
              <div className="flex flex-col gap-0.5">
                <dt className="label text-umber/85">Finish</dt>
                <dd className="body-sm text-charcoal">{product.finish}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="label text-umber/85">Format</dt>
                <dd className="body-sm text-charcoal">{product.dimensions}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 pt-5">
          <div className="flex min-w-0 flex-[1_1_9rem] flex-col gap-1.5">
            <h3 className="display-sm text-charcoal transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
              {product.name}
            </h3>
            <p className="label text-umber/85">{product.collection}</p>
            {!compact ? (
              <p className="body-sm mt-1 max-w-xs text-umber/85">
                {product.tagline}
              </p>
            ) : null}
            {/* Touch-only counterpart to the hover strip. */}
            <dl className="mt-1 hidden flex-wrap gap-x-5 gap-y-1 [@media(hover:none)]:flex">
              <div className="flex gap-1.5">
                <dt className="label text-umber/85">Finish</dt>
                <dd className="label text-umber/80">{product.finish}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="label text-umber/85">Format</dt>
                <dd className="label text-umber/80">{product.dimensions}</dd>
              </div>
            </dl>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span className="body-sm text-umber">
              {product.price}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-charcoal transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
