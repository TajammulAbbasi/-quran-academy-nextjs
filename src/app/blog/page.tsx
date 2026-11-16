import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, Section } from "@/components/Chrome";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Quran Learning Blog — Guides for Parents | Noor Quran Academy",
  description:
    "Practical guides for parents: how kids learn Quran online, Hifz memorisation tips, and what Tajweed is — written by Noor Quran Academy.",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[["/", "Home"], ["/blog", "Blog"]]} />
      <Section title="Quran Learning Blog" sub="Practical guides for parents — how online Quran learning works, Hifz tips, and Tajweed in plain words.">
        <div className="grid gap-4 md:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <article key={p.slug} className="lift bg-white border border-emerald-200 rounded-2xl p-5">
              <h2 className="font-bold text-lg text-emerald-900">
                <Link href={`/blog/${p.slug}`} className="hover:text-emerald-600">{p.title}</Link>
              </h2>
              <p className="text-xs text-emerald-700 mt-1">{p.date} · {p.minutes} min read</p>
              <p className="text-sm mt-2">{p.description}</p>
              <Link href={`/blog/${p.slug}`} className="text-emerald-700 font-semibold text-sm mt-3 inline-block">Read the guide →</Link>
            </article>
          ))}
        </div>
        <p className="text-sm mt-6">
          Want to try a class? <Link href="/free-trial" className="text-emerald-700 font-semibold underline">Book a free trial class</Link> or see our{" "}
          <Link href="/courses" className="text-emerald-700 font-semibold underline">Quran courses</Link>.
        </p>
      </Section>
    </>
  );
}
