import React, { useState } from "react";
import { GraduationCap, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { useAuth } from "./AuthContext.jsx";

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500";

export const AuthPage = ({ initialMode = "login", onBack }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "login") await login(form.username, form.password);
      else await register(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Bosh sahifaga qaytish
          </button>
        )}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="text-2xl font-bold">LeaderEducation</div>
            <div className="text-xs text-slate-400">
              O'quv markazi boshqaruv tizimi
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-900/70 mb-5">
            {[
              ["login", "Kirish", LogIn],
              ["register", "Ro'yxatdan o'tish", UserPlus],
            ].map(([m, label, Icon]) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError("");
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                  mode === m
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "register" && (
              <>
                <input
                  className={inputCls}
                  placeholder="F.I.SH (to'liq ism)"
                  value={form.fullName}
                  onChange={set("fullName")}
                />
                <input
                  className={inputCls}
                  placeholder="Telefon: +998 90 123-45-67"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </>
            )}
            <input
              className={inputCls}
              placeholder="Login"
              value={form.username}
              onChange={set("username")}
              autoComplete="username"
            />
            <input
              className={inputCls}
              type="password"
              placeholder="Parol"
              value={form.password}
              onChange={set("password")}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
            {error && (
              <div className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-sm cursor-pointer hover:opacity-90 disabled:opacity-60 transition"
            >
              {busy
                ? "Kuting..."
                : mode === "login"
                  ? "Kirish"
                  : "O'quvchi sifatida ro'yxatdan o'tish"}
            </button>
            {mode === "register" && (
              <p className="text-xs text-slate-500">
                Ro'yxatdan o'tish faqat o'quvchilar uchun. O'qituvchi va xodim
                akkauntini administrator beradi.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
