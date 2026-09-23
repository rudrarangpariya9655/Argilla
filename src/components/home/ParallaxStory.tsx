"use client";

import { RevealImage } from "@/components/ui/RevealImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow, Reveal, UnderlineLink } from "@/components/ui/Primitives";

const PLATES = [
  {
    image: {
      id: 9736571,
      alt: "A craftswoman shaping pottery in a rustic studio",
    },
    className:
      "col-span-7 row-start-1 aspect-[4/5] sm:col-span-5 lg:col-span-4 lg:col-start-1",
    parallax: 18,
    sizes: "(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw",
  },
  {
    image: {
      id: 34584522,
      alt: "The glow of a kiln with embers visible through the openings",
    },
    className:
      "col-span-5 col-start-8 row-start-2 aspect-square sm:col-span-4 sm:col-start-9 lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-[22vh]",
    parallax: -26,
    sizes: "(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 22vw",
  },
  {
    image: {
      id: 13575092,
      alt: "Overhead view of stacked ceramic mugs and jugs",
    },
    className:
      "col-span-6 col-start-2 row-start-3 aspect-[3/4] sm:col-span-4 sm:col-start-3 lg:col-span-3 lg:col-start-3 lg:row-start-2 lg:-mt-[8vh]",
    parallax: 22,
    sizes: "(max-width: 640px) 52vw, (max-width: 1024px) 32vw, 22vw",
  },
  {
    image: {
      id: 33980199,
      alt: "Adobe brick texture with natural imperfections in warm earth tones",
    },
    className:
      "col-span-6 col-start-7 row-start-4 aspect-[5/4] sm:col-span-5 sm:col-start-8 lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:mt-[6vh]",
    parallax: -14,
    sizes: "(max-width: 640px) 52vw, (max-width: 1024px) 40vw, 30vw",
  },
];

/**
 * Layered editorial composition. Plates move at four different rates against a
 * typographic spine that sits between them in the stacking order.
 */
export function ParallaxStory() {
  return (
    <section
      className="relative overflow-hidden bg-sand py-(--spacing-section)"
      aria-labelledby="time-heading"
    >
      <div className="shell relative">
        <Reveal className="mb-12">
          <Eyebrow index="05">Patience</Eyebrow>
        </Reveal>

        <div className="relative grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-y-0">
          {PLATES.map((plate) => (
            <div key={plate.image.id} className={plate.className}>
              <RevealImage
                image={plate.image}
                sizes={plate.sizes}
                parallax={plate.parallax}
                className="h-full w-full"
                width={1100}
                quality={72}
              />
            </div>
          ))}

          {/* Typographic spine, layered between the plates. */}
          <div className="pointer-events-none col-span-12 row-start-1 flex items-center justify-center lg:row-span-2 lg:row-start-1">
            <AnimatedText
              as="h2"
              lines={["CRAFTED", "BY TIME."]}
              className="display-xl relative z-[1] text-center text-charcoal mix-blend-multiply"
              lineClassName="whitespace-nowrap"
            />
          </div>
        </div>

        <Reveal className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <p data-anim="fade-up" className="body-lg max-w-xl text-umber">
            A body recipe takes a year to settle. A firing curve takes nineteen
            hours and cannot be shortened to twelve. Nothing about this material
            rewards hurry, so we stopped trying to make it.
          </p>
          <div data-anim="fade-up">
            <UnderlineLink href="/craft" className="label text-charcoal">
              The five stages
            </UnderlineLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
