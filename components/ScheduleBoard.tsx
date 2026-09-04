"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Sparkles, MapPin, User, Calendar, Sun, Sunset, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COURSES,
  DAY_NAMES,
  DAY_ORDERS,
  DayOrder,
  PERIODS,
  TIMETABLE,
  formatDisplayDate,
  getDayOrderForDate,
  getGroupedClasses,
  getNextWorkingDay,
  getSession,
  isHoliday,
  toDateKey,
} from "@/lib/data";
import DayTabs from "./DayTabs";
import Legend from "./Legend";
import { AirplaneDecorations } from "./AirplaneDecorations";
import { FlightWaypointBanner } from "./FlightWaypointBanner";
import BoardingPassCard from "./BoardingPassCard";
import { AirshowFlyby } from "./AirshowFlyby";

const DAY_LABELS: Record<DayOrder, string> = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
};

// Subtle Web Audio API chime for airplane sound effects
function playGentleChime(freq = 520) {
  try {
    if (typeof window === "undefined") return;
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Graceful fallback
  }
}

export default function ScheduleBoard() {
  const [activeDay, setActiveDay] = useState<DayOrder>(1);
  const [now, setNow] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hasManualSelection, setHasManualSelection] = useState(false);
  const [skyTheme, setSkyTheme] = useState<"day" | "sunset" | "night">("day");
  const [isFlybyActive, setIsFlybyActive] = useState(false);

  useEffect(() => {
    const initialDate = new Date();
    setNow(initialDate);
    setSelectedDate(initialDate);
    const id = setInterval(() => setNow(new Date()), 1000);

    // AUTOMATICALLY TRIGGER AIRSHOW FLYBY ON OPEN / PAGE LOAD
    const flybyTimer = setTimeout(() => {
      setIsFlybyActive(true);
      playGentleChime(780);
    }, 500);

    return () => {
      clearInterval(id);
      clearTimeout(flybyTimer);
    };
  }, []);

  const selectedDayOrder = useMemo(() => (selectedDate ? getDayOrderForDate(selectedDate) : null), [selectedDate]);
  const nextWorkingDay = useMemo(
    () => (selectedDate && !selectedDayOrder ? getNextWorkingDay(selectedDate) : null),
    [selectedDate, selectedDayOrder],
  );

  useEffect(() => {
    if (selectedDayOrder && !hasManualSelection) {
      setActiveDay(selectedDayOrder);
    }
  }, [hasManualSelection, selectedDayOrder]);

  const currentPeriodIndex = useMemo(() => {
    if (!now || !selectedDate || activeDay !== selectedDayOrder || toDateKey(now) !== toDateKey(selectedDate)) return -1;
    const mins = minutesSinceMidnight(now);
    return PERIODS.findIndex((p) => mins >= toMinutes(p.from) && mins < toMinutes(p.to));
  }, [activeDay, now, selectedDate, selectedDayOrder]);

  const rows = TIMETABLE[activeDay];
  const selectedDayName = selectedDate ? DAY_NAMES[selectedDate.getDay()] : "Selected date";
  const isSelectedHoliday = selectedDate ? isHoliday(selectedDate) : false;

  const nextPeriodIndex = useMemo(() => {
    if (currentPeriodIndex >= 0) return -1;
    if (!now || !selectedDate || activeDay !== selectedDayOrder || toDateKey(now) !== toDateKey(selectedDate)) {
      return rows.findIndex((slot) => Boolean(slot));
    }
    const mins = minutesSinceMidnight(now);
    return PERIODS.findIndex((p, idx) => toMinutes(p.from) > mins && Boolean(rows[idx]));
  }, [activeDay, currentPeriodIndex, now, rows, selectedDate, selectedDayOrder]);

  const dayClasses = useMemo(() => getGroupedClasses(activeDay), [activeDay]);

  function minutesSinceMidnight(d: Date) {
    return d.getHours() * 60 + d.getMinutes();
  }

  function toMinutes(hhmm: string) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  }

  function handleDayChange(nextDay: DayOrder) {
    setHasManualSelection(true);
    setActiveDay(nextDay);
    playGentleChime(580 + nextDay * 40);
  }

  function handleDateChange(value: string) {
    if (!value) return;
    const [year, month, date] = value.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, date));
    setHasManualSelection(false);
    playGentleChime(660);
  }

  const liveTimeString = now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--";

  // Sky Gradient Themes
  const skyGradients = {
    day: "from-[#80b0de] via-[#9fc7eb] to-[#bfdcf4]",
    sunset: "from-[#f97316] via-[#fb7185] to-[#fed7aa]",
    night: "from-[#0f172a] via-[#1e1b4b] to-[#334155]",
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 py-2 sm:px-4 sm:py-6">
      
      {/* Automatic Airshow Flyby Animation */}
      <AirshowFlyby isFlying={isFlybyActive} onComplete={() => setIsFlybyActive(false)} />

      {/* Retro OS Window Shell */}
      <div className="w-full bg-[#c0c7d0] border-2 border-black rounded-lg shadow-2xl overflow-hidden retro-window-border">
        
        {/* Title Bar: Strictly COLLEGE TIMETABLE */}
        <header className="bg-gradient-to-r from-[#1c3a6b] via-[#204987] to-[#2563eb] text-white px-3 py-2 flex items-center justify-between select-none border-b-2 border-black">
          <div
            onClick={() => setIsFlybyActive(true)}
            className="flex items-center gap-2 font-black tracking-wider text-xs sm:text-base cursor-pointer hover:opacity-90 transition-opacity"
            title="Click to trigger welcome flyby airshow!"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 inline drop-shadow shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span className="drop-shadow-sm uppercase">COLLEGE TIMETABLE</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              aria-label="Minimize"
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#d1d5db] text-black font-bold flex items-center justify-center border border-black retro-btn text-xs hover:bg-gray-200"
            >
              _
            </button>
            <button
              aria-label="Maximize"
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#d1d5db] text-black font-bold flex items-center justify-center border border-black retro-btn text-xs hover:bg-gray-200"
            >
              □
            </button>
            <button
              aria-label="Close"
              className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ef4444] text-white font-bold flex items-center justify-center border border-black retro-btn text-xs hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Retro Menu Bar with Sky Theme Switcher */}
        <nav className="bg-[#dcdfe4] px-2.5 py-1 border-b border-black text-xs flex flex-wrap items-center justify-between gap-2 select-none">
          <div className="flex items-center gap-2.5 sm:gap-4 font-medium text-slate-800">
            <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded cursor-pointer transition-colors">File</span>
            <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded cursor-pointer transition-colors">Edit</span>
            <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded cursor-pointer transition-colors">Navigate</span>
            <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded cursor-pointer transition-colors hidden sm:inline">Bookmarks</span>
            <span className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded cursor-pointer transition-colors hidden sm:inline">Help</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sky Theme Selector */}
            <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 border border-slate-400 rounded">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Sky:</span>
              <button
                onClick={() => setSkyTheme("day")}
                className={`p-0.5 rounded ${skyTheme === "day" ? "bg-sky-200 text-sky-900 font-bold" : "text-slate-600"}`}
                title="Day Flight"
              >
                <Sun size={12} />
              </button>
              <button
                onClick={() => setSkyTheme("sunset")}
                className={`p-0.5 rounded ${skyTheme === "sunset" ? "bg-amber-200 text-amber-900 font-bold" : "text-slate-600"}`}
                title="Sunset Flight"
              >
                <Sunset size={12} />
              </button>
              <button
                onClick={() => setSkyTheme("night")}
                className={`p-0.5 rounded ${skyTheme === "night" ? "bg-indigo-900 text-yellow-300 font-bold" : "text-slate-600"}`}
                title="Starry Night Flight"
              >
                <Moon size={12} />
              </button>
            </div>

            <div className="text-[11px] font-mono bg-white px-2 py-0.5 border border-gray-400 rounded text-slate-800 font-bold flex items-center gap-1 shadow-inner">
              <span className="text-blue-600">✈️</span>
              <span>{liveTimeString}</span>
            </div>
          </div>
        </nav>

        {/* Retro Browser Address Bar */}
        <div className="bg-[#c0c7d0] px-2.5 py-1.5 border-b-2 border-black flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleDayChange(Math.max(1, activeDay - 1) as DayOrder)}
            disabled={activeDay <= 1}
            aria-label="Previous Day"
            className="w-6 h-6 sm:w-7 sm:h-7 bg-white border border-black flex items-center justify-center retro-btn text-xs sm:text-sm font-bold disabled:opacity-40 shrink-0"
          >
            ←
          </button>
          <button
            onClick={() => handleDayChange(Math.min(5, activeDay + 1) as DayOrder)}
            disabled={activeDay >= 5}
            aria-label="Next Day"
            className="w-6 h-6 sm:w-7 sm:h-7 bg-white border border-black flex items-center justify-center retro-btn text-xs sm:text-sm font-bold disabled:opacity-40 shrink-0"
          >
            →
          </button>
          <button
            onClick={() => {
              if (selectedDayOrder) handleDayChange(selectedDayOrder);
            }}
            title="Reset to today"
            aria-label="Reload"
            className="w-6 h-6 sm:w-7 sm:h-7 bg-white border border-black flex items-center justify-center retro-btn text-xs sm:text-sm font-bold shrink-0"
          >
            ⟳
          </button>

          <div className="flex-1 bg-white border-2 border-black px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono flex items-center gap-1.5 rounded overflow-hidden">
            <span className="text-green-600 font-bold">🔒</span>
            <span className="text-slate-800 font-bold truncate">http://exodus.college/Timetable/day_{activeDay}</span>
          </div>
        </div>

        {/* Sky Canvas Housing the 2D Big Airplanes & Flight Schedule */}
        <main className={`relative bg-gradient-to-b ${skyGradients[skyTheme]} p-2.5 sm:p-5 min-h-[620px] overflow-hidden transition-colors duration-700`}>
          
          {/* Big Interactive 2D Vector Airplanes and Clouds */}
          <AirplaneDecorations />

          {/* Schedule Frame & Widgets */}
          <div className="relative z-20 mx-auto max-w-2xl flex flex-col gap-3 sm:gap-4">
            
            {/* Interactive Flight Waypoint Banner (Smooth Flying Plane on Day Switch) */}
            <FlightWaypointBanner activeDay={activeDay} onDayClick={handleDayChange} />

            {/* Top Control Bar: Date Selector & Day Order Telemetry */}
            <div className="bg-white/55 backdrop-blur-md border-2 border-black rounded-lg p-2.5 sm:p-3 retro-card-shadow flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-900 text-yellow-300 border-2 border-black rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                  🛫
                </div>
                <div>
                  <h1 className="text-xs sm:text-sm font-black text-slate-950 tracking-tight leading-tight">
                    DAY {activeDay} ({DAY_LABELS[activeDay]}) SCHEDULE
                  </h1>
                  <p className="text-[11px] text-slate-800 font-bold">
                    {selectedDayName} • {selectedDate ? formatDisplayDate(selectedDate) : "--"}
                  </p>
                </div>
              </div>

              {/* Status & Date Picker */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div className="bg-white/80 border border-black/80 px-2 py-0.5 rounded flex items-center gap-1.5 text-xs font-bold text-slate-900 shadow-sm">
                  <span className="text-blue-800">📅 Date:</span>
                  <input
                    id="schedule-date"
                    type="date"
                    aria-label="Pick date"
                    value={selectedDate ? toDateKey(selectedDate) : ""}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="bg-white border border-slate-400 px-1 py-0.5 rounded font-mono text-xs text-slate-900 font-bold outline-none cursor-pointer"
                  />
                </div>

                <div className="bg-blue-100/90 border border-blue-600 px-2 py-0.5 rounded text-[11px] font-mono font-black text-blue-950 flex items-center gap-1 shadow-sm">
                  <Sparkles size={11} className="text-amber-600" />
                  <span>{selectedDayOrder ? `Day Order ${selectedDayOrder}` : isSelectedHoliday ? "Holiday" : "Non-working"}</span>
                </div>
              </div>
            </div>

            {/* Holiday Notice */}
            {nextWorkingDay && (
              <div className="bg-amber-100 border-2 border-black rounded-lg p-2.5 text-xs font-mono font-bold text-amber-950 flex items-center gap-2 retro-card-shadow-sm">
                <span>⚠️</span>
                <span>
                  No classes on selected date. Classes resume on {DAY_NAMES[nextWorkingDay.date.getDay()]},{" "}
                  {formatDisplayDate(nextWorkingDay.date)} as <strong>Day {nextWorkingDay.dayOrder}</strong>.
                </span>
              </div>
            )}

            {/* Transparent Day Order Tabs */}
            <div className="pt-0.5">
              <DayTabs active={activeDay} today={selectedDayOrder} onChange={handleDayChange} />
            </div>

            {/* Class Cards List for Active Day */}
            <div className="bg-white/85 backdrop-blur-md border-2 border-black rounded-b-xl rounded-tr-xl p-3 sm:p-4 shadow-2xl">
              
              <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-tight">
                    Day {activeDay} Classes ({dayClasses.length} Scheduled)
                  </h2>
                </div>

                <span className="bg-emerald-200 text-emerald-950 border border-black px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  ON SCHEDULE
                </span>
              </div>

              {/* Stacked Class Cards */}
              <AnimatePresence mode="wait">
                {!selectedDayOrder ? (
                  <HolidayState key={`holiday-${selectedDate ? toDateKey(selectedDate) : "pending"}`} nextWorkingDay={nextWorkingDay} />
                ) : dayClasses.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-600 font-bold bg-white/90 border-2 border-dashed border-black rounded-lg">
                    No classes scheduled for Day {activeDay}.
                  </div>
                ) : (
                  <motion.div
                    key={`day-${activeDay}-${selectedDate ? toDateKey(selectedDate) : "pending"}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2.5"
                  >
                    {dayClasses.map((cls) => {
                      const course = COURSES[cls.subject];
                      const session = getSession(cls.subject, cls.type);
                      const isCurrentClass =
                        activeDay === selectedDayOrder &&
                        currentPeriodIndex >= 0 &&
                        currentPeriodIndex + 1 >= cls.startPeriod &&
                        currentPeriodIndex + 1 <= cls.endPeriod;

                      return (
                        <div
                          key={cls.id}
                          className={`bg-white border-2 border-black rounded-lg p-3 retro-card-shadow-sm flex flex-col justify-between gap-1.5 transition-transform hover:-translate-y-0.5 ${
                            isCurrentClass ? "ring-4 ring-amber-400 bg-amber-50/90 border-black" : ""
                          }`}
                        >
                          {/* Timing & Period Range */}
                          <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono font-bold text-slate-900">
                            <span className="flex items-center gap-1.5 bg-slate-100 border border-black px-2 py-0.5 rounded">
                              <span>🕒</span>
                              <span>{cls.startTime} - {cls.endTime}</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
                                P{cls.startPeriod === cls.endPeriod ? cls.startPeriod : `${cls.startPeriod}-${cls.endPeriod}`} ({cls.type})
                              </span>

                              {isCurrentClass && (
                                <span className="bg-amber-400 text-black border border-black px-2 py-0.5 rounded text-[10px] font-black animate-pulse flex items-center gap-1">
                                  <span>✈️</span> BOARDING NOW
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bold Readable Subject Title */}
                          <div className="text-sm sm:text-base font-black text-slate-950 uppercase leading-snug">
                            {course.name}
                          </div>

                          {/* Gate / Venue & Faculty Pilot */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-slate-200 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                              <span>🎟️</span>
                              <span>Gate: <strong className="text-black font-black">{session?.room || "618"}</strong> ({session?.building || "University Bldg"})</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                              <span>👤</span>
                              <span>Professor: <strong className="text-black font-bold">{session?.faculty || "Faculty"}</strong></span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Retro Boarding Pass Summary Stub */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-black/40">
                <BoardingPassCard
                  currentSlot={currentPeriodIndex >= 0 ? rows[currentPeriodIndex] : null}
                  currentPeriod={currentPeriodIndex >= 0 ? PERIODS[currentPeriodIndex] : null}
                  nextSlot={nextPeriodIndex >= 0 ? rows[nextPeriodIndex] : null}
                  nextPeriod={nextPeriodIndex >= 0 ? PERIODS[nextPeriodIndex] : null}
                  dayOrder={selectedDayOrder}
                />
              </div>

              {/* Course Directory / Legend */}
              <div className="mt-4">
                <Legend />
              </div>

            </div>

          </div>

        </main>

        {/* Retro Status Taskbar */}
        <footer className="bg-[#c0c7d0] px-2.5 py-1 border-t-2 border-black flex items-center justify-between text-xs font-bold select-none">
          <div className="flex items-center gap-2">
            <button className="bg-[#dcdfe4] text-black px-2.5 py-0.5 border border-black flex items-center gap-1 retro-btn font-extrabold text-xs">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm inline-block"></span>
              START
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-white px-2 py-0.5 border border-black rounded text-[11px] font-mono text-slate-700">
              <span>📁</span>
              <span>Timetable_v2.0.exe</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-800 font-mono text-[11px]">
            <span className="hidden sm:inline text-slate-600 font-bold">Batch 2 Timetable</span>
            <span>🔊 100%</span>
            <span className="bg-white px-1.5 py-0.2 border border-gray-400 rounded font-bold text-blue-900">
              {liveTimeString}
            </span>
          </div>
        </footer>

      </div>

    </div>
  );
}

function HolidayState({
  nextWorkingDay,
}: {
  nextWorkingDay: { date: Date; dayOrder: DayOrder } | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="bg-[#fefce8] border-2 border-black rounded-lg p-5 text-center retro-card-shadow"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black bg-amber-300 text-slate-900 text-2xl shadow-sm">
        ☕
      </div>
      <h3 className="mt-3 text-lg font-black text-slate-900">Today is a Holiday / Non-working Day</h3>
      <p className="mt-1 text-xs text-slate-600 font-medium">No scheduled lectures or academic flights for this date.</p>
      {nextWorkingDay && (
        <div className="mt-3 inline-block bg-amber-200 border border-black px-3 py-1 rounded font-mono text-xs font-bold text-amber-950">
          Next Working Day: {DAY_NAMES[nextWorkingDay.date.getDay()]}, {formatDisplayDate(nextWorkingDay.date)} • Day {nextWorkingDay.dayOrder}
        </div>
      )}
    </motion.div>
  );
}
