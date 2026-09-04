"use client";

import { motion } from "framer-motion";
import { DayOrder } from "@/lib/data";

interface Props {
  activeDay: DayOrder;
  onDayClick: (day: DayOrder) => void;
}

export function FlightWaypointBanner({ activeDay, onDayClick }: Props) {
  // Percentage position of the airplane across the 5 waypoints (0% to 100%)
  const planePositions: Record<DayOrder, string> = {
    1: "8%",
    2: "29%",
    3: "50%",
    4: "71%",
    5: "92%",
  };

  return (
    <div className="relative bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 border-2 border-black rounded-lg p-3 sm:p-4 shadow-[3px_3px_0px_#000] overflow-hidden select-none">
      {/* Sky & Cloud backdrop in banner */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1 left-8 w-16 h-6 bg-white rounded-full blur-[1px]"></div>
        <div className="absolute bottom-2 right-12 w-20 h-7 bg-white rounded-full blur-[1px]"></div>
      </div>

      {/* Header bar inside banner */}
      <div className="relative z-10 flex items-center justify-between mb-2 pb-1 border-b border-black/20 text-xs font-black text-slate-900">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-amber-950 bg-amber-300 px-1.5 py-0.2 rounded border border-black text-[10px]">RWY-0{activeDay}</span>
          <span className="tracking-wide">FLIGHT WAYPOINT TRACKER</span>
        </div>
        <div className="font-mono text-[10px] text-blue-950 font-extrabold flex items-center gap-2">
          <span>ALT: 32,000 FT</span>
          <span className="hidden sm:inline">MACH: 0.82</span>
        </div>
      </div>

      {/* Flight Route Line & Animated Airplane Waypoints */}
      <div className="relative z-10 py-3 sm:py-4 px-2">
        {/* Dotted Flight Path */}
        <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 border-t-2 border-dashed border-slate-800 z-0"></div>

        {/* Animated Flying Airplane gliding to active day */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-pointer pointer-events-none"
          initial={false}
          animate={{ left: planePositions[activeDay] }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {/* Animated 2D Airplane */}
          <div className="relative -top-2 flex flex-col items-center drop-shadow-lg">
            <svg width="48" height="48" viewBox="0 0 60 60" className="animate-bounce">
              {/* Airplane Top-Down Vector */}
              <g transform="rotate(45 30 30)">
                <path d="M 30 10 L 10 40 L 22 42 L 30 32 Z" fill="#ea580c" stroke="#000000" strokeWidth="2" />
                <path d="M 30 10 L 50 40 L 38 42 L 30 32 Z" fill="#ea580c" stroke="#000000" strokeWidth="2" />
                <ellipse cx="30" cy="30" rx="6" ry="24" fill="#ffffff" stroke="#000000" strokeWidth="2" />
                <circle cx="30" cy="18" r="3.5" fill="#38bdf8" />
                <path d="M 30 45 L 20 54 L 26 54 L 30 48 Z" fill="#ea580c" stroke="#000000" strokeWidth="1.5" />
                <path d="M 30 45 L 40 54 L 34 54 L 30 48 Z" fill="#ea580c" stroke="#000000" strokeWidth="1.5" />
                <ellipse cx="30" cy="6" rx="10" ry="2" fill="#0284c7" opacity="0.8" />
              </g>
            </svg>
            <span className="bg-black text-yellow-300 font-mono text-[9px] font-black px-1.5 rounded-full -mt-1 border border-yellow-300">
              D{activeDay}
            </span>
          </div>
        </motion.div>

        {/* 5 Waypoint Stations (Day 1 - Day 5) */}
        <div className="relative z-10 flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((d) => {
            const isTarget = d === activeDay;
            const labels = ["MON", "TUE", "WED", "THU", "FRI"];
            return (
              <button
                key={d}
                onClick={() => onDayClick(d as DayOrder)}
                className={`flex flex-col items-center gap-1 transition-transform hover:scale-110 focus:outline-none ${
                  isTarget ? "scale-105 font-black text-black" : "text-slate-800 font-bold opacity-80"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-black flex items-center justify-center font-mono text-xs font-black transition-colors ${
                    isTarget ? "bg-yellow-400 shadow-md ring-2 ring-blue-900" : "bg-white"
                  }`}
                >
                  {d}
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-white/70 px-1 rounded border border-black/30">
                  {labels[d - 1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
