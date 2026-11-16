import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Section } from "@/components/Chrome";
import TeachersList from "@/components/TeachersList";

export const metadata: Metadata = {
  title: `Our Teachers — Qualified Male & Female Quran Teachers | ${SITE.name}`,
  description: "Qualified male and female Quran teachers for kids and adults. Only owner-approved teachers teach. Apply to teach with us.",
};

export default function TeachersPage() {
  return (
    <Section title="Our Teachers" sub="Qualified male and female teachers. Only owner-approved teachers appear here — phone numbers and pay are never shown publicly.">
      <TeachersList />
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 mt-6 max-w-2xl">
        <h2 className="font-bold text-emerald-900">Want to teach with us?</h2>
        <p className="text-sm mt-2">If you are a qualified Quran teacher (Hifz / Tajweed), apply from the Teacher page. The owner reviews every application.</p>
        <Link href="/teacher" className="inline-block mt-4 bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full">Teach With Us — Apply</Link>
      </div>
      <p className="text-xs text-emerald-700 mt-4">Demo note: the teachers shown are starter demo profiles. Replace them with real approved teachers from the Owner Dashboard.</p>
      <p className="text-sm mt-4">For parents: <Link href="/courses" className="text-emerald-700 underline">see the courses our teachers teach</Link> and <Link href="/fees" className="text-emerald-700 underline">see fees &amp; payment details</Link>.</p>
    </Section>
  );
}
