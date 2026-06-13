"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EyeOff,
  BadgeCheck,
  Lock,
  SlidersHorizontal,
  ShieldAlert,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";
import {
  SectionHeading,
  staggerContainer,
  staggerItem,
} from "../shared";
import { PRIVACY_FEATURES } from "../content";

const ICONS: Record<string, React.ElementType> = {
  EyeOff,
  BadgeCheck,
  Lock,
  SlidersHorizontal,
  ShieldAlert,
  LifeBuoy,
};

export default function Privacy() {
  return (
    <section id="privacy" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div aria-hidden className="absolute inset-0 bg-ivory-radial" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Privacy & security"
          title={
            <>
              Your search, your rules,{" "}
              <span className="text-royal-foil">fully protected.</span>
            </>
          }
          subtitle="Privacy isn’t a setting we bolt on — it’s the foundation Aura Weds is built on."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PRIVACY_FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-3xl border border-royal-100 bg-white/85 p-7 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
              >
                <span
                  aria-hidden
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-royal-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-royal-gradient text-white shadow-royal">
                  <Icon className="h-5.5 w-5.5" strokeWidth={1.9} />
                </span>
                <h3 className="relative mt-5 font-serif text-lg font-bold text-royal-950">
                  {f.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-royal-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-royal-100 bg-white px-4 py-2 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-gold-500" /> ISO 27001-aligned
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-royal-100 bg-white px-4 py-2 shadow-sm">
            <Lock className="h-4 w-4 text-gold-500" /> 256-bit AES encryption
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-royal-100 bg-white px-4 py-2 shadow-sm">
            <BadgeCheck className="h-4 w-4 text-gold-500" /> Data Protection compliant
          </span>
        </div>
      </div>
    </section>
  );
}
