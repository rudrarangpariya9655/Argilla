import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { TextureSelector } from "@/components/home/TextureSelector";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Argilla ceramic surfaces and objects: full-body porcelain, large-format slabs, extruded terracotta and hand-thrown stoneware, with full technical data.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — Argilla",
    description:
      "Ceramic surfaces and objects with full technical data, samples on request.",
    url: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title={["Surfaces", "and objects"]}
        lead="Pressed, extruded and thrown. Every reference below ships with technical data and a sample on request."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        meta={[
          { label: "References", value: "13 shown" },
          { label: "Collections", value: "06" },
          { label: "Lead time", value: "3 to 6 weeks" },
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
