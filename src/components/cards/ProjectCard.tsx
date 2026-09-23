"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BLUR, src } from "@/lib/images";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

type Props = {
  project: Project;
  className?: string;
  sizes?: string;
  ratio?: "wide" | "tall" | "square";
  priority?: boolean;
};

const RATIOS = {
  wide: "aspect-[16/10]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

export function ProjectCard({
  project,
  className,
  sizes = "(max-width: 1024px) 92vw, 46vw",
  ratio = "wide",
  priority = false,
}: Props) {
  return (
    <article data-anim="fade-up" className={cn("group", className)}>
      <TransitionLink
        href={`/projects/${project.slug}`}
        data-cursor="view"
        className="block"
      >
        <div className={cn("relative overflow-hidden bg-sand", RATIOS[ratio])}>
          <Image
            src={src(project.cover, 1600)}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            quality={80}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          />
          <span className="label absolute bottom-5 left-5 text-porcelain/85">
            {project.category}
          </span>
        </div>

        <div className="flex items-start justify-between gap-6 pt-5">
          <div className="flex flex-col gap-2">
            <h3 className="display-sm text-charcoal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
              {project.name}
            </h3>
            <p className="body-sm text-umber/85">
              {project.location} &middot; {project.architect}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span className="label text-umber/50 tabular-nums">
              {project.year}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </div>
        </div>
      </TransitionLink>
    </article>
  );
}
