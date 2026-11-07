import React from "react";
import { ScrollText } from "lucide-react";

const COLORS = {
  CREATE: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  UPDATE: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  DELETE: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

export const LogsView = ({ logs }) => (
  <div>
    <div className="flex items-center gap-3 mb-5">
      <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
        <ScrollText className="w-5 h-5" />
      </div>
      <div>
        <h1 className="text-xl font-bold">Amaliyot jurnali</h1>
        <div className="text-xs text-slate-500">
          Oxirgi {logs.length} ta amal
        </div>
      </div>
    </div>
    <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800 divide-y divide-slate-800/60">
      {logs.map((l) => (
        <div key={l.id} className="flex items-center gap-3 px-4 py-3">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COLORS[l.action] || COLORS.UPDATE}`}
          >
            {l.action}
          </span>
          <span className="text-xs text-slate-500 w-28 flex-shrink-0 truncate">
            {l.module}
          </span>
          <span className="text-sm text-slate-300 flex-1 min-w-0 truncate">
            {l.description}
          </span>
          <span className="text-[11px] text-slate-600 flex-shrink-0">
            {new Date(l.timestamp).toLocaleString("uz-UZ")}
          </span>
        </div>
      ))}
      {logs.length === 0 && (
        <div className="px-4 py-10 text-center text-slate-500 text-sm">
          Hozircha yozuvlar yo'q
        </div>
      )}
    </div>
  </div>
);
