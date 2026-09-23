import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing here is private; this simply keeps the image proxy out of
        // crawl budget.
        disallow: ["/_next/image"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
