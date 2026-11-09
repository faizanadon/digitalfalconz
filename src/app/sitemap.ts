import type { MetadataRoute } from "next";
import { pageMeta, site } from "@/data/site";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = Object.values(pageMeta).map((m) => ({
    url: m.canonical,
    lastModified: now,
    changeFrequency: m.url_path === "/" ? "weekly" : "monthly",
    priority: m.url_path === "/" ? 1 : m.page_type === "main" ? 0.8 : 0.7,
  }));
  // /meet and /discovery are not in pageMeta (generated SEO data), so they
  // are listed here.
  entries.push(
    { url: `${site.domain}/meet`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.domain}/discovery`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  );
  // Paid-media case study pages are dynamic routes, so they are listed here.
  for (const cs of CASE_STUDIES) {
    entries.push(
      { url: `${site.domain}/work/${cs.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    );
  }
  return entries;
}
