"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/config/site";
import { load, save, uid, SEED_STUDENTS, SEED_TEACHERS, SEED_FEES, PARA_NAMES } from "@/lib/store";
import type { Student, Teacher, FeeRecord, TeacherApplication, TeacherPayment } from "@/lib/store";

function useData<T>(key: string, seed: T) {
  const [data, setData] = useState<T>(seed);
  useEffect(() => { setData(load<T>(key, seed)); }, [key, seed]);
  const update = (v: T) => { setData(v); save(key, v); };
  return [data, update] as const;
}
const input = "w-full border border-emerald-300 rounded-lg px-3 py-2 mt-1 text-sm";
const card = "bg-white border border-emerald-200 rounded-2xl p-5";
const btn = "bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full";
const btn2 = "bg-white border border-emerald-600 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full";

/* ---------------- Student ---------------- */
export function StudentDashboard() {
  const [students, setStudents] = useData<Student[]>("nqa_students", SEED_STUDENTS);
  const [teachers] = useData<Teacher[]>("nqa_teachers", SEED_TEACHERS);
  const [fees] = useData<FeeRecord[]>("nqa_fees", SEED_FEES);
  const [phone, setPhone] = useState("");
  const [me, setMe] = useState<Student | null>(null);
  const [msg, setMsg] = useState("");
  function login() {
    const found = students.find((s) => s.phone.replace(/\D/g, "").endsWith(phone.replace(/\D/g, "").slice(-9)));
    if (found) { setMe(found); setMsg(""); } else setMsg("No student found with that phone number. Try the demo phone 03127675565, or book admission first.");
  }
  function togglePara(n: number) {
    if (!me) return;
    const next = me.memorisedParas.includes(n) ? me.memorisedParas.filter((x) => x !== n) : [...me.memorisedParas, n].sort((a, b) => a - b);
    const updated = { ...me, memorisedParas: next };
    setStudents(students.map((s) => (s.id === me.id ? updated : s)));
    setMe(updated);
  }
  if (!me) return (
    <div className={`${card} max-w-md`}>
      <h2 className="font-bold text-lg text-emerald-900">Student Login</h2>
      <p className="text-sm mt-1">Log in with the parent phone number used at admission. Demo phone: <strong>03127675565</strong></p>
      <label className="block text-sm font-semibold mt-4">Phone number</label>
      <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03127675565" />
      {msg && <p className="text-sm text-red-700 mt-2">{msg}</p>}
      <button onClick={login} className={`${btn} mt-4`}>Log in</button>
    </div>
  );
  const teacher = teachers.find((t) => t.id === me.teacherId);
  const myFees = fees.filter((f) => f.studentId === me.id);
  return (
    <div className="space-y-4">
      <div className={card}>
        <div className="flex justify-between flex-wrap gap-2">
          <div><h2 className="font-bold text-xl text-emerald-900">Assalamu Alaikum, {me.name}</h2>
          <p className="text-sm">Course: {me.course} · Plan: {me.plan} · Status: {me.status}</p>
          <p className="text-sm">Teacher: <strong>{teacher?.name ?? "Not assigned yet — the owner will assign a teacher"}</strong></p>
          <p className="text-sm">Class time: <strong>{me.classTime}</strong> (flexible — ask the owner to change it)</p></div>
          <button onClick={() => setMe(null)} className={btn2}>Log out</button>
        </div>
        {me.demo && <p className="text-xs text-amber-700 mt-2">Demo student — real students replace this after admission.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}><h3 className="font-bold text-emerald-900">Homework</h3><p className="text-sm mt-2">{me.homework}</p>
          <h3 className="font-bold text-emerald-900 mt-4">Attendance (this week)</h3>
          <p className="text-sm mt-1">Mon ✓ · Wed ✓ · Fri — next class. AI suggestion: attendance is good — keep the same time, it suits you.</p></div>
        <div className={card}><h3 className="font-bold text-emerald-900">My Fees</h3>
          {myFees.length === 0 ? <p className="text-sm mt-2">No fee record yet.</p> : myFees.map((f) => <p key={f.id} className="text-sm mt-2">${f.amount} {f.currency} · {f.method} · <strong>{f.status}</strong> · {f.date}</p>)}
          <p className="text-xs mt-2">Pay to the bank account only. Send the screenshot on WhatsApp {SITE.whatsappDisplay}.</p></div>
      </div>
      <div className={card}>
        <h3 className="font-bold text-emerald-900">Hifz Tracker — 30 Paras ({me.memorisedParas.length} memorised)</h3>
        <p className="text-sm mt-1">Tap a para to mark it memorised. Progress is saved in this browser.</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-3">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => togglePara(n)} title={PARA_NAMES[n]}
              className={`text-xs py-2 rounded-lg border ${me.memorisedParas.includes(n) ? "bg-emerald-700 text-white border-emerald-700" : "bg-white border-emerald-300"}`}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Teacher ---------------- */
export function TeacherDashboard() {
  const [teachers] = useData<Teacher[]>("nqa_teachers", SEED_TEACHERS);
  const [students, setStudents] = useData<Student[]>("nqa_students", SEED_STUDENTS);
  const [fees, setFees] = useData<FeeRecord[]>("nqa_fees", SEED_FEES);
  const [apps, setApps] = useData<TeacherApplication[]>("nqa_apps", []);
  const [pay] = useData<TeacherPayment[]>("nqa_pay", []);
  const [tab, setTab] = useState<"apply" | "login">("login");
  const [name, setName] = useState("");
  const [me, setMe] = useState<Teacher | null>(null);
  const [applyDone, setApplyDone] = useState(false);
  const [apply, setApply] = useState({ name: "", whatsapp: "", gender: "Male", qualification: "", experience: "", courses: "", languages: "English, Urdu", timings: "" });
  const [msg, setMsg] = useState("");

  function login() {
    const t = teachers.find((x) => x.approved && x.name.toLowerCase().includes(name.trim().toLowerCase()));
    if (t && name.trim()) { setMe(t); setMsg(""); } else setMsg("Teacher not found. Use a demo teacher name, e.g. Qari Abdul Rahman, or apply first and wait for owner approval.");
  }
  function submitApply(e: React.FormEvent) {
    e.preventDefault();
    setApps([...apps, { id: uid("a"), ...apply, status: "pending" }]);
    setApplyDone(true);
  }
  if (!me) return (
    <div className="space-y-4 max-w-xl">
      <div className="flex gap-2">
        <button onClick={() => setTab("login")} className={tab === "login" ? btn : btn2}>Teacher Login</button>
        <button onClick={() => setTab("apply")} className={tab === "apply" ? btn : btn2}>Teach With Us — Apply</button>
      </div>
      {tab === "login" ? (
        <div className={card}>
          <h2 className="font-bold text-lg text-emerald-900">Teacher Login</h2>
          <p className="text-sm mt-1">Demo: log in as <strong>Qari Abdul Rahman</strong> or <strong>Ustaza Amina Khan</strong>.</p>
          <label className="block text-sm font-semibold mt-4">Your name</label>
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} />
          {msg && <p className="text-sm text-red-700 mt-2">{msg}</p>}
          <button onClick={login} className={`${btn} mt-4`}>Log in</button>
        </div>
      ) : applyDone ? (
        <div className={`${card} bg-emerald-50`}><h3 className="font-bold text-emerald-900">Application sent!</h3><p className="text-sm mt-2">The owner will review it and approve you. Approved teachers appear on the Teachers page (phone and pay are never shown publicly).</p></div>
      ) : (
        <form onSubmit={submitApply} className={`${card} space-y-3`}>
          <h2 className="font-bold text-lg text-emerald-900">Teach With Us — Apply</h2>
          <input required placeholder="Full name" className={input} value={apply.name} onChange={(e) => setApply({ ...apply, name: e.target.value })} />
          <input required placeholder="WhatsApp number" className={input} value={apply.whatsapp} onChange={(e) => setApply({ ...apply, whatsapp: e.target.value })} />
          <select className={input} value={apply.gender} onChange={(e) => setApply({ ...apply, gender: e.target.value })}><option>Male</option><option>Female</option></select>
          <input required placeholder="Qualification (e.g. Hifz, Ijazah)" className={input} value={apply.qualification} onChange={(e) => setApply({ ...apply, qualification: e.target.value })} />
          <input required placeholder="Experience (e.g. 5 years teaching kids)" className={input} value={apply.experience} onChange={(e) => setApply({ ...apply, experience: e.target.value })} />
          <input required placeholder="Courses you can teach" className={input} value={apply.courses} onChange={(e) => setApply({ ...apply, courses: e.target.value })} />
          <input placeholder="Languages (English, Urdu)" className={input} value={apply.languages} onChange={(e) => setApply({ ...apply, languages: e.target.value })} />
          <input placeholder="Available timings" className={input} value={apply.timings} onChange={(e) => setApply({ ...apply, timings: e.target.value })} />
          <button className={btn}>Send Application</button>
        </form>
      )}
    </div>
  );
  const mine = students.filter((s) => s.teacherId === me.id);
  const myFees = fees.filter((f) => mine.some((s) => s.id === f.studentId));
  const collected = myFees.filter((f) => f.status === "Paid").reduce((a, f) => a + f.amount, 0);
  const due = me.payType === "commission" ? Math.round((collected * me.payValue) / 100) : me.payValue;
  const given = pay.filter((p) => p.teacherId === me.id).reduce((a, p) => a + p.amount, 0);
  return (
    <div className="space-y-4">
      <div className={card}>
        <div className="flex justify-between flex-wrap gap-2"><div>
          <h2 className="font-bold text-xl text-emerald-900">Assalamu Alaikum, {me.name}</h2>
          <p className="text-sm">Pay: {me.payType === "commission" ? `${me.payValue}% commission on fees collected` : `Monthly salary $${me.payValue}`} · Due ${due} · Given ${given} · Balance ${due - given}</p>
          <p className="text-sm">Fees collected from your students: ${collected}</p></div>
          <button onClick={() => setMe(null)} className={btn2}>Log out</button></div>
      </div>
      <div className={card}>
        <h3 className="font-bold text-emerald-900">My Students ({mine.length})</h3>
        {mine.length === 0 && <p className="text-sm mt-2">No students assigned yet. The owner assigns students to you.</p>}
        {mine.map((s) => (
          <div key={s.id} className="border-t border-emerald-100 py-3 text-sm">
            <p><strong>{s.name}</strong> — {s.course} · {s.classTime} · {s.country}</p>
            <p>Homework: {s.homework} · Hifz: {s.memorisedParas.length} paras memorised</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <input placeholder="Set homework" className="border border-emerald-300 rounded-lg px-2 py-1 text-sm flex-1 min-w-40"
                onBlur={(e) => { if (e.target.value) setStudents(students.map((x) => (x.id === s.id ? { ...x, homework: e.target.value } : x))); }} />
              <input placeholder="Change class time" className="border border-emerald-300 rounded-lg px-2 py-1 text-sm flex-1 min-w-40"
                onBlur={(e) => { if (e.target.value) setStudents(students.map((x) => (x.id === s.id ? { ...x, classTime: e.target.value } : x))); }} />
              <button onClick={() => setFees(fees.map((f) => (f.studentId === s.id && f.status === "Pending" ? { ...f, status: "Paid" } : f)))} className={btn2}>Mark fee Paid</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Owner ---------------- */
export function OwnerDashboard() {
  const [students, setStudents] = useData<Student[]>("nqa_students", SEED_STUDENTS);
  const [teachers, setTeachers] = useData<Teacher[]>("nqa_teachers", SEED_TEACHERS);
  const [fees, setFees] = useData<FeeRecord[]>("nqa_fees", SEED_FEES);
  const [apps, setApps] = useData<TeacherApplication[]>("nqa_apps", []);
  const [pay, setPay] = useData<TeacherPayment[]>("nqa_pay", []);
  const [settings, setSettings] = useData("nqa_settings", { bankName: "", accountTitle: "", iban: "", swift: "" });
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [payAmt, setPayAmt] = useState<Record<string, string>>({});

  if (!unlocked) return (
    <div className={`${card} max-w-md`}>
      <h2 className="font-bold text-lg text-emerald-900">Owner Dashboard</h2>
      <p className="text-sm mt-1">Only the owner (Tajammul) can open this. Demo PIN: <strong>1234</strong>. Change it before going live — this demo has no real password yet.</p>
      <label className="block text-sm font-semibold mt-4">Owner PIN</label>
      <input type="password" className={input} value={pin} onChange={(e) => setPin(e.target.value)} />
      <button onClick={() => pin === "1234" ? setUnlocked(true) : alert("Wrong PIN — demo PIN is 1234")} className={`${btn} mt-4`}>Open Owner Dashboard</button>
    </div>
  );
  function approveApp(a: TeacherApplication) {
    setTeachers([...teachers, { id: uid("t"), name: a.name, gender: a.gender as "Male" | "Female", qualification: a.qualification, experience: a.experience, courses: a.courses.split(",").map((x) => x.trim()), languages: a.languages, approved: true, payType: "commission", payValue: 40 }]);
    setApps(apps.map((x) => (x.id === a.id ? { ...x, status: "approved" } : x)));
  }
  return (
    <div className="space-y-4">
      <div className={card}>
        <h2 className="font-bold text-xl text-emerald-900">Owner Dashboard — {SITE.name}</h2>
        <p className="text-sm">Students: {students.length} · Teachers: {teachers.filter((t) => t.approved).length} approved · Fees collected (Paid): ${fees.filter((f) => f.status === "Paid").reduce((a, f) => a + f.amount, 0)} · Pending: ${fees.filter((f) => f.status === "Pending").reduce((a, f) => a + f.amount, 0)}</p>
        <button onClick={() => setUnlocked(false)} className={`${btn2} mt-3`}>Lock</button>
      </div>

      <div className={card}>
        <h3 className="font-bold text-emerald-900">Bank Settings — fill before taking real payments</h3>
        <p className="text-xs mt-1">Students send money to this bank account. Never share these details in chat — fill them here.</p>
        <div className="grid gap-2 md:grid-cols-2 mt-3">
          <input placeholder="Bank name" className={input} value={settings.bankName} onChange={(e) => setSettings({ ...settings, bankName: e.target.value })} />
          <input placeholder="Account title" className={input} value={settings.accountTitle} onChange={(e) => setSettings({ ...settings, accountTitle: e.target.value })} />
          <input placeholder="IBAN" className={input} value={settings.iban} onChange={(e) => setSettings({ ...settings, iban: e.target.value })} />
          <input placeholder="SWIFT code" className={input} value={settings.swift} onChange={(e) => setSettings({ ...settings, swift: e.target.value })} />
        </div>
      </div>

      <div className={card}>
        <h3 className="font-bold text-emerald-900">Teacher Applications ({apps.filter((a) => a.status === "pending").length} pending)</h3>
        {apps.length === 0 && <p className="text-sm mt-2">No applications yet. Teachers apply from the Teacher page.</p>}
        {apps.map((a) => (
          <div key={a.id} className="border-t border-emerald-100 py-2 text-sm">
            <p><strong>{a.name}</strong> ({a.gender}) — {a.qualification} · {a.experience} · {a.courses} · {a.languages} · {a.timings} — <strong>{a.status}</strong></p>
            {a.status === "pending" && <button onClick={() => approveApp(a)} className={`${btn} mt-1`}>Approve teacher</button>}
          </div>
        ))}
      </div>

      <div className={card}>
        <h3 className="font-bold text-emerald-900">All Students — assign a teacher &amp; set class time</h3>
        {students.map((s) => (
          <div key={s.id} className="border-t border-emerald-100 py-3 text-sm">
            <p><strong>{s.name}</strong> {s.demo ? "(Demo)" : ""} — {s.course} · {s.country} · {s.plan} · Fees: {s.feesPaid ? "Paid" : "Pending"}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <select value={s.teacherId} onChange={(e) => setStudents(students.map((x) => (x.id === s.id ? { ...x, teacherId: e.target.value } : x)))} className="border border-emerald-300 rounded-lg px-2 py-1 text-sm">
                <option value="">— No teacher —</option>
                {teachers.filter((t) => t.approved).map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <input defaultValue={s.classTime} placeholder="Class time" className="border border-emerald-300 rounded-lg px-2 py-1 text-sm flex-1 min-w-40"
                onBlur={(e) => { if (e.target.value) setStudents(students.map((x) => (x.id === s.id ? { ...x, classTime: e.target.value } : x))); }} />
              <button onClick={() => setFees(fees.map((f) => (f.studentId === s.id ? { ...f, status: f.status === "Paid" ? "Pending" : "Paid" } : f)))} className={btn2}>Toggle fee Paid</button>
            </div>
          </div>
        ))}
      </div>

      <div className={card}>
        <h3 className="font-bold text-emerald-900">Teachers &amp; Pay</h3>
        {teachers.filter((t) => t.approved).map((t) => {
          const mine = students.filter((s) => s.teacherId === t.id);
          const collected = fees.filter((f) => mine.some((s) => s.id === f.studentId) && f.status === "Paid").reduce((a, f) => a + f.amount, 0);
          const due = t.payType === "commission" ? Math.round((collected * t.payValue) / 100) : t.payValue;
          const given = pay.filter((p) => p.teacherId === t.id).reduce((a, p) => a + p.amount, 0);
          return (
            <div key={t.id} className="border-t border-emerald-100 py-3 text-sm">
              <p><strong>{t.name}</strong> — {t.qualification} · {t.experience} · Students: {mine.length} · Collected: ${collected}</p>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <select value={t.payType} onChange={(e) => setTeachers(teachers.map((x) => (x.id === t.id ? { ...x, payType: e.target.value as "salary" | "commission" } : x)))} className="border border-emerald-300 rounded-lg px-2 py-1 text-sm">
                  <option value="commission">Commission %</option><option value="salary">Monthly salary $</option>
                </select>
                <input type="number" value={t.payValue} onChange={(e) => setTeachers(teachers.map((x) => (x.id === t.id ? { ...x, payValue: Number(e.target.value) } : x)))} className="border border-emerald-300 rounded-lg px-2 py-1 text-sm w-24" />
                <span>Due ${due} · Given ${given} · Balance ${due - given}</span>
                <input placeholder="Record payment $" className="border border-emerald-300 rounded-lg px-2 py-1 text-sm w-32" value={payAmt[t.id] ?? ""} onChange={(e) => setPayAmt({ ...payAmt, [t.id]: e.target.value })} />
                <button onClick={() => { const v = Number(payAmt[t.id]); if (v > 0) { setPay([...pay, { id: uid("p"), teacherId: t.id, amount: v, date: new Date().toISOString().slice(0, 10), note: "Paid by owner" }]); setPayAmt({ ...payAmt, [t.id]: "" }); } }} className={btn}>Record payment</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
