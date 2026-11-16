import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.baseUrl;
  const pages = ["", "/courses", "/teachers", "/fees", "/timetable", "/admission", "/faq", "/contact", "/ai-tools", "/free-trial", "/student", "/teacher",
    ...SITE.countries.map((c) => `/countries/${c.code}`),
    ...SITE.courses.map((c) => `/courses/${c.slug}`)];
  return pages.map((p) => ({ url: base + p, lastModified: new Date(), changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
