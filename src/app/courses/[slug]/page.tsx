import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { Section, WhatsAppButton } from "@/components/Chrome";

export function generateStaticParams() {
  return SITE.courses.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = SITE.courses.find((x) => x.slug === params.slug);
  return {
    title: c ? `${c.name} — Learn Quran Online | ${SITE.name}` : "Course",
    description: c?.desc ?? "",
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const c = SITE.courses.find((x) => x.slug === params.slug);
  if (!c) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Course", name: c.name, description: c.desc, provider: { "@type": "EducationalOrganization", name: SITE.name } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section title={c.name} sub={`${c.desc} Age ${c.age}. Duration ${c.duration}.`}>
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-2xl">
          <h2 className="font-bold text-emerald-900">What you will learn</h2>
          <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
            <li>1-to-1 live class with a qualified teacher</li>
            <li>Flexible timing — you choose your class time</li>
            <li>Monthly progress report for parents</li>
            <li>Free trial class before you pay</li>
          </ul>
          <p className="text-sm mt-4">Fees: Basic (3 classes a week) $30 / £25 per month · Regular (5 classes a week) $50 / £40 per month. PKR fees: WhatsApp par poochein.</p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link href="/admission" className="bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">Book Free Trial</Link>
            <WhatsAppButton label="Ask on WhatsApp" />
          </div>
        </div>
        <p className="mt-6 text-sm"><Link href="/courses" className="text-emerald-700 underline">← All courses</Link></p>
      </Section>
    </>
  );
}
