"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { COLLECTIONS } from "@/lib/data/collections";
import { PRODUCTS } from "@/lib/data/products";
import { PROJECTS } from "@/lib/data/projects";
import { ARTICLES } from "@/lib/data/journal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { lockScroll, unlockScroll } from "./SmoothScroll";

type Entry = {
  title: string;
  kind: string;
  href: string;
  keywords: string;
};

/** Flat client-side index over the demo catalogue. */
function buildIndex(): Entry[] {
  return [
    ...COLLECTIONS.map((c) => ({
      title: c.name,
      kind: "Collection",
      href: `/collections/${c.slug}`,
      keywords: `${c.name} ${c.strapline} ${c.finishes.join(" ")} ${c.palette.join(" ")}`,
    })),
    ...PRODUCTS.map((p) => ({
      title: p.name,
      kind: "Product",
      href: `/products/${p.slug}`,
      keywords: `${p.name} ${p.collection} ${p.material} ${p.finish} ${p.applications.join(" ")}`,
    })),
    ...PROJECTS.map((p) => ({
      title: p.name,
      kind: "Project",
      href: `/projects/${p.slug}`,
      keywords: `${p.name} ${p.location} ${p.architect} ${p.category}`,
    })),
    ...ARTICLES.map((a) => ({
      title: a.title,
      kind: "Journal",
      href: `/journal/${a.slug}`,
      keywords: `${a.title} ${a.category} ${a.excerpt}`,
    })),
  ];
}

const SUGGESTIONS = ["Terracotta", "Large format", "Matte", "Bathroom", "Kiln"];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  // Clearing the query belongs to the open/close transition, not to an effect:
  // adjusting state during render avoids an extra commit and a flash of the
  // previous results while the panel animates away.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setQuery("");
  }
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((entry) => entry.keywords.toLowerCase().includes(q))
      .slice(0, 8);
  }, [index, query]);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: open ? 1 : 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .set(root, { autoAlpha: 1 })
          .fromTo(
            "[data-search-panel]",
            { yPercent: -100 },
            { yPercent: 0, duration: 0.7, ease: "expo.out" },
          )
          .fromTo(
            "[data-search-scrim]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5 },
            0,
          );
      } else {
        gsap
          .timeline()
          .to("[data-search-panel]", {
            yPercent: -100,
            duration: 0.45,
            ease: "power3.inOut",
          })
          .to("[data-search-scrim]", { autoAlpha: 0, duration: 0.3 }, 0)
          .set(root, { autoAlpha: 0 });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    lockScroll();
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      {...(!open ? { inert: true as const } : {})}
      aria-hidden={!open}
      className="fixed inset-0 z-[108] opacity-0"
    >
      <button
        type="button"
        data-search-scrim
        tabIndex={open ? 0 : -1}
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-sm"
      />

      <div
        data-search-panel
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative bg-porcelain"
      >
        <div className="shell py-8 sm:py-10">
          <div className="flex items-center gap-4 border-b border-umber/20 pb-4">
            <Search aria-hidden="true" className="size-5 shrink-0 text-umber" />
            <label htmlFor="argilla-search" className="sr-only">
              Search collections, products, projects and journal
            </label>
            <input
              ref={inputRef}
              id="argilla-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search surfaces, projects, journal"
              autoComplete="off"
              className="display-sm w-full bg-transparent text-charcoal outline-none placeholder:text-stone/60"
            />
            <button
              type="button"
              onClick={onClose}
              className="label -m-3 flex shrink-0 items-center gap-2 p-3 text-umber transition-colors hover:text-charcoal"
            >
              <span className="hidden sm:inline">Close</span>
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>

          <div className="mt-6 min-h-[8rem]" aria-live="polite">
            {!query.trim() ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="label text-umber/60">Try</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="label border border-umber/20 px-4 py-2 text-umber transition-colors hover:border-charcoal hover:text-charcoal"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : results.length ? (
              <ul className="flex flex-col">
                {results.map((entry) => (
                  <li key={entry.href}>
                    <TransitionLink
                      href={entry.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-6 border-b border-umber/10 py-4 transition-colors hover:text-terracotta"
                    >
                      <span className="display-sm">{entry.title}</span>
                      <span className="label shrink-0 text-umber/60">
                        {entry.kind}
                      </span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="body-base text-umber">
                No matches for <span className="text-charcoal">{query}</span>.
                Try a collection, a finish or a city.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
