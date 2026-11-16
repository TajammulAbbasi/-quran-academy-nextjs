// Demo data store — localStorage only, no external database.
// All seed rows are DEMO data, clearly marked, so the owner can delete
// them from the dashboards and add real students/teachers.
export type Student = {
  id: string; name: string; phone: string; age: number; country: string;
  course: string; plan: string; teacherId: string; classTime: string;
  timezone: string; status: "trial" | "active" | "paused";
  memorisedParas: number[]; feesPaid: boolean; homework: string; demo?: boolean;
};
export type Teacher = {
  id: string; name: string; gender: "Male" | "Female"; qualification: string;
  experience: string; courses: string[]; languages: string;
  approved: boolean; payType: "salary" | "commission"; payValue: number;
  demo?: boolean;
};
export type TeacherApplication = {
  id: string; name: string; whatsapp: string; gender: string; qualification: string;
  experience: string; courses: string; languages: string; timings: string; status: string;
};
export type FeeRecord = {
  id: string; studentId: string; amount: number; currency: string;
  method: string; status: "Paid" | "Pending"; date: string;
};
export type TeacherPayment = { id: string; teacherId: string; amount: number; date: string; note: string };

export const SEED_TEACHERS: Teacher[] = [
  { id: "t1", name: "Qari Abdul Rahman", gender: "Male", qualification: "Hifz & Ijazah, Al-Azhar", experience: "8 years teaching kids in UK & USA", courses: ["Noorani Qaida", "Nazra Quran", "Hifz Quran"], languages: "English, Urdu", approved: true, payType: "commission", payValue: 40, demo: true },
  { id: "t2", name: "Ustaza Amina Khan", gender: "Female", qualification: "Hifz, Tajweed certified", experience: "6 years teaching girls & kids", courses: ["Noorani Qaida", "Nazra Quran", "Tajweed Course"], languages: "English, Urdu", approved: true, payType: "salary", payValue: 450, demo: true },
];
export const SEED_STUDENTS: Student[] = [
  { id: "s1", name: "Ahmed (Demo)", phone: "03127675565", age: 8, country: "UK", course: "Nazra Quran", plan: "Basic — 3 classes a week", teacherId: "t1", classTime: "Mon / Wed / Fri — 4:30 PM UK time", timezone: "Europe/London", status: "active", memorisedParas: [30, 29], feesPaid: true, homework: "Read Surah Al-Fatiha with Tajweed, 5 times.", demo: true },
  { id: "s2", name: "Fatima (Demo)", phone: "03127675565", age: 10, country: "USA", course: "Hifz Quran", plan: "Regular — 5 classes a week", teacherId: "t2", classTime: "Mon–Fri — 5:00 PM USA Eastern time", timezone: "America/New_York", status: "active", memorisedParas: [30, 29, 28, 27], feesPaid: false, homework: "New Sabaq: Para 27, first 5 ayahs.", demo: true },
];
export const SEED_FEES: FeeRecord[] = [
  { id: "f1", studentId: "s1", amount: 30, currency: "USD", method: "Wise — to bank account", status: "Paid", date: "2026-11-01" },
  { id: "f2", studentId: "s2", amount: 50, currency: "USD", method: "Remitly — to bank account", status: "Pending", date: "2026-11-01" },
];

export function load<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) { localStorage.setItem(key, JSON.stringify(seed)); return seed; }
    return JSON.parse(raw) as T;
  } catch { return seed; }
}
export function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
export function uid(prefix: string) {
  return prefix + Math.random().toString(36).slice(2, 8);
}
export const PARA_NAMES: Record<number, string> = {
  1: "Alif Laam Meem", 2: "Sayaqool", 3: "Tilkar Rusul", 4: "Lan Tanalu", 5: "Wal Muhsanat",
  6: "La Yuhibbullah", 7: "Wa Iza Samiu", 8: "Wa Lau Annana", 9: "Qalal Malao", 10: "Wa'lamu",
  11: "Ya'tazirun", 12: "Wa Mamin Da'bbah", 13: "Wa Ma Ubarri", 14: "Rubama", 15: "Subhanallazi",
  16: "Alam Tara", 17: "Iqtaraba", 18: "Qad Aflaha", 19: "Wa Qalallazina", 20: "Amman Khalaq",
  21: "Utlu Ma Uhiya", 22: "Wa Manyaqnut", 23: "Wa Mali", 24: "Faman Azlam", 25: "Ilaihi Yuraddu",
  26: "Ha Meem", 27: "Qala Fama Khatbukum", 28: "Qad Sami'allah", 29: "Tabarakallazi", 30: "Amma Yatasa'alun",
};
