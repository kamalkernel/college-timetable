import { COURSES } from "@/lib/data";

const DOT: Record<string, string> = {
  amber: "bg-board-amber",
  teal: "bg-board-teal",
  rose: "bg-board-rose",
  sky: "bg-board-sky",
  violet: "bg-board-violet",
};

export default function Legend() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-ink-panel/60 p-4 shadow-board backdrop-blur-xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-board-mist/70">Course map</p>
      <div className="grid gap-2 text-xs text-board-mist md:grid-cols-2">
        {Object.values(COURSES).map((c) => (
          <span key={c.code} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
            <span className={`h-2.5 w-2.5 rounded-full ${DOT[c.accent]}`} />
            <span className="font-mono text-board-paper">{c.code}</span>
            <span className="min-w-0 truncate text-board-mist/70">{c.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
