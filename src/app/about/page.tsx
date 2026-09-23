import type { Metadata } from "next";
import { SITE } from "@/lib/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/home/Stats";
import { Testimonial } from "@/components/home/Testimonial";
import { CallToAction } from "@/components/home/CallToAction";
import { RevealImage } from "@/components/ui/RevealImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow, Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Argilla has made ceramics in one works outside Modena since 1998: three throwers, one kiln, and a deliberate decision to stay small.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Argilla",
    description:
      "One site, one clay store, one set of hands on every recipe since 1998.",
    url: "/about",
  },
};

const TIMELINE = [
  {
    year: "1998",
    title: "Three throwers, one kiln",
    body: "Argilla opens in a rented unit outside Sassuolo making hand-thrown tableware for restaurants in Modena and Bologna.",
  },
  {
    year: "2004",
    title: "The first press",
    body: "A second-hand press arrives and the studio starts making tiles, initially only for the floors of clients who already bought the tableware.",
  },
  {
    year: "2016",
    title: "Terracotta",
    body: "The extrusion line opens. Terracotta becomes the first collection sold outside Italy and is still in production on the original body recipe.",
  },
  {
    year: "2021",
    title: "Large format",
    body: "A slab press capable of 1600 x 3200 is installed, and Stone follows a year later.",
  },
  {
    year: "2024",
    title: "Where we are",
    body: "Six collections, one site, and the same clay store feeding both the presses and the wheels.",
  },
];

const VALUES = [
  {
    title: "The body, not the print",
    body: "We sell clay bodies rather than decorated substrates. It costs more per square metre and it is the only reason our surfaces still look right after a decade.",
  },
  {
    title: "Small on purpose",
    body: "We have turned down the volume that would have required a second site. One works means one set of standards.",
  },
  {
    title: "Say what it is",
    body: "Tone variation, shade grading, slip ratings and lead times are published as they are. Specifiers do not need optimism, they need numbers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${SITE.founded}`}
        title={["A small works", "outside Modena."]}
        lead="Argilla began with three throwers and a single kiln. Twenty-five years later there are more machines and roughly the same number of opinions."
        image={{
          id: 36731542,
          alt: "A craftsman standing in a ceramics studio surrounded by finished work",
        }}
        height="full"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        meta={[
          { label: "Founded", value: String(SITE.founded) },
          { label: "Works", value: "Sassuolo, Italy" },
          { label: "Showroom", value: "London EC1R" },
        ]}
      />

      {/* Statement. */}
      <section className="section-y bg-porcelain" aria-label="Who we are">
        <div className="shell">
          <AnimatedText
            as="h2"
            lines={[
              "We make one material",
              "in one place,",
              "and we have never",
              "wanted a second.",
            ]}
            className="display-xl max-w-5xl text-charcoal"
          />

          <Reveal className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-6">
              <p data-anim="fade-up" className="body-lg text-umber">
                The works sits ten minutes from the ceramic district that made
                Italy the centre of this industry. We are a fraction of the size
                of our neighbours and that is the point: everything from the
                clay store to the crating bay is within shouting distance.
              </p>
              <p data-anim="fade-up" className="body-base text-umber/85">
                Our throwers still make the studio range on the same floor as
                the press line, using glazes mixed from the oxides that colour
                the architectural bodies. Nobody planned it as a brand strategy.
                It is simply what happens when you never move the wheels out.
              </p>
              <div data-anim="fade-up">
                <UnderlineLink href="/craft" className="label text-charcoal">
                  See how it is made
                </UnderlineLink>
              </div>
            </div>

            <RevealImage
              image={{
                id: 9736289,
                alt: "A ceramicist working at a pottery wheel in a workshop",
              }}
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="aspect-[4/5] w-full"
              parallax={10}
            />
          </Reveal>
        </div>
      </section>

      {/* Timeline. */}
      <section className="section-y bg-ivory" aria-labelledby="timeline-heading">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow index="02">History</Eyebrow>
            <h2
              id="timeline-heading"
              data-anim="fade-up"
              className="display-lg max-w-xl text-charcoal"
            >
              Twenty-five years, five turning points.
            </h2>
            <Rule />
          </Reveal>

          <Reveal className="mt-12 flex flex-col" stagger={0.09}>
            {TIMELINE.map((entry) => (
              <div
                key={entry.year}
                data-anim="fade-up"
                className="group grid gap-4 border-b border-umber/15 py-8 sm:grid-cols-[8rem_1fr] sm:gap-10 lg:grid-cols-[10rem_18rem_1fr]"
              >
                <span className="display-sm text-terracotta tabular-nums">
                  {entry.year}
                </span>
                <h3 className="display-sm text-charcoal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  {entry.title}
                </h3>
                <p className="body-base max-w-xl text-umber">{entry.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values — image dominated, minimal type. */}
      <section className="section-y bg-porcelain" aria-labelledby="values-heading">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-8 lg:sticky lg:top-[16vh] lg:self-start">
            <Eyebrow index="03">What we hold to</Eyebrow>
            <h2
              id="values-heading"
              className="display-md max-w-sm text-charcoal"
            >
              Three positions we have not moved on.
            </h2>
            <RevealImage
              image={{
                id: 6104788,
                alt: "Close-up of a pale clay body showing its natural grain",
              }}
              sizes="(max-width: 1024px) 92vw, 38vw"
              className="aspect-[5/4] w-full"
              parallax={8}
            />
          </div>

          <Reveal className="flex flex-col" stagger={0.1}>
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                data-anim="fade-up"
                className="flex flex-col gap-4 border-t border-umber/15 py-10 first:border-t-0 first:pt-0"
              >
                <span className="label text-umber/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm text-charcoal">{value.title}</h3>
                <p className="body-base max-w-lg text-umber">{value.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Stats />
      <Testimonial />
      <CallToAction />
    </>
  );
}
