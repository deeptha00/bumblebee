import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./adminApi";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | ok | denied

  useEffect(() => {
    verifyToken().then((ok) => setStatus(ok ? "ok" : "denied"));
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-slate-400">
        Checking admin session…
      </div>
    );
  }
  if (status === "denied") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
