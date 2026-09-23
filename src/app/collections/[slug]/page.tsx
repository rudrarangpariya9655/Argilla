import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS, collectionBySlug } from "@/lib/data/collections";
import { productsByCollection } from "@/lib/data/products";
import { PROJECTS } from "@/lib/data/projects";
import { src } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/cards/ProductCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { CallToAction } from "@/components/home/CallToAction";

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collections/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const collection = collectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };

  return {
    title: `${collection.name} collection`,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} — Argilla`,
      description: collection.description,
      url: `/collections/${collection.slug}`,
      images: [{ url: src(collection.hero, 1200), alt: collection.hero.alt }],
    },
  };
}

export default async function CollectionPage(
  props: PageProps<"/collections/[slug]">,
) {
  const { slug } = await props.params;
  const collection = collectionBySlug(slug);
  if (!collection) notFound();

  const products = productsByCollection(collection.slug);
  const related = PROJECTS.filter((p) =>
    p.collections.includes(collection.slug),
  ).slice(0, 2);
  const others = COLLECTIONS.filter((c) => c.slug !== collection.slug).slice(
    0,
    3,
  );

  return (
    <>
      <PageHero
        eyebrow={`Collection / ${collection.year}`}
        title={[collection.name]}
        lead={collection.strapline}
        image={collection.hero}
        height="full"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
        meta={[
          { label: "Surfaces", value: String(collection.productCount) },
          { label: "Finishes", value: collection.finishes.join(", ") },
          { label: "Introduced", value: String(collection.year) },
        ]}
      />

      {/* Story + specification. */}
      <section className="section-y bg-porcelain" aria-label="About this collection">
        <div className="shell">
          <Reveal className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              <Eyebrow index="01">The idea</Eyebrow>
              {collection.story.map((paragraph, i) => (
                <p
                  key={i}
                  data-anim="fade-up"
                  className={
                    i === 0
                      ? "body-lg max-w-xl text-charcoal"
                      : "body-base max-w-xl text-umber"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="flex flex-col gap-8">
              {[
                { label: "Palette", values: collection.palette },
                { label: "Finishes", values: collection.finishes },
                { label: "Formats (mm)", values: collection.formats },
              ].map((group) => (
                <div
                  key={group.label}
                  data-anim="fade-up"
                  className="flex flex-col gap-3 border-t border-umber/15 pt-5"
                >
                  <dt className="label text-umber/50">{group.label}</dt>
                  <dd className="flex flex-wrap gap-x-6 gap-y-2">
                    {group.values.map((value) => (
                      <span key={value} className="body-base text-charcoal">
                        {value}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Gallery: deliberately uneven. */}
      <section className="bg-ivory py-(--spacing-section)" aria-label="Collection gallery">
        <div className="shell">
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6" stagger={0.1}>
            <div className="col-span-12 sm:col-span-7">
              <RevealImage
                image={collection.gallery[0]}
                sizes="(max-width: 640px) 92vw, 56vw"
                className="aspect-[4/3] w-full"
                parallax={10}
              />
            </div>
            <div className="col-span-12 sm:col-span-4 sm:col-start-9 sm:mt-[10vh]">
              <RevealImage
                image={collection.gallery[1]}
                sizes="(max-width: 640px) 92vw, 32vw"
                className="aspect-[3/4] w-full"
                parallax={-14}
              />
            </div>
            <div className="col-span-12 sm:col-span-5 sm:col-start-2">
              <RevealImage
                image={collection.gallery[2]}
                sizes="(max-width: 640px) 92vw, 40vw"
                className="aspect-square w-full"
                parallax={12}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 sm:col-start-7 sm:mt-[6vh]">
              <RevealImage
                image={collection.gallery[3]}
                sizes="(max-width: 640px) 92vw, 48vw"
                className="aspect-[5/4] w-full"
                parallax={-8}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Surfaces in this collection. */}
      <section className="section-y bg-porcelain" aria-labelledby="collection-products">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2
                id="collection-products"
                data-anim="fade-up"
                className="display-md text-charcoal"
              >
                In this collection
              </h2>
              <p data-anim="fade" className="label text-umber/50">
                {products.length} of {collection.productCount} shown
              </p>
            </div>
            <Rule />
          </Reveal>

          {products.length ? (
            <Reveal
              className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.1}
            >
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} compact />
              ))}
            </Reveal>
          ) : (
            <p className="body-base mt-10 text-umber">
              Surfaces from this collection are shown on request. Contact the
              studio for the current range.
            </p>
          )}

          <Reveal className="mt-16 flex">
            <div data-anim="fade-up">
              <MagneticButton href="/products">All surfaces</MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where it has been used. */}
      {related.length ? (
        <section className="section-y bg-sand" aria-labelledby="collection-projects">
          <div className="shell">
            <Reveal className="flex flex-col gap-8">
              <Eyebrow index="03">Specified in</Eyebrow>
              <h2
                id="collection-projects"
                data-anim="fade-up"
                className="display-md max-w-xl text-charcoal"
              >
                Buildings using {collection.name}
              </h2>
            </Reveal>

            <Reveal
              className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-2"
              stagger={0.12}
            >
              {related.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  className={i === 1 ? "lg:mt-[10vh]" : undefined}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Other collections. */}
      <section className="section-y bg-porcelain" aria-labelledby="other-collections">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <h2
              id="other-collections"
              data-anim="fade-up"
              className="display-md text-charcoal"
            >
              Also from the clay store
            </h2>
            <Rule />
          </Reveal>

          <Reveal className="mt-12 grid gap-8 sm:grid-cols-3" stagger={0.1}>
            {others.map((other) => (
              <TransitionLink
                key={other.slug}
                href={`/collections/${other.slug}`}
                data-anim="fade-up"
                className="group flex items-baseline justify-between gap-4 border-t border-umber/20 pt-5"
              >
                <span className="display-sm text-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                  {other.name}
                </span>
                <span className="label text-umber/50 tabular-nums">
                  {other.productCount}
                </span>
              </TransitionLink>
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
