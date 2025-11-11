import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();
  const { setUser } = useAuth();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/register", form);
      return res.data;
    },
    onSuccess: (data) => {
      // store token if returned
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) setUser(data.user);
      nav("/dashboard");
    },
    onError: (err: any) => {
      alert(`❌ Registration failed: ${err.response?.data?.error || err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
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
          disabled={registerMutation.isLoading}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {registerMutation.isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
