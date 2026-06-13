"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Check } from "lucide-react";

/* ----------------------------------------------------------------
   Reveal — scroll-triggered entrance, reduced-motion aware
----------------------------------------------------------------- */
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: keyof typeof motion;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered container + item for lists/grids */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ----------------------------------------------------------------
   Eyebrow — small label above headings
----------------------------------------------------------------- */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-royal-200 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-royal-700 shadow-sm backdrop-blur ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------
   SectionHeading — eyebrow + title + subtitle, centered by default
----------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-royal-950 text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] text-pretty md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------
   Buttons
----------------------------------------------------------------- */
type BtnProps = React.ComponentProps<"a"> & { href: string };

export function PrimaryButton({ children, className = "", ...rest }: BtnProps) {
  return (
    <a
      {...rest}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-royal-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-royal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(76,29,149,0.6)] focus-visible:outline-none active:translate-y-0 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-2">{children}</span>
    </a>
  );
}

export function SecondaryButton({ children, className = "", ...rest }: BtnProps) {
  return (
    <a
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-royal-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-royal-800 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-royal-300 hover:bg-white hover:shadow-soft focus-visible:outline-none ${className}`}
    >
      {children}
    </a>
  );
}

/* ----------------------------------------------------------------
   VerifiedBadge — gold verification chip
----------------------------------------------------------------- */
export function VerifiedBadge({
  label = "Verified",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-royal-950 shadow-gold ${className}`}
    >
      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
      {label}
    </span>
  );
}

/* ----------------------------------------------------------------
   Avatar — designed, privacy-first profile portrait (no external img)
   A soft gradient field + monogram + silhouette. Looks intentional.
----------------------------------------------------------------- */
const AVATAR_THEMES: Record<string, string> = {
  rose: "from-[#fce7f3] via-[#fbcfe8] to-[#f9a8d4]",
  violet: "from-[#ede9fe] via-[#ddd6fe] to-[#c4b5fd]",
  gold: "from-[#faf4e0] via-[#f3e6bb] to-[#ead08a]",
  teal: "from-[#ccfbf1] via-[#99f6e4] to-[#5eead4]",
  blush: "from-[#ffe4e6] via-[#fecdd3] to-[#fda4af]",
  sky: "from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]",
};

export function Avatar({
  name,
  theme = "violet",
  className = "",
  rounded = "rounded-2xl",
}: {
  name: string;
  theme?: keyof typeof AVATAR_THEMES;
  className?: string;
  rounded?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${AVATAR_THEMES[theme]} ${rounded} ${className}`}
      role="img"
      aria-label={`Portrait of ${name}`}
    >
      {/* soft silhouette */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-0 h-[78%] w-auto translate-y-2 text-white/35"
        aria-hidden
      >
        <circle cx="50" cy="34" r="20" fill="currentColor" />
        <path d="M16 100c0-22 15-38 34-38s34 16 34 38z" fill="currentColor" />
      </svg>
      <span className="relative font-serif text-2xl font-bold text-royal-900/70 drop-shadow-sm">
        {initials}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------
   StatCounter — counts up when scrolled into view
----------------------------------------------------------------- */
export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* Decorative section divider */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
    </div>
  );
}
