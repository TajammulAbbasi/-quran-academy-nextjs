"use client";
import { useEffect, useState } from "react";
import { load, SEED_TEACHERS, Teacher } from "@/lib/store";

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>(SEED_TEACHERS);
  useEffect(() => { setTeachers(load<Teacher[]>("nqa_teachers", SEED_TEACHERS)); }, []);
  const approved = teachers.filter((t) => t.approved);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {approved.map((t) => (
        <article key={t.id} className="lift bg-white border border-emerald-200 rounded-2xl p-5">
          <h3 className="font-bold text-lg text-emerald-900">{t.name} {t.demo ? "(Demo)" : ""}</h3>
          <p className="text-sm text-emerald-700">{t.gender} teacher · {t.qualification}</p>
          <p className="text-sm mt-2">{t.experience}</p>
          <p className="text-sm mt-1">Teaches: {t.courses.join(", ")}</p>
          <p className="text-sm mt-1">Languages: {t.languages}</p>
        </article>
      ))}
      {approved.length === 0 && <p className="text-sm">No approved teachers yet.</p>}
    </div>
  );
}
