import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ARTICLES, articleBySlug } from "@/lib/data/journal";
import { SITE } from "@/lib/data/site";
import { src } from "@/lib/images";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { JournalCard } from "@/components/cards/JournalCard";
import { RevealImage } from "@/components/ui/RevealImage";
import { Reveal, Rule } from "@/components/ui/Primitives";
import { Newsletter } from "@/components/forms/Newsletter";
import { CallToAction } from "@/components/home/CallToAction";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = articleBySlug(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/journal/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: src(article.cover, 1200), alt: article.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: SITE.legalName },
    image: [src(article.cover, 1200)],
    articleSection: article.category,
  };

  return (
    <>
      <Script
        id={`article-jsonld-${article.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={article.category}
        title={[article.title]}
        lead={article.standfirst}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.category },
        ]}
        meta={[
          { label: "Written by", value: article.author },
          { label: "Published", value: formatDate(article.date) },
          { label: "Reading time", value: article.readTime },
        ]}
      />

      {/* Lead plate. */}
      <section aria-label="Article image" className="bg-porcelain">
        <div className="shell">
          <RevealImage
            image={article.cover}
            sizes="(max-width: 1280px) 92vw, 1200px"
            className="aspect-[16/9] w-full"
            parallax={8}
            width={1800}
          />
        </div>
      </section>

      {/* Body. Narrow measure, generous leading. */}
      <article className="section-y bg-porcelain">
        <div className="shell">
          <div className="mx-auto flex max-w-[44rem] flex-col gap-12">
            {article.body.map((block, i) => (
              <Reveal key={i} className="flex flex-col gap-5">
                {block.heading ? (
                  <h2 data-anim="fade-up" className="display-sm mt-4 text-charcoal">
                    {block.heading}
                  </h2>
                ) : null}

                {block.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    data-anim="fade-up"
                    className={
                      i === 0 && j === 0
                        ? "body-lg text-charcoal"
                        : "body-lg text-umber"
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                {block.image ? (
                  <figure className="mt-4 flex flex-col gap-3">
                    <RevealImage
                      image={block.image}
                      sizes="(max-width: 768px) 92vw, 44rem"
                      className="aspect-[3/2] w-full"
                      width={1200}
                    />
                    <figcaption className="body-sm text-umber/60">
                      {block.image.alt}
                    </figcaption>
                  </figure>
                ) : null}
              </Reveal>
            ))}

            <Reveal className="mt-8 flex flex-col gap-6">
              <Rule />
              <div data-anim="fade-up" className="flex flex-col gap-2">
                <span className="label text-umber/50">Written by</span>
                <span className="display-sm text-charcoal">
                  {article.author}
                </span>
                <span className="body-sm text-umber/70">
                  Demo byline for this placeholder article.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* Subscribe. */}
      <section className="section-y bg-ivory" aria-labelledby="article-subscribe">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2
              id="article-subscribe"
              data-anim="fade-up"
              className="display-md max-w-md text-charcoal"
            >
              More like this, once a month.
            </h2>
          </Reveal>
          <Reveal className="flex items-end">
            <div data-anim="fade-up" className="w-full">
              <Newsletter />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Further reading. */}
      <section className="section-y bg-porcelain" aria-labelledby="more-articles">
        <div className="shell">
          <Reveal className="flex flex-col gap-8">
            <h2
              id="more-articles"
              data-anim="fade-up"
              className="display-md text-charcoal"
            >
              Keep reading
            </h2>
            <Rule />
          </Reveal>

          <Reveal
            className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
          >
            {more.map((item) => (
              <JournalCard key={item.slug} article={item} />
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
