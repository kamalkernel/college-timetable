export type SessionType = "Lecture" | "Lab";

export type SubjectKey = "BTB" | "MEE" | "CYB" | "CSE" | "MAB";

export interface Course {
  key: SubjectKey;
  code: string;
  name: string;
  credits: number;
  accent: "amber" | "teal" | "rose" | "sky" | "violet";
}

export interface Session {
  faculty: string;
  facultyId: string;
  building: string;
  floor: string;
  room: string;
  location: string;
}

export interface Period {
  n: number;
  from: string;
  to: string;
}

export interface ClassSlot {
  subject: SubjectKey;
  type: SessionType;
}

export const COURSES: Record<SubjectKey, Course> = {
  BTB: {
    key: "BTB",
    code: "26BTB1001T",
    name: "Introduction to Computational Biology",
    credits: 2,
    accent: "amber",
  },
  MEE: {
    key: "MEE",
    code: "26MEE1001L",
    name: "Workshop Practice",
    credits: 2,
    accent: "teal",
  },
  CYB: {
    key: "CYB",
    code: "26CYB1002J",
    name: "Chemistry for Computer Science",
    credits: 4,
    accent: "rose",
  },
  CSE: {
    key: "CSE",
    code: "26CSE1002J",
    name: "Programming for Problem Solving",
    credits: 3,
    accent: "sky",
  },
  MAB: {
    key: "MAB",
    code: "26MAB1001T",
    name: "Calculus and Linear Algebra",
    credits: 4,
    accent: "violet",
  },
};

// Faculty + venue per course, split by session type where a course has both
// a lecture slot and a separate lab slot.
export const SESSIONS: Record<SubjectKey, Partial<Record<SessionType, Session>>> = {
  BTB: {
    Lecture: {
      faculty: "Ambikah Gandhi Mathi A G",
      facultyId: "104022",
      location: "Annexure-II",
      building: "University Building",
      floor: "6th Floor",
      room: "618",
    },
  },
  MEE: {
    Lab: {
      faculty: "Dr. Santosh Kumar Singh",
      facultyId: "102274",
      location: "Annexure-I",
      building: "Basic Engineering Lab (BEL)",
      floor: "Ground Floor",
      room: "Sheet Metal Lab",
    },
  },
  CYB: {
    Lecture: {
      faculty: "Dr. N. Abirami",
      facultyId: "100116",
      location: "Annexure-II",
      building: "University Building",
      floor: "6th Floor",
      room: "618",
    },
    Lab: {
      faculty: "Dr. N. Abirami",
      facultyId: "100116",
      location: "Annexure-II",
      building: "Chemistry Lab Block",
      floor: "Ground Floor",
      room: "Chemistry Laboratory 2",
    },
  },
  CSE: {
    Lecture: {
      faculty: "Dr. Avinash Vujji",
      facultyId: "103800",
      location: "Annexure-II",
      building: "University Building",
      floor: "6th Floor",
      room: "618",
    },
    Lab: {
      faculty: "Dr. Avinash Vujji",
      facultyId: "103800",
      location: "Annexure-I",
      building: "Tech Park",
      floor: "4th Floor",
      room: "Computer Forensics Lab",
    },
  },
  MAB: {
    Lecture: {
      faculty: "Dr. Kalaiyarasi R",
      facultyId: "101979",
      location: "Annexure-II",
      building: "University Building",
      floor: "6th Floor",
      room: "618",
    },
  },
};

export const PERIODS: Period[] = [
  { n: 1, from: "08:00", to: "08:50" },
  { n: 2, from: "08:50", to: "09:40" },
  { n: 3, from: "09:45", to: "10:35" },
  { n: 4, from: "10:40", to: "11:30" },
  { n: 5, from: "11:35", to: "12:25" },
  { n: 6, from: "12:30", to: "13:20" },
  { n: 7, from: "13:25", to: "14:15" },
  { n: 8, from: "14:20", to: "15:10" },
  { n: 9, from: "15:10", to: "16:00" },
  { n: 10, from: "16:00", to: "16:50" },
  { n: 11, from: "16:50", to: "17:30" },
  { n: 12, from: "17:30", to: "18:10" },
];

