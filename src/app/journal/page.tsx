import type { Metadata } from "next";
import { ARTICLES } from "@/lib/data/journal";
import { PageHero } from "@/components/sections/PageHero";
import { JournalCard } from "@/components/cards/JournalCard";
import { CallToAction } from "@/components/home/CallToAction";
import { Newsletter } from "@/components/forms/Newsletter";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Writing from the Argilla works: material science, large-format detailing, glaze behaviour, specification advice and notes from the kiln floor.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Journal — Argilla",
    description:
      "Material, method and the occasional argument about firing curves.",
    url: "/journal",
  },
};

export default function JournalPage() {
  const [lead, second, ...rest] = ARTICLES;

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title={["Journal"]}
        lead="Notes on material, method and specification, written by the people who make the surfaces."
        crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]}
        meta={[
          { label: "Articles", value: String(ARTICLES.length) },
          { label: "Topics", value: "Material, craft, design" },
          { label: "Frequency", value: "Roughly monthly" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-labelledby="all-articles">
        <div className="shell">
          <h2 id="all-articles" className="sr-only">
            All articles
          </h2>
          <Reveal className="mb-14">
            <Rule />
          </Reveal>

          {/* Two leads at full width, then a three-up run. */}
          <Reveal className="grid gap-x-8 gap-y-16 lg:grid-cols-2" stagger={0.12}>
            <JournalCard
              article={lead}
              featured
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
            <JournalCard
              article={second}
              featured
              className="lg:mt-[10vh]"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
          </Reveal>

          <Reveal
            className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {rest.map((article) => (
              <JournalCard key={article.slug} article={article} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-ivory" aria-labelledby="subscribe-heading">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow index="02">Subscribe</Eyebrow>
            <h2
              id="subscribe-heading"
              data-anim="fade-up"
              className="display-md max-w-md text-charcoal"
            >
              One email a month, no product launches.
            </h2>
          </Reveal>
          <Reveal className="flex items-end">
            <div data-anim="fade-up" className="w-full">
              <Newsletter />
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
