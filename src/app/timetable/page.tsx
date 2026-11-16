import type { Metadata } from "next";
import { Section, TimezonePicker } from "@/components/Chrome";

export const metadata: Metadata = {
  title: `Flexible Timing — You Choose Your Class Time | Noor Quran Academy`,
  description: "No fixed class time. Students in the UK, USA, Canada and Australia choose their own Quran class time — usually after school. The owner or teacher can change it anytime.",
};

export default function TimetablePage() {
  return (
    <Section title="Flexible Timing — You Choose Your Class Time" sub="No class time is fixed or compulsory. You tell us when your child is free, and we set the class at that time. The owner or teacher can change your class time anytime in the dashboard.">
      <TimezonePicker />
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 mt-6 max-w-3xl text-sm space-y-2">
        <p><strong>UK:</strong> most kids take class at 4:00–6:00 PM after school. <strong>USA / Canada:</strong> most kids take class at 4:00–6:00 PM Eastern. <strong>Australia:</strong> most kids take class at 4:00–6:00 PM Sydney time.</p>
        <p>These are examples only — tell us your time on the admission form and we will adjust. Classes are 30 minutes, 1-to-1, live on Zoom / Google Meet.</p>
        <p>Weekend classes are also available.</p>
      </div>
    </Section>
  );
}
