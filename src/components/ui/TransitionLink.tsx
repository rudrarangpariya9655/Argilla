"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

type Props = ComponentProps<typeof Link> & { href: string };

/**
 * `next/link` with the brand's cover transition. Keeps real anchor semantics —
 * middle-click, modifier-click and "open in new tab" all behave normally, and
 * prefetching still happens on hover.
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
      event.button !== 0
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

  return <Link href={href} onClick={handleClick} {...props} />;
}
