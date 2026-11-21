import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
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
    <div className="min-h-screen relative flex items-center justify-center bg-[#030712] px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[28rem] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[6rem] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] bg-blue-500/10 rounded-full blur-[6rem] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] p-8">
          <div className="flex flex-col items-center gap-4 mb-7">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl" />
              <img
                src={logo}
                alt="Bumble Bee logo"
                className="relative w-16 h-16 rounded-full object-cover ring-2 ring-yellow-400/50 bg-white"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-black text-white tracking-tight">Admin Studio</h1>
              <p className="text-sm text-slate-400 mt-1">Sign in to manage the Bumble Bee website.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400/50 transition-all"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-black shadow-[0_8px_24px_-8px_rgba(250,204,21,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 transition-all"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">Bumble Bee Corporate Solutions LLP</p>
      </div>
    </div>
  );
}
