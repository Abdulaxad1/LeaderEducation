const API_BASE = "/api";

async function fetchJson(url, options = {}) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.error || "Server so'rovida xatolik yuz berdi");
  }

  // Login yoki register javobidagi tokenni saqlash
  if (data.data?.token) {
    localStorage.setItem("authToken", data.data.token);
  }

  // Logoutdan keyin tokenni o'chirish
  if (url === "/auth/logout") {
    localStorage.removeItem("authToken");
  }

  const key = Object.keys(data).find(
    (key) => key !== "success" && Array.isArray(data[key]),
  );

  return data.data ?? (key ? data[key] : data);
}

export const authApi = {
  login: (username, password) =>
    fetchJson("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  register: (payload) =>
    fetchJson("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => fetchJson("/auth/me"),

  logout: () => fetchJson("/auth/logout", { method: "POST" }),
};

export const portalApi = {
  get: () => fetchJson("/portal"),
};

const crud = (path) => ({
  list: () => fetchJson(`/${path}`),

  getOne: (id) => fetchJson(`/${path}/${id}`),

  create: (data) =>
    fetchJson(`/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    fetchJson(`/${path}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id) => fetchJson(`/${path}/${id}`, { method: "DELETE" }),
});

export const eduApi = {
  students: crud("students"),
  teachers: crud("teachers"),
  courses: crud("courses"),
  groups: crud("groups"),
  attendance: crud("attendance"),
  grades: crud("grades"),
  homework: crud("homework"),
  payments: crud("payments"),
  materials: crud("materials"),
  certificates: crud("certificates"),
  staff: crud("staff"),

  getStats: () => fetchJson("/stats"),
  getLogs: () => fetchJson("/logs"),
  resetSeed: () => fetchJson("/seed", { method: "POST" }),
};
