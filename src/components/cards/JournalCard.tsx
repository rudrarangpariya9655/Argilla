"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BLUR, src } from "@/lib/images";
import type { Article } from "@/lib/data/journal";
import { cn, formatDate } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Props = {
  article: Article;
  className?: string;
  sizes?: string;
  /** Lead treatment: larger type and a wider frame. */
  featured?: boolean;
};

export function JournalCard({
  article,
  className,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw",
  featured = false,
}: Props) {
  return (
    <article data-anim="fade-up" className={cn("group", className)}>
      <TransitionLink
        href={`/journal/${article.slug}`}
        data-cursor="view"
        className="flex h-full flex-col"
      >
        <div
          className={cn(
            "relative overflow-hidden bg-sand",
            featured ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={src(article.cover, featured ? 1600 : 1000)}
            alt={article.cover.alt}
            fill
            sizes={sizes}
            quality={80}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          {/* Category chip rises into place on hover. */}
          <span className="label absolute left-4 top-4 bg-porcelain/90 px-3 py-2 text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
            {article.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 pt-5">
          <div className="flex items-center gap-3">
            <time dateTime={article.date} className="label text-umber/50">
              {formatDate(article.date)}
            </time>
            <span aria-hidden="true" className="h-px w-5 bg-umber/25" />
            <span className="label text-umber/50">{article.readTime}</span>
          </div>

          <h3
            className={cn(
              "text-charcoal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
              featured ? "display-md" : "display-sm",
            )}
          >
            {article.title}
          </h3>

          <p className="body-sm max-w-md text-umber/85">{article.excerpt}</p>

          <span className="mt-auto flex items-center gap-2 pt-4 text-charcoal">
            <span className="label">Read</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}
