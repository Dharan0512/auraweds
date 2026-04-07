"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginCard() {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[32px] shadow-2xl relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-[32px] pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-serif font-bold text-white mb-6 text-center">
          Continue Your Journey
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-gold transition-all font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Password
              </label>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-widest text-purple-400 hover:text-white transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-gold transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden bg-white text-slate-950 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Continue Journey
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-slate-400">
            Seeking a new connection?{" "}
            <Link
              href="/register"
              className="text-gold hover:text-white font-bold transition-colors ml-1"
            >
              Start Journey
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
