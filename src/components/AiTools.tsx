"use client";
import { useState } from "react";
import { load, SEED_STUDENTS, Student, PARA_NAMES } from "@/lib/store";

const QUIZ = [
  { q: "What is Tajweed?", a: ["Reading fast", "Reading the Quran with correct pronunciation rules", "Memorising only"], correct: 1 },
  { q: "Which letter comes first in Noorani Qaida?", a: ["Baa", "Alif", "Jeem"], correct: 1 },
  { q: "What is Sabaq in Hifz?", a: ["Old revision", "The new lesson memorised today", "The final exam"], correct: 1 },
  { q: "How many paras are in the Quran?", a: ["25", "30", "35"], correct: 1 },
  { q: "What is Ghunnah?", a: ["A nasal sound", "A loud voice", "A pause"], correct: 0 },
];

function aiAnswer(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("fee") || s.includes("price") || s.includes("cost") || s.includes("fees"))
    return "Fees: Basic plan (3 classes a week) is $30 / £25 per month. Regular plan (5 classes a week) is $50 / £40 per month. PKR fees: WhatsApp par poochein — message us on WhatsApp 03127675565.";
  if (s.includes("pay") || s.includes("payment") || s.includes("wise") || s.includes("bank"))
    return "Payment is bank-only. Send to the academy's bank account by Wise or Remitly (from your own app to our IBAN), by Western Union, or by direct bank transfer (SWIFT/IBAN). The academy has no PayPal, no Stripe and no Payoneer account. Send the screenshot or transaction ID on WhatsApp and the teacher will confirm it.";
  if (s.includes("time") || s.includes("timing") || s.includes("schedule"))
    return "Timing is flexible — you choose your class time, usually after school in the UK, USA, Canada or Australia. No time is fixed. The owner or teacher can change your class time in the dashboard.";
  if (s.includes("trial") || s.includes("free"))
    return "Yes, there is a free trial class — one free 1-to-1 live lesson. Book it on WhatsApp 03127675565 or the admission form. No payment before the trial.";
  if (s.includes("tajweed"))
    return "Tajweed means reading the Quran with correct pronunciation rules — Makharij (where each letter comes from), Sifaat, Ghunnah and Madd. Our Tajweed course takes 3–6 months, 1-to-1 with a teacher.";
  if (s.includes("hifz") || s.includes("memor"))
    return "Hifz means memorising the Quran. We use Sabaq (new lesson), Sabqi (recent revision) and Manzil (old revision). The student dashboard has a 30-para Hifz Tracker, and the AI Revision Planner below makes a 7-day plan from your memorised paras.";
  if (s.includes("teacher"))
    return "We have qualified male and female teachers. Parents can ask for a female teacher for girls. Only owner-approved teachers teach, and you see your teacher's name in the student dashboard.";
  if (s.includes("course") || s.includes("class"))
    return "Courses: Noorani Qaida (3–4 months), Nazra Quran (6–12 months), Hifz Quran (1–3 years), Tajweed (3–6 months), and Tafseer & Islamic Studies. All are 1-to-1 live classes, 30 minutes each.";
  return "Assalamu Alaikum! I can help in Roman Urdu or English. Ask me about fees, payment (bank only), timing, free trial class, courses, teachers or Hifz. For admission, WhatsApp us on 03127675565.";
}

export default function AiTools() {
  const [q, setQ] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([{ role: "ai", text: "Assalamu Alaikum! Main AI Quran Assistant hoon. Fees, payment, timing, trial class ya Hifz ke bare mein poochein — Roman Urdu ya English mein." }]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [paras, setParas] = useState("30, 29, 28");
  const [plan, setPlan] = useState<string[]>([]);

  function ask() {
    if (!q.trim()) return;
    setChat([...chat, { role: "user", text: q }, { role: "ai", text: aiAnswer(q) }]);
    setQ("");
  }
  function makePlan() {
    const list = paras.split(",").map((x) => Number(x.trim())).filter((n) => n >= 1 && n <= 30);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const p = days.map((d, i) => {
      if (list.length === 0) return `${d}: Start with Para 30 — read it 3 times, then memorise 5 ayahs.`;
      const para = list[i % list.length];
      return `${d}: Manzil — revise Para ${para} (${PARA_NAMES[para] ?? ""}). New Sabaq: 5 new ayahs from your current para. Sabqi: read yesterday's Sabaq once.`;
    });
    setPlan(p);
  }
  const students = typeof window !== "undefined" ? load<Student[]>("nqa_students", SEED_STUDENTS) : SEED_STUDENTS;
  const demo = students[0];

  return (
    <div className="space-y-8">
      <section className="bg-white border border-emerald-200 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-emerald-900">AI Quran Assistant</h2>
        <p className="text-sm text-emerald-700 mt-1">Ask about fees, bank payment, timing, trial class, courses or Hifz — in Roman Urdu or English. It never offers PayPal, Stripe or Payoneer.</p>
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {chat.map((m, i) => <p key={i} className={`text-sm p-3 rounded-xl ${m.role === "ai" ? "bg-emerald-50" : "bg-amber-50 text-right"}`}>{m.text}</p>)}
        </div>
        <div className="flex gap-2 mt-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} className="flex-1 border border-emerald-300 rounded-full px-4 py-2 text-sm" placeholder="e.g. Fees kitni hai? Payment kaise karein?" />
          <button onClick={ask} className="bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full text-sm">Ask</button>
        </div>
      </section>

      <section className="bg-white border border-emerald-200 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-emerald-900">AI Quiz — Tajweed &amp; Qaida</h2>
        <p className="text-sm mt-2">{QUIZ[qi].q}</p>
        <div className="grid gap-2 mt-3">
          {QUIZ[qi].a.map((opt, i) => (
            <button key={opt} onClick={() => { setPicked(i); if (i === QUIZ[qi].correct) setScore(score + 1); }}
              className={`text-left text-sm border rounded-xl px-4 py-2 ${picked === null ? "border-emerald-300" : i === QUIZ[qi].correct ? "bg-emerald-100 border-emerald-500" : picked === i ? "bg-red-50 border-red-400" : "border-emerald-200"}`}>{opt}</button>
          ))}
        </div>
        <p className="text-sm mt-3">Score: {score} / {QUIZ.length}</p>
        <button onClick={() => { setPicked(null); setQi((qi + 1) % QUIZ.length); }} className="mt-2 bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full">Next question</button>
      </section>

      <section className="bg-white border border-emerald-200 rounded-2xl p-6">
        <h2 className="font-bold text-xl text-emerald-900">AI Hifz Revision Planner</h2>
        <p className="text-sm text-emerald-700 mt-1">Enter the paras you have memorised (comma separated). Demo student {demo?.name ?? ""} has memorised: {demo?.memorisedParas.join(", ") ?? "—"}.</p>
        <div className="flex gap-2 mt-3">
          <input value={paras} onChange={(e) => setParas(e.target.value)} className="flex-1 border border-emerald-300 rounded-lg px-3 py-2 text-sm" />
          <button onClick={makePlan} className="bg-emerald-700 text-white font-semibold px-4 py-2 rounded-full text-sm">Make 7-day plan</button>
        </div>
        {plan.length > 0 && <ul className="mt-4 space-y-1 text-sm">{plan.map((p) => <li key={p} className="bg-emerald-50 rounded-lg px-3 py-2">{p}</li>)}</ul>}
      </section>
      <p className="text-xs text-emerald-700">AI tools are rule-based helpers built into the site (no external AI account needed). They give general guidance — your teacher checks the actual lesson.</p>
    </div>
  );
}
