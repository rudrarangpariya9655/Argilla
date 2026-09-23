import { ARTICLES } from "@/lib/data/journal";
import { JournalCard } from "@/components/cards/JournalCard";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function JournalPreview() {
  const [lead, ...rest] = ARTICLES.slice(0, 4);

  return (
    <section className="section-y bg-ivory" aria-labelledby="journal-heading">
      <div className="shell">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <Eyebrow index="12">Journal</Eyebrow>
              <h2
                id="journal-heading"
                data-anim="fade-up"
                className="display-lg max-w-2xl text-charcoal"
              >
                Notes from the works.
              </h2>
            </div>
            <p data-anim="fade-up" className="body-base max-w-sm text-umber">
              Material, method and the occasional argument about firing curves.
            </p>
          </div>
          <Rule />
        </Reveal>

        <Reveal
          className="mt-16 grid gap-x-8 gap-y-14 sm:mt-20 lg:grid-cols-12"
          stagger={0.1}
        >
          <JournalCard
            article={lead}
            featured
            className="lg:col-span-7"
            sizes="(max-width: 1024px) 92vw, 56vw"
          />

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            {rest.map((article) => (
              <JournalCard
                key={article.slug}
                article={article}
                sizes="(max-width: 1024px) 92vw, 32vw"
              />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 flex justify-center">
          <div data-anim="fade-up">
            <MagneticButton href="/journal">All articles</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
