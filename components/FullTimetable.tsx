import { COURSES, DAY_ORDERS, PERIODS, TIMETABLE } from "@/lib/data";

export default function FullTimetable() {
  return (
    <div>
      <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
        <h2 className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-tight">Full Timetable</h2>
        <span className="bg-blue-100 text-blue-950 border border-blue-600 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide">
          DAY 1–5
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin border-2 border-black rounded-lg bg-white">
        <table className="min-w-[900px] w-full border-collapse text-center text-[10px] font-bold text-slate-900">
          <thead>
            <tr className="bg-[#f5c46b]">
              <th className="sticky left-0 z-10 border-b border-r border-black bg-[#f5c46b] px-2 py-2 text-left">Day / Period</th>
              {PERIODS.map((period) => (
                <th key={period.n} className="min-w-[70px] border-b border-r border-black px-1 py-2 last:border-r-0">
                  <div>P{period.n}</div>
                  <div className="mt-0.5 font-mono text-[9px] font-medium">{period.from}–{period.to}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAY_ORDERS.map((day) => (
              <tr key={day} className="odd:bg-[#fef3c7] even:bg-[#fff8dc]">
                <th className="sticky left-0 z-10 border-b border-r border-black bg-[#f5c46b] px-2 py-2 text-left font-black">Day {day}</th>
                {TIMETABLE[day].map((slot, index) => (
                  <td key={index} className="border-b border-r border-black px-1 py-2 last:border-r-0">
                    {slot ? <span className="text-blue-900">{COURSES[slot.subject].code}</span> : <span className="text-slate-500">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[10px] font-bold text-slate-700">Scroll horizontally to view all periods.</p>
    </div>
  );
}
