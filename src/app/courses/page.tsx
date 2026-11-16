import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `Quran Courses — Noorani Qaida, Nazra, Hifz, Tajweed, Tafseer | ${SITE.name}`,
  description: "Noorani Qaida, Nazra Quran, Hifz Quran, Tajweed and Tafseer — 1-to-1 live online Quran courses for kids and adults in the UK, USA, Canada and Australia.",
};

export default function CoursesPage() {
  return (
    <Section title="Our Courses" sub="Every course is 1-to-1, live, with a qualified teacher. Book a free trial class first — no payment before the trial.">
      <div className="grid gap-4 md:grid-cols-2">
        {SITE.courses.map((c) => (
          <article key={c.slug} className="bg-white border border-emerald-200 rounded-2xl p-6">
            <h2 className="font-bold text-xl text-emerald-900"><Link href={`/courses/${c.slug}`}>{c.name}</Link></h2>
            <p className="text-sm text-emerald-700 mt-1">Age {c.age} · Duration {c.duration}</p>
            <p className="mt-2 text-sm">{c.desc}</p>
            <Link href="/admission" className="inline-block mt-4 bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full">Book Free Trial</Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
