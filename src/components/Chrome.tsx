"use client";
import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/config/site";
import { LangToggle, useLang } from "@/lib/i18n";

export function Header() {
  const { t } = useLang();
  const links: [string, string][] = [
    ["/", t("navHome")], ["/courses", t("navCourses")], ["/teachers", t("navTeachers")],
    ["/fees", t("navFees")], ["/timetable", t("navTimetable")], ["/faq", t("navFaq")],
    ["/contact", t("navContact")], ["/ai-tools", t("navAi")],
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-emerald-700 text-white grid place-items-center text-xl font-bold">N</span>
          <span><span className="block font-bold text-emerald-900 leading-tight">{SITE.name}</span>
          <span className="block text-xs text-emerald-700">Online Quran Academy — UK · USA · Canada · Australia</span></span>
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-emerald-900">
          {links.map(([href, label]) => <Link key={href} href={href} className="hover:text-emerald-600">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full">WhatsApp {SITE.whatsappDisplay}</a>
        </div>
      </div>
      <div className="bg-emerald-800 text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap gap-x-4 gap-y-1 justify-between">
          <span><Link href="/student" className="underline">{t("navStudent")}</Link> · <Link href="/teacher" className="underline">{t("navTeacher")}</Link> · <Link href="/owner" className="underline">{t("navOwner")} Dashboard</Link></span>
          <span>Free Trial Class · No lock-in · 7-day money-back</span>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-bold text-white text-lg">{SITE.name}</p>
          <p className="text-sm mt-2">1-to-1 live Quran classes for kids and adults, taught online from Pakistan to students in the UK, USA, Canada and Australia.</p>
          <p className="text-sm mt-3">WhatsApp: <a className="underline" href={SITE.whatsappLink}>{SITE.whatsappIntl}</a></p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white mb-2">Quick Links</p>
          <ul className="space-y-1">
            <li><Link href="/courses">Courses</Link></li>
            <li><Link href="/fees">Fees &amp; Payment</Link></li>
            <li><Link href="/admission">Admission / Free Trial</Link></li>
            <li><Link href="/teachers">Teach With Us</Link></li>
            <li><Link href="/free-trial">Free Trial landing page</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white mb-2">For Students Abroad</p>
          <ul className="space-y-1">
            <li><Link href="/countries/uk">Quran classes in the UK</Link></li>
            <li><Link href="/countries/usa">Quran classes in the USA</Link></li>
            <li><Link href="/countries/canada">Quran classes in Canada</Link></li>
            <li><Link href="/countries/australia">Quran classes in Australia</Link></li>
          </ul>
          <p className="mt-3 text-xs text-emerald-300">Payment: bank account only. No PayPal, no Stripe, no Payoneer. Students send via their Wise / Remitly app to the academy&apos;s IBAN.</p>
        </div>
      </div>
      <p className="text-center text-xs text-emerald-300 pb-6">© {new Date().getFullYear()} {SITE.name} — Demo teachers and reviews are starter copy until real ones are added.</p>
    </footer>
  );
}

export function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">{title}</h2>
      {sub && <p className="text-emerald-800 mt-2 max-w-3xl">{sub}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function WhatsAppButton({ label }: { label?: string }) {
  return <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="inline-block bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full">{label ?? `WhatsApp ${SITE.whatsappDisplay}`}</a>;
}

/** Timezone converter: pick a country, see example class times in that timezone. */
export function TimezonePicker() {
  const [tz, setTz] = useState("Europe/London");
  const base = new Date();
  const examples = [16, 17, 18].map((h) => {
    const d = new Date(base); d.setHours(h, 30, 0, 0);
    return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(d);
  });
  return (
    <div className="bg-white border border-emerald-200 rounded-2xl p-5">
      <label className="block text-sm font-semibold text-emerald-900">Choose your country / timezone</label>
      <select value={tz} onChange={(e) => setTz(e.target.value)} className="mt-2 w-full border border-emerald-300 rounded-lg px-3 py-2">
        {SITE.countries.map((c) => <option key={c.code} value={c.tz}>{c.name} — {c.tzLabel}</option>)}
      </select>
      <p className="text-sm text-emerald-800 mt-3">Example class times in your timezone: <strong>{examples.join(" · ")}</strong>. These are examples only — you choose your own time.</p>
    </div>
  );
}
