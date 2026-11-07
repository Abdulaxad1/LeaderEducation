import React, { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { lookupLabel } from "../config/entities.js";

const inputCls =
  "w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500";

const BADGE = {
  active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  inactive: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  graduated: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  keldi: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  kelmadi: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  kechikdi: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "to'landi": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  kutilmoqda: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  til: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  IT: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  fan: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};

const fmtMoney = (n) => `${Number(n || 0).toLocaleString("ru-RU")} so'm`;

export const CrudView = ({
  config,
  items,
  lookups,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const Icon = config.icon;

  const resolve = (col, item) => {
    const v = item[col.key];
    if (col.lookup)
      return (
        lookupLabel((lookups[col.lookup] || []).find((x) => x.id === v)) ||
        v ||
        "-"
      );
    if (col.money) return fmtMoney(v);
    return v === undefined || v === null || v === "" ? "-" : String(v);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      config.columns.some((c) => resolve(c, it).toLowerCase().includes(q)),
    );
  }, [items, search, lookups]);

  const openNew = () => {
    setForm({ ...config.defaults });
    setError("");
    setEditing("new");
  };
  const openEdit = (item) => {
    setForm({ ...item });
    setError("");
    setEditing(item);
  };
  const close = () => setEditing(null);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form };
    for (const f of config.fields) {
      if (
        f.type === "number" &&
        payload[f.key] !== undefined &&
        payload[f.key] !== ""
      )
        payload[f.key] = Number(payload[f.key]);
      if (
        f.required &&
        (payload[f.key] === undefined || payload[f.key] === "")
      ) {
        return setError(`"${f.label}" maydonini to'ldiring`);
      }
    }
    setBusy(true);
    try {
      if (editing === "new") await onCreate(payload);
      else await onUpdate(editing.id, payload);
      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await onDelete(toDelete.id);
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{config.label}</h1>
            <div className="text-xs text-slate-500">
              Jami: {items.length} ta
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Qidirish..."
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm w-48 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> Qo'shish
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
              {config.columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 font-semibold whitespace-nowrap"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-4 py-10 text-center text-slate-500"
                >
                  {items.length === 0
                    ? "Hozircha ma'lumot yo'q. \"Qo'shish\" tugmasini bosing."
                    : "Hech narsa topilmadi"}
                </td>
              </tr>
            )}
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40"
              >
                {config.columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-4 py-3 text-slate-300 whitespace-nowrap max-w-[220px] truncate"
                  >
                    {c.badge ? (
                      <span
                        className={`inline-block text-[11px] px-2 py-0.5 rounded-full border ${BADGE[item[c.key]] || "bg-slate-500/10 text-slate-300 border-slate-500/20"}`}
                      >
                        {resolve(c, item)}
                      </span>
                    ) : (
                      resolve(c, item)
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => openEdit(item)}
                    title="Tahrirlash"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setToDelete(item)}
                    title="O'chirish"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-slate-800 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Qo'shish / tahrirlash oynasi */}
      {editing && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0f1d] border border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">
                {editing === "new"
                  ? `Yangi ${config.singular}`
                  : `${config.singular[0].toUpperCase()}${config.singular.slice(1)}ni tahrirlash`}
              </h2>
              <button
                type="button"
                onClick={close}
                className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {config.fields.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-xs text-slate-400 mb-1 block">
                    {f.label}{" "}
                    {f.required && <span className="text-rose-400">*</span>}
                  </span>
                  {f.type === "select" ? (
                    <select
                      className={inputCls}
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                    >
                      <option value="">Tanlang...</option>
                      {f.optionsFrom
                        ? (lookups[f.optionsFrom] || []).map((o) => (
                            <option key={o.id} value={o.id}>
                              {lookupLabel(o)}
                            </option>
                          ))
                        : f.options.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className={inputCls}
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type={f.type || "text"}
                      className={inputCls}
                      value={form[f.key] ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                    />
                  )}
                </label>
              ))}
            </div>
            {error && (
              <div className="mt-4 px-3.5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={busy}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold disabled:opacity-60 cursor-pointer"
              >
                {busy ? "Saqlanmoqda..." : "Saqlash"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* O'chirishni tasdiqlash */}
      {toDelete && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setToDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-[#0a0f1d] border border-slate-700 p-6"
          >
            <h2 className="text-lg font-bold mb-2">O'chirishni tasdiqlang</h2>
            <p className="text-sm text-slate-400 mb-5">
              <span className="text-slate-200">{toDelete.id}</span> yozuvi
              butunlay o'chiriladi. Bu amalni qaytarib bo'lmaydi.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-sm font-semibold cursor-pointer"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
