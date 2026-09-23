"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query as an external store. Using
 * `useSyncExternalStore` rather than an effect keeps the value correct on the
 * very first client render and avoids a cascading re-render on mount.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // Server render assumes "no match" so markup stays deterministic.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True on devices with a precise pointer — gates cursor and hover-only flourishes. */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
