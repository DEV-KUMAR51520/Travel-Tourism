import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">Swadeshi Travel</Link>
        <Link to="/destinations" className="text-sm hover:underline">Destinations</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-sm hover:underline">Login</Link>
            <Link to="/register" className="text-sm hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hello, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-sm">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
