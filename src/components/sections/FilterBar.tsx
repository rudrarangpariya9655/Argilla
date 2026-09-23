"use client";

import { cn } from "@/lib/utils";

/** Shared chip row for the product and project indexes. */
export function FilterBar({
  label,
  options,
  active,
  onChange,
  count,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
  count: number;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div
        role="group"
        aria-label={label}
        className="flex flex-wrap items-center gap-2 sm:gap-3"
      >
        {options.map((option) => {
          const selected = active === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                "label border px-4 py-2.5 transition-colors duration-500",
                selected
                  ? "border-charcoal bg-charcoal text-porcelain"
                  : "border-umber/25 text-umber hover:border-charcoal hover:text-charcoal",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="label text-umber/50 tabular-nums">
        {count} {count === 1 ? "result" : "results"}
      </p>
    </div>
  );
}
