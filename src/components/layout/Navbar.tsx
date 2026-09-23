"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { PRIMARY_NAV, SITE } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { Magnetic } from "@/components/ui/MagneticButton";
import { useIntro } from "./IntroProvider";
import { useNavTheme } from "./NavTheme";
import { FullscreenMenu } from "./FullscreenMenu";
import { SearchOverlay } from "./SearchOverlay";

export function Navbar() {
  const { ready } = useIntro();
  const { theme } = useNavTheme();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Entrance: the bar drops in once the preloader has cleared.
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || !ready) return;

    if (prefersReducedMotion()) {
      gsap.set(nav, { opacity: 1, y: 0 });
      return;
    }

    // Deliberately `opacity` rather than `autoAlpha`: autoAlpha parks the bar
    // at `visibility: hidden`, which would make the whole navigation
    // unfocusable and unclickable if the tween were ever interrupted. A stuck
    // opacity is recoverable; a stuck visibility is not.
    const tween = gsap.fromTo(
      nav,
      { opacity: 0, y: -28 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.15 },
    );

    return () => {
      tween.kill();
    };
  }, [ready]);

  // Hide on scroll down, reveal on scroll up, frost once past the fold.
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const reduced = prefersReducedMotion();
    let hidden = false;

    const show = () => {
      if (!hidden) return;
      hidden = false;
      gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power3.out" });
    };

    const hide = () => {
      if (hidden) return;
      hidden = true;
      gsap.to(nav, { yPercent: -110, duration: 0.45, ease: "power3.inOut" });
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setScrolled(self.scroll() > 40);
        if (reduced || menuOpen || searchOpen) {
          show();
          return;
        }
        if (self.scroll() < 120) {
          show();
          return;
        }
        if (self.direction === 1) hide();
        else show();
      },
    });

    return () => trigger.kill();
  }, [menuOpen, searchOpen]);

  // Over a dark hero the bar has no background of its own, so the type has to
  // invert. Once the frosted bar appears (or the menu opens) it goes back.
  const onDark = (theme === "dark" && !scrolled) || menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[140] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-charcoal focus:px-5 focus:py-3 focus:text-porcelain"
      >
        Skip to content
      </a>

      <header
        ref={navRef}
        data-js-hidden
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled && !menuOpen
            ? "border-b border-umber/10 bg-porcelain/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex items-center justify-between gap-6 py-5"
        >
          <Magnetic strength={0.18}>
            <TransitionLink
              href="/"
              aria-label={`${SITE.name} — home`}
              className={cn(
                "display-sm inline-block leading-none tracking-[0.1em] transition-colors duration-500",
                onDark ? "text-porcelain" : "text-charcoal",
              )}
            >
              {SITE.name.toUpperCase()}
            </TransitionLink>
          </Magnetic>

          <ul className="hidden items-center gap-8 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Magnetic strength={0.3}>
                    <TransitionLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group label relative inline-block py-1 transition-colors duration-500",
                        onDark ? "text-porcelain/80 hover:text-porcelain" : "text-charcoal",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-right bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </TransitionLink>
                  </Magnetic>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 sm:gap-5">
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the site"
                className={cn(
                  "group flex items-center gap-2 py-1 transition-colors duration-500",
                  onDark ? "text-porcelain" : "text-charcoal",
                )}
              >
                <Search aria-hidden="true" className="size-4" />
                <span className="label hidden sm:inline">Search</span>
              </button>
            </Magnetic>

            <MenuToggle
              open={menuOpen}
              onDark={onDark}
              onToggle={() => setMenuOpen((v) => !v)}
            />
          </div>
        </nav>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MenuToggle({
  open,
  onDark,
  onToggle,
}: {
  open: boolean;
  onDark: boolean;
  onToggle: () => void;
}) {
  return (
    <Magnetic strength={0.3}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="argilla-menu"
        className={cn(
          "flex items-center gap-3 py-1 transition-colors duration-500",
          onDark ? "text-porcelain" : "text-charcoal",
        )}
      >
        <span className="label w-9 text-left">{open ? "Close" : "Menu"}</span>
        <span
          aria-hidden="true"
          className="relative flex h-3 w-6 flex-col justify-between"
        >
          <span
            className={cn(
              "block h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open && "translate-y-[5.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open && "-translate-y-[5.5px] -rotate-45",
            )}
          />
        </span>
      </button>
    </Magnetic>
  );
}
