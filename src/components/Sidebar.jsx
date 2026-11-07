import React, { useState } from "react";
import {
  LayoutDashboard,
  ScrollText,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";
import { ENTITIES, NAV_GROUPS } from "../config/entities.js";

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const roleLabel = {
  admin: "Administrator",
  staff: "O'qituvchi / xodim",
  student: "O'quvchi",
};

export const Sidebar = ({ current, onSelect, counts, user, onLogout }) => {
  const [collapsed, setCollapsed] = useState(() =>
    load("eduSidebarCollapsed", false),
  );

  const [closedGroups, setClosedGroups] = useState(() =>
    load("eduClosedGroups", []),
  );

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      save("eduSidebarCollapsed", !c);
      return !c;
    });
  };

  const toggleGroup = (i) => {
    setClosedGroups((prev) => {
      const next = prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i];

      save("eduClosedGroups", next);
      return next;
    });
  };

  const NavButton = ({ id, label, Icon, count }) => {
    const active = current === id;

    return (
      <button
        onClick={() => onSelect(id)}
        title={collapsed ? label : undefined}
        className={`relative w-full flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${
          active
            ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
            : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
        }`}
      >
        <span className="flex items-center gap-2.5 truncate">
          <Icon className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </span>

        {!collapsed && count !== undefined && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
            {count}
          </span>
        )}
      </button>
    );
  };

  const visibleGroups = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter(
      (k) => !(ENTITIES[k].adminOnly && user.role !== "admin"),
    ),
  })).filter((g) => g.items.length);

  return (
    <aside
      className={`${
        collapsed ? "lg:w-[72px]" : "lg:w-64"
      } w-full bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col flex-shrink-0 transition-[width] duration-200`}
    >
      <div
        className={`flex items-center px-3 pt-3 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <span className="text-xs font-semibold text-slate-400 pl-1">
            Menyu
          </span>
        )}

        <button
          onClick={toggleCollapsed}
          title={collapsed ? "Menyuni ochish" : "Menyuni yig'ish"}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 cursor-pointer"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="p-3 space-y-4 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <NavButton
            id="dashboard"
            label="Boshqaruv paneli"
            Icon={LayoutDashboard}
          />
        </div>

        {visibleGroups.map((g, gi) => {
          const closed = !collapsed && closedGroups.includes(gi);

          return (
            <div key={g.title} className="space-y-1">
              {collapsed ? (
                <div className="mx-2 border-t border-slate-800/80" />
              ) : (
                <button
                  onClick={() => toggleGroup(gi)}
                  className="w-full flex items-center justify-between px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <span>{g.title}</span>

                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      closed ? "-rotate-90" : ""
                    }`}
                  />
                </button>
              )}

              {!closed &&
                g.items.map((k) => (
                  <NavButton
                    key={k}
                    id={k}
                    label={ENTITIES[k].label}
                    Icon={ENTITIES[k].icon}
                    count={counts[k]}
                  />
                ))}
            </div>
          );
        })}

        <div className="space-y-1">
          {collapsed && <div className="mx-2 border-t border-slate-800/80" />}

          <NavButton id="logs" label="Amaliyot jurnali" Icon={ScrollText} />
        </div>
      </div>

      <div
        className={`p-3 border-t border-slate-800/80 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } gap-2`}
      >
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">
              {user.fullName}
            </div>

            <div className="text-[11px] text-slate-500">
              {roleLabel[user.role]}
            </div>
          </div>
        )}

        <button
          onClick={onLogout}
          title="Tizimdan chiqish"
          aria-label="Tizimdan chiqish"
          className="p-2 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-slate-800/70 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
