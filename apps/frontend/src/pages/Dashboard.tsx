import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";

export default function Dashboard() {
  const { user, refreshUser } = useAuth();

  const { data, isFetching } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const resp = await api.get("/auth/me");
      return resp.data;
    },
    enabled: !!user, // only fetch when logged in
    retry: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <section className="bg-white shadow p-4 rounded mb-4">
        <h3 className="font-medium">Profile</h3>
        {!user ? (
          <p className="text-sm text-gray-500">No profile loaded.</p>
        ) : (
          <div className="mt-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p className="text-xs text-gray-400 mt-2">
              Account created: {new Date(user.createdAt || "").toLocaleString()}
            </p>
          </div>
        )}
      </section>

      <section className="bg-white shadow p-4 rounded">
        <h3 className="font-medium">Quick actions</h3>
        <div className="mt-3 flex gap-3">
          <button
            onClick={() => refreshUser()}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Refresh profile
          </button>
          <button
            onClick={() => alert("Feature coming soon")}
            className="px-3 py-1 border rounded"
          >
            Create booking
          </button>
        </div>
        {isFetching && (
          <p className="text-sm text-gray-500 mt-2">Refreshing data...</p>
        )}
      </section>
    </div>
  );
}
