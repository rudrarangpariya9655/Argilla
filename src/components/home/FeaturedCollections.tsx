import { COLLECTIONS } from "@/lib/data/collections";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Deliberately uneven: a tall lead card, an offset pair, then a wide anchor.
 * The grid never resolves into four equal boxes.
 */
export function FeaturedCollections() {
  const [lead, second, third, fourth, fifth, sixth] = COLLECTIONS;

  return (
    <section
      className="section-y bg-ivory"
      aria-labelledby="collections-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <Eyebrow index="02">Collections</Eyebrow>
              <h2
                id="collections-heading"
                data-anim="fade-up"
                className="display-lg max-w-2xl text-charcoal"
              >
                Six bodies of work, one clay store.
              </h2>
            </div>
            <p data-anim="fade-up" className="body-base max-w-sm text-umber">
              Each collection starts from a different question about the
              material. None of them start from a trend forecast.
            </p>
          </div>
          <Rule />
        </Reveal>

        {/* Row one: tall lead beside a stacked pair. */}
        <Reveal
          className="mt-16 grid gap-x-8 gap-y-14 sm:mt-24 lg:grid-cols-12"
          stagger={0.12}
        >
          <CollectionCard
            collection={lead}
            index={1}
            ratio="tall"
            priority
            className="lg:col-span-6"
            sizes="(max-width: 1024px) 92vw, 46vw"
          />

          <div className="flex flex-col gap-14 lg:col-span-5 lg:col-start-8 lg:pt-[14vh]">
            <CollectionCard
              collection={second}
              index={2}
              ratio="wide"
              sizes="(max-width: 1024px) 92vw, 38vw"
            />
            <CollectionCard
              collection={third}
              index={3}
              ratio="square"
              className="lg:ml-[18%]"
              sizes="(max-width: 1024px) 92vw, 30vw"
            />
          </div>
        </Reveal>

        {/* Row two: offset pair, then a full-bleed wide card. */}
        <Reveal
          className="mt-20 grid gap-x-8 gap-y-14 sm:mt-28 lg:grid-cols-12"
          stagger={0.12}
        >
          <CollectionCard
            collection={fourth}
            index={4}
            ratio="square"
            className="lg:col-span-4"
            sizes="(max-width: 1024px) 92vw, 30vw"
          />
          <CollectionCard
            collection={fifth}
            index={5}
            ratio="tall"
            className="lg:col-span-4 lg:col-start-6 lg:pt-[10vh]"
            sizes="(max-width: 1024px) 92vw, 30vw"
          />
          <CollectionCard
            collection={sixth}
            index={6}
            ratio="wide"
            className="lg:col-span-11 lg:col-start-2 lg:mt-10"
            sizes="(max-width: 1024px) 92vw, 80vw"
          />
        </Reveal>

        <Reveal className="mt-20 flex justify-center">
          <div data-anim="fade-up">
            <MagneticButton href="/collections">
              All collections
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
