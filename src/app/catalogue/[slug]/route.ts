import { PRODUCTS, productBySlug } from "@/lib/data/products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: "all" }, ...PRODUCTS.map(({ slug }) => ({ slug }))];
}

/** Downloadable reference sheets, explicitly unsuitable for real specification. */
export async function GET(_request: Request, context: RouteContext<"/catalogue/[slug]">) {
  const { slug } = await context.params;
  const product = productBySlug(slug);
  if (slug !== "all" && !product) {
    return new Response("This catalogue reference does not exist.", { status: 404 });
  }
  const products = product ? [product] : PRODUCTS;
  const text = [
    "ARGILLA / CONCEPT CATALOGUE",
    "Independent portfolio demonstration. All specifications and prices are illustrative.",
    "Not a certified technical datasheet. Do not use for procurement, installation or safety decisions.",
    "",
    ...products.map((p) => [
      p.name.toUpperCase(),
      `Collection: ${p.collection}`,
      `Material: ${p.material}`,
      `Dimensions: ${p.dimensions}`,
      `Thickness: ${p.thickness}`,
      `Finishes: ${p.finishes.join(", ")}`,
      `Palette: ${p.colours.map((c) => c.name).join(", ")}`,
      `Applications: ${p.applications.join(", ")}`,
      `Illustrative price: ${p.price}`,
      ...p.spec.map((s) => `${s.label}: ${s.value} (demo)`),
      "",
    ].join("\n")),
  ].join("\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="argilla-${product?.slug ?? "catalogue"}.txt"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
