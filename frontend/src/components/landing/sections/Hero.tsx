"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Heart, Users, Star, ArrowRight, PlayCircle } from "lucide-react";
import { Avatar } from "../shared";
import Particles from "../Particles";

/* Compact profile card used inside the hero match scene */
function HeroCard({
  side,
  name,
  age,
  role,
  location,
  theme,
}: {
  side: "bride" | "groom";
  name: string;
  age: number;
  role: string;
  location: string;
  theme: "rose" | "violet";
}) {
  return (
    <div
      className={`hero-${side} relative w-[46%] max-w-[230px] rounded-[26px] border border-white/70 bg-white/80 p-3 shadow-soft-lg backdrop-blur-md sm:p-4`}
    >
      <div className="relative">
        <Avatar
          name={name}
          theme={theme}
          rounded="rounded-[18px]"
          className="aspect-[4/5] w-full"
        />
        {/* progressive verification badge */}
        <span
          className={`hero-badge absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-royal-950 shadow-gold`}
          aria-label="Verified profile"
        >
          <ShieldCheck className="h-4.5 w-4.5" strokeWidth={2.4} />
        </span>
      </div>
      <div className="mt-3 px-1">
        <p className="font-serif text-base font-bold leading-tight text-royal-950">
          {name}, {age}
        </p>
        <p className="mt-0.5 text-xs font-medium text-royal-700">{role}</p>
        <p className="text-[11px] text-[var(--muted)]">{location}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const setFinal = () => {
        gsap.set(
          [".hero-eyebrow", ".hero-title", ".hero-sub", ".hero-cta", ".hero-trust"],
          { opacity: 1, y: 0 }
        );
        gsap.set([".hero-bride", ".hero-groom"], { opacity: 1, x: 0, rotate: 0 });
        gsap.set(".hero-medallion", { opacity: 1, scale: 1 });
        gsap.set(".hero-badge", { opacity: 1, scale: 1 });
        gsap.set(".hero-fam", { opacity: 1, y: 0 });
        gsap.set(".connection-path", { strokeDashoffset: 0 });
      };

      if (reduce) {
        setFinal();
        return;
      }

      // initial states
      gsap.set([".hero-eyebrow", ".hero-title", ".hero-sub", ".hero-cta", ".hero-trust"], {
        opacity: 0,
        y: 26,
      });
      gsap.set(".hero-bride", { opacity: 0, x: -130, rotate: -8 });
      gsap.set(".hero-groom", { opacity: 0, x: 130, rotate: 8 });
      gsap.set(".hero-medallion", { opacity: 0, scale: 0.4 });
      gsap.set(".hero-badge", { opacity: 0, scale: 0.3 });
      gsap.set(".hero-fam", { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6 })
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.35")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        // cards glide in from opposite sides
        .to(
          ".hero-bride",
          { opacity: 1, x: 0, rotate: -3, duration: 0.9, ease: "power4.out" },
          "-=0.3"
        )
        .to(
          ".hero-groom",
          { opacity: 1, x: 0, rotate: 3, duration: 0.9, ease: "power4.out" },
          "<"
        )
        // connection line draws
        .to(
          ".connection-path",
          { strokeDashoffset: 0, duration: 0.9, ease: "power1.inOut" },
          "-=0.45"
        )
        // central match medallion pops
        .to(
          ".hero-medallion",
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" },
          "-=0.25"
        )
        // verification badges appear progressively
        .to(
          ".hero-badge",
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.18, ease: "back.out(2)" },
          "-=0.2"
        )
        // family collaboration indicators
        .to(".hero-fam", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.1")
        // CTA + trust reveal
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
        .to(".hero-trust", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

      // gentle continuous float on the cards
      gsap.to(".hero-bride", {
        y: -10,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.2,
      });
      gsap.to(".hero-groom", {
        y: 10,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.4,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ivory-200 pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40"
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 15% 0%, rgba(124,58,237,0.12), transparent), radial-gradient(ellipse 60% 50% at 95% 15%, rgba(201,162,39,0.14), transparent)",
        }}
      />
      <Particles />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* ---------- Copy ---------- */}
        <div className="flex flex-col items-start">
          <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-royal-200 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-royal-700 shadow-sm backdrop-blur">
            <span className="flex -space-x-1">
              {[0, 1, 2].map((i) => (
                <Star key={i} className="h-3 w-3 fill-gold-400 text-gold-400" />
              ))}
            </span>
            Trusted by 2,00,000+ families
          </span>

          <h1 className="hero-title mt-6 font-serif text-[2.6rem] font-bold leading-[1.05] tracking-tight text-royal-950 text-balance sm:text-6xl lg:text-[4.1rem]">
            Find the relationship that lasts a{" "}
            <span className="text-royal-foil">lifetime.</span>
          </h1>

          <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] text-pretty">
            Verified profiles, family-assisted matching, and privacy-first
            connections — the premium, trusted way to find a partner for life.
          </p>

          <div className="hero-cta mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href="/register"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-royal-gradient px-8 py-4 text-base font-semibold text-white shadow-royal transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-12px_rgba(76,29,149,0.6)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative flex items-center gap-2">
                Create Your Profile
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="#profiles"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-royal-200 bg-white/70 px-8 py-4 text-base font-semibold text-royal-800 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-royal-300 hover:bg-white hover:shadow-soft"
            >
              <PlayCircle className="h-5 w-5 text-royal-600" />
              Browse Verified Profiles
            </a>
          </div>

          <div className="hero-trust mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-royal-600" />
              100% ID-verified
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-royal-600" />
              Family-assisted
            </span>
            <span className="flex items-center gap-2">
              <Heart className="h-4.5 w-4.5 text-royal-600" />
              Privacy-first
            </span>
          </div>
        </div>

        {/* ---------- Cinematic match scene ---------- */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative flex items-center justify-between gap-1 px-2 py-10 sm:px-6">
            {/* connection line overlay */}
            <svg
              viewBox="0 0 400 240"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="connGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#c9a227" />
                </linearGradient>
              </defs>
              <path
                className="connection-path"
                d="M 96 150 C 150 70, 250 70, 304 150"
                stroke="url(#connGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
              />
            </svg>

            <HeroCard
              side="bride"
              name="Aanya Sharma"
              age={27}
              role="Pediatric Surgeon"
              location="Bengaluru"
              theme="rose"
            />

            {/* central match medallion */}
            <div className="hero-medallion absolute left-1/2 top-[34%] z-30 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-soft-lg ring-4 ring-gold-100">
                <span className="absolute inset-0 animate-pulse-slow rounded-full bg-royal-400/20" />
                <span className="grid h-12 w-12 place-items-center rounded-full bg-royal-gradient text-white shadow-royal">
                  <Heart className="h-6 w-6 fill-white" />
                </span>
              </div>
              <span className="mt-2 block rounded-full bg-royal-950 px-3 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                98% Match
              </span>
            </div>

            <HeroCard
              side="groom"
              name="Rohan Mehta"
              age={30}
              role="Product Manager"
              location="Mumbai"
              theme="violet"
            />
          </div>

          {/* family collaboration indicators */}
          <div className="hero-fam mx-auto mt-2 flex w-fit items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur">
            <div className="flex -space-x-2">
              {[
                { n: "Mr S", t: "gold" },
                { n: "Mrs S", t: "rose" },
                { n: "Mr M", t: "sky" },
              ].map((f) => (
                <Avatar
                  key={f.n}
                  name={f.n}
                  theme={f.t as "gold"}
                  rounded="rounded-full"
                  className="h-7 w-7 ring-2 ring-white"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-royal-800">
              Both families are reviewing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
