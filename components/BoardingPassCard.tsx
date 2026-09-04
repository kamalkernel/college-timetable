"use client";

import { ClassSlot, COURSES, Period, getSession } from "@/lib/data";

interface Props {
  currentSlot: ClassSlot | null;
  currentPeriod: Period | null;
  nextSlot: ClassSlot | null;
  nextPeriod: Period | null;
  dayOrder: number | null;
  isHoliday: boolean;
}

export default function BoardingPassCard({ currentSlot, currentPeriod, nextSlot, nextPeriod, dayOrder, isHoliday }: Props) {
  if (isHoliday) {
    return (
      <div className="bg-[#fef9c3] border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#000] text-slate-900">
        <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
          <span className="text-lg">☀️</span>
          <span>Today is a holiday</span>
        </div>
      </div>
    );
  }

  const activeSlot = currentSlot || nextSlot;
  const activePeriod = currentPeriod || nextPeriod;
  const isCurrent = Boolean(currentSlot);

  if (!activeSlot || !activePeriod) {
    return (
      <div className="bg-[#fef9c3] border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#000] text-slate-900">
        <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2 font-black text-xs uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span>🎟️</span> VIP BOARDING PASS
          </span>
          <span className="bg-amber-300 text-black px-1.5 py-0.2 rounded border border-black text-[10px] font-extrabold">
            FIRST CLASS 🌟
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="font-extrabold text-slate-900 text-sm">All flights completed for today! ✈️</p>
            <p className="text-[11px] text-slate-600 font-medium">Safe landing! Enjoy your evening recess.</p>
          </div>
          <div className="text-right font-mono text-[10px] font-bold text-slate-700">
            <div>PASSENGER: VIP PILOT</div>
            <div className="text-blue-800">SEAT: 1A (WINDOW)</div>
          </div>
        </div>
      </div>
    );
  }

  const course = COURSES[activeSlot.subject];
  const session = getSession(activeSlot.subject, activeSlot.type);

  return (
    <div className="bg-[#fef9c3] border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#000] text-slate-900">
      {/* Ticket Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-black pb-1.5 mb-2 font-black text-xs uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎟️</span>
          <span>OFFICIAL BOARDING PASS</span>
          <span className="hidden sm:inline-block bg-pink-200 text-pink-950 px-1.5 py-0.2 rounded border border-black text-[9px] font-extrabold">
            VIP FIRST CLASS 🌟
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border border-black ${isCurrent ? "bg-amber-400 text-black animate-pulse" : "bg-emerald-300 text-emerald-950"}`}>
            {isCurrent ? "NOW BOARDING" : "NEXT UP"}
          </span>
          <span>✈️</span>
        </div>
      </div>

      {/* Ticket Body & Details */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="text-xs space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono font-bold text-slate-800 text-xs">
            <span className="bg-white px-2 py-0.5 rounded border border-black shadow-sm">
              🕒 {activePeriod.from} - {activePeriod.to}
            </span>
            <span className="text-slate-600 text-[11px]">Period {activePeriod.n} ({activeSlot.type})</span>
          </div>

          <div className="font-black text-slate-950 uppercase text-sm sm:text-base tracking-tight truncate pt-0.5">
            {course.name}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-0.5">
            <div className="font-bold text-slate-900 flex items-center gap-1">
              <span>📍</span>
              <span>Gate: <strong className="text-black font-black">{session?.room || "618"}</strong> ({session?.building || "University Bldg"})</span>
            </div>
            <div className="text-slate-700 font-medium flex items-center gap-1">
              <span>👤</span>
              <span>Professor: <strong className="text-black font-bold">{session?.faculty || "Instructor"}</strong></span>
            </div>
          </div>
        </div>

        {/* Barcode & VIP Flight Stub */}
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-black/50 pt-2 sm:pt-0 sm:pl-4 flex sm:flex-col justify-between sm:justify-center items-center gap-1 shrink-0">
          <div className="text-left sm:text-center font-mono text-[9px] font-extrabold text-slate-900 leading-tight">
            <div className="text-blue-900">PASSENGER: VIP 💖</div>
            <div className="text-slate-700">SEAT: 1A • D{dayOrder || 1}</div>
          </div>

          {/* Barcode Graphic */}
          <div className="bg-white p-1 border border-black rounded flex items-center gap-[2px] h-8 mt-1">
            <span className="w-[3px] h-full bg-black"></span>
            <span className="w-[1px] h-full bg-black"></span>
            <span className="w-[2px] h-full bg-black"></span>
            <span className="w-[4px] h-full bg-black"></span>
            <span className="w-[1px] h-full bg-black"></span>
            <span className="w-[3px] h-full bg-black"></span>
            <span className="w-[2px] h-full bg-black"></span>
            <span className="w-[1px] h-full bg-black"></span>
            <span className="w-[4px] h-full bg-black"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
