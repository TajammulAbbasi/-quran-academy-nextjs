import type { Metadata } from "next";
import { StudentDashboard } from "@/components/Dashboards";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = { title: "Student Login — Dashboard | Noor Quran Academy", description: "Student login by phone. See attendance, homework, fees, teacher and the 30-para Hifz Tracker." };

export default function StudentPage() {
  return (
    <Section title="Student Dashboard" sub="Log in with your parent phone number. Demo phone: 03127675565.">
      <StudentDashboard />
    </Section>
  );
}
