"use client";

import { useEffect, type RefObject } from "react";
import { lockScroll, unlockScroll } from "@/components/layout/SmoothScroll";

/** Shared focus, background isolation and scroll lifecycle for site dialogs. */
export function useDialog(
  open: boolean,
  panel: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open || !panel.current) return;
    const dialog = panel.current;
    const previous = document.activeElement as HTMLElement | null;
    const background = Array.from(document.querySelectorAll<HTMLElement>(
      "main, [data-site-header], #site-footer",
    )).map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    lockScroll();
    (initialFocus?.current ?? dialog).focus({ preventScroll: true });

    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not(:disabled), input, select, textarea, [tabindex="0"]',
    )).filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== "hidden");
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) { event.preventDefault(); dialog.focus(); return; }
      if (!dialog.contains(document.activeElement) || document.activeElement === dialog ||
        (event.shiftKey && document.activeElement === first) ||
        (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      background.forEach(({ element, inert }) => { element.inert = inert; });
      unlockScroll();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [open, panel, onClose, initialFocus]);
}
