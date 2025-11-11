import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/login", form);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      // set user (if backend returns user)
      if (data.user) setUser(data.user);
      // otherwise request /auth/me will populate
      nav("/dashboard");
    },
    onError: (err: any) => {
      alert(`❌ Login failed: ${err.response?.data?.error || err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="bg-green-600 text-white p-2 rounded"
        >
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
