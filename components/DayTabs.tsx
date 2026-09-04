"use client";

import { DAY_ORDERS, DayOrder } from "@/lib/data";

interface Props {
  active: DayOrder | null;
  today: DayOrder | null;
  onChange: (day: DayOrder) => void;
}

const DAY_LABELS: Record<DayOrder, string> = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
};

export default function DayTabs({ active, today, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Select day order" className="grid grid-cols-5 gap-1 sm:gap-2">
      {DAY_ORDERS.map((day) => {
        const isActive = day === active;
        const isToday = day === today;

        return (
          <button
            key={day}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(day)}
            className={`group relative text-center border-2 border-black rounded-t-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 py-2 sm:py-2.5 px-1 sm:px-3 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${
              isActive
                ? "bg-white/95 text-blue-950 -mb-[2px] z-20 shadow-md font-black backdrop-blur-sm border-b-0"
                : "bg-white/25 hover:bg-white/40 text-slate-900 font-bold backdrop-blur-sm z-10"
            }`}
          >
            <div className="flex items-center gap-1">
              {isActive && <span className="text-blue-600 text-xs sm:text-sm">✈️</span>}
              <span className="text-xs sm:text-sm tracking-tight font-extrabold">Day {day}</span>
            </div>

            <span
              className={`text-[9px] sm:text-[10px] px-1 py-0.2 rounded font-mono font-bold uppercase ${
                isActive
                  ? "bg-blue-100 text-blue-900 border border-blue-300"
                  : "bg-black/10 text-slate-900"
              }`}
            >
              {DAY_LABELS[day]}
            </span>

            {isToday && (
              <span className="hidden md:inline-flex rounded bg-amber-400 border border-black px-1 text-[8px] uppercase font-black text-black">
                Today
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
