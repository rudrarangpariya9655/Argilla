"use client";

import Image from "@/components/ui/MaterialImage";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { PRIMARY_NAV, SECONDARY_NAV, SITE } from "@/lib/data/site";
import { BLUR, src, type Img } from "@/lib/images";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";

const MENU_IMAGES: Record<string, Img> = {
  "/collections": { id: 6805522, alt: "Ceramic vessels in neutral tones" },
  "/products": { id: 6945266, alt: "Stoneware on a concrete surface" },
  "/projects": { id: 7587747, alt: "An interior finished in ceramic surfaces" },
  "/craft": { id: 20362429, alt: "Hands shaping clay on a pottery wheel" },
  "/about": { id: 36731542, alt: "A maker in a ceramics studio" },
  "/journal": { id: 17885652, alt: "Sunlight falling across a mineral wall" },
  "/contact": { id: 29286722, alt: "Ceramics on studio shelves" },
};

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [active, setActive] = useState(MENU_IMAGES["/craft"]);
  useDialog(open, panel, onClose, close);

  return (
    <div id="argilla-menu" aria-hidden={!open} inert={!open} data-lenis-prevent
      className={cn("fixed inset-0 z-[105] overflow-y-auto overscroll-contain bg-ink text-porcelain transition-opacity duration-300", open ? "visible opacity-100" : "invisible opacity-0")}>
      <div ref={panel} role="dialog" aria-modal="true" aria-label="Site menu" tabIndex={-1}
        className="shell flex min-h-svh flex-col gap-10 py-6 outline-none sm:py-8">
        <div className="flex items-center justify-between gap-6">
          <TransitionLink href="/" onClick={onClose} className="display-sm py-2 tracking-[0.1em]" aria-label="ARGILLA — home">ARGILLA</TransitionLink>
          <button ref={close} type="button" onClick={onClose} className="label flex min-h-11 items-center gap-3 px-2" aria-label="Close menu">Close <X aria-hidden="true" className="size-5" /></button>
        </div>
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <nav aria-label="Menu">
            <ul>
              {PRIMARY_NAV.map((item, i) => {
                const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <TransitionLink href={item.href} onClick={onClose} aria-current={current ? "page" : undefined}
                      onMouseEnter={() => setActive(MENU_IMAGES[item.href])} onFocus={() => setActive(MENU_IMAGES[item.href])}
                      className="group flex min-h-12 items-baseline gap-5 py-1.5 sm:gap-8">
                      <span className="label w-6 shrink-0 text-porcelain/65 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("menu-title block transition-[color,transform] duration-250 group-hover:translate-x-2 group-hover:text-clay group-focus-visible:text-clay", current && "text-clay")}>{item.label}</span>
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <figure className="relative hidden aspect-[4/5] max-h-[65svh] w-full max-w-md justify-self-end overflow-hidden bg-charcoal lg:block">
            {open && <Image key={active.id} src={src(active, 900)} alt="" aria-hidden="true" fill sizes="420px" quality={72} placeholder="blur" blurDataURL={BLUR} className="object-cover" />}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6"><span className="caption text-porcelain/85">{active.alt}</span></figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-6 border-t border-porcelain/20 pt-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Menu support" className="flex flex-wrap gap-x-6 gap-y-1">
            {SECONDARY_NAV.map((item) => item.href.startsWith("/catalogue/") ? <a key={item.href} href={item.href} download className="label flex min-h-11 items-center text-porcelain/75 hover:text-clay">{item.label} · TXT ↗</a> : <TransitionLink key={item.href} href={item.href} onClick={onClose} className="label flex min-h-11 items-center text-porcelain/75 transition-colors hover:text-clay">{item.label}</TransitionLink>)}
          </nav>
          <p className="caption text-porcelain/65">{SITE.name} · Independent design concept</p>
        </div>
      </div>
    </div>
  );
}
