import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/site";
import { COLLECTIONS } from "@/lib/data/collections";
import { PRODUCTS } from "@/lib/data/products";
import { PROJECTS } from "@/lib/data/projects";
import { ARTICLES } from "@/lib/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;

  const statics: MetadataRoute.Sitemap = (
    [
      { url: url("/"), priority: 1, changeFrequency: "monthly" },
      { url: url("/collections"), priority: 0.9, changeFrequency: "monthly" },
      { url: url("/products"), priority: 0.9, changeFrequency: "monthly" },
      { url: url("/projects"), priority: 0.8, changeFrequency: "monthly" },
      { url: url("/craft"), priority: 0.7, changeFrequency: "yearly" },
      { url: url("/about"), priority: 0.6, changeFrequency: "yearly" },
      { url: url("/sustainability"), priority: 0.6, changeFrequency: "yearly" },
      { url: url("/journal"), priority: 0.7, changeFrequency: "weekly" },
      { url: url("/contact"), priority: 0.6, changeFrequency: "yearly" },
      { url: url("/site-notes"), priority: 0.3, changeFrequency: "yearly" },
    ] satisfies MetadataRoute.Sitemap
  );

  return [
    ...statics,
    ...COLLECTIONS.map((c) => ({
      url: url(`/collections/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: url(`/products/${p.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...PROJECTS.map((p) => ({
      url: url(`/projects/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...ARTICLES.map((a) => ({
      url: url(`/journal/${a.slug}`),
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
