import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Section, WhatsAppButton } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `Free Trial Quran Class — No Payment, No Lock-in | ${SITE.name}`,
  description: "Book a free trial Quran class for your child. 1-to-1 live lesson with a qualified teacher, at your chosen time. No payment before the trial.",
};

export default function FreeTrialPage() {
  return (
    <Section title="Free Trial Quran Class" sub="One free 1-to-1 live lesson. Meet the teacher, check the teaching, then decide. No payment before the trial. No lock-in.">
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-2xl">
        <ol className="list-decimal pl-5 text-sm space-y-2">
          <li>Message us on WhatsApp or fill the admission form with your child&apos;s name, age and country.</li>
          <li>Tell us your preferred time — after school in the UK, USA, Canada or Australia.</li>
          <li>Take the trial lesson on Zoom / Google Meet.</li>
          <li>If you like it, pay the monthly fee to the academy&apos;s bank account and classes start.</li>
        </ol>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/admission" className="bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">Book Free Trial</Link>
          <WhatsAppButton />
        </div>
      </div>
      <p className="text-xs text-emerald-700 mt-4 max-w-2xl">Marketing note (Phase 1): this page is for SEO only. No paid ads are running.</p>
    </Section>
  );
}
