"use client";

import { useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { COLLECTIONS } from "@/lib/data/collections";
import { PRODUCTS } from "@/lib/data/products";
import { PROJECTS } from "@/lib/data/projects";
import { ARTICLES } from "@/lib/data/journal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { cn } from "@/lib/utils";

const INDEX = [
  ...COLLECTIONS.map((c) => ({ title: c.name, kind: "Collection", href: `/collections/${c.slug}`, keywords: `${c.name} ${c.description} ${c.finishes.join(" ")} ${c.palette.join(" ")} ${c.formats.join(" ")}` })),
  ...PRODUCTS.map((p) => ({ title: p.name, kind: "Product", href: `/products/${p.slug}`, keywords: `${p.name} ${p.collection} ${p.material} ${p.finishes.join(" ")} ${p.dimensions} ${p.applications.join(" ")}` })),
  ...PROJECTS.map((p) => ({ title: p.name, kind: "Project", href: `/projects/${p.slug}`, keywords: `${p.name} ${p.location} ${p.architect} ${p.category} ${p.collections.join(" ")}` })),
  ...ARTICLES.map((a) => ({ title: a.title, kind: "Journal", href: `/journal/${a.slug}`, keywords: `${a.title} ${a.category} ${a.excerpt}` })),
  { title: "The craft of ceramic", kind: "Studio", href: "/craft", keywords: "craft kiln firing making process" },
  { title: "About the concept", kind: "Studio", href: "/about", keywords: "about story studio concept" },
  { title: "Talk to the studio", kind: "Enquiry", href: "/contact", keywords: "contact sample trade enquiry" },
];
const SUGGESTIONS = ["Terracotta", "Large format", "Matte", "Bathroom", "Kiln"];
const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) { setWasOpen(open); if (!open) setQuery(""); }
  useDialog(open, panel, onClose, input);
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = terms.length ? INDEX.filter((entry) => terms.every((term) => normalize(entry.keywords).includes(term))) : [];

  return (
    <div id="argilla-search-dialog" inert={!open} aria-hidden={!open}
      className={cn("fixed inset-0 z-[108] transition-opacity duration-250", open ? "visible opacity-100" : "invisible opacity-0")}>
      <button type="button" tabIndex={-1} aria-label="Close search" onClick={onClose} className="absolute inset-0 h-full w-full bg-ink/65" />
      <div ref={panel} role="dialog" aria-modal="true" aria-label="Search" tabIndex={-1} data-lenis-prevent className="relative max-h-svh overflow-y-auto overscroll-contain bg-porcelain outline-none">
        <div className="shell py-8 sm:py-10">
          <div className="flex items-center gap-3 border-b border-umber/25 pb-4 sm:gap-4">
            <Search aria-hidden="true" className="size-5 shrink-0 text-umber" />
            <label htmlFor="argilla-search" className="sr-only">Search collections, products, projects and journal</label>
            <input ref={input} id="argilla-search" type="search" value={query} maxLength={160} onChange={(e) => setQuery(e.target.value)} placeholder="Search the catalogue" autoComplete="off" className="display-sm min-w-0 flex-1 bg-transparent text-charcoal placeholder:text-umber/85" />
            <button type="button" onClick={onClose} className="label flex size-11 shrink-0 items-center justify-center text-umber" aria-label="Close search"><X aria-hidden="true" className="size-5" /></button>
          </div>
          <div className="mt-6 min-h-32">
            {!terms.length ? <div className="flex flex-wrap items-center gap-3"><span className="label text-umber">Try</span>{SUGGESTIONS.map((s) => <button key={s} type="button" onClick={() => setQuery(s)} className="label min-h-11 border border-umber/25 px-4 py-3 text-umber transition-colors duration-200 hover:border-charcoal hover:text-charcoal">{s}</button>)}</div> : <>
              <p role="status" className="label mb-3 text-umber">{results.length} {results.length === 1 ? "match" : "matches"}{results.length > 12 ? " · first 12 shown" : ""}</p>
              {results.length ? <ul>{results.slice(0, 12).map((entry) => <li key={entry.href}><TransitionLink href={entry.href} onClick={onClose} className="group flex items-center justify-between gap-4 border-b border-umber/15 py-4 hover:text-terracotta"><span className="display-sm">{entry.title}</span><span className="flex shrink-0 items-center gap-3"><span className="label text-umber">{entry.kind}</span><ArrowUpRight aria-hidden="true" className="size-4" /></span></TransitionLink></li>)}</ul> : <p className="body-base max-w-lg text-umber">No matches for “{query}”. Try a material, a finish or a city.</p>}
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}
