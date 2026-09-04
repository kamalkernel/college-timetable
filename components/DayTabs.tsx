"use client";

import { DAY_ORDERS, DayOrder } from "@/lib/data";

interface Props {
  active: DayOrder | null;
  today: DayOrder | null;
  view: "day" | "full";
  onChange: (day: DayOrder) => void;
  onViewChange: (view: "day" | "full") => void;
}

export default function DayTabs({ active, today, view, onChange, onViewChange }: Props) {
  return (
    <div role="tablist" aria-label="Select timetable view" className="flex gap-1 sm:gap-2">
      <div className="grid flex-1 grid-cols-5 gap-1 sm:gap-2">
      {DAY_ORDERS.map((day) => {
        const isActive = view === "day" && day === active;
        const isToday = day === today;

        return (
          <button
            key={day}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              onChange(day);
              onViewChange("day");
            }}
            className={`group relative text-center border-2 border-black rounded-t-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 py-2 sm:py-2.5 px-1 sm:px-3 flex items-center justify-center gap-1 ${
              isActive
                ? "bg-white/95 text-blue-950 -mb-[2px] z-20 shadow-md font-black backdrop-blur-sm border-b-0"
                : "bg-white/25 hover:bg-white/40 text-slate-900 font-bold backdrop-blur-sm z-10"
            }`}
          >
            <div className="flex items-center gap-1">
              {isActive && <span className="text-blue-600 text-xs sm:text-sm">✈️</span>}
              <span className="text-xs sm:text-sm tracking-tight font-extrabold">Day {day}</span>
            </div>

            {isToday && (
              <span className="hidden md:inline-flex rounded bg-amber-400 border border-black px-1 text-[8px] uppercase font-black text-black">
                Today
              </span>
            )}
          </button>
        );
      })}
      </div>
      <button
        role="tab"
        aria-selected={view === "full"}
        onClick={() => onViewChange("full")}
        className={`relative border-2 border-black rounded-t-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 px-2 sm:px-3 py-2 text-center text-[10px] sm:text-xs font-black leading-tight ${
          view === "full"
            ? "bg-white/95 text-blue-950 -mb-[2px] z-20 shadow-md backdrop-blur-sm border-b-0"
            : "bg-white/25 hover:bg-white/40 text-slate-900 backdrop-blur-sm z-10"
        }`}
      >
        Full<br className="sm:hidden" /> timetable
      </button>
    </div>
  );
}
