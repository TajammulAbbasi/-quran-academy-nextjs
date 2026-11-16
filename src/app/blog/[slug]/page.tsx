import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { BLOG_POSTS, getBlogPost, wordCount } from "@/lib/blog";
import { Breadcrumb, Section, WhatsAppButton } from "@/components/Chrome";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getBlogPost(params.slug);
  if (!p) return { title: "Blog" };
  return {
    title: `${p.title} | ${SITE.name}`,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      type: "article",
      url: `${SITE.baseUrl}/blog/${p.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = getBlogPost(params.slug);
  if (!p) notFound();
  const url = `${SITE.baseUrl}/blog/${p.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl },
    mainEntityOfPage: url,
  };
  const others = BLOG_POSTS.filter((x) => x.slug !== p.slug);
  // Related course links per article
  const relatedCourses =
    p.slug === "hifz-memorisation-tips-for-kids"
      ? ["/courses/hifz-quran", "/courses/tajweed"]
      : p.slug === "what-is-tajweed-and-why-it-matters"
        ? ["/courses/tajweed", "/courses/nazra-quran"]
        : ["/courses/noorani-qaida", "/courses/nazra-quran"];
  const courseName = (href: string) => SITE.courses.find((c) => `/courses/${c.slug}` === href)?.name ?? "Course";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[["/", "Home"], ["/blog", "Blog"], [`/blog/${p.slug}`, p.title]]} />
      <Section title={p.title} sub={`${p.date} · ${p.minutes} min read · about ${wordCount(p)} words`}>
        <article className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-3xl">
          <p className="text-base leading-relaxed">{p.intro}</p>
          {p.sections.map((s) => (
            <div key={s.h} className="mt-6">
              <h2 className="font-bold text-xl text-emerald-900">{s.h}</h2>
              {s.ps.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed mt-2">{para}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <h2 className="font-bold text-emerald-900">Try a free trial class</h2>
            <p className="text-sm mt-2">
              The best way to decide is one free 30-minute lesson with a qualified teacher — no payment before the trial, no lock-in, 7-day money-back. Fees after the trial are $30 / £25 per month for 3 classes a week, or $50 / £40 for 5 classes a week.{" "}
              <Link href="/fees" className="text-emerald-700 font-semibold underline">See fees &amp; payment</Link>.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/admission" className="bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">Book Free Trial</Link>
              <WhatsAppButton label="Ask on WhatsApp" />
            </div>
          </div>
        </article>

        <div className="mt-8 max-w-3xl">
          <h2 className="font-bold text-emerald-900">Related courses</h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {relatedCourses.map((href) => (
              <li key={href}>
                <Link href={href} className="inline-block bg-white border border-emerald-200 rounded-full px-4 py-2 text-emerald-700 font-semibold hover:border-emerald-500">{courseName(href)} →</Link>
              </li>
            ))}
            <li>
              <Link href="/courses" className="inline-block bg-white border border-emerald-200 rounded-full px-4 py-2 text-emerald-700 font-semibold hover:border-emerald-500">All courses →</Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 max-w-3xl">
          <h2 className="font-bold text-emerald-900">More guides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/blog/${o.slug}`} className="text-emerald-700 font-semibold underline">{o.title}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm"><Link href="/blog" className="text-emerald-700 underline">← All blog guides</Link></p>
        </div>
      </Section>
    </>
  );
}
