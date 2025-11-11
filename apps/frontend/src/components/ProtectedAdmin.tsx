// apps/frontend/src/components/ProtectedAdmin.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const ProtectedAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // logged in but not admin → deny access
  if (user.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-center">
        <div className="p-6 bg-white shadow rounded">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-700">You must be an administrator to view this page.</p>
        </div>
      </div>
    );
  }

  // user is admin → render children
  return <>{children}</>;
};

export default ProtectedAdmin;
