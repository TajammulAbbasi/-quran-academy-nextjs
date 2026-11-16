import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Section, WhatsAppButton } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `Fees & Payment — $30/£25 and $50/£40 per month | ${SITE.name}`,
  description: "Quran academy fees: 3 classes a week $30/£25 per month, 5 classes a week $50/£40 per month. Pay to the academy's bank account by Wise, Remitly, Western Union or bank transfer. No PayPal, no Stripe, no Payoneer.",
};

export default function FeesPage() {
  return (
    <Section title="Fees & Payment" sub="Simple monthly plans. No lock-in. 7-day money-back. No payment before your free trial class.">
      <div className="grid gap-4 md:grid-cols-2">
        {SITE.plans.map((p) => (
          <article key={p.id} className="bg-white border border-emerald-200 rounded-2xl p-6">
            <h2 className="font-bold text-xl text-emerald-900">{p.name}</h2>
            <p className="text-3xl font-bold mt-2">${p.usd} <span className="text-base font-normal">/ £{p.gbp} per month</span></p>
            <p className="text-sm text-emerald-700 mt-1">PKR fees: WhatsApp par poochein</p>
            <ul className="text-sm mt-3 space-y-1">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
          </article>
        ))}
      </div>

      <h2 className="text-xl font-bold text-emerald-900 mt-10">How to pay from abroad — bank account only</h2>
      <p className="text-sm mt-2 max-w-3xl">The academy only has a bank account. It has <strong>no PayPal, no Stripe and no Payoneer account</strong>, and it does not need one. You send the fee from your own app to the academy&apos;s bank account:</p>
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        {SITE.paymentMethods.map((m) => (
          <article key={m.id} className="bg-white border border-emerald-200 rounded-2xl p-5">
            <h3 className="font-bold text-emerald-900">{m.name}</h3>
            <p className="text-sm mt-1">{m.note}</p>
          </article>
        ))}
      </div>

      <h2 className="text-xl font-bold text-emerald-900 mt-10">Payment steps</h2>
      <ol className="list-decimal pl-5 mt-2 text-sm space-y-1 max-w-3xl">
        <li>Choose your plan and tell us on WhatsApp which method you will use.</li>
        <li>The owner sends you the bank details (bank name, account title, IBAN, SWIFT code). Fill them in the Owner Dashboard &gt; Settings before taking real payments.</li>
        <li>Send the fee from your Wise / Remitly / bank app, or by Western Union (send the MTCN number).</li>
        <li>Send the payment screenshot or transaction ID on WhatsApp: <a className="underline" href={SITE.whatsappLink}>{SITE.whatsappIntl}</a>.</li>
        <li>The teacher confirms it and marks your fee Paid in the dashboard. Then classes start.</li>
      </ol>
      <div className="flex flex-wrap gap-3 mt-6">
        <Link href="/admission" className="bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">Book Free Trial</Link>
        <WhatsAppButton label="Ask About Fees on WhatsApp" />
      </div>
    </Section>
  );
}
