// apps/frontend/src/lib/auth.tsx
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import  api from "../lib/api";

import { queryClient } from "./queryClient";

type User = { id: number; name?: string | null; email: string; role?: string };

const AuthContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
} | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // fetch current user - using v5 object signature
  useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data as User;
    },
    onSuccess(data) {
      setUser(data);
    },
    onError() {
      setUser(null);
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    queryClient.clear();
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};
