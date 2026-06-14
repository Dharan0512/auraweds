"use client";

import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "../shared";
import Particles from "../Particles";

export default function CTABand() {
  return (
    <section className="relative px-5 py-10 sm:px-8 lg:py-16">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-royal-gradient px-7 py-16 text-center shadow-royal sm:px-12 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 50% 60% at 20% 0%, rgba(201,162,39,0.28), transparent), radial-gradient(ellipse 50% 60% at 85% 100%, rgba(167,139,250,0.35), transparent)",
            }}
          />
          <Particles />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-200">
              <ShieldCheck className="h-3.5 w-3.5" /> Start in under 3 minutes
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl">
              Your forever is waiting on{" "}
              <span className="text-gold-foil">Aura Weds.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75 text-pretty">
              Join 2,00,000+ verified members and their families on the most trusted path to a
              lifelong partnership.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-royal-900 shadow-xl transition-all hover:-translate-y-0.5"
              >
                Create Your Profile
                <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#profiles"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Browse Verified Profiles
              </a>
            </div>
            <p className="mt-5 text-sm text-white/55">No credit card required · Cancel anytime</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
