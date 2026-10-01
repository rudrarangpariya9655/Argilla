"use client";

import { SITE } from "@/lib/data/site";
import { Newsletter } from "@/components/forms/Newsletter";
import { UnderlineLink } from "@/components/ui/Primitives";

const COLUMNS = [
  { title: "Explore", links: [{ label: "Collections", href: "/collections" }, { label: "Surfaces & objects", href: "/products" }, { label: "Projects", href: "/projects" }, { label: "Journal", href: "/journal" }] },
  { title: "The house", links: [{ label: "Our story", href: "/about" }, { label: "The making", href: "/craft" }, { label: "Responsibility", href: "/sustainability" }, { label: "The concept", href: "/site-notes" }] },
  { title: "For your project", links: [{ label: "Sample brief", href: "/contact?intent=sample" }, { label: "Trade enquiry", href: "/contact?intent=trade" }, { label: "Common questions", href: "/contact#faq" }, { label: "Contact", href: "/contact" }] },
];

export function Footer() {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-ink text-porcelain">
      <div className="shell pt-(--spacing-section)">
        <div className="grid gap-16 border-b border-porcelain/20 pb-16 lg:grid-cols-[1.1fr_1.9fr]">
          <div className="flex flex-col gap-6">
            <span className="display-md">{SITE.name}</span>
            <p className="body-lg max-w-sm text-porcelain/75">A study in earth, material and spaces that endure.</p>
            <Newsletter tone="dark" />
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((column) => <nav key={column.title} aria-label={column.title}><h2 className="label mb-5 text-porcelain/65">{column.title}</h2><ul>{column.links.map((link) => <li key={link.label}><UnderlineLink href={link.href} className="body-sm text-porcelain/85 hover:text-clay">{link.label}</UnderlineLink></li>)}</ul></nav>)}
          </div>
        </div>
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
          <p className="caption max-w-xl text-porcelain/70">Independent portfolio concept. ARGILLA is a fictional brand; imagery, project credits, prices and specifications are illustrative. No purchases, sample deliveries or email subscriptions are processed.</p>
          <a href="/catalogue/all" download className="label flex min-h-11 shrink-0 items-center border-b border-porcelain/40 text-porcelain/85 transition-colors hover:text-clay">Download demo catalogue · TXT ↗</a>
        </div>
        <div aria-hidden="true" className="flex justify-between overflow-hidden pb-8 pt-8 font-display text-[clamp(3.5rem,13.6vw,15rem)] leading-[0.9] text-porcelain/90">{SITE.name.toUpperCase().split("").map((letter, i) => <span key={i}>{letter}</span>)}</div>
        <div className="flex flex-col gap-5 border-t border-porcelain/20 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption text-porcelain/70">© {new Date().getFullYear()} ARGILLA — a design concept.</p>
          <nav aria-label="Site policies" className="flex flex-wrap gap-x-6">
            {["Privacy", "Terms", "Cookies"].map((item) => <UnderlineLink key={item} href={`/site-notes#${item.toLowerCase()}`} className="label text-porcelain/75 hover:text-porcelain">{item}</UnderlineLink>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}
