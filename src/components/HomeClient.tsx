"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SITE } from "@/config/site";
import { useLang } from "@/lib/i18n";
import { Section, TimezonePicker, WhatsAppButton } from "@/components/Chrome";
import TeachersList from "@/components/TeachersList";

// 3D hero is decorative only and client-side: lazy-loaded, never rendered
// on the server, so the build and all SEO text are unaffected.
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

export default function HomeClient() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-emerald-800 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-14 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">{t("heroTitle")}</h1>
            <p className="mt-4 text-emerald-100 max-w-2xl text-lg">{t("heroSub")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/admission" className="btn-anim bg-white text-emerald-800 font-bold px-6 py-3 rounded-full">{t("freeTrial")}</Link>
              <WhatsAppButton />
              <Link href="/ai-tools" className="btn-anim border border-white font-semibold px-6 py-3 rounded-full">Try the AI Tools</Link>
            </div>
            <p className="mt-4 text-sm text-emerald-200">No lock-in · 7-day money-back · Male &amp; female teachers · Ages 4+ and adults</p>
          </div>
          <Hero3D />
        </div>
      </section>

      <Section title={t("coursesTitle")} sub="Five courses, one teacher per student, live on Zoom / Google Meet.">
        <div className="grid gap-4 md:grid-cols-3">
          {SITE.courses.map((c) => (
            <article key={c.slug} className="lift bg-white border border-emerald-200 rounded-2xl p-5">
              <h3 className="font-bold text-lg text-emerald-900">{c.name}</h3>
              <p className="text-sm text-emerald-700 mt-1">Age {c.age} · {c.duration}</p>
              <p className="text-sm mt-2">{c.desc}</p>
              <Link href={`/courses/${c.slug}`} className="text-emerald-700 font-semibold text-sm mt-3 inline-block">Learn more about {c.name} →</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section title={t("teachersTitle")} sub="Qualified male & female teachers — only owner-approved teachers are shown here.">
        <TeachersList />
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/teachers" className="text-emerald-700 font-semibold text-sm inline-block">See all teachers →</Link>
          <Link href="/teacher" className="text-emerald-700 font-semibold text-sm inline-block">Teach With Us — Apply →</Link>
        </div>
      </Section>

      <Section title={t("flexibleTitle")} sub={t("flexibleBody")}>
        <TimezonePicker />
        <p className="text-sm text-emerald-800 mt-3">Example: a student in the UK picks 4:30 PM after school; a student in the USA picks 5:00 PM Eastern. The owner or teacher can change your class time anytime in the dashboard.</p>
      </Section>

      <Section title="How admission works" sub="Three simple steps — no payment before the free trial.">
        <ol className="grid gap-4 md:grid-cols-3 list-none">
          {["1. Book a free trial class on WhatsApp or the admission form.", "2. Meet your teacher at your chosen time and take the trial lesson.", "3. Pay the monthly fee to the academy's bank account (Wise / Remitly / bank transfer) and classes start."].map((s) => (
            <li key={s} className="lift bg-white border border-emerald-200 rounded-2xl p-5 text-sm">{s}</li>
          ))}
        </ol>
      </Section>

      <Section title={t("feesTitle")} sub="Pay monthly to the academy's bank account. No PayPal, no Stripe, no Payoneer — the academy only has a bank account.">
        <div className="grid gap-4 md:grid-cols-2">
          {SITE.plans.map((p) => (
            <article key={p.id} className="lift bg-white border border-emerald-200 rounded-2xl p-5">
              <h3 className="font-bold text-lg text-emerald-900">{p.name}</h3>
              <p className="text-3xl font-bold mt-2">${p.usd} <span className="text-base font-normal">/ £{p.gbp} per month</span></p>
              <p className="text-sm text-emerald-700 mt-1">PKR fees: WhatsApp par poochein</p>
              <ul className="text-sm mt-3 space-y-1">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            </article>
          ))}
        </div>
        <Link href="/fees" className="text-emerald-700 font-semibold text-sm mt-4 inline-block">See all payment methods →</Link>
      </Section>

      <Section title="For students in the UK, USA, Canada &amp; Australia">
        <div className="grid gap-4 md:grid-cols-4">
          {SITE.countries.map((c) => (
            <Link key={c.code} href={`/countries/${c.code}`} className="lift bg-white border border-emerald-200 rounded-2xl p-5 hover:border-emerald-500">
              <h3 className="font-bold text-emerald-900">{c.name}</h3>
              <p className="text-sm mt-1">{c.keyword}</p>
              <p className="text-xs text-emerald-700 mt-2">{c.tzLabel}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="What parents say" sub="Starter reviews — real parent reviews will replace these once the first students join.">
        <div className="grid gap-4 md:grid-cols-2">
          <blockquote className="lift bg-white border border-emerald-200 rounded-2xl p-5 text-sm">“My son reads Nazra now with Tajweed. The teacher is patient and the timing fits after school in London.” — Parent in the UK (demo review)</blockquote>
          <blockquote className="lift bg-white border border-emerald-200 rounded-2xl p-5 text-sm">“The Hifz tracker shows exactly which para my daughter has memorised. That is why we stayed.” — Parent in the USA (demo review)</blockquote>
        </div>
      </Section>

      <Section title={t("faqTitle")}>
        <div className="space-y-3 text-sm">
          <details className="bg-white border border-emerald-200 rounded-xl p-4"><summary className="font-semibold cursor-pointer">How much are the fees?</summary><p className="mt-2">Basic plan (3 classes a week) is $30 / £25 per month. Regular plan (5 classes a week) is $50 / £40 per month. PKR fees: WhatsApp par poochein.</p></details>
          <details className="bg-white border border-emerald-200 rounded-xl p-4"><summary className="font-semibold cursor-pointer">How do I pay from abroad?</summary><p className="mt-2">Pay to the academy&apos;s bank account. Send by Wise or Remitly from your own app to the academy&apos;s IBAN, by Western Union, or by direct bank transfer (SWIFT/IBAN). The academy has no PayPal, Stripe or Payoneer account. Send the screenshot or transaction ID on WhatsApp and the teacher confirms it.</p></details>
          <details className="bg-white border border-emerald-200 rounded-xl p-4"><summary className="font-semibold cursor-pointer">Is the class time fixed?</summary><p className="mt-2">No. Timing is flexible — you choose your class time. The owner or teacher can change it in the dashboard.</p></details>
          <details className="bg-white border border-emerald-200 rounded-xl p-4"><summary className="font-semibold cursor-pointer">Is there a free trial?</summary><p className="mt-2">Yes. Book a free trial class on WhatsApp {SITE.whatsappDisplay} or the admission form. No payment before the trial, no lock-in, 7-day money-back.</p></details>
        </div>
      </Section>
    </>
  );
}
