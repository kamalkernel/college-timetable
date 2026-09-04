"use client";

import { COURSES } from "@/lib/data";

const DOT: Record<string, string> = {
  amber: "bg-amber-500 border-amber-700",
  teal: "bg-teal-500 border-teal-700",
  rose: "bg-rose-500 border-rose-700",
  sky: "bg-sky-500 border-sky-700",
  violet: "bg-purple-500 border-purple-700",
};

export default function Legend() {
  return (
    <div className="rounded-lg border-2 border-black bg-white p-4 retro-card-shadow">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
        <p className="font-mono text-xs uppercase tracking-wider font-extrabold text-slate-800 flex items-center gap-1.5">
          <span>📚</span> ACADEMIC COURSE DIRECTORY
        </p>
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
          7 SUBJECTS
        </span>
      </div>
      <div className="grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
        {Object.values(COURSES).map((c) => (
          <div
            key={c.code}
            className="flex items-center gap-2.5 rounded border border-slate-200 bg-slate-50/80 px-3 py-2 hover:bg-white hover:border-black transition-colors"
          >
            <span className={`h-3 w-3 rounded-full border ${DOT[c.accent] || "bg-blue-500"} shrink-0`} />
            <span className="font-mono font-bold text-slate-900 shrink-0">{c.code}</span>
            <span className="min-w-0 truncate text-slate-600 font-medium">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
