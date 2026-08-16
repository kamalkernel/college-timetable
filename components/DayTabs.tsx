"use client";

import { DAY_ORDERS, DayOrder } from "@/lib/data";

interface Props {
  active: DayOrder;
  today: DayOrder | null;
  onChange: (day: DayOrder) => void;
}

export default function DayTabs({ active, today, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Select day order" className="grid grid-cols-5 gap-2 lg:grid-cols-1">
      {DAY_ORDERS.map((day) => {
        const isActive = day === active;
        const isToday = day === today;

        return (
          <button
            key={day}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(day)}
            className={`group relative overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-board-teal/70 ${
              isActive
                ? "border-board-teal/70 bg-board-teal/15 text-board-paper shadow-glow"
                : "border-white/10 bg-white/[0.035] text-board-mist hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-board-paper"
            }`}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="block font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">Order</span>
            <span className="mt-1 block text-lg font-black tracking-tight">Day {day}</span>
            {isToday && (
              <span className="mt-2 inline-flex rounded-full border border-board-amber/30 bg-board-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-board-amber">
                Today
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
