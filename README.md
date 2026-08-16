# Class Board — Batch 2 Timetable

A simple, mobile-friendly timetable site: pick a day order, see every period's
subject, teacher and room at a glance. Built with Next.js (App Router),
TypeScript and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where the data lives

Everything is in one file: `lib/data.ts`

- `COURSES` — subject name, code, credits, and a color accent per subject
- `SESSIONS` — teacher name and room/building for each course, split by
  Lecture vs Lab where a course has both
- `PERIODS` — the 12 period slots and their start/end times
- `TIMETABLE` — which subject (and Lecture/Lab) sits in each period, for
  each day order (Day 1–5)

To update the timetable for a new semester, edit `TIMETABLE` and `COURSES` —
everything else (day tabs, cards, the week-at-a-glance table, the legend)
updates automatically.

## Notes

- "Day 1"–"Day 5" refer to your college's rotating **day order**, not fixed
  weekdays — check your academic calendar to know which day order applies
  today.
- The "Now" badge compares the live clock against each period's time range,
  regardless of which day tab is open.
- Deploy anywhere that supports Next.js (Vercel is the simplest: `vercel deploy`).
