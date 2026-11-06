import type { MetadataRoute } from "next";
import { pageMeta, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(pageMeta).map((m) => ({
    url: m.canonical,
    lastModified: now,
    changeFrequency: m.url_path === "/" ? "weekly" : "monthly",
    priority: m.url_path === "/" ? 1 : m.page_type === "main" ? 0.8 : 0.7,
  }));
}
