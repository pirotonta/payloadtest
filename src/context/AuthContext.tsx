'use client'
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_TOKEN = "token";
const STORAGE_USER = "user";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_TOKEN);
    const rawUser = localStorage.getItem(STORAGE_USER);
    const savedUser = rawUser ? JSON.parse(rawUser) : null;

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem(STORAGE_TOKEN, newToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
  };

const logout = async () => {
  try {
    await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  } catch (error) {
    console.error("Error cerrando sesión en el servidor:", error);
  }

  setToken(null);
  setUser(null);
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
