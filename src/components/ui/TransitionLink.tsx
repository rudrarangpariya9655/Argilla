"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

type Props = ComponentProps<typeof Link> & { href: string };

/**
 * `next/link` with immediate navigation and native modified-click behavior.
 */
export function TransitionLink({ href, onClick, ...props }: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    // Let the browser handle anything that is not a plain left click.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      (event.currentTarget.target && event.currentTarget.target !== "_self") ||
      event.currentTarget.hasAttribute("download") ||
      (!href.startsWith("/") && !href.startsWith("#"))
    ) {
      return;
    }

    const target = href.split("#")[0].split("?")[0];
    if (target === pathname) {
      // Same page: don't run a transition, just let the hash (if any) work.
      return;
    }

    event.preventDefault();
    navigate(href);
  };

  // Let native fragment links reach the shared scrolling/focus handler.
  if (href.includes("#") && (href.startsWith("#") || href.split("#")[0] === pathname)) {
    const anchorProps = { ...props };
    delete anchorProps.as;
    delete anchorProps.prefetch;
    delete anchorProps.replace;
    delete anchorProps.scroll;
    delete anchorProps.onNavigate;
    return <a href={href} onClick={onClick} {...anchorProps} />;
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
