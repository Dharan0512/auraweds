"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastError, setLastError] = useState("");

  useEffect(() => {
    if (error && error !== lastError) {
      toast.error(error);
      setLastError(error);
    }
  }, [error, lastError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full animate-pulse delay-700" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6 group">
            <img
              src="/auraWedsLogo.png"
              alt="AuraWeds"
              className="h-28 w-auto object-contain mb-2"
            />
            <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-[#D4AF37] transition-all duration-500 rounded-full" />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Welcome Back to <span className="text-purple-400">Excellence</span>
          </h2>
          <p className="mt-3 text-slate-400 font-medium">
            Continue your premium matchmaking journey
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[40px] shadow-2xl relative group transition-all duration-500 hover:border-white/20">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-[40px] pointer-events-none" />

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1 ml-1">
                Security Identity (Email)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@premium.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#D4AF37] transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Access Key (Password)
                </label>
                <Link
                  href="#"
                  className="text-[10px] font-black uppercase tracking-[0.1em] text-purple-400 hover:text-white transition-colors"
                >
                  Forgot Key?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#D4AF37] transition-all font-medium"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                  />
                  <div className="w-5 h-5 border border-white/20 rounded-md bg-white/5 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-all flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                  Remember my access
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-white text-slate-950 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">
                {loading ? "Authorizing..." : "Enter Portal"}
              </span>
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-slate-400">
            New to the legacy?{" "}
            <Link
              href="/register"
              className="text-[#D4AF37] hover:text-white font-bold underline decoration-[#D4AF37]/30 underline-offset-4 transition-all"
            >
              Start Your Journey
            </Link>
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
            © AuraWeds Premium Matrimony • EST. 2024
          </p>
        </div>
      </div>
    </div>
  );
}
