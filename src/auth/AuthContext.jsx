import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem("authToken"))
      .finally(() => setLoading(false));
  }, []);

  const startSession = useCallback(({ token, user: u }) => {
    localStorage.setItem("authToken", token);
    setUser(u);
    return u;
  }, []);

  const login = useCallback(
    async (username, password) =>
      startSession(await authApi.login(username, password)),
    [startSession],
  );
  const register = useCallback(
    async (payload) => startSession(await authApi.register(payload)),
    [startSession],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* token allaqachon eskirgan bo'lishi mumkin */
    }
    localStorage.removeItem("authToken");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
