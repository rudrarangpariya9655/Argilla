import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, projectBySlug } from "@/lib/data/projects";
import { collectionBySlug } from "@/lib/data/collections";
import { src } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealImage } from "@/components/ui/RevealImage";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Eyebrow, Reveal, Rule, UnderlineLink } from "@/components/ui/Primitives";
import { CallToAction } from "@/components/home/CallToAction";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Argilla`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: src(project.cover, 1200), alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const collections = project.collections
    .map((s) => collectionBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const more = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${project.category} / ${project.year}`}
        title={[project.name]}
        lead={project.summary}
        image={project.cover}
        height="full"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
        meta={[
          { label: "Location", value: project.location },
          { label: "Architect", value: project.architect },
          { label: "Completed", value: String(project.year) },
        ]}
      />

      {/* Narrative + credits. */}
      <section className="section-y bg-porcelain" aria-label="Project story">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow index="01">The brief</Eyebrow>
            {project.story.map((paragraph, i) => (
              <p
                key={i}
                data-anim="fade-up"
                className={
                  i === 0
                    ? "body-lg max-w-2xl text-charcoal"
                    : "body-base max-w-2xl text-umber"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="flex flex-col gap-8 lg:sticky lg:top-[16vh] lg:self-start">
            <dl className="flex flex-col gap-6">
              {project.facts.map((fact) => (
                <div
                  key={fact.label}
                  data-anim="fade-up"
                  className="flex flex-col gap-1.5 border-t border-umber/15 pt-4"
                >
                  <dt className="label text-umber/50">{fact.label}</dt>
                  <dd className="body-base text-charcoal">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div data-anim="fade-up" className="flex flex-col gap-3 border-t border-umber/15 pt-4">
              <span className="label text-umber/50">Collections used</span>
              <ul className="flex flex-col gap-2">
                {collections.map((collection) => (
                  <li key={collection.slug}>
                    <UnderlineLink
                      href={`/collections/${collection.slug}`}
                      className="body-base text-charcoal"
                    >
                      {collection.name}
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed plate. */}
      <section aria-label="Project photography" className="bg-ivory">
        <RevealImage
          image={project.gallery[0]}
          sizes="100vw"
          className="h-[70svh] w-full"
          parallax={12}
          width={2000}
        />
      </section>

      {/* Quote. */}
      {project.quote ? (
        <section
          className="section-y bg-charcoal text-porcelain"
          aria-label="Designer comment"
        >
          <div className="shell">
            <blockquote className="flex flex-col gap-10">
              <AnimatedText
                as="p"
                lines={project.quote.text.split(". ").map((part, i, arr) =>
                  i < arr.length - 1 ? `${part}.` : part,
                )}
                className="display-lg max-w-4xl text-porcelain"
              />
              <Reveal>
                <footer data-anim="fade-up" className="flex flex-col gap-1">
                  <cite className="body-base not-italic text-porcelain">
                    {project.quote.author}
                  </cite>
                  <span className="label text-porcelain/45">
                    {project.quote.role}
                  </span>
                </footer>
              </Reveal>
            </blockquote>
          </div>
        </section>
      ) : null}

      {/* Remaining gallery, asymmetric. */}
      <section className="section-y bg-porcelain" aria-label="More project photography">
        <div className="shell">
          <Reveal className="grid grid-cols-12 gap-4 sm:gap-6" stagger={0.1}>
            <div className="col-span-12 sm:col-span-5">
              <RevealImage
                image={project.gallery[1]}
                sizes="(max-width: 640px) 92vw, 40vw"
                className="aspect-[3/4] w-full"
                parallax={14}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 sm:col-start-7 sm:mt-[12vh]">
              <RevealImage
                image={project.gallery[2]}
                sizes="(max-width: 640px) 92vw, 48vw"
                className="aspect-[4/3] w-full"
                parallax={-10}
              />
            </div>
            <div className="col-span-12 sm:col-span-8 sm:col-start-3">
              <RevealImage
                image={project.gallery[3]}
                sizes="(max-width: 640px) 92vw, 64vw"
                className="aspect-[16/9] w-full"
                parallax={8}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next projects. */}
      <section className="section-y bg-sand" aria-labelledby="more-projects">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <h2
              id="more-projects"
              data-anim="fade-up"
              className="display-md text-charcoal"
            >
              Next projects
            </h2>
            <Rule />
          </Reveal>

          <Reveal
            className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-2"
            stagger={0.12}
          >
            {more.map((item, i) => (
              <ProjectCard
                key={item.slug}
                project={item}
                className={i === 1 ? "lg:mt-[10vh]" : undefined}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
