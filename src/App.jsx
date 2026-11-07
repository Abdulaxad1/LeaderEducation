import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "./auth/AuthContext.jsx";
import { eduApi } from "./services/api.js";
import { ENTITIES } from "./config/entities.js";
import { Header } from "./components/Header.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { DashboardView } from "./components/DashboardView.jsx";
import { LogsView } from "./components/LogsView.jsx";
import { CrudView } from "./components/CrudView.jsx";

const CORE = [
  "students",
  "teachers",
  "courses",
  "groups",
  "attendance",
  "grades",
  "homework",
  "payments",
  "materials",
  "certificates",
];

export default function App() {
  const { user, logout } = useAuth();
  const [current, setCurrent] = useState("dashboard");
  const [data, setData] = useState({});
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((type, message) => {
    const id = Date.now() + Math.random();

    setToasts((t) => [...t, { id, type, message }]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3500);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const statsData = await eduApi.getStats();
      setStats(statsData);

      const next = {};

      const results = await Promise.allSettled(
        CORE.map((key) => eduApi[key].list()),
      );

      CORE.forEach((key, index) => {
        const result = results[index];

        if (result.status === "fulfilled") {
          next[key] = Array.isArray(result.value) ? result.value : [];
        } else {
          next[key] = [];
          console.error(`${key} yuklanmadi:`, result.reason);
        }
      });

      next.staff = [];

      if (user.role === "admin") {
        try {
          const staffData = await eduApi.staff.list();
          next.staff = Array.isArray(staffData) ? staffData : [];
        } catch (error) {
          console.error("Staff yuklanmadi:", error);
        }
      }

      setData(next);

      try {
        const logsData = await eduApi.getLogs();
        setLogs(Array.isArray(logsData) ? logsData : []);
      } catch (error) {
        console.error("Logs yuklanmadi:", error);
        setLogs([]);
      }
    } catch (error) {
      console.error("Ma'lumotlarni yuklash xatosi:", error);
      toast("error", error.message);
    } finally {
      setLoading(false);
    }
  }, [user.role, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const actions = (key) => ({
    onCreate: async (payload) => {
      await eduApi[key].create(payload);
      toast("success", "Muvaffaqiyatli qo'shildi");
      await load();
    },

    onUpdate: async (id, payload) => {
      await eduApi[key].update(id, payload);
      toast("success", "Muvaffaqiyatli yangilandi");
      await load();
    },

    onDelete: async (id) => {
      try {
        await eduApi[key].remove(id);
        toast("success", "Muvaffaqiyatli o'chirildi");
        await load();
      } catch (e) {
        toast("error", e.message);
      }
    },
  });

  const handleReset = async () => {
    if (
      !window.confirm(
        "Barcha ma'lumotlar namunaviy holatga qaytariladi. Davom etasizmi?",
      )
    ) {
      return;
    }

    try {
      await eduApi.resetSeed();
      toast("success", "Baza namunaviy holatga qaytarildi");
      await load();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const counts = {
    students: stats?.totalStudents ?? data.students?.length ?? 0,
    teachers: stats?.totalTeachers ?? data.teachers?.length ?? 0,
    courses: stats?.totalCourses ?? data.courses?.length ?? 0,
    groups: stats?.totalGroups ?? data.groups?.length ?? 0,
    attendance: data.attendance?.length ?? 0,
    grades: data.grades?.length ?? 0,
    homework: data.homework?.length ?? 0,
    payments: data.payments?.length ?? 0,
    materials: data.materials?.length ?? 0,
    certificates: stats?.totalCertificates ?? data.certificates?.length ?? 0,
    staff: data.staff?.length ?? 0,
  };

  const config = ENTITIES[current];

  return (
    <div className="h-screen flex flex-col bg-[#070b14] text-slate-100">
      <Header
        user={user}
        onRefresh={load}
        onReset={handleReset}
        loading={loading}
      />

      <div className="flex flex-1 min-h-0 flex-col lg:flex-row">
        <Sidebar
          current={current}
          onSelect={setCurrent}
          counts={counts}
          user={user}
          onLogout={logout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {current === "dashboard" && (
            <DashboardView
              stats={stats}
              data={data}
              user={user}
              onNavigate={setCurrent}
            />
          )}

          {current === "logs" && <LogsView logs={logs} />}

          {config && (
            <CrudView
              key={current}
              config={config}
              items={data[current] || []}
              lookups={data}
              {...actions(current)}
            />
          )}
        </main>
      </div>

      <div className="fixed bottom-5 right-5 z-[60] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm shadow-xl ${
              t.type === "error"
                ? "bg-rose-950 border-rose-700 text-rose-200"
                : "bg-emerald-950 border-emerald-700 text-emerald-200"
            }`}
          >
            {t.type === "error" ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}

            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}
