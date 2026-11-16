import type { Metadata } from "next";
import { TeacherDashboard } from "@/components/Dashboards";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = { title: "Teacher — Teach With Us & Teacher Login | Noor Quran Academy", description: "Apply to teach Quran online, or log in to your teacher dashboard to see your assigned students." };

export default function TeacherPage() {
  return (
    <Section title="Teachers" sub="Apply to teach with us, or log in to see your assigned students. Only owner-approved teachers appear publicly — phone and pay are never shown.">
      <TeacherDashboard />
    </Section>
  );
}
