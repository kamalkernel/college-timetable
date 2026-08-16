"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Coffee, Cpu, Sparkles } from "lucide-react";
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
  getNextWorkingDay,
  isHoliday,
  toDateKey,
} from "@/lib/data";
import DayTabs from "./DayTabs";
import Legend from "./Legend";
import PeriodRow from "./PeriodRow";

function minutesSinceMidnight(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export default function ScheduleBoard() {
  const [day, setDay] = useState<DayOrder>(5);
  const [now, setNow] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hasManualSelection, setHasManualSelection] = useState(false);

  useEffect(() => {
    const initialDate = new Date();
    setNow(initialDate);
    setSelectedDate(initialDate);
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const selectedDayOrder = useMemo(() => (selectedDate ? getDayOrderForDate(selectedDate) : null), [selectedDate]);
  const nextWorkingDay = useMemo(
    () => (selectedDate && !selectedDayOrder ? getNextWorkingDay(selectedDate) : null),
    [selectedDate, selectedDayOrder],
  );

  useEffect(() => {
    if (selectedDayOrder && !hasManualSelection) {
      setDay(selectedDayOrder);
    }
  }, [hasManualSelection, selectedDayOrder]);

  const currentPeriodIndex = useMemo(() => {
    if (!now || !selectedDate || day !== selectedDayOrder || toDateKey(now) !== toDateKey(selectedDate)) return -1;
    const mins = minutesSinceMidnight(now);
    return PERIODS.findIndex((p) => mins >= toMinutes(p.from) && mins < toMinutes(p.to));
  }, [day, now, selectedDate, selectedDayOrder]);

  const rows = TIMETABLE[day];
  const classCount = rows.filter(Boolean).length;
  const selectedDayName = selectedDate ? DAY_NAMES[selectedDate.getDay()] : "Selected date";
  const isSelectedHoliday = selectedDate ? isHoliday(selectedDate) : false;

  function handleDayChange(nextDay: DayOrder) {
    setHasManualSelection(true);
    setDay(nextDay);
  }

  function handleDateChange(value: string) {
    if (!value) return;
    const [year, month, date] = value.split("-").map(Number);
    setSelectedDate(new Date(year, month - 1, date));
    setHasManualSelection(false);
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute left-2 top-10 h-44 w-44 rounded-full bg-board-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute right-4 top-20 h-56 w-56 rounded-full bg-board-violet/20 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-board backdrop-blur-xl sm:p-7 lg:p-8"
      >
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-board-teal/20" />
        <div className="absolute -right-6 top-8 h-24 w-24 rounded-[2rem] border border-board-violet/30 bg-board-violet/10 rotate-12" />

        <header className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-board-teal/30 bg-board-teal/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-board-teal">
              <Cpu size={13} />
              Batch 2 scheduler
            </div>
            <h1 className="text-4xl font-black tracking-[-0.06em] text-board-paper sm:text-5xl lg:text-6xl">
              Timetable,
              <span className="block bg-gradient-to-r from-board-teal via-board-sky to-board-violet bg-clip-text text-transparent">
                upgraded.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-board-mist sm:text-base">
              A live day-order dashboard that skips holidays, highlights the current period, and keeps every class detail one tap away.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[430px]">
            <StatusCard
              icon={<CalendarDays size={16} />}
              label={selectedDayName}
              value={selectedDate ? formatDisplayDate(selectedDate) : "--"}
            />
            <StatusCard
              icon={<Sparkles size={16} />}
              label={selectedDayOrder ? "Day order" : isSelectedHoliday ? "Holiday" : "Non-working"}
              value={selectedDayOrder ? `Day ${selectedDayOrder}` : nextWorkingDay ? `Next: Day ${nextWorkingDay.dayOrder}` : "--"}
            />
            <StatusCard
              icon={<Clock3 size={16} />}
              label="Live clock"
              value={now ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
            />
          </div>
        </header>
      </motion.section>

      {nextWorkingDay && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-4 rounded-2xl border border-board-amber/25 bg-board-amber/10 px-4 py-3 font-mono text-xs text-board-amber"
        >
          This date does not consume a day order. Classes resume on {DAY_NAMES[nextWorkingDay.date.getDay()]},{" "}
          {formatDisplayDate(nextWorkingDay.date)} as Day {nextWorkingDay.dayOrder}.
        </motion.div>
      )}

      <section className="relative mt-5 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-[1.5rem] border border-white/10 bg-ink-panel/70 p-4 shadow-board backdrop-blur-xl lg:sticky lg:top-6 lg:self-start">
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <label htmlFor="schedule-date" className="font-mono text-xs uppercase tracking-[0.2em] text-board-mist/70">
              Pick date
            </label>
            <input
              id="schedule-date"
              type="date"
              value={selectedDate ? toDateKey(selectedDate) : ""}
              onChange={(event) => handleDateChange(event.target.value)}
              className="mt-3 w-full rounded-xl border border-white/10 bg-ink px-3 py-2 font-mono text-sm text-board-paper outline-none transition focus:border-board-teal/60 focus:ring-2 focus:ring-board-teal/20"
            />
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-board-mist/70">Day order</p>
          <DayTabs active={day} today={selectedDayOrder} onChange={handleDayChange} />

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-board-mist/70">Selected loadout</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-3xl font-black tracking-tight text-board-paper">Day {day}</p>
                <p className="text-sm text-board-mist">
                  {classCount} {classCount === 1 ? "class" : "classes"} scheduled
                </p>
              </div>
              <div className="rounded-2xl border border-board-teal/25 bg-board-teal/10 px-3 py-2 font-mono text-xs text-board-teal">
                D{day}/5
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            {!selectedDayOrder ? (
              <HolidayState key={`holiday-${selectedDate ? toDateKey(selectedDate) : "pending"}`} nextWorkingDay={nextWorkingDay} />
            ) : (
              <motion.div
                key={`${day}-${selectedDate ? toDateKey(selectedDate) : "pending"}`}
                initial={{ opacity: 0, y: 14, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-3 [animation-fill-mode:backwards]"
              >
                {PERIODS.map((period, i) => (
                  <motion.div
                    key={period.n}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: i * 0.025, ease: "easeOut" }}
                  >
                    <PeriodRow period={period} slot={rows[i]} isNow={i === currentPeriodIndex} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8">
            <Legend />
          </div>

          <WeekGlance activeDay={day} onSelect={handleDayChange} />
        </div>
      </section>
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
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[1.75rem] border border-board-amber/25 bg-board-amber/10 p-8 text-center shadow-board backdrop-blur-xl"
    >
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-board-amber/20 blur-3xl" />
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-board-amber/30 bg-board-amber/15 text-board-amber">
        <Coffee size={30} />
      </div>
      <h2 className="relative mt-5 text-2xl font-black tracking-tight text-board-paper">Today is a holiday</h2>
      <p className="relative mt-2 text-sm text-board-mist">No classes are scheduled for this date.</p>
      {nextWorkingDay && (
        <p className="relative mt-4 font-mono text-xs uppercase tracking-[0.16em] text-board-amber">
          Next working day: {DAY_NAMES[nextWorkingDay.date.getDay()]}, {formatDisplayDate(nextWorkingDay.date)} · Day{" "}
          {nextWorkingDay.dayOrder}
        </p>
      )}
    </motion.div>
  );
}

function StatusCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-panel/75 p-4 shadow-glow backdrop-blur">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-board-mist">
        <span className="text-board-teal">{icon}</span>
        {label}
      </div>
      <p className="text-lg font-extrabold tracking-tight text-board-paper">{value}</p>
    </div>
  );
}

function WeekGlance({ activeDay, onSelect }: { activeDay: DayOrder; onSelect: (d: DayOrder) => void }) {
  return (
    <div className="mt-10 hidden md:block">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-board-mist/70">Week at a glance</p>
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink-panel/70 shadow-board backdrop-blur-xl">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-white/[0.04] text-board-mist">
              <th className="px-3 py-3 font-mono font-medium">Period</th>
              {DAY_ORDERS.map((d) => (
                <th key={d}>
                  <button
                    onClick={() => onSelect(d)}
                    className={`w-full px-3 py-3 text-left font-mono font-medium transition-colors ${
                      d === activeDay ? "text-board-teal" : "text-board-mist hover:text-board-paper"
                    }`}
                  >
                    Day {d}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((p, i) => (
              <tr key={p.n} className="border-t border-white/10">
                <td className="px-3 py-2 font-mono text-board-mist/80">P{p.n}</td>
                {DAY_ORDERS.map((d) => {
                  const slot = TIMETABLE[d][i];
                  return (
                    <td key={d} className={`px-3 py-2 font-mono ${d === activeDay ? "bg-board-teal/5" : ""}`}>
                      {slot ? (
                        <span className="text-board-paper">{COURSES[slot.subject].code.replace(/^26/, "")}</span>
                      ) : (
                        <span className="text-board-mist/30">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
