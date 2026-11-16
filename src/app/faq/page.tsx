import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `FAQ — Fees, Payment, Timing, Teachers | ${SITE.name}`,
  description: "How much are Quran classes online? How do I pay from the UK, USA or Canada? Is the class time fixed? Answers for parents in the UK, USA, Canada and Australia.",
};

const FAQS = [
  ["How much are the fees?", "Basic plan (3 classes a week) is $30 / £25 per month. Regular plan (5 classes a week) is $50 / £40 per month. PKR fees: WhatsApp par poochein."],
  ["How do I pay from abroad?", "Pay to the academy's bank account. Send by Wise or Remitly from your own app to the academy's IBAN, by Western Union, or by direct bank transfer (SWIFT/IBAN). The academy has no PayPal, Stripe or Payoneer account. Send the screenshot or transaction ID on WhatsApp and the teacher confirms it."],
  ["Is the class time fixed?", "No. Timing is flexible — you choose your class time, usually after school. The owner or teacher can change it in the dashboard."],
  ["Is there a free trial class?", "Yes. Book a free trial class on WhatsApp 03127675565 or the admission form. No payment before the trial, no lock-in, 7-day money-back."],
  ["Who teaches my child?", "Qualified male and female teachers. Parents can ask for a female teacher for girls. Only owner-approved teachers teach, and you see your teacher's name in the student dashboard."],
  ["How do I track my child's progress?", "The student dashboard shows attendance, homework, fees and the 30-para Hifz Tracker, so parents can see exactly which paras are memorised."],
  ["Do you teach adults too?", "Yes. Adults can learn Nazra, Tajweed and Tafseer at their own time."],
  ["What do I need for the class?", "A phone, tablet or computer, internet, and Zoom or Google Meet. The teacher sends the class link before each lesson."],
];

// Helpful next step for each answer — kept separate from the answer text so
// the FAQPage JSON-LD above stays plain text.
const FAQ_LINKS: Record<string, { href: string; label: string }> = {
  "How much are the fees?": { href: "/fees", label: "See full fees & payment details" },
  "How do I pay from abroad?": { href: "/fees", label: "See how to pay from abroad" },
  "Is the class time fixed?": { href: "/timetable", label: "See flexible class timings" },
  "Is there a free trial class?": { href: "/free-trial", label: "Book a free trial class" },
  "Who teaches my child?": { href: "/teachers", label: "Meet our teachers" },
  "How do I track my child's progress?": { href: "/student", label: "Open the student dashboard" },
  "Do you teach adults too?": { href: "/courses", label: "See all courses for adults" },
};

export default function FaqPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section title="Frequently Asked Questions" sub="Plain, factual answers — for parents and for AI search. WhatsApp us on 03127675565 for anything else.">
        <div className="space-y-3 max-w-3xl">
          {FAQS.map(([q, a]) => (
            <details key={q} className="bg-white border border-emerald-200 rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">{q}</summary>
              <p className="mt-2 text-sm">{a}</p>
              {FAQ_LINKS[q] && (
                <p className="mt-2 text-sm"><Link href={FAQ_LINKS[q].href} className="text-emerald-700 font-semibold underline">{FAQ_LINKS[q].label} →</Link></p>
              )}
            </details>
          ))}
        </div>
        <p className="text-sm mt-6">WhatsApp: <a className="underline" href={SITE.whatsappLink}>{SITE.whatsappIntl}</a></p>
      </Section>
    </>
  );
}
