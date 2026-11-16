import type { Metadata } from "next";
import AdmissionForm from "@/components/AdmissionForm";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "Admission — Book a Free Trial Quran Class | Noor Quran Academy",
  description: "Book a free trial Quran class for your child in the UK, USA, Canada or Australia. No payment before the trial.",
};

export default function AdmissionPage() {
  return (
    <Section title="Admission — Free Trial Class" sub="Fill the form and we will message you on WhatsApp to fix your free trial class time. Timing is flexible — you choose.">
      <AdmissionForm />
    </Section>
  );
}
