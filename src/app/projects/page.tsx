import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsIndex } from "@/components/sections/ProjectsIndex";
import { CallToAction } from "@/components/home/CallToAction";
import { Reveal, Rule } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residential, hospitality, commercial and architectural projects finished in Argilla ceramic surfaces, from converted kiln houses to forty-two room hotels.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Argilla",
    description:
      "Buildings finished in Argilla ceramic surfaces, across six project types.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Spaces"
        title={["Projects"]}
        lead="Where the material ended up, and what the people who specified it made of it."
        image={{
          id: 7587747,
          alt: "A bathroom finished in textured ceramic surfaces with a glass shower",
        }}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        meta={[
          { label: "Shown", value: "06 projects" },
          { label: "Types", value: "Residential to civic" },
          { label: "Years", value: "2023 to 2024" },
        ]}
      />

      <section className="section-y bg-porcelain" aria-labelledby="all-projects">
        <div className="shell">
          <h2 id="all-projects" className="sr-only">
            All projects
          </h2>
          <Reveal className="mb-14 flex flex-col gap-8">
            <Rule />
            <p data-anim="fade-up" className="body-lg max-w-2xl text-umber">
              We publish projects with the architect credited and the surfaces
              named, because the second question is always which tile it was.
            </p>
          </Reveal>

          <ProjectsIndex />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
