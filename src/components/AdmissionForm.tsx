"use client";
import { useState } from "react";
import { SITE } from "@/config/site";
import { load, save, uid, SEED_STUDENTS, Student } from "@/lib/store";

export default function AdmissionForm() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", age: "", country: "UK", course: "Nazra Quran", time: "" });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const students = load<Student[]>("nqa_students", SEED_STUDENTS);
    students.push({
      id: uid("s"), name: form.name, phone: form.phone, age: Number(form.age) || 0,
      country: form.country, course: form.course, plan: "Basic — 3 classes a week",
      teacherId: "", classTime: form.time || "To be set — flexible timing", timezone: "Europe/London",
      status: "trial", memorisedParas: [], feesPaid: false, homework: "Trial lesson — teacher will set homework after the first class.",
    });
    save("nqa_students", students);
    setDone(true);
  }
  if (done) return (
    <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6">
      <h3 className="font-bold text-emerald-900">Thank you — your trial request is saved!</h3>
      <p className="text-sm mt-2">We will message you on WhatsApp to fix your free trial class time. You can also message us directly:</p>
      <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="inline-block mt-3 bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-full text-sm">WhatsApp {SITE.whatsappDisplay}</a>
      <p className="text-xs mt-3 text-emerald-700">Demo note: admissions are saved in this browser (localStorage). The owner sees them in the Owner Dashboard.</p>
    </div>
  );
  const input = "w-full border border-emerald-300 rounded-lg px-3 py-2 mt-1";
  return (
    <form onSubmit={submit} className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 max-w-xl">
      <div><label className="text-sm font-semibold">Student name</label><input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
      <div><label className="text-sm font-semibold">Parent WhatsApp / phone</label><input required className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="e.g. +44 ..." /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-semibold">Age</label><input required type="number" min={4} max={80} className={input} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></div>
        <div><label className="text-sm font-semibold">Country</label>
          <select className={input} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
            <option>UK</option><option>USA</option><option>Canada</option><option>Australia</option><option>Pakistan</option><option>Other</option>
          </select></div>
      </div>
      <div><label className="text-sm font-semibold">Course</label>
        <select className={input} value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
          {SITE.courses.map((c) => <option key={c.slug}>{c.name}</option>)}
        </select></div>
      <div><label className="text-sm font-semibold">Preferred class time (flexible — you choose)</label><input className={input} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. Mon/Wed/Fri 4:30 PM UK time" /></div>
      <button className="bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full">Book Free Trial Class</button>
      <p className="text-xs text-emerald-700">No payment before the trial. No lock-in. 7-day money-back.</p>
    </form>
  );
}
