import { Clock, Factory, Mountain, Recycle, Trash2 } from "lucide-react";
import { PILLARS } from "@/lib/data/craft";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, Rule } from "@/components/ui/Primitives";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ICONS = { Mountain, Recycle, Factory, Clock, Trash2 };

export function Sustainability() {
  return (
    <section
      className="section-y bg-porcelain"
      aria-labelledby="sustainability-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-5">
              <Eyebrow index="10">Responsibility</Eyebrow>
              <h2
                id="sustainability-heading"
                data-anim="fade-up"
                className="display-lg max-w-2xl text-charcoal"
              >
                The most sustainable surface is the one nobody replaces.
              </h2>
            </div>
            <p data-anim="fade-up" className="body-base max-w-sm text-umber">
              We are wary of environmental claims we cannot evidence, so this
              page describes process rather than percentages.
            </p>
          </div>
          <Rule />
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[16vh] lg:self-start">
            <RevealImage
              image={{
                id: 5950839,
                alt: "Wet clay with a rippled surface, photographed in low light",
              }}
              sizes="(max-width: 1024px) 92vw, 38vw"
              className="aspect-[4/5] w-full"
              parallax={8}
              width={1200}
              quality={80}
            />
          </div>

          <Reveal className="flex flex-col" stagger={0.09}>
            {PILLARS.map((pillar) => {
              const Icon = ICONS[pillar.icon];
              return (
                <div
                  key={pillar.index}
                  data-anim="fade-up"
                  className="group flex gap-6 border-t border-umber/15 py-8 first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span className="flex shrink-0 flex-col items-center gap-4">
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-terracotta transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                      strokeWidth={1.4}
                    />
                    <span className="label text-umber/40 tabular-nums">
                      {pillar.index}
                    </span>
                  </span>

                  <div className="flex flex-col gap-3">
                    <h3 className="display-sm text-charcoal">{pillar.title}</h3>
                    <p className="body-base max-w-lg text-umber">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              );
            })}

            <div data-anim="fade-up" className="pt-10">
              <MagneticButton href="/sustainability">
                How we work
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
