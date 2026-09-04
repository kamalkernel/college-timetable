"use client";

import { BookOpen, FlaskConical, MapPin, User, Clock } from "lucide-react";
import { ClassSlot, COURSES, Period, getSession } from "@/lib/data";

interface Props {
  period: Period;
  slot: ClassSlot | null;
  isNow: boolean;
}

const ACCENT_STYLES: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  amber: {
    bg: "bg-amber-50/70",
    border: "border-amber-600",
    badge: "bg-amber-100 text-amber-900 border-amber-300",
    text: "text-amber-950",
  },
  teal: {
    bg: "bg-teal-50/70",
    border: "border-teal-600",
    badge: "bg-teal-100 text-teal-900 border-teal-300",
    text: "text-teal-950",
  },
  rose: {
    bg: "bg-rose-50/70",
    border: "border-rose-600",
    badge: "bg-rose-100 text-rose-900 border-rose-300",
    text: "text-rose-950",
  },
  sky: {
    bg: "bg-sky-50/70",
    border: "border-sky-600",
    badge: "bg-sky-100 text-sky-900 border-sky-300",
    text: "text-sky-950",
  },
  violet: {
    bg: "bg-purple-50/70",
    border: "border-purple-600",
    badge: "bg-purple-100 text-purple-900 border-purple-300",
    text: "text-purple-950",
  },
};

export default function PeriodRow({ period, slot, isNow }: Props) {
  if (!slot) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/60 p-3.5 transition-all ${
          isNow ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-400" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500">
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300">
              Period {period.n}
            </span>
            <span>{period.from} - {period.to}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs italic text-slate-400 font-medium">Free Period / Recess</span>
            {isNow && (
              <span className="bg-amber-300 text-black border border-black px-2 py-0.5 rounded text-[10px] font-extrabold animate-pulse">
                ACTIVE NOW
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const course = COURSES[slot.subject];
  const session = getSession(slot.subject, slot.type);
  const accent = ACCENT_STYLES[course.accent] || ACCENT_STYLES.sky;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border-2 border-black p-3.5 sm:p-4 bg-white retro-card-shadow-sm transition-all hover:-translate-y-0.5 ${
        isNow ? "ring-4 ring-amber-400 border-black bg-amber-50/40" : ""
      }`}
    >
      {/* Top Header: Period, Timing, Status Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-extrabold bg-blue-900 text-white px-2 py-0.5 rounded border border-black">
            P{period.n}
          </span>
          <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
            <Clock size={12} className="text-slate-500" />
            {period.from} - {period.to}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase border ${accent.badge}`}
          >
            {slot.type === "Lab" ? <FlaskConical size={10} /> : <BookOpen size={10} />}
            {slot.type}
          </span>

          {isNow ? (
            <span className="bg-amber-400 text-black border border-black px-2 py-0.5 rounded text-[10px] font-black animate-pulse flex items-center gap-1">
              <span>✈️</span> BOARDING NOW
            </span>
          ) : (
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-extrabold">
              ON SCHEDULE
            </span>
          )}
        </div>
      </div>

      {/* Main Course Details */}
      <div className="mb-3">
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
          {course.name}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
            {course.code}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {course.credits} Credits
          </span>
        </div>
      </div>

      {/* Footer Details: Gate / Venue & Faculty Pilot */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <MapPin size={13} className="text-red-500 shrink-0" />
          <span>
            Gate: <strong className="text-slate-900 font-bold">{session?.room || "TBA"}</strong> ({session?.building || "University Campus"} · {session?.floor || "Floor"})
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
          <User size={13} className="text-blue-600 shrink-0" />
          <span>
            Faculty: <strong className="text-slate-900 font-bold">{session?.faculty || "Instructor"}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
