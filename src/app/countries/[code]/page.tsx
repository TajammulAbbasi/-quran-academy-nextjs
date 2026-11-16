import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/config/site";
import { Breadcrumb, Section, WhatsAppButton, TimezonePicker } from "@/components/Chrome";

export function generateStaticParams() {
  return SITE.countries.map((c) => ({ code: c.code }));
}
export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const c = SITE.countries.find((x) => x.code === params.code);
  return {
    title: c ? `${c.keyword} | ${SITE.name}` : "Country",
    description: c ? `Learn Quran online in ${c.name} with 1-to-1 live classes for kids and adults. Qualified teachers, flexible timing, free trial class. Fees $30/£25 and $50/£40 per month, paid to the academy's bank account.` : "",
  };
}

export default function CountryPage({ params }: { params: { code: string } }) {
  const c = SITE.countries.find((x) => x.code === params.code);
  if (!c) notFound();
  const otherCountries = SITE.countries.filter((x) => x.code !== c.code);
  return (
    <>
    <Breadcrumb items={[["/", "Home"], [`/countries/${c.code}`, `Quran Classes in ${c.name}`]]} />
    <Section title={`Learn Quran Online in ${c.name}`} sub={`${c.keyword}. 1-to-1 live classes for kids and adults, taught online from Pakistan by qualified male and female teachers.`}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-sm space-y-2">
          <p><strong>Classes:</strong> <Link href="/courses" className="text-emerald-700 underline">Noorani Qaida, Nazra, Hifz, Tajweed and Tafseer — see all courses</Link>.</p>
          <p><strong>Teachers:</strong> <Link href="/teachers" className="text-emerald-700 underline">qualified male and female teachers — meet our teachers</Link>.</p>
          <p><strong>Timing:</strong> Flexible — you choose your time, usually after school ({c.tzLabel}). <Link href="/timetable" className="text-emerald-700 underline">See flexible class timings</Link>.</p>
          <p><strong>Fees:</strong> 3 classes a week $30 / £25 per month · 5 classes a week $50 / £40 per month. <Link href="/fees" className="text-emerald-700 underline">See full fees &amp; payment details</Link>.</p>
          <p><strong>Payment:</strong> to the academy&apos;s bank account by Wise, Remitly, Western Union or bank transfer. No PayPal, no Stripe, no Payoneer.</p>
          <p><strong>Free trial:</strong> one free 1-to-1 lesson before you pay.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/admission" className="bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">Book Free Trial</Link>
            <WhatsAppButton label="WhatsApp Us" />
          </div>
        </div>
        <TimezonePicker />
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-emerald-900">Quran classes in other countries</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {otherCountries.map((o) => (
            <li key={o.code}><Link href={`/countries/${o.code}`} className="text-emerald-700 underline">Quran classes in {o.name}</Link></li>
          ))}
        </ul>
      </div>
      <p className="text-sm mt-6"><Link href="/" className="text-emerald-700 underline">← Back to home</Link></p>
    </Section>
    </>
  );
}
