import type { Metadata } from "next";
import { Clock, Factory, Mountain, Recycle, Trash2 } from "lucide-react";
import { PILLARS } from "@/lib/data/craft";
import { PageHero } from "@/components/sections/PageHero";
import { CallToAction } from "@/components/home/CallToAction";
import { RevealImage } from "@/components/ui/RevealImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How Argilla sources clay, recovers kiln heat, returns offcuts to the body blend and keeps recipes in production so surfaces are repaired rather than replaced.",
  alternates: { canonical: "/sustainability" },
  openGraph: {
    title: "Sustainability — Argilla",
    description:
      "Process, not percentages: how we source, fire and keep ceramic surfaces in service.",
    url: "/sustainability",
  },
};

const ICONS = { Mountain, Recycle, Factory, Clock, Trash2 };

const PRACTICES = [
  {
    title: "What we measure",
    body: "Energy at the meter, water drawn and returned, waste leaving site by stream, and the proportion of press waste re-entering the body blend.",
  },
  {
    title: "What we do not claim",
    body: "We publish no carbon figure we have not had audited, and no recycled-content percentage that changes batch to batch. When those numbers are verified, they will appear here with their methodology.",
  },
  {
    title: "What we ask of suppliers",
    body: "A quarry rehabilitation plan, water use on site, and transport distance to the works. Suppliers who cannot answer the first question do not get to the second.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Responsibility"
        title={["Made once,", "kept a long time."]}
        lead="The honest environmental case for ceramic is durability. Everything else we do is in service of a surface nobody has to rip out."
        image={{
          id: 5950839,
          alt: "Wet clay with a rippled surface, photographed in low light",
        }}
        height="full"
        crumbs={[{ label: "Home", href: "/" }, { label: "Sustainability" }]}
        meta={[
          { label: "Sites", value: "One works" },
          { label: "Heat recovery", value: "Kiln exhaust to dryers" },
          { label: "Recipes held", value: "A decade or more" },
        ]}
      />

      {/* Position statement. */}
      <section className="section-y bg-porcelain" aria-label="Our position">
        <div className="shell">
          <AnimatedText
            as="h2"
            lines={[
              "The most sustainable",
              "surface is the one",
              "nobody replaces.",
            ]}
            className="display-xl max-w-4xl text-charcoal"
          />

          <Reveal className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <p data-anim="fade-up" className="body-lg text-umber">
              Ceramic is fired once and then does very little. It does not
              off-gas, it does not need sealing, and it does not wear out on any
              timescale that matters to a building. The environmental question
              is therefore not really about the tile. It is about whether
              somebody will tear it out in eight years because it dated badly or
              because a matching replacement no longer exists.
            </p>
            <p data-anim="fade-up" className="body-base text-umber/85">
              That is the problem we actually work on. Keeping body recipes in
              production for a decade, grading shade so a later batch still
              matches, and designing ranges that were never trend-led in the
              first place. The rest of this page describes the manufacturing
              practices that sit underneath it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars — alternating image / text bands. */}
      <section className="bg-ivory py-(--spacing-section)" aria-labelledby="pillars-heading">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow index="02">In practice</Eyebrow>
            <h2
              id="pillars-heading"
              data-anim="fade-up"
              className="display-lg max-w-xl text-charcoal"
            >
              Five things we actually do.
            </h2>
            <Rule />
          </Reveal>

          <div className="mt-16 flex flex-col gap-20 sm:gap-28">
            {PILLARS.map((pillar, i) => {
              const Icon = ICONS[pillar.icon];
              const flipped = i % 2 === 1;
              return (
                <Reveal
                  key={pillar.index}
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16"
                >
                  <div
                    className={
                      flipped
                        ? "lg:col-span-5 lg:col-start-8 lg:row-start-1"
                        : "lg:col-span-5"
                    }
                  >
                    <RevealImage
                      image={SUSTAINABILITY_IMAGES[i]}
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      className={
                        i % 3 === 0
                          ? "aspect-[4/3] w-full"
                          : i % 3 === 1
                            ? "aspect-square w-full"
                            : "aspect-[3/4] w-full"
                      }
                      parallax={flipped ? -10 : 10}
                    />
                  </div>

                  <div
                    className={
                      flipped
                        ? "flex flex-col gap-5 lg:col-span-5 lg:col-start-2 lg:row-start-1"
                        : "flex flex-col gap-5 lg:col-span-5 lg:col-start-8"
                    }
                  >
                    <span className="flex items-center gap-4">
                      <Icon
                        aria-hidden="true"
                        className="size-5 text-terracotta"
                        strokeWidth={1.4}
                      />
                      <span className="label text-umber/45 tabular-nums">
                        {pillar.index}
                      </span>
                    </span>
                    <h3 data-anim="fade-up" className="display-md text-charcoal">
                      {pillar.title}
                    </h3>
                    <p data-anim="fade-up" className="body-base max-w-md text-umber">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency. */}
      <section className="section-y bg-charcoal text-porcelain" aria-labelledby="claims-heading">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow index="03" tone="light">
              Being straight about it
            </Eyebrow>
            <h2
              id="claims-heading"
              data-anim="fade-up"
              className="display-lg max-w-2xl text-porcelain"
            >
              What we measure, and what we will not claim.
            </h2>
          </Reveal>

          <Reveal className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-3" stagger={0.1}>
            {PRACTICES.map((practice) => (
              <div
                key={practice.title}
                data-anim="fade-up"
                className="flex flex-col gap-4 border-t border-porcelain/15 pt-6"
              >
                <h3 className="display-sm text-porcelain">{practice.title}</h3>
                <p className="body-base text-porcelain/70">{practice.body}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-14">
            <p data-anim="fade" className="body-sm max-w-2xl text-porcelain/40">
              This is a demonstration site. The practices described here are
              illustrative placeholder content and are not verified
              environmental claims for any real company.
            </p>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}

/** One plate per pillar, in the order the pillars are declared. */
const SUSTAINABILITY_IMAGES = [
  { id: 5950839, alt: "Wet clay with a rippled surface before blending" },
  { id: 8063829, alt: "A textured clay surface with swirling tonal patterns" },
  { id: 9736510, alt: "Earthenware plates inside a kiln in a pottery workshop" },
  { id: 39485802, alt: "Stacked terracotta tiles showing weathering and texture" },
  { id: 15122649, alt: "An artisan arranging finished ceramics on studio shelves" },
];
