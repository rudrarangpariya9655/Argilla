import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UnderlineLink } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "About this concept & site policies",
  description: "The ARGILLA portfolio concept, demo content, form privacy and site policies.",
  alternates: { canonical: "/site-notes" },
};

const NOTES = [
  { id: "concept", title: "An independent design concept", text: "ARGILLA is a fictional ceramic house created as a frontend portfolio project. Its Italian setting, history, project credits, quotes, prices and material specifications are illustrative. They are not representations of a real business. Photography is sourced from Pexels and does not document the named products or projects." },
  { id: "privacy", title: "Privacy & your information", text: "Form values stay in the current page's memory. This application does not submit enquiries or newsletter addresses to a server, save form entries to browser storage, or add them to a mailing list. Reloading the page clears them. Downloading a brief saves the information you entered as a text file on your device. The hosting provider and external image host may receive normal request information, such as your IP address, when serving the site." },
  { id: "terms", title: "Terms of this demonstration", text: "The catalogue is for exploring this design concept. No sales, trade accounts or sample dispatches are offered. Downloadable reference sheets contain demo data and are not certified technical documentation. Material ratings, installation advice and prices must not be used to specify or procure a real project." },
  { id: "cookies", title: "Cookies & browser storage", text: "The application code does not set cookies, store tracking identifiers or use analytics. It does not save form values in local or session storage. Services that deliver this site and its external images may have their own operational policies. No cookie consent choice is required by the application's current features." },
];

export default function SiteNotes() {
  return <>
    <PageHero eyebrow="Site notes" title={["A considered", "concept."]} lead="A little context about the brand, the catalogue and your information." crumbs={[{ label: "Home", href: "/" }, { label: "Site notes" }]} />
    <section className="section-y bg-ivory" aria-label="Concept and site policies">
      <div className="shell grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <nav aria-label="Policy sections" className="flex flex-col items-start lg:sticky lg:top-28 lg:self-start">{NOTES.map((note) => <UnderlineLink key={note.id} href={`#${note.id}`} className="label text-umber">{note.title}</UnderlineLink>)}</nav>
        <div className="flex max-w-[42rem] flex-col gap-16">{NOTES.map((note, i) => <section key={note.id} id={note.id} className="flex flex-col gap-5 border-t border-umber/20 pt-6"><span className="label text-terracotta">{String(i + 1).padStart(2, "0")}</span><h2 className="display-md">{note.title}</h2><p className="body-lg text-umber">{note.text}</p></section>)}</div>
      </div>
    </section>
  </>;
}
