import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (phone, password) => {
    const { data } = await axiosInstance.get(`/customers?phone=${phone}`);
    console.log("پاسخ سرور:", data); // ← موقت
    const found = data[0];
    if (!found || found.password !== password) {
      throw new Error("شماره موبایل یا رمز عبور اشتباه است");
    }
    const { password: _pw, ...safeUser } = found;

    setUser(safeUser);
    return safeUser;
  };

  const signup = async ({ name, phone, password }) => {
    const { data: existing } = await axiosInstance.get(`/customers?phone=${phone}`);
    if (existing.length > 0) {
      throw new Error("این شماره قبلاً ثبت‌نام شده است");
    }
    const { data: created } = await axiosInstance.post("/customers", {
      name,
      phone,
      password,
    });
    const { password: _pw, ...safeUser } = created;
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => setUser(null);

  const updateUser = async (updates) => {
    const { data } = await axiosInstance.patch(`/customers/${user.id}`, updates);
    const { password: _pw, ...safeUser } = data;
    setUser(safeUser);
    return safeUser;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}