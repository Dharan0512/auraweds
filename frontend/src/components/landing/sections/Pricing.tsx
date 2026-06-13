"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Shield, Zap, ArrowRight } from "lucide-react";
import { SectionHeading, Reveal } from "../shared";
import { PLANS, PLAN_DURATIONS, type DurationKey } from "../content";

const ICONS = { Zap, Shield, Crown } as const;

export default function Pricing() {
  const [duration, setDuration] = useState<DurationKey>("6M");

  const durationLabel =
    PLAN_DURATIONS.find((d) => d.id === duration)?.label.toLowerCase() ?? "";

  const priceFor = (prices: Record<DurationKey, number>) => {
    const v = prices[duration];
    if (v === 0) return { big: "Free", small: "lifetime" };
    return {
      big: `₹${v.toLocaleString("en-IN")}`,
      small: `/ ${durationLabel}`,
    };
  };

  return (
    <section id="pricing" className="relative px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Membership plans"
          title={
            <>
              Elevate your{" "}
              <span className="text-gold-foil">matchmaking.</span>
            </>
          }
          subtitle="High-intent matchmaking with direct communication and priority visibility. Start free, upgrade when you’re ready."
        />

        {/* duration toggle */}
        <Reveal className="mt-9 flex items-center justify-center" delay={0.05}>
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-royal-100 bg-white p-1.5 shadow-soft">
            {PLAN_DURATIONS.map((d) => {
              const active = duration === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    active ? "bg-royal-gradient text-white shadow-royal" : "text-royal-700"
                  }`}
                >
                  {d.label}
                  {d.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        active ? "bg-gold-gradient text-royal-950" : "bg-gold-100 text-gold-700"
                      }`}
                    >
                      {d.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = priceFor(plan.prices);
            const featured = plan.highlight;
            const comingSoon = plan.comingSoon;
            const Icon = ICONS[plan.icon];
            return (
              <Reveal key={plan.name} delay={0.08 * i}>
                <motion.div
                  whileHover={comingSoon ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                    featured
                      ? "border-transparent bg-royal-950 text-white shadow-royal"
                      : "border-royal-100 bg-white text-royal-950 shadow-soft"
                  } ${comingSoon ? "opacity-80" : ""}`}
                >
                  {comingSoon && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-royal-900 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-soft">
                      Coming soon
                    </span>
                  )}

                  {featured && (
                    <>
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-3xl"
                        style={{
                          backgroundImage:
                            "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(201,162,39,0.22), transparent)",
                        }}
                      />
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-royal-950 shadow-gold">
                        Recommended
                      </span>
                    </>
                  )}

                  <div className="relative flex items-center gap-2">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl ${
                        featured ? "bg-white/10 text-gold-300" : "bg-royal-50 text-royal-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-bold">{plan.name}</h3>
                      <p
                        className={`text-xs font-medium ${
                          featured ? "text-white/60" : "text-[var(--muted)]"
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-6 flex items-end gap-1">
                    <span className="font-serif text-4xl font-bold">{price.big}</span>
                    <span
                      className={`mb-1.5 text-sm ${
                        featured ? "text-white/60" : "text-[var(--muted)]"
                      }`}
                    >
                      {price.small}
                    </span>
                  </div>

                  <ul className="relative mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                            featured ? "bg-gold-gradient text-royal-950" : "bg-royal-50 text-royal-600"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className={featured ? "text-white/85" : "text-royal-900"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {comingSoon ? (
                    <span
                      aria-disabled
                      className="relative mt-8 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-royal-200 bg-royal-50 py-3.5 text-sm font-semibold text-royal-400"
                    >
                      Coming soon
                    </span>
                  ) : (
                    <a
                      href="/register"
                      className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                        featured
                          ? "bg-gold-gradient text-royal-950 shadow-gold"
                          : "bg-royal-gradient text-white shadow-royal"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--muted)]">
          All plans include verified-only profiles, family collaboration, and full privacy controls.
        </p>
      </div>
    </section>
  );
}
