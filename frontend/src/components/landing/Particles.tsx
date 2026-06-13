"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

/* Deterministic pseudo-random so SSR and client markup match exactly */
function seeded(i: number) {
  const x = Math.sin(i * 99.13) * 10000;
  return x - Math.floor(x);
}

const COUNT = 18;
const PARTICLES = Array.from({ length: COUNT }, (_, i) => ({
  left: seeded(i) * 100,
  top: seeded(i + 100) * 100,
  size: 3 + seeded(i + 200) * 7,
  delay: seeded(i + 300) * 8,
  duration: 7 + seeded(i + 400) * 9,
  gold: seeded(i + 500) > 0.5,
}));

export default function Particles({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.gold
              ? "radial-gradient(circle, rgba(234,208,138,0.9), rgba(201,162,39,0))"
              : "radial-gradient(circle, rgba(167,139,250,0.85), rgba(124,58,237,0))",
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
