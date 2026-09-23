import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CraftProcess } from "@/components/home/CraftProcess";
import { ParallaxStory } from "@/components/home/ParallaxStory";
import { TextureSelector } from "@/components/home/TextureSelector";
import { CallToAction } from "@/components/home/CallToAction";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Craft",
  description:
    "Inside the Argilla works: body recipes, pressing, a nineteen-hour firing curve, in-house glazes and the rectifying line that finishes every surface.",
  alternates: { canonical: "/craft" },
  openGraph: {
    title: "Craft — Argilla",
    description:
      "How a hillside becomes a finished ceramic surface, in five stages.",
    url: "/craft",
  },
};

const PRINCIPLES = [
  {
    index: "A",
    title: "One site",
    body: "Clay store, presses, kiln and rectifying line are all on the same floor plate. Nothing is subcontracted, so nothing is out of our hands between the recipe and the crate.",
  },
  {
    index: "B",
    title: "One recipe, kept",
    body: "Body recipes stay in production for a decade or more. A floor damaged in year seven can be repaired from the same batch reference rather than replaced.",
  },
  {
    index: "C",
    title: "Variation on purpose",
    body: "Terracotta shifts with the firing and we specify that as a feature. A surface that is identical in every box is a surface that has stopped being a material.",
  },
];

export default function CraftPage() {
  return (
    <>
      <PageHero
        eyebrow="The works"
        title={["Nineteen", "hours."]}
        lead="Between a blended powder and a finished surface there are five stages, one kiln and a temperature curve that cannot be hurried."
        image={{
          id: 6611352,
          alt: "A ceramicist's clay-covered hands shaping wet clay on a wheel",
        }}
        height="full"
        crumbs={[{ label: "Home", href: "/" }, { label: "Craft" }]}
        meta={[
          { label: "Kiln length", value: "96 m" },
          { label: "Peak temperature", value: "1220 C" },
          { label: "Shrinkage", value: "About 7%" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-label="Principles">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow index="00">How we work</Eyebrow>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <h2 data-anim="fade-up" className="display-lg max-w-2xl text-charcoal">
                Three decisions that shape everything else.
              </h2>
              <p data-anim="fade-up" className="body-base max-w-sm text-umber">
                None of them are about aesthetics. They are about keeping a
                material honest over a long time.
              </p>
            </div>
            <Rule />
          </Reveal>

          <Reveal className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-3" stagger={0.1}>
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.index}
                data-anim="fade-up"
                className="flex flex-col gap-4 border-t border-umber/15 pt-6"
              >
                <span className="label text-terracotta">{principle.index}</span>
                <h3 className="display-sm text-charcoal">{principle.title}</h3>
                <p className="body-base text-umber">{principle.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Full-bleed plate between sections. */}
      <section aria-label="The kiln" className="bg-ink">
        <RevealImage
          image={{
            id: 34584522,
            alt: "The glow of a kiln with embers visible through the openings",
          }}
          sizes="100vw"
          className="h-[70svh] w-full"
          parallax={14}
          width={2000}
        />
      </section>

      <CraftProcess />
      <ParallaxStory />
      <TextureSelector />
      <CallToAction />
    </>
  );
}
