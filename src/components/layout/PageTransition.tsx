"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

/** Navigate immediately. Each page owns its entrance; no cover delays a click. */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const previous = useRef(pathname);
  const navigate = useCallback((href: string) => router.push(href), [router]);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const destination = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : document.getElementById("main");
    destination?.setAttribute("tabindex", "-1");
    destination?.focus({ preventScroll: true });
    ScrollTrigger.refresh();
  }, [pathname]);
  const value = useMemo(() => ({ navigate }), [navigate]);
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}
