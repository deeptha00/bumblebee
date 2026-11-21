import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import logo from "../assets/bumblebee-logo.jpg";
import { login, verifyToken } from "./adminApi";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    verifyToken().then((ok) => {
      if (ok) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="flex flex-col items-center gap-3 mb-6">
          <img src={logo} alt="Bumble Bee logo" className="w-16 h-16 rounded-full object-cover shadow" />
          <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-sm text-slate-500 text-center">Sign in to manage the Bumble Bee website content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Enter admin password"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-60 transition-colors"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