export const DAY_ORDERS = [1, 2, 3, 4, 5] as const;
export type DayOrder = (typeof DAY_ORDERS)[number];

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

// Update this list when the college publishes holidays.
// These dates do not consume a day order; the same day order moves to the next working day.
export const HOLIDAYS: string[] = [
  "2026-08-26",
  "2026-09-04",
  "2026-09-14",
  "2026-10-02",
  "2026-10-19",
  "2026-10-20",
];

export const DAY_ORDER_ANCHOR = {
  date: "2026-08-17",
  dayOrder: 5 as DayOrder,
};

// One entry per period (index 0 = period 1). null = free period.
export const TIMETABLE: Record<DayOrder, (ClassSlot | null)[]> = {
  1: [
    null,
    null,
    { subject: "CSE", type: "Lab" },
    { subject: "CSE", type: "Lab" },
    null,
    null,
    null,
    null,
    null,
    { subject: "BTB", type: "Lecture" },
    null,
    null,
  ],
  2: [
    { subject: "CYB", type: "Lecture" },
    { subject: "CYB", type: "Lecture" },
    { subject: "BTB", type: "Lecture" },
    { subject: "BTB", type: "Lecture" },
    null,
    null,
    { subject: "MEE", type: "Lab" },
    { subject: "MEE", type: "Lab" },
    { subject: "MEE", type: "Lab" },
    { subject: "MEE", type: "Lab" },
    null,
    null,
  ],
  3: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    { subject: "MAB", type: "Lecture" },
    { subject: "CYB", type: "Lab" },
    null,
    null,
  ],
  4: [
    { subject: "MAB", type: "Lecture" },
    { subject: "MAB", type: "Lecture" },
    { subject: "CYB", type: "Lecture" },
    { subject: "CSE", type: "Lecture" },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  5: [
    { subject: "CYB", type: "Lab" },
    { subject: "CYB", type: "Lab" },
    null,
    null,
    null,
    { subject: "CSE", type: "Lecture" },
    { subject: "CSE", type: "Lecture" },
    null,
    null,
    { subject: "MAB", type: "Lecture" },
    null,
    null,
  ],
};

export function to12Hour(time: string): string {
  const [hStr, m] = time.split(":");
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${suffix}`;
}

export function getSession(subject: SubjectKey, type: SessionType): Session {
  const session = SESSIONS[subject][type];
  if (!session) {
    throw new Error(`No ${type} session configured for ${subject}`);
  }
  return session;
}

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isHoliday(date: Date): boolean {
  return HOLIDAYS.includes(toDateKey(date));
}

export function isWorkingDay(date: Date): boolean {
  return !isWeekend(date) && !isHoliday(date);
}

function shiftDayOrder(dayOrder: DayOrder, steps: number): DayOrder {
  const index = DAY_ORDERS.indexOf(dayOrder);
  const nextIndex = (((index + steps) % DAY_ORDERS.length) + DAY_ORDERS.length) % DAY_ORDERS.length;
  return DAY_ORDERS[nextIndex];
}

function countWorkingDaysBetween(start: Date, end: Date): number {
  const direction = start <= end ? 1 : -1;
  let cursor = addDays(start, direction);
  let count = 0;

  while ((direction === 1 && cursor <= end) || (direction === -1 && cursor >= end)) {
    if (isWorkingDay(cursor)) {
      count += direction;
    }
    cursor = addDays(cursor, direction);
  }

  return count;
}

export function getDayOrderForDate(date: Date): DayOrder | null {
  if (!isWorkingDay(date)) {
    return null;
  }

  const anchor = parseDateKey(DAY_ORDER_ANCHOR.date);
  const steps = countWorkingDaysBetween(anchor, date);
  return shiftDayOrder(DAY_ORDER_ANCHOR.dayOrder, steps);
}

export function getNextWorkingDay(from: Date): { date: Date; dayOrder: DayOrder } {
  let cursor = addDays(from, 1);

  while (!isWorkingDay(cursor)) {
    cursor = addDays(cursor, 1);
  }

  return {
    date: cursor,
    dayOrder: getDayOrderForDate(cursor) ?? DAY_ORDER_ANCHOR.dayOrder,
  };
}
