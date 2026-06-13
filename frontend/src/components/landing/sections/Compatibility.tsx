"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, BrainCircuit, TrendingUp, HeartHandshake } from "lucide-react";
import { Eyebrow, Reveal, StatCounter } from "../shared";
import { COMPATIBILITY_FACETS } from "../content";

function ScoreRing({ score = 94 }: { score?: number }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <svg ref={ref} viewBox="0 0 130 130" className="h-40 w-40 -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#ede9fe" strokeWidth="12" />
        <motion.circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c - (c * score) / 100 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center rotate-0">
        <span className="font-serif text-4xl font-bold text-royal-950">
          <StatCounter value={score} suffix="%" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          Compatibility
        </span>
      </div>
    </div>
  );
}

const POINTS = [
  { icon: BrainCircuit, title: "Beyond surface filters", desc: "We weigh values, lifestyle, and life goals — not just age and photos." },
  { icon: HeartHandshake, title: "Family expectations factored in", desc: "Community, traditions, and family priorities shape every recommendation." },
  { icon: TrendingUp, title: "Gets smarter with you", desc: "The more you interact, the sharper and more personal your matches become." },
];

export default function Compatibility() {
  return (
    <section
      id="compatibility"
      className="relative overflow-hidden bg-royal-950 px-5 py-24 text-white sm:px-8 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 15% 20%, rgba(167,139,250,0.25), transparent), radial-gradient(ellipse 50% 50% at 90% 80%, rgba(201,162,39,0.18), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* report card */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 text-gold-300">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                AI Compatibility Report
              </span>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <ScoreRing score={94} />
              <p className="mt-3 text-center text-sm text-white/70">
                Aanya &amp; Rohan are{" "}
                <span className="font-semibold text-white">highly compatible</span> across the
                dimensions that matter most.
              </p>
            </div>
            <div className="mt-7 space-y-4">
              {COMPATIBILITY_FACETS.map((f, i) => (
                <FacetDark key={f.label} label={f.label} value={f.value} delay={0.2 + i * 0.12} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow className="border-white/20 bg-white/10 text-gold-200">
              AI-powered insights
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
              Compatibility you can{" "}
              <span className="text-gold-foil">actually feel.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70 text-pretty">
              Our matching engine looks past the obvious to understand what makes a
              relationship last — then surfaces the people you’re genuinely meant to meet.
            </p>
          </Reveal>
          <div className="mt-9 flex flex-col gap-5">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={0.12 + i * 0.08}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-300">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* dark-themed facet bar */
function FacetDark({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-white/85">{label}</span>
        <span className="font-semibold text-gold-300">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-royal-400 to-gold-300"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
