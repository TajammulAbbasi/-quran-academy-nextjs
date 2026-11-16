import type { Metadata } from "next";
import { OwnerDashboard } from "@/components/Dashboards";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = { title: "Owner Dashboard | Noor Quran Academy", description: "Owner-only dashboard: all students, teachers, fees, assignments and teacher pay." };

export default function OwnerPage() {
  return (
    <Section title="Owner Dashboard" sub="Only the owner can open this. Demo PIN is 1234 — change it before going live.">
      <OwnerDashboard />
    </Section>
  );
}
