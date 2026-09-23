"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { SITE } from "@/lib/data/site";
import { Newsletter } from "@/components/forms/Newsletter";
import { UnderlineLink } from "@/components/ui/Primitives";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Collections", href: "/collections" },
      { label: "Products", href: "/products" },
      { label: "Projects", href: "/projects" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Craft", href: "/craft" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Downloads", href: "/contact?intent=downloads" },
      { label: "Samples", href: "/contact?intent=sample" },
      { label: "FAQs", href: "/contact?intent=faq" },
      { label: "Trade", href: "/contact?intent=trade" },
    ],
  },
];

export function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // The giant wordmark rises and settles as the footer comes into view.
  useIsomorphicLayoutEffect(() => {
    const el = wordmarkRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll<HTMLElement>("[data-mark-letter]");
      gsap.fromTo(
        letters,
        { yPercent: 62, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );

      // A slow horizontal drift keeps the mark alive without being noisy.
      gsap.fromTo(
        el,
        { xPercent: -1.5 },
        {
          xPercent: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, wordmarkRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-ink text-porcelain">
      <div className="shell pt-(--spacing-section)">
        <div className="grid gap-14 border-b border-porcelain/12 pb-16 lg:grid-cols-[1.2fr_1.8fr]">
          <div className="flex flex-col gap-6">
            <span className="display-md">{SITE.name}</span>
            <p className="body-lg max-w-sm text-porcelain/60">
              Architectural ceramic surfaces and hand-thrown vessels, made in
              one works since {SITE.founded}.
            </p>
            <Newsletter tone="dark" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="label mb-6 text-porcelain/40">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <UnderlineLink
                        href={link.href}
                        className="body-base text-porcelain/80 transition-colors hover:text-porcelain"
                      >
                        {link.label}
                      </UnderlineLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="label text-porcelain/40">Studio</span>
            <p className="body-sm text-porcelain/70">{SITE.contact.studio}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="label text-porcelain/40">Showroom</span>
            <p className="body-sm text-porcelain/70">{SITE.contact.showroom}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="label text-porcelain/40">Enquiries</span>
            <UnderlineLink
              href={`mailto:${SITE.contact.email}`}
              external
              className="body-sm text-porcelain/70 hover:text-porcelain"
            >
              {SITE.contact.email}
            </UnderlineLink>
            <span className="body-sm text-porcelain/70">{SITE.contact.phone}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="label text-porcelain/40">Follow</span>
            <ul className="flex flex-col gap-2">
              {SITE.social.map((social) => (
                <li key={social.label}>
                  <UnderlineLink
                    href={social.href}
                    external
                    className="body-sm text-porcelain/70 hover:text-porcelain"
                  >
                    {social.label}
                  </UnderlineLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={wordmarkRef}
        aria-hidden="true"
        className="flex w-full justify-between overflow-hidden px-[2vw] pb-[2vh] pt-4 leading-[0.78]"
      >
        {SITE.name.toUpperCase().split("").map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            data-mark-letter
            className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,13.6vw,15rem)] text-porcelain/90"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="shell flex flex-col gap-3 border-t border-porcelain/12 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-porcelain/35">
          &copy; {new Date().getFullYear()} {SITE.legalName}. Demo site — all
          content is placeholder.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <UnderlineLink href="/contact" className="label text-porcelain/35 hover:text-porcelain/70">
            Privacy
          </UnderlineLink>
          <UnderlineLink href="/contact" className="label text-porcelain/35 hover:text-porcelain/70">
            Terms
          </UnderlineLink>
          <UnderlineLink href="/contact" className="label text-porcelain/35 hover:text-porcelain/70">
            Cookies
          </UnderlineLink>
        </div>
      </div>
    </footer>
  );
}
