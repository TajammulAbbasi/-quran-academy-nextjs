import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Section, WhatsAppButton } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `Contact ${SITE.name} — WhatsApp 03127675565`,
  description: "Contact Noor Quran Academy on WhatsApp +92 312 7675565 for admission, fees and free trial classes.",
};

export default function ContactPage() {
  return (
    <Section title="Contact Us" sub="The fastest way to reach us is WhatsApp. We reply the same day.">
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-xl space-y-3 text-sm">
        <p><strong>WhatsApp:</strong> <a className="underline" href={SITE.whatsappLink}>{SITE.whatsappIntl}</a> ({SITE.whatsappDisplay})</p>
        <p><strong>Email:</strong> {SITE.email}</p>
        <p><strong>Students:</strong> UK, USA, Canada, Australia and Pakistan</p>
        <p><strong>Class time:</strong> Flexible — you choose your time</p>
        <div className="pt-2"><WhatsAppButton /></div>
      </div>
    </Section>
  );
}
