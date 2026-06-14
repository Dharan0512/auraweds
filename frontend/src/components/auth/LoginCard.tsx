"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import ForgotPasswordFlow from "@/components/auth/ForgotPasswordFlow";

export default function LoginCard() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastError, setLastError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  if (showForgotPassword) {
    return (
      <ForgotPasswordFlow onBackToLogin={() => setShowForgotPassword(false)} />
    );
  }

  return (
    <Card className="w-full max-w-md">
      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center space-y-3 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20">
            <Lock className="h-5 w-5" />
          </span>
          <div className="space-y-1.5">
            <h3 className="text-3xl font-serif font-bold tracking-tight text-white">
              Welcome Back
            </h3>
            <p className="text-sm font-medium text-slate-400">
              Continue your legacy journey.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pt-2"
              />
            </div>
          </div>

          <Button
            variant="gold"
            size="xl"
            className="w-full"
            loading={loading}
            type="submit"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue Journey
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            New here
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Seeking a new connection?{" "}
            <Link
              href="/register"
              className="text-gold hover:text-white font-bold transition-all ml-1 underline underline-offset-4 decoration-gold/30 hover:decoration-gold/80"
            >
              Start Journey
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}
