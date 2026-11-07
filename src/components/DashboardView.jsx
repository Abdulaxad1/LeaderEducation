import React from "react";
import {
  Users,
  Layers,
  GraduationCap,
  BookOpen,
  Wallet,
  Clock,
  CalendarCheck,
  Award,
  AlertTriangle,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { lookupLabel } from "../config/entities.js";

const fmtMoney = (n) => `${Number(n || 0).toLocaleString("ru-RU")} so'm`;

const fmtMln = (n) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(".0", "")} mln` : fmtMoney(n);

const Stat = ({ icon: Icon, label, value, hint, color, onClick }) => (
  <button
    onClick={onClick}
    className="text-left p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className={`p-1.5 rounded-lg ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </span>
    </div>

    <div
      className="text-3xl font-extrabold"
      style={{ color: "#ffffff", display: "block" }}
    >
      {String(value)}
    </div>

    {hint && <div className="text-[11px] text-slate-500 mt-1">{hint}</div>}
  </button>
);

const Card = ({ title, action, onAction, children }) => (
  <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800 p-5">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-sm">{title}</h2>

      {action && (
        <button
          onClick={onAction}
          className="text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 cursor-pointer"
        >
          {action} <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </div>

    {children}
  </div>
);

const Bar = ({ label, value, max, color }) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-500">{value}</span>
    </div>

    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${max ? Math.min(100, (value / max) * 100) : 0}%` }}
      />
    </div>
  </div>
);

export const DashboardView = ({ stats, data, user, onNavigate }) => {
  const {
    groups = [],
    courses = [],
    teachers = [],
    students = [],
    payments = [],
    grades = [],
    homework = [],
  } = data || {};

  const s = stats || {};

  const name = (list, id) => lookupLabel(list.find((x) => x.id === id)) || id;

  const pending = payments.filter((p) => p.status === "kutilmoqda");

  const top = students
    .map((st) => {
      const gs = grades.filter((g) => g.studentId === st.id);

      return {
        st,
        avg: gs.length
          ? Math.round(
              gs.reduce(
                (a, g) => a + (g.score / (g.maxScore || 100)) * 100,
                0,
              ) / gs.length,
            )
          : null,
      };
    })
    .filter((x) => x.avg !== null)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  const deadlines = [...homework]
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
    .slice(0, 5);

  const groupSize = (id) =>
    students.filter((st) => st.groupId === id && st.status === "active").length;

  const maxCat = Math.max(1, ...Object.values(s.studentsByCategory || {}));

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600/20 to-violet-600/10 border border-indigo-500/20">
        <div className="text-xs text-indigo-300 font-medium mb-1">
          Xush kelibsiz, {user.fullName}
        </div>

        <h1 className="text-2xl font-bold mb-1">LeaderEducation boshqaruv markazi</h1>

        <p className="text-sm text-slate-400">
          Til kurslari, dasturlash va fanlar bo'yicha o'quv jarayonini bir joyda
          boshqaring.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <Stat
          icon={Users}
          label="O'quvchilar"
          value={s.totalStudents ?? 0}
          hint={`${s.activeStudents ?? 0} faol · ${s.pausedStudents ?? 0} to'xtagan`}
          color="bg-indigo-500/10 text-indigo-400"
          onClick={() => onNavigate("students")}
        />

        <Stat
          icon={Layers}
          label="Guruhlar"
          value={s.totalGroups ?? 0}
          hint="Faol guruhlar"
          color="bg-violet-500/10 text-violet-400"
          onClick={() => onNavigate("groups")}
        />

        <Stat
          icon={GraduationCap}
          label="O'qituvchilar"
          value={s.totalTeachers ?? 0}
          hint="Jamoa a'zolari"
          color="bg-sky-500/10 text-sky-400"
          onClick={() => onNavigate("teachers")}
        />

        <Stat
          icon={BookOpen}
          label="Kurslar"
          value={s.totalCourses ?? 0}
          hint={`Til ${s.coursesByCategory?.til ?? 0} · IT ${s.coursesByCategory?.IT ?? 0} · Fan ${s.coursesByCategory?.fan ?? 0}`}
          color="bg-emerald-500/10 text-emerald-400"
          onClick={() => onNavigate("courses")}
        />

        <Stat
          icon={BadgeCheck}
          label="Sertifikatlar"
          value={s.totalCertificates ?? 0}
          hint={`${s.graduatedStudents ?? 0} ta bitiruvchi`}
          color="bg-indigo-500/10 text-indigo-400"
          onClick={() => onNavigate("certificates")}
        />

        <Stat
          icon={Wallet}
          label={`Tushum (${s.latestMonth || "-"})`}
          value={fmtMln(s.monthlyRevenue)}
          hint={`Jami: ${fmtMln(s.totalRevenue)}`}
          color="bg-emerald-500/10 text-emerald-400"
          onClick={() => onNavigate("payments")}
        />

        <Stat
          icon={Clock}
          label="Kutilayotgan to'lov"
          value={fmtMln(s.pendingAmount)}
          hint={`${s.pendingPayments ?? 0} ta hisob`}
          color="bg-amber-500/10 text-amber-400"
          onClick={() => onNavigate("payments")}
        />

        <Stat
          icon={AlertTriangle}
          label="Qarzdorlar"
          value={s.debtors ?? 0}
          hint="Balansi manfiy"
          color="bg-rose-500/10 text-rose-400"
          onClick={() => onNavigate("students")}
        />

        <Stat
          icon={CalendarCheck}
          label="Davomat"
          value={`${s.attendanceRate ?? 0}%`}
          hint="Darsga qatnashish"
          color="bg-sky-500/10 text-sky-400"
          onClick={() => onNavigate("attendance")}
        />

        <Stat
          icon={Award}
          label="O'rtacha ball"
          value={`${s.averageScore ?? 0}%`}
          hint="Barcha imtihonlar"
          color="bg-violet-500/10 text-violet-400"
          onClick={() => onNavigate("grades")}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Yo'nalishlar bo'yicha faol o'quvchilar">
          <div className="space-y-4">
            <Bar
              label="Til kurslari"
              value={s.studentsByCategory?.til ?? 0}
              max={maxCat}
              color="bg-sky-500"
            />

            <Bar
              label="IT va dasturlash"
              value={s.studentsByCategory?.IT ?? 0}
              max={maxCat}
              color="bg-violet-500"
            />

            <Bar
              label="Fanlar"
              value={s.studentsByCategory?.fan ?? 0}
              max={maxCat}
              color="bg-orange-500"
            />
          </div>
        </Card>

        <Card
          title="Eng yuqori natijalar"
          action="Baholar"
          onAction={() => onNavigate("grades")}
        >
          <div className="space-y-2">
            {top.map(({ st, avg }, i) => (
              <div
                key={st.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/50"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>

                <span className="text-sm flex-1 truncate">{st.fullName}</span>

                <span className="text-sm font-semibold text-emerald-300">
                  {avg}%
                </span>
              </div>
            ))}

            {top.length === 0 && (
              <div className="text-sm text-slate-500">Baholar hali yo'q</div>
            )}
          </div>
        </Card>

        <Card
          title="Yaqin muddatli uyga vazifalar"
          action="Barchasi"
          onAction={() => onNavigate("homework")}
        >
          <div className="space-y-2">
            {deadlines.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/50"
              >
                <div className="min-w-0">
                  <div className="text-sm truncate">{h.title}</div>

                  <div className="text-[11px] text-slate-500 truncate">
                    {name(groups, h.groupId)}
                  </div>
                </div>

                <span className="text-[11px] text-amber-300 flex-shrink-0">
                  {h.dueDate}
                </span>
              </div>
            ))}

            {deadlines.length === 0 && (
              <div className="text-sm text-slate-500">Vazifalar yo'q</div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card
          title="Guruhlar jadvali"
          action="Barchasi"
          onAction={() => onNavigate("groups")}
        >
          <div className="space-y-2">
            {groups.slice(0, 6).map((g) => {
              const n = groupSize(g.id);

              return (
                <div key={g.id} className="p-3 rounded-xl bg-slate-900/50">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {g.name}
                      </div>

                      <div className="text-[11px] text-slate-500 truncate">
                        {name(courses, g.courseId)} ·{" "}
                        {name(teachers, g.teacherId)}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 text-right flex-shrink-0">
                      {g.schedule}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (n / (g.capacity || 1)) * 100)}%`,
                        }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-500">
                      {n}/{g.capacity}
                    </span>
                  </div>
                </div>
              );
            })}

            {groups.length === 0 && (
              <div className="text-sm text-slate-500">Guruhlar hali yo'q</div>
            )}
          </div>
        </Card>

        <Card
          title="Kutilayotgan to'lovlar"
          action="Barchasi"
          onAction={() => onNavigate("payments")}
        >
          <div className="space-y-2">
            {pending.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {name(students, p.studentId)}
                  </div>

                  <div className="text-[11px] text-slate-500">
                    {p.month} oyi
                  </div>
                </div>

                <div className="text-sm text-amber-300 ml-3 flex-shrink-0">
                  {fmtMoney(p.amount)}
                </div>
              </div>
            ))}

            {pending.length === 0 && (
              <div className="text-sm text-slate-500">
                Kutilayotgan to'lov yo'q
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
