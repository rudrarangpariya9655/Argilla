import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Prepare a downloadable sample, trade or project brief for the ARGILLA ceramic portfolio concept.",
  alternates: { canonical: "/contact" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ARGILLA — shaped by earth" }],
    title: "Contact — Argilla",
    description:
      "Explore the enquiry flow and prepare a local project brief for this ceramic brand concept.",
    url: "/contact",
  },
};

const FAQS = [
  {
    q: "How do I get a sample?",
    a: "Choose Request a sample in the form to prepare a downloadable brief. Sample delivery is not offered by this portfolio concept.",
  },
  {
    q: "What is the lead time?",
    a: "Lead times elsewhere in this concept are illustrative. No stock is held and no orders are processed.",
  },
  {
    q: "Do you supply outside the EU?",
    a: "This fictional brand has no distribution partners. You can include a location in a demo project brief to explore the enquiry flow.",
  },
  {
    q: "Can I visit the works?",
    a: "The studio and works are part of the brand story. There is no physical showroom or appointment service behind this demonstration.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={["Talk to", "the studio."]}
        lead="Start with a material, a space or a question. Prepare a brief for the surfaces you have in mind."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        meta={[
          { label: "Enquiries", value: "Samples, trade & projects" },
          { label: "Format", value: "Downloadable project brief" },
          { label: "Status", value: "Portfolio demonstration" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-labelledby="enquiry-heading">
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow index="01">Enquiry</Eyebrow>
              <h2
                id="enquiry-heading"
                data-anim="fade-up"
                className="display-md max-w-md text-charcoal"
              >
                Tell us what you are working on.
              </h2>
            </Reveal>

            {/* useSearchParams needs a Suspense boundary during prerender. */}
            <Suspense
              fallback={
                <p className="body-base text-umber">Loading the form…</p>
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-10">
            <RevealImage
              image={{
                id: 29286722,
                alt: "Rows of handmade ceramic cups on rustic studio shelves",
              }}
              sizes="(max-width: 1024px) 92vw, 38vw"
              className="aspect-[4/5] w-full"
              parallax={8}
            />

            <div className="flex flex-col gap-6 border-t border-umber/20 pt-8">
              <h2 className="display-sm">A starting point for your project.</h2>
              <p className="body-base max-w-md text-umber">Use the form to prepare a sample, trade or project brief. You can download it as a text file and keep it for reference.</p>
              <p className="body-sm max-w-md text-umber">This is an independent portfolio concept. No enquiry is sent to a business, and no sample is dispatched.</p>
              <a href="/catalogue/all" download className="label flex min-h-11 items-center gap-3 text-charcoal underline underline-offset-8">Download the demo catalogue · TXT ↗</a>
              <UnderlineLink href="/site-notes#privacy" className="body-sm text-umber">About your information</UnderlineLink>
            </div>
          </aside>
        </div>
      </section>

      <section id="faq" className="section-y bg-ivory" aria-labelledby="faq-heading">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <Eyebrow index="02">Common questions</Eyebrow>
            <h2
              id="faq-heading"
              data-anim="fade-up"
              className="display-lg max-w-xl text-charcoal"
            >
              Before you write.
            </h2>
            <Rule />
          </Reveal>

          <Reveal className="mt-12 flex flex-col" stagger={0.08}>
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                data-anim="fade-up"
                className="group border-b border-umber/15 py-6"
              >
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-6 list-none">
                  <span className="display-sm text-charcoal">{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="relative size-4 shrink-0"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-4 bg-charcoal" />
                    <span className="absolute left-1/2 top-0 h-4 w-px bg-charcoal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-90" />
                  </span>
                </summary>
                <p className="body-base mt-4 max-w-2xl text-umber">{faq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
