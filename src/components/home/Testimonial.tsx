import Image from "next/image";
import { BLUR, src } from "@/lib/images";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Primitives";

const QUOTE = {
  lines: [
    "The clay does not",
    "pretend to be",
    "anything else.",
    "That is the whole",
    "argument.",
  ],
  author: "Chiara Bellini",
  role: "Founding partner, Studio Bellini",
  project: "Casa Fornace, Modena",
  portrait: {
    id: 36731542,
    alt: "A ceramicist standing in a studio surrounded by finished work",
  },
};

export function Testimonial() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink py-(--spacing-section) text-porcelain"
      aria-labelledby="quote-heading"
    >
      {/* Portrait sits behind the type on large screens, beside it on small. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-[42%] lg:block"
      >
        <Image
          src={src(QUOTE.portrait, 1200)}
          alt=""
          fill
          sizes="(max-width: 1024px) 0px, 42vw"
          quality={72}
          placeholder="blur"
          blurDataURL={BLUR}
          className="object-cover opacity-30"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/25" />
      </div>

      <div className="shell relative z-10">
        <blockquote className="flex flex-col gap-10">
          <AnimatedText
            as="h2"
            lines={QUOTE.lines}
            className="display-xl max-w-5xl text-porcelain"
          />

          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <footer data-anim="fade-up" className="flex items-center gap-5">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-charcoal">
                <Image
                  src={src(QUOTE.portrait, 200)}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="56px"
                  quality={72}
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col gap-1">
                <cite className="body-base not-italic text-porcelain">
                  {QUOTE.author}
                </cite>
                <span className="label text-porcelain/45">{QUOTE.role}</span>
              </span>
            </footer>

            <span data-anim="fade" className="label text-porcelain/35">
              {QUOTE.project}
            </span>
          </Reveal>
        </blockquote>
      </div>

      <h2 id="quote-heading" className="sr-only">
        What designers say about working with Argilla
      </h2>
    </section>
  );
}
