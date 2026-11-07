import React from "react";
import { GraduationCap, RefreshCw, RotateCcw } from "lucide-react";

export const Header = ({ user, onRefresh, onReset, loading }) => (
  <header className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-[#0a0f1d]/80 backdrop-blur flex-shrink-0">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
        <GraduationCap className="w-5 h-5" />
      </div>
      <div>
        <div className="font-bold leading-tight">LeaderEducation</div>
        <div className="text-[11px] text-slate-500 leading-tight">
          Til · IT · Fanlar o'quv markazi
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/50 text-xs cursor-pointer transition-colors"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />{" "}
        Yangilash
      </button>
      {user.role === "admin" && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/50 text-xs cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Baza reset
        </button>
      )}
    </div>
  </header>
);
