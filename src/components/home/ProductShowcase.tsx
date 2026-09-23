import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/cards/ProductCard";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

const FEATURED = [
  "millstone-field",
  "basalt-slab",
  "sienna-extrude",
  "bianco-vena",
  "oatmeal-vessel",
];

export function ProductShowcase() {
  const products = FEATURED.map(
    (slug) => PRODUCTS.find((p) => p.slug === slug)!,
  );

  return (
    <section className="section-y bg-porcelain" aria-labelledby="products-heading">
      <div className="shell">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <Eyebrow index="06">Surfaces</Eyebrow>
              <h2
                id="products-heading"
                data-anim="fade-up"
                className="display-lg max-w-2xl text-charcoal"
              >
                A short list of what we make most.
              </h2>
            </div>
            <p data-anim="fade-up" className="body-base max-w-sm text-umber">
              Every surface ships with technical data, a sample on request and a
              body recipe we keep in production for a decade.
            </p>
          </div>
          <Rule />
        </Reveal>

        {/* Two large leads, then a tighter trio — a rhythm, not a grid. */}
        <Reveal className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 lg:grid-cols-2" stagger={0.12}>
          <ProductCard
            product={products[0]}
            sizes="(max-width: 1024px) 92vw, 46vw"
          />
          <ProductCard
            product={products[1]}
            className="lg:mt-[12vh]"
            sizes="(max-width: 1024px) 92vw, 46vw"
          />
        </Reveal>

        <Reveal
          className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {products.slice(2).map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              compact
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            />
          ))}
        </Reveal>

        <Reveal className="mt-20 flex justify-center">
          <div data-anim="fade-up">
            <MagneticButton href="/products">All surfaces</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
