import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  LogOut,
  CalendarCheck,
  Award,
  ClipboardList,
  Wallet,
  BadgeCheck,
  Layers,
} from "lucide-react";
import { useAuth } from "./AuthContext.jsx";
import { portalApi } from "../services/api.js";

const fmtMoney = (n) => `${Number(n || 0).toLocaleString("ru-RU")} so'm`;

const Section = ({ icon: Icon, title, count, empty, children }) => (
  <section className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800">
    <div className="flex items-center gap-2.5 mb-4">
      <Icon className="w-5 h-5 text-indigo-400" />
      <h2 className="font-semibold">{title}</h2>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
    {count === 0 ? (
      <div className="text-sm text-slate-500">{empty}</div>
    ) : (
      <div className="space-y-2">{children}</div>
    )}
  </section>
);

const Row = ({ left, sub, right }) => (
  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-900/50">
    <div className="min-w-0">
      <div className="text-sm text-slate-200">{left}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
    {right && (
      <div className="text-xs text-slate-300 flex-shrink-0">{right}</div>
    )}
  </div>
);

export const StudentPortal = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    portalApi
      .get()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <header className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-indigo-400" />
          <span className="font-bold">LeaderEducation</span>
          <span className="text-xs text-slate-500">O'quvchi kabineti</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:block">
            {user.fullName}
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500/50 text-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Chiqish
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-4">
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
            {error}
          </div>
        )}
        {!data && !error && (
          <div className="text-slate-500 text-sm">Yuklanmoqda...</div>
        )}
        {data && (
          <>
            <section className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600/20 to-violet-600/10 border border-indigo-500/20">
              <div className="text-xl font-bold mb-1">
                {data.student?.fullName}
              </div>
              <div className="text-sm text-slate-400">
                Karta: {data.student?.id} · Tel: {data.student?.phone || "-"} ·
                Balans: {fmtMoney(data.student?.balance)}
              </div>
            </section>

            <Section
              icon={Layers}
              title="Mening guruhim"
              count={data.group ? 1 : 0}
              empty="Siz hali guruhga biriktirilmagansiz"
            >
              {data.group && (
                <Row
                  left={data.group.name}
                  sub={`Jadval: ${data.group.schedule} · Xona: ${data.group.room || "-"}`}
                />
              )}
            </Section>

            <Section
              icon={ClipboardList}
              title="Uyga vazifalar"
              count={data.homework.length}
              empty="Uyga vazifa yo'q"
            >
              {data.homework.map((h) => (
                <Row
                  key={h.id}
                  left={h.title}
                  sub={h.description}
                  right={`Muddat: ${h.dueDate}`}
                />
              ))}
            </Section>

            <Section
              icon={CalendarCheck}
              title="Davomat"
              count={data.attendance.length}
              empty="Davomat yozuvlari yo'q"
            >
              {data.attendance.map((a) => (
                <Row key={a.id} left={a.date} right={a.status} />
              ))}
            </Section>

            <Section
              icon={Award}
              title="Baholarim"
              count={data.grades.length}
              empty="Baholar yo'q"
            >
              {data.grades.map((g) => (
                <Row
                  key={g.id}
                  left={g.examName}
                  sub={g.date}
                  right={`${g.score} / ${g.maxScore || 100}`}
                />
              ))}
            </Section>

            <Section
              icon={Wallet}
              title="To'lovlarim"
              count={data.payments.length}
              empty="To'lovlar yo'q"
            >
              {data.payments.map((p) => (
                <Row
                  key={p.id}
                  left={`${p.month} oyi`}
                  sub={p.method !== "-" ? p.method : null}
                  right={`${fmtMoney(p.amount)} · ${p.status}`}
                />
              ))}
            </Section>

            <Section
              icon={BadgeCheck}
              title="Sertifikatlarim"
              count={data.certificates.length}
              empty="Sertifikatlar hali yo'q"
            >
              {data.certificates.map((c) => (
                <Row
                  key={c.id}
                  left={c.courseName || c.courseId}
                  sub={`Berilgan: ${c.issueDate}`}
                  right={c.grade}
                />
              ))}
            </Section>
          </>
        )}
      </main>
    </div>
  );
};
