import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/lib/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealImage } from "@/components/ui/RevealImage";
import { Eyebrow, Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a ceramic sample, open a trade account, download technical data or talk to the Argilla studio about a project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Argilla",
    description:
      "Samples, trade accounts, technical downloads and project enquiries.",
    url: "/contact",
  },
};

const FAQS = [
  {
    q: "How do I get a sample?",
    a: "Use the form and choose Request a sample. Samples are 100mm squares, sent free to trade accounts and at cost to private clients.",
  },
  {
    q: "What is the lead time?",
    a: "Stock references ship in three weeks. Extruded terracotta and bookmatched slabs are made to order and run to six.",
  },
  {
    q: "Do you supply outside the EU?",
    a: "Yes, through distribution partners. Tell us the destination and we will put you in touch with the nearest one.",
  },
  {
    q: "Can I visit the works?",
    a: "Specifiers are welcome by appointment. We run two visit days a month and they book up about six weeks ahead.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={["Talk to", "the studio."]}
        lead="Send a drawing, a mood board or a single question about a slip rating. We answer all three the same way."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        meta={[
          { label: "Studio", value: "Sassuolo, Italy" },
          { label: "Showroom", value: "London EC1R" },
          { label: "Response", value: "Within two working days" },
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

            <Reveal className="flex flex-col gap-8">
              <div data-anim="fade-up" className="flex flex-col gap-2">
                <span className="label text-umber/50">Studio and works</span>
                <p className="body-base text-charcoal">{SITE.contact.studio}</p>
              </div>
              <div data-anim="fade-up" className="flex flex-col gap-2">
                <span className="label text-umber/50">Showroom</span>
                <p className="body-base text-charcoal">
                  {SITE.contact.showroom}
                </p>
              </div>
              <div data-anim="fade-up" className="flex flex-col gap-2">
                <span className="label text-umber/50">Email</span>
                <UnderlineLink
                  href={`mailto:${SITE.contact.email}`}
                  external
                  className="body-base text-charcoal"
                >
                  {SITE.contact.email}
                </UnderlineLink>
                <UnderlineLink
                  href={`mailto:${SITE.contact.press}`}
                  external
                  className="body-sm text-umber"
                >
                  {SITE.contact.press}
                </UnderlineLink>
              </div>
              <div data-anim="fade-up" className="flex flex-col gap-2">
                <span className="label text-umber/50">Telephone</span>
                <p className="body-base text-charcoal">{SITE.contact.phone}</p>
              </div>
              <p data-anim="fade" className="body-sm text-umber/55">
                All contact details on this demo site are placeholders and do
                not reach a real business.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section-y bg-ivory" aria-labelledby="faq-heading">
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
                <summary className="flex cursor-pointer items-center justify-between gap-6 list-none">
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
