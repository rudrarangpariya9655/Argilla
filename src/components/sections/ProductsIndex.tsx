"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/data/products";
import { COLLECTIONS } from "@/lib/data/collections";
import { ProductCard } from "@/components/cards/ProductCard";
import { Reveal } from "@/components/ui/Primitives";
import { FilterBar } from "./FilterBar";

const ALL = "All";

export function ProductsIndex() {
  const [active, setActive] = useState(ALL);

  const options = useMemo(
    () => [ALL, ...COLLECTIONS.map((c) => c.name)],
    [],
  );

  const visible = useMemo(() => {
    if (active === ALL) return PRODUCTS;
    const slug = COLLECTIONS.find((c) => c.name === active)?.slug;
    return PRODUCTS.filter((p) => p.collection === slug);
  }, [active]);

  return (
    <div className="flex flex-col gap-14">
      <FilterBar
        label="Filter surfaces by collection"
        options={options}
        active={active}
        onChange={setActive}
        count={visible.length}
      />

      {visible.length ? (
        /* Keyed on the filter so the reveal timeline is rebuilt for the new
           set — otherwise incoming cards would stay in their hidden state. */
        <Reveal
          key={active}
          className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          start="top 92%"
        >
          {visible.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={i < 3}
              // Every third card drops, breaking the grid's baseline.
              className={i % 3 === 1 ? "lg:mt-[8vh]" : undefined}
            />
          ))}
        </Reveal>
      ) : (
        <p className="body-base text-umber">
          No surfaces in this collection yet. Contact the studio for the current
          range.
        </p>
      )}
    </div>
  );
}
