import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { TextureSelector } from "@/components/home/TextureSelector";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore thirteen illustrative ARGILLA references: full-body porcelain, large-format slabs, terracotta and hand-thrown stoneware.",
  alternates: { canonical: "/products" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ARGILLA — shaped by earth" }],
    title: "Products — Argilla",
    description:
      "An illustrative catalogue of ceramic surfaces and objects, with material reference downloads.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={["Surfaces", "and objects"]}
        lead="Pressed, extruded and thrown. Explore thirteen material references, compare finishes and prepare a project brief."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        meta={[
          { label: "References", value: "13 shown" },
          { label: "Collections", value: "06" },
          { label: "Format", value: "A concept catalogue" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-labelledby="all-products">
        <div className="shell">
          <h2 id="all-products" className="sr-only">
            Surface and object catalogue
          </h2>
          <ProductsIndex />
        </div>
      </section>

      <TextureSelector />
      <CallToAction />
    </>
  );
}
