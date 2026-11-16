import type { Metadata } from "next";
import AiTools from "@/components/AiTools";
import { Section } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "AI Tools — AI Quran Assistant, Quiz & Hifz Revision Planner | Noor Quran Academy",
  description: "AI Quran Assistant answers questions in Roman Urdu, an AI quiz tests Tajweed and Qaida, and the AI Hifz Revision Planner makes a 7-day plan.",
};

export default function AiToolsPage() {
  return (
    <Section title="AI Tools" sub="AI helpers for students and parents — built into the academy from the start.">
      <AiTools />
    </Section>
  );
}
