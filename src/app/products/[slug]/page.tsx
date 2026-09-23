import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Download, FileText } from "lucide-react";
import { PRODUCTS, productBySlug } from "@/lib/data/products";
import { collectionBySlug } from "@/lib/data/collections";
import { SITE } from "@/lib/data/site";
import { src } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductCard } from "@/components/cards/ProductCard";
import { Eyebrow, Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CallToAction } from "@/components/home/CallToAction";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — Argilla`,
      description: product.tagline,
      url: `/products/${product.slug}`,
      images: [{ url: src(product.cover, 1200), alt: product.cover.alt }],
    },
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const collection = collectionBySlug(product.collection);
  const related = product.related
    .map((s) => productBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const gallery = [product.cover, product.alt, ...product.gallery];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    material: product.material,
    brand: { "@type": "Brand", name: SITE.name },
    image: [src(product.cover, 1200)],
    // Demo catalogue: price is indicative and not a live offer.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script
        id={`product-jsonld-${product.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`${collection?.name ?? "Argilla"} / ${product.year}`}
        title={[product.name]}
        lead={product.tagline}
        image={product.cover}
        height="full"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        meta={[
          { label: "Material", value: product.material },
          { label: "Format", value: `${product.dimensions} mm` },
          { label: "Finish", value: product.finish },
        ]}
      />

      {/* Gallery + sticky specification. */}
      <section className="section-y bg-porcelain" aria-label="Product detail">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <ProductGallery images={gallery} name={product.name} />

          <div className="flex flex-col gap-10 lg:sticky lg:top-[14vh] lg:self-start">
            <div className="flex flex-col gap-5">
              <Eyebrow index="01">About</Eyebrow>
              {product.description.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "body-lg text-charcoal"
                      : "body-base text-umber"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <Rule />

            {/* Colours. */}
            <div className="flex flex-col gap-4">
              <span className="label text-umber/50">
                Available colours ({product.colours.length})
              </span>
              <ul className="flex flex-wrap gap-5">
                {product.colours.map((colour) => (
                  <li key={colour.name} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-8 rounded-full border border-umber/20"
                      style={{ backgroundColor: colour.hex }}
                    />
                    <span className="body-sm text-charcoal">{colour.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key facts. */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "Collection", value: collection?.name ?? "—" },
                { label: "Finishes", value: product.finishes.join(", ") },
                { label: "Dimensions", value: `${product.dimensions} mm` },
                { label: "Thickness", value: product.thickness },
                { label: "Applications", value: product.applications.join(", ") },
                { label: "Indicative price", value: product.price },
              ].map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1.5">
                  <dt className="label text-umber/50">{fact.label}</dt>
                  <dd className="body-sm text-charcoal">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <Rule />

            {/* Technical data. */}
            <div className="flex flex-col gap-4">
              <span className="label text-umber/50">Technical information</span>
              <dl className="flex flex-col">
                {product.spec.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-6 border-b border-umber/12 py-3"
                  >
                    <dt className="body-sm text-umber">{row.label}</dt>
                    <dd className="body-sm text-right text-charcoal">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="body-sm text-umber/60">
                Demo specification. Request the current technical datasheet for
                project documentation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                href={`/contact?intent=sample&product=${product.slug}`}
                variant="solid"
                className="border-transparent"
              >
                Request a sample
              </MagneticButton>
              <MagneticButton
                href={`/contact?intent=downloads&product=${product.slug}`}
                variant="outline"
              >
                Download catalogue
              </MagneticButton>
            </div>

            <div className="flex flex-col gap-3">
              <UnderlineLink
                href={`/contact?intent=downloads&product=${product.slug}`}
                className="body-sm flex items-center gap-2 text-umber"
              >
                <FileText aria-hidden="true" className="size-4" />
                Technical datasheet (PDF)
              </UnderlineLink>
              <UnderlineLink
                href={`/contact?intent=downloads&product=${product.slug}`}
                className="body-sm flex items-center gap-2 text-umber"
              >
                <Download aria-hidden="true" className="size-4" />
                BIM and CAD files
              </UnderlineLink>
            </div>
          </div>
        </div>
      </section>

      {/* Related. */}
      {related.length ? (
        <section className="section-y bg-ivory" aria-labelledby="related-products">
          <div className="shell">
            <Reveal className="flex flex-col gap-8">
              <h2
                id="related-products"
                data-anim="fade-up"
                className="display-md text-charcoal"
              >
                Specified alongside
              </h2>
              <Rule />
            </Reveal>

            <Reveal
              className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.1}
            >
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} compact />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <CallToAction />
    </>
  );
}
