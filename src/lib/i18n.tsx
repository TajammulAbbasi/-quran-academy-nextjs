// English main, Roman Urdu toggle. The toggle switches the main UI strings;
// course names, fees and legal/payment text stay in English so banks and
// foreign parents can read them exactly.
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "ru";
const dict: Record<string, { en: string; ru: string }> = {
  navHome: { en: "Home", ru: "Ghar" },
  navCourses: { en: "Courses", ru: "Courses" },
  navTeachers: { en: "Teachers", ru: "Ustad" },
  navFees: { en: "Fees", ru: "Fees" },
  navTimetable: { en: "Timing", ru: "Timing" },
  navAdmission: { en: "Admission", ru: "Admission" },
  navFaq: { en: "FAQ", ru: "Sawal Jawab" },
  navContact: { en: "Contact", ru: "Rabta" },
  navStudent: { en: "Student Login", ru: "Student Login" },
  navTeacher: { en: "Teacher", ru: "Teacher" },
  navOwner: { en: "Owner", ru: "Owner" },
  navAi: { en: "AI Tools", ru: "AI Tools" },
  heroTitle: { en: "Learn Quran Online — 1-to-1 Live Classes", ru: "Quran Online Seekhein — 1-to-1 Live Classes" },
  heroSub: { en: "Qualified male & female teachers for kids and adults in the UK, USA, Canada and Australia. Flexible timing — you choose your class time.", ru: "UK, USA, Canada aur Australia ke bachon aur baron ke liye qabil ustad. Timing flexible hai — aap apna time khud choose karein." },
  freeTrial: { en: "Book a Free Trial Class", ru: "Muft Trial Class Book Karein" },
  whatsappUs: { en: "WhatsApp Us", ru: "WhatsApp Karein" },
  coursesTitle: { en: "Our Courses", ru: "Hamare Courses" },
  teachersTitle: { en: "Meet Your Teachers", ru: "Apne Ustad Se Milain" },
  feesTitle: { en: "Fees — Simple Monthly Plans", ru: "Fees — Asan Monthly Plans" },
  flexibleTitle: { en: "Flexible Timing — You Choose Your Class Time", ru: "Flexible Timing — Aap Apna Class Time Khud Choose Karein" },
  flexibleBody: { en: "No class time is fixed or compulsory. Tell us when your child is free — usually after school — and we set the class at that time. Your teacher and the owner can change your class time anytime in the dashboard.", ru: "Koi time lazmi nahi hai. Bata dein bacha kab free hota hai — aam tor par school ke baad — aur hum usi time class laga dein ge. Aap ka ustad aur owner dashboard se time kabhi bhi badal sakte hain." },
  admissionTitle: { en: "Admission — Free Trial Class", ru: "Admission — Muft Trial Class" },
  faqTitle: { en: "Frequently Asked Questions", ru: "Aksar Pooche Jane Wale Sawal" },
};
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: "en", setLang: () => {}, t: (k) => dict[k]?.en ?? k,
});
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: string) => dict[k]?.[lang] ?? dict[k]?.en ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}
export function useLang() { return useContext(Ctx); }
export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border border-emerald-700 overflow-hidden text-xs font-semibold">
      <button onClick={() => setLang("en")} className={`px-3 py-1.5 ${lang === "en" ? "bg-emerald-700 text-white" : "bg-white text-emerald-800"}`}>English</button>
      <button onClick={() => setLang("ru")} className={`px-3 py-1.5 ${lang === "ru" ? "bg-emerald-700 text-white" : "bg-white text-emerald-800"}`}>Roman Urdu</button>
    </div>
  );
}
