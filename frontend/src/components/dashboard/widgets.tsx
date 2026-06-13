"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getImageUrl, calculateAge } from "@/lib/utils";
import { MatchProfile } from "@/services/matchService";
import {
  ShieldCheck,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  Heart,
  Lock,
} from "lucide-react";

/* ---------------- Count-up number ---------------- */
export function CountUp({
  value,
  duration = 1400,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);
  return (
    <span ref={ref}>
      {n.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------------- Mini sparkline ---------------- */
export function Sparkline({
  data,
  color = "var(--accent)",
}: {
  data: number[];
  color?: string;
}) {
  const w = 96;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  const id = React.useId();
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#spark-${id})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Stat card ---------------- */
export function StatCard({
  icon: Icon,
  label,
  value,
  suffix = "",
  delta,
  spark,
  accent = "var(--accent)",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  delta?: number;
  spark: number[];
  accent?: string;
  delay?: number;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="theme-card group relative overflow-hidden rounded-3xl p-5"
    >
      <div className="flex items-start justify-between">
        <span
          className="grid h-11 w-11 place-items-center rounded-2xl"
          style={{ background: "var(--accent-soft-bg)", color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        {typeof delta === "number" && (
          <span
            className="rounded-full px-2 py-1 text-[11px] font-bold"
            style={{
              color: up ? "var(--positive)" : "var(--danger)",
              background: up ? "var(--positive-soft)" : "rgba(244,63,94,0.12)",
            }}
          >
            {up ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="font-serif text-3xl font-bold leading-none text-[var(--text)]">
            <CountUp value={value} suffix={suffix} />
          </p>
          <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">
            {label}
          </p>
        </div>
        <div className="opacity-80">
          <Sparkline data={spark} color={accent} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Profile completion ring ---------------- */
export function CompletionRing({
  percent,
  size = 132,
}: {
  percent: number;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const id = React.useId();
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c - (c * percent) / 100 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-serif text-3xl font-bold text-[var(--text)]">
          <CountUp value={percent} suffix="%" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
          Complete
        </span>
      </div>
    </div>
  );
}

/* ---------------- Themed match card ---------------- */
export function ThemedMatchCard({
  match,
  onView,
  delay = 0,
}: {
  match: MatchProfile;
  onView: (id: string | number) => void;
  delay?: number;
}) {
  const age = calculateAge(match.basicDetails.dob);
  const verified = match.badge?.mobileVerified || match.badge?.adminApproved;
  const score = Math.round(match.matchScore ?? 0);
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="theme-card group relative flex flex-col overflow-hidden rounded-[28px]"
    >
      <div className="relative m-2.5 h-72 overflow-hidden rounded-[22px]">
        <img
          src={getImageUrl(match.photos?.[0], match.basicDetails.firstName)}
          alt={match.basicDetails.firstName}
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* score ring badge */}
        <div className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-black/35 backdrop-blur-md ring-1 ring-white/25">
          <span className="text-xs font-black text-white">{score}%</span>
        </div>
        {verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2e1065] shadow-gold">
            <ShieldCheck className="h-3 w-3" strokeWidth={3} /> Verified
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-serif text-xl font-bold drop-shadow">
            {match.basicDetails.firstName}, {age}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
            <Briefcase className="h-3.5 w-3.5" />
            {match.professionalInfo?.profession || "—"}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/75">
            <MapPin className="h-3.5 w-3.5" />
            {match.basicDetails?.location || match.basicDetails?.nativeDistrict || "India"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={() => onView(match.userId)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: "var(--surface-2)", color: "var(--text)" }}
        >
          View profile <ArrowUpRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onView(match.userId)}
          aria-label="Express interest"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform hover:scale-105"
          style={{ backgroundImage: "var(--accent-gradient)" }}
        >
          <Heart className="h-4.5 w-4.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* ---------------- Themed skeleton ---------------- */
export function MatchSkeleton() {
  return (
    <div className="theme-card overflow-hidden rounded-[28px]">
      <div
        className="m-2.5 h-72 animate-pulse rounded-[22px]"
        style={{ background: "var(--surface-2)" }}
      />
      <div className="flex gap-2 px-4 pb-4">
        <div
          className="h-10 flex-1 animate-pulse rounded-full"
          style={{ background: "var(--surface-2)" }}
        />
        <div
          className="h-10 w-10 animate-pulse rounded-full"
          style={{ background: "var(--surface-2)" }}
        />
      </div>
    </div>
  );
}

/* ---------------- Section heading ---------------- */
export function PanelTitle({
  icon: Icon,
  children,
  action,
}: {
  icon?: React.ElementType;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[var(--text)]">
        {Icon && <Icon className="h-5 w-5" style={{ color: "var(--accent-2)" }} />}
        {children}
      </h2>
      {action}
    </div>
  );
}

export { Sparkles, Lock };
