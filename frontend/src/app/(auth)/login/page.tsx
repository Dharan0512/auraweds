"use client";

import Link from "next/link";
import {
  Infinity as InfinityIcon,
  ArrowLeft,
  ShieldCheck,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";
import LoginCard from "@/components/auth/LoginCard";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% ID-verified members",
    desc: "Every profile is manually vetted for authenticity.",
  },
  {
    icon: Users,
    title: "Family-assisted matchmaking",
    desc: "Bring the people you trust into your search.",
  },
  {
    icon: Heart,
    title: "Privacy-first connections",
    desc: "You decide who sees you, and when.",
  },
];

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen bg-slate-950 text-white">
      {/* ---------- Brand panel (desktop) ---------- */}
      <aside className="relative hidden w-1/2 overflow-hidden lg:flex">
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3d] via-[#4c1d95] to-[#6d28d9]" />

        {/* animated ambient orbs */}
        <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl animate-float-slow" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gold/20 blur-3xl animate-float" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 50% at 18% 18%, rgba(201,162,39,0.20), transparent), radial-gradient(ellipse 55% 55% at 92% 88%, rgba(167,139,250,0.28), transparent)",
          }}
        />

        {/* faint grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          }}
        />

        <div className="relative z-10 flex w-full flex-col justify-between p-14">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm">
              <InfinityIcon className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight">
              Aura<span className="text-gold"> Weds</span>
            </span>
          </Link>

          <div className="max-w-md">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Where lasting bonds begin
            </span>

            <h1 className="font-serif text-5xl font-bold leading-[1.1]">
              Welcome back to your{" "}
              <span className="bg-gradient-to-r from-gold-300 via-gold to-gold-600 bg-clip-text text-transparent">
                journey.
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              Sign in to continue discovering verified, family-approved matches —
              privately and on your terms.
            </p>

            <ul className="mt-10 space-y-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 hover:bg-white/[0.07]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/50">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Aura Weds. Made with love in India.
          </p>
        </div>
      </aside>

      {/* ---------- Form panel ---------- */}
      <section className="relative flex w-full flex-col items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2">
        {/* ambient glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(124,58,237,0.22), transparent), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(201,162,39,0.10), transparent)",
          }}
        />

        <Link
          href="/"
          className="group absolute left-5 top-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-gold sm:left-8"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Home
        </Link>

        <div className="relative z-10 flex w-full max-w-md flex-col items-center">
          {/* mobile brand */}
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#D4AF37] to-purple-600 text-slate-950">
              <InfinityIcon className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-bold tracking-tight">
              Aura<span className="text-gold"> Weds</span>
            </span>
          </Link>

          <LoginCard />
        </div>
      </section>
    </main>
  );
}
