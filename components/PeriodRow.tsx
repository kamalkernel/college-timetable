"use client";

import { BookOpen, FlaskConical, MapPin, User } from "lucide-react";
import { ClassSlot, COURSES, Period, getSession, to12Hour } from "@/lib/data";

const ACCENTS: Record<string, { text: string; bg: string; border: string; dot: string; glow: string }> = {
  amber: {
    text: "text-board-amber",
    bg: "bg-board-amber/10",
    border: "border-board-amber/35",
    dot: "bg-board-amber",
    glow: "from-board-amber/25",
  },
  teal: {
    text: "text-board-teal",
    bg: "bg-board-teal/10",
    border: "border-board-teal/35",
    dot: "bg-board-teal",
    glow: "from-board-teal/25",
  },
  rose: {
    text: "text-board-rose",
    bg: "bg-board-rose/10",
    border: "border-board-rose/35",
    dot: "bg-board-rose",
    glow: "from-board-rose/25",
  },
  sky: {
    text: "text-board-sky",
    bg: "bg-board-sky/10",
    border: "border-board-sky/35",
    dot: "bg-board-sky",
    glow: "from-board-sky/25",
  },
  violet: {
    text: "text-board-violet",
    bg: "bg-board-violet/10",
    border: "border-board-violet/35",
    dot: "bg-board-violet",
    glow: "from-board-violet/25",
  },
};

interface Props {
  period: Period;
  slot: ClassSlot | null;
  isNow: boolean;
}

export default function PeriodRow({ period, slot, isNow }: Props) {
  if (!slot) {
    return (
      <div
        className={`group relative overflow-hidden rounded-[1.35rem] border border-dashed border-white/10 bg-white/[0.025] px-4 py-4 backdrop-blur transition-all sm:px-5 ${
          isNow ? "border-board-teal/50 ring-1 ring-board-teal/40" : "hover:border-white/20"
        }`}
      >
        <div className="flex items-center gap-4">
          <TimeColumn period={period} muted />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-board-mist/50">Idle slot</p>
            <p className="text-sm italic text-board-mist/75">Free period</p>
          </div>
          {isNow && <NowBadge />}
        </div>
      </div>
    );
  }

  const course = COURSES[slot.subject];
  const session = getSession(slot.subject, slot.type);
  const a = ACCENTS[course.accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-[1.35rem] border ${a.border} bg-ink-panel/80 px-4 py-4 shadow-board backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/20 sm:px-5 ${
        isNow ? `animate-pulse-glow ring-2 ring-current ${a.text}` : ""
      }`}
    >
      <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${a.glow} via-white/40 to-transparent`} />
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${a.glow} to-transparent blur-2xl`} />

      <div className="relative flex items-start gap-4">
        <TimeColumn period={period} />

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${a.dot} shadow-[0_0_18px_currentColor]`} />
            <h3 className={`text-base font-extrabold tracking-tight sm:text-lg ${a.text}`}>{course.name}</h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${a.text} ${a.bg} border ${a.border}`}
            >
              {slot.type === "Lab" ? <FlaskConical size={10} /> : <BookOpen size={10} />}
              {slot.type}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-board-mist">
              {course.code}
            </span>
          </div>

          <div className="grid gap-2 text-xs text-board-mist sm:grid-cols-2">
            <span className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <User size={13} className="shrink-0 text-board-mist/70" />
              <span className="truncate">{session.faculty}</span>
            </span>
            <span className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <MapPin size={13} className="shrink-0 text-board-mist/70" />
              <span className="truncate">
                {session.building} · {session.floor} · {session.room}
              </span>
            </span>
          </div>
        </div>

        {isNow && <NowBadge />}
      </div>
    </div>
  );
}

function TimeColumn({ period, muted }: { period: Period; muted?: boolean }) {
  return (
    <div
      className={`w-20 shrink-0 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs leading-tight sm:w-24 ${
        muted ? "text-board-mist/45" : "text-board-paper"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-board-mist/60">P{period.n}</div>
      <div className="mt-1">{to12Hour(period.from)}</div>
      <div className="opacity-55">{to12Hour(period.to)}</div>
    </div>
  );
}

function NowBadge() {
  return (
    <span className="ml-auto hidden shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300 sm:inline-flex">
      Now
    </span>
  );
}
