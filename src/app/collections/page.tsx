import type { Metadata } from "next";
import { COLLECTIONS } from "@/lib/data/collections";
import { PageHero } from "@/components/sections/PageHero";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { CallToAction } from "@/components/home/CallToAction";
import { Reveal, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Six bodies of ceramic work from Argilla: Earth, Stone, Terracotta, Marble, Minimal and Artisan. Full-body porcelain, extruded terracotta and hand-thrown stoneware.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Collections — Argilla",
    description:
      "Six bodies of ceramic work, from unglazed full-body porcelain to hand-thrown studio vessels.",
    url: "/collections",
  },
};

/** Alternating card ratios keep the index from settling into a plain grid. */
const RATIOS = ["tall", "wide", "square", "wide", "tall", "square"] as const;

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Index"
        title={["Collections"]}
        lead="Each collection starts from a different question about clay. Six answers, one works, one clay store."
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
        meta={[
          { label: "Collections", value: "06" },
          { label: "Surfaces", value: "70+" },
          { label: "Formats", value: "200mm to 1600 x 3200" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-labelledby="all-collections">
        <div className="shell">
          <h2 id="all-collections" className="sr-only">
            All collections
          </h2>
          <Reveal className="mb-16 flex flex-col gap-8 sm:mb-24">
            <Rule />
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <p data-anim="fade-up" className="body-lg max-w-xl text-umber">
                Collections are organised by clay body rather than by style, so
                a surface from Earth and a vessel from Artisan share the same
                oxides even though they look nothing alike.
              </p>
              <p data-anim="fade-up" className="body-sm max-w-xs text-umber/70">
                Samples of any collection are sent as 100mm squares, free to
                trade accounts.
              </p>
            </div>
          </Reveal>

          <Reveal
            className="grid gap-x-8 gap-y-20 lg:grid-cols-2"
            stagger={0.12}
          >
            {COLLECTIONS.map((collection, i) => (
              <CollectionCard
                key={collection.slug}
                collection={collection}
                index={i + 1}
                ratio={RATIOS[i % RATIOS.length]}
                priority={i < 2}
                // Every other card drops to create a staggered column.
                className={i % 2 === 1 ? "lg:mt-[12vh]" : undefined}
                sizes="(max-width: 1024px) 92vw, 46vw"
              />
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
