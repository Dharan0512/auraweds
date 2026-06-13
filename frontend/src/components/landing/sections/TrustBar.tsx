"use client";

import React from "react";
import { ShieldCheck, BadgeCheck, Lock, Star, Users } from "lucide-react";
import { Reveal, StatCounter } from "../shared";

const STATS = [
  { icon: Users, value: 2, suffix: "L+", label: "Verified members", decimals: 0 },
  { icon: BadgeCheck, value: 50, suffix: "K+", label: "Success stories" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "ID-verified profiles" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Member rating", decimals: 1 },
];

const ASSURANCES = ["Govt-ID verified", "256-bit encrypted", "Privacy-first", "Human safety team"];

export default function TrustBar() {
  return (
    <section className="relative z-10 -mt-10 px-5 sm:px-8">
      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-soft-lg backdrop-blur-xl">
          <div className="grid grid-cols-2 divide-x divide-y divide-royal-100 md:grid-cols-4 md:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-7 text-center">
                <s.icon className="mb-1 h-6 w-6 text-royal-500" strokeWidth={1.8} />
                <p className="font-serif text-3xl font-bold text-royal-950 sm:text-4xl">
                  <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-royal-100 bg-ivory-100/60 px-6 py-4">
            <span className="flex items-center gap-2 text-xs font-semibold text-royal-700">
              <Lock className="h-4 w-4 text-gold-500" /> Your trust, protected end-to-end
            </span>
            {ASSURANCES.map((a) => (
              <span key={a} className="text-xs font-medium text-[var(--muted)]">
                · {a}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
